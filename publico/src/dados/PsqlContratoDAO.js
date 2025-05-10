const { pool } = require('../../../servicos/database_service')
const PgUtil = require('../dados/PgUtil');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PsqlClienteDao = require('./PsqlClienteDAO');
const PsqlEnderecoDAO = require('./PsqlEnderecoDAO');
const PsqlCorretorDAO = require('./PsqlCorretorDAO');
const Contrato = require('../entidades/Contrato');
const PsqlProdutoDAO = require('./PsqlProdutoDAO');
const PsqlBancoDAO = require('./PsqlBancoDAO');

class PsqlContratoDAO {

    #construtor() {
        this.instancia = new PsqlContratoDAO();
    }

    static getInstancia() {
        if (!this.instancia) {
            this.instancia = new PsqlContratoDAO();
            return this.instancia;
        }
        else {
            return this.instancia;
        }
    }

    async obterPorId(id) {
        try {
            const queryContrato = "select * from contratos where id=$1";
            const resContrato = await pool.query(queryContrato, [id]);
            if (resContrato.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("O contrato não existe.");
            }
            const rowContrato = resContrato.rows[0];
            const contrato = new Contrato();
            contrato.id = rowContrato.id;
            contrato.numero = rowContrato.numero;
            contrato.data = rowContrato.data;
            contrato.valor = rowContrato.valor;
            contrato.status = rowContrato.status;
            contrato.dtLiberacao = rowContrato.dt_liberacao;
            if (rowContrato.produto_id) {
                const produtoDAO = new PsqlProdutoDAO();
                const produto = await produtoDAO.obterPorId(rowContrato.produto_id);
                contrato.produto = produto;
            }
            if (rowContrato.banco_id) {
                const bancoDAO = new PsqlBancoDAO();
                const banco = await bancoDAO.obterPorId(rowContrato.banco_id);
                contrato.banco = banco;
            }
            if (rowContrato.endereco_id) {
                const enderecoDAO = new PsqlEnderecoDAO();
                const endereco = await enderecoDAO.obterPorId(rowContrato.endereco_id);
                contrato.endereco = endereco;
            }
            if (rowContrato.corretor_id) {
                const corretorDAO = new PsqlCorretorDAO();
                const corretor = await corretorDAO.obterPorId(rowContrato.corretor_id);
                contrato.corretor = corretor;
            }
            if (rowContrato.cliente_id) {
                const clienteDAO = new PsqlClienteDao();
                const cliente = await clienteDAO.obterPorId(rowContrato.cliente_id);
                contrato.cliente = cliente;
            }
            return contrato;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async salvar(contrato, rollback=false) { 
        try {
            let enderecoDAO = new PsqlEnderecoDAO();
            let clienteDAO = new PsqlClienteDao();
            if(rollback){
                await pool.query('BEGIN');
            }
            
            const queryContrato = "insert into contratos(numero, produto_id, banco_id, data, valor, cliente_id, dt_liberacao, endereco_id, status, corretor_id) " +
                "values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning id";
            let clienteId = contrato.cliente != null && contrato.cliente.id != null ? contrato.cliente.id : null;

            if (clienteId == null) {
                contrato.cliente.endereco = contrato.endereco;


                clienteId = (await clienteDAO.salvar(contrato.cliente)).id;
                let endereco_contrato_id = null;
                if (contrato.endereco) {
                    endereco_contrato_id = (await enderecoDAO.salvar(contrato.endereco)).id;
                }
                let resContrato = await pool.query(queryContrato, [contrato.numero, contrato.produto.id, contrato.banco.id, contrato.data,
                contrato.valor, clienteId, contrato.dtLiberacao, endereco_contrato_id, contrato.status, contrato.corretor.id]);
                if(rollback){
                    await pool.query('COMMIT');
                }
                
                return resContrato.rows[0];

            } else {
                let endereco_contrato_id = null;
                if (contrato.endereco) {
                    endereco_contrato_id = (await enderecoDAO.salvar(contrato.endereco)).id;
                }

                let resContrato = await pool.query(queryContrato, [contrato.numero, contrato.produto.id, contrato.banco.id, contrato.data,
                contrato.valor, contrato.cliente.id, contrato.dtLiberacao, endereco_contrato_id, contrato.status, contrato.corretor.id]);
                if(rollback){
                    await pool.query('COMMIT');
                }
                return resContrato.rows[0];
            }

        } catch (e) {
            if(rollback){
                await pool.query('ROLLBACK');
            }
            PgUtil.checkError(e);
        }
    }

    async atualizar(contrato) {
        try {
            pool.query('BEGIN');
            let contratoSalvo = await this.obterPorId(contrato.id);
            if (contrato.cliente && contrato.cliente.id) {
                const clienteDAO = new PsqlClienteDao();
                await clienteDAO.atualizar(contrato.cliente);

            }
            if (contrato.endereco) {
                let enderecoDAO = new PsqlEnderecoDAO();
                await enderecoDAO.atualizar(contrato.endereco);
            }
            const numero = contrato.numero ? contrato.numero : contratoSalvo.numero;
            const produtoId = contrato.produto && contrato.produto.id ? contrato.produto.id : contratoSalvo.produto.id;
            const bancoId = contrato.banco && contrato.banco.id ? contrato.banco.id : (contratoSalvo.banco ? contratoSalvo.banco.id : null);
            const data = contrato.data ? contrato.data : contratoSalvo.data;
            const valor = contrato.valor ? contrato.valor : contratoSalvo.valor;
            const clienteId = contrato.cliente && contrato.cliente.id ? contrato.cliente.id : contratoSalvo.cliente.id;
            const enderecoId = contrato.endereco && contrato.endereco.id ? contrato.endereco.id : contratoSalvo.endereco.id;
            const status = contrato.status ? contrato.status : contratoSalvo.status;
            const corretorId = contrato.corretor && contrato.corretor.id ? contrato.corretor.id : contratoSalvo.corretor.id;
            const dtLiberacao = contrato.dtLiberacao ? contrato.dtLiberacao : contratoSalvo.dtLiberacao;
            let queryAtualizarContrato = "update contratos set numero=$1, produto_id=$2, banco_id=$3," +
                "data=$4, valor=$5, cliente_id=$6, endereco_id=$7, status=$8, corretor_id=$9, dt_liberacao=$10 where id=$11";
            await pool.query(queryAtualizarContrato, [numero, produtoId, bancoId,
                data, valor, clienteId, enderecoId, status, corretorId, dtLiberacao, contrato.id]);
            pool.query('COMMIT');

        } catch (e) {
            pool.query('ROLLBACK');
            PgUtil.checkError(e);
        }
        const query = "update contratos set numero=$1, produto_id=$2,data=$3,cliente_id=$4,";
    }
    // corretorId, bancoId, orgaoId, dataInicial, dataFinal, dtLiberacaoInicial, dtLiberacaoFinal, status, valorMinimo, valorMaximo, clienteId
    async listarPorCriterios(criterios) {
        let atributos = Object.keys(criterios);
        let numCriterios = atributos.length;
        let valoresQuery = [];
        let contratos = [];

        let query = "select contratos.id,numero,produto_id, data, cliente_id, dt_liberacao,endereco_id,status, corretor_id, valor, banco_id from contratos ";
        if (criterios["orgaoId"]) {
            query += " left join produtos on produtos.id = contratos.produto_id "
        }
        if (numCriterios > 0) {
            query += " where ";
        }

        try {
            for (let i = 0; i < numCriterios; i++) {
                switch (atributos[i]) {
                    case 'corretorId':
                        query += 'corretor_id=$' + (i + 1);
                        valoresQuery.push(criterios['corretorId']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;
                    case 'bancoId':
                        query += " banco_id=$" + (i + 1);
                        valoresQuery.push(criterios['bancoId']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;
                    case 'orgaoId':
                        query += " orgao_id=$" + (i + 1);
                        valoresQuery.push(criterios['orgaoId']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;
                    case 'dataInicial':
                        query += " data >= $" + (i + 1);
                        valoresQuery.push(criterios['dataInicial']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;

                    case 'dataFinal':
                        query += " data <= $" + (i + 1);
                        valoresQuery.push(criterios['dataFinal']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;
                    case 'dtLiberacaoInicial':
                        query += " data >= $" + (i + 1);
                        valoresQuery.push(criterios['dtLiberacaoInicial']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;
                    case 'dtLiberacaoFinal':
                        query += " data <= $" + (i + 1);
                        valoresQuery.push(criterios['dtLiberacaoFinal']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;
                    case 'status':
                        query += " status = $" + (i + 1);
                        valoresQuery.push(criterios['status']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;
                    case 'valorMinimo':
                        query += " valor >= $" + (i + 1);
                        valoresQuery.push(criterios['valorMinimo']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;
                    case 'valorMaximo':
                        query += " valor <= $" + (i + 1);
                        valoresQuery.push(criterios['valorMaximo']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;
                    case 'clienteId':
                        query += " cliente_id = $" + (i + 1);
                        valoresQuery.push(criterios['clienteId']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;

                }
            }

            const res = await pool.query(query, valoresQuery);
            const rowsContrato = res.rows;
            let bancoDAO = new PsqlBancoDAO();
            let produtoDAO = new PsqlProdutoDAO();
            let clienteDAO = new PsqlClienteDao();
            let enderecoDAO = new PsqlEnderecoDAO();
            let corretorDAO = new PsqlCorretorDAO();
            for (let i = 0; i < rowsContrato.length; i++) {
                let contrato = new Contrato();
                contrato.id = rowsContrato[i].id;
                contrato.numero = rowsContrato[i].numero;
                contrato.status = rowsContrato[i].status;
                contrato.valor = rowsContrato[i].valor;
                if (rowsContrato[i].banco_id) {
                    let banco = await bancoDAO.obterPorId(rowsContrato[i].banco_id);
                    contrato.banco = banco;
                }
                if (rowsContrato[i].produto_id) {
                    let produto = await produtoDAO.obterPorId(rowsContrato[i].produto_id);
                    contrato.produto = produto;
                }
                if (rowsContrato[i].cliente_id) {
                    let cliente = await clienteDAO.obterPorId(rowsContrato[i].cliente_id);
                    contrato.cliente = cliente;
                }
                if (rowsContrato[i].endereco_id) {
                    let endereco = await enderecoDAO.obterPorId(rowsContrato[i].endereco_id);
                    contrato.endereco = endereco;
                }
                if (rowsContrato[i].corretor_id) {
                    let corretor = await corretorDAO.obterPorId(rowsContrato[i].corretor_id);
                    contrato.corretor = corretor;
                }


                contratos.push(contrato);
            }
            return contratos;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlContratoDAO;