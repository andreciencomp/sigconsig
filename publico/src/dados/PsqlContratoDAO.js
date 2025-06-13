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
        const client = await pool.connect();
        try {
            const queryContrato = "select * from contratos where id=$1";
            const resContrato = await client.query(queryContrato, [id]);
            if (resContrato.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("O contrato não existe.");
            }
            const rowContrato = resContrato.rows[0];
            const contrato = new Contrato();
            contrato.id = rowContrato.id;
            contrato.numero = rowContrato.numero;
            contrato.data = rowContrato.data ? rowContrato.data.toISOString().slice(0, 10) : null;
            contrato.valor = rowContrato.valor;
            contrato.status = rowContrato.status;
            contrato.dtLiberacao = rowContrato.dt_liberacao ? rowContrato.dt_liberacao.toISOString().slice(0, 10) : null;
            contrato.comissaoPaga = rowContrato.comissao_paga;
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
        } finally {
            client.release();
        }
    }

    async salvar(contrato, rollback = false, dbClient=null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            let enderecoDAO = new PsqlEnderecoDAO();
            let clienteDAO = new PsqlClienteDao();
            if (rollback) {
                await client.query('BEGIN');
            }
            const queryContrato = "insert into contratos(numero, produto_id, banco_id, data, valor, cliente_id, dt_liberacao, endereco_id, status, corretor_id, comissao_paga) " +
                "values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *";
            let clienteId = contrato.cliente != null && contrato.cliente.id != null ? contrato.cliente.id : null;
            if (clienteId == null) {
                contrato.cliente.endereco = contrato.endereco;
                clienteId = (await clienteDAO.salvar(contrato.cliente, false, client)).id;
                let endereco_contrato_id = null;
                if (contrato.endereco) {
                    endereco_contrato_id = (await enderecoDAO.salvar(contrato.endereco, client)).id;
                }
                let resContrato = await client.query(queryContrato, [contrato.numero, contrato.produto.id, contrato.banco.id, contrato.data,
                contrato.valor, clienteId, contrato.dtLiberacao, endereco_contrato_id, contrato.status, contrato.corretor.id, contrato.comissaoPaga]);
                if (rollback) {
                    await client.query('COMMIT');
                }

                return await this.criarObjetoContrato(resContrato.rows[0]);

            } else {
                let endereco_contrato_id = null;
                if (contrato.endereco) {
                    endereco_contrato_id = (await enderecoDAO.salvar(contrato.endereco, client)).id;
                }
                let resContrato = await client.query(queryContrato, [contrato.numero, contrato.produto.id, contrato.banco.id, contrato.data,
                contrato.valor, contrato.cliente.id, contrato.dtLiberacao, endereco_contrato_id, contrato.status, contrato.corretor.id, contrato.comissaoPaga]);
                if (rollback) {
                    await client.query('COMMIT');
                }
                return await this.criarObjetoContrato(resContrato.rows[0]);
            }

        } catch (e) {
            if (rollback) {
                await client.query('ROLLBACK');
            }
            PgUtil.checkError(e);
        } finally {
            if(!dbClient){
                client.release();
            }
            
        }
    }

    async atualizar(contrato, rollback = false, dbClient) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            if (rollback) {
                client.query('BEGIN');
            }
            let contratoSalvo = await this.obterPorId(contrato.id);

            let clienteId = null;
            if (typeof (contrato.cliente) != 'undefined') {
                const clienteDAO = new PsqlClienteDao();
                if (contrato.cliente && contrato.cliente.id) {
                    const clienteAtualizado = await clienteDAO.atualizar(contrato.cliente, false, client);
                    clienteId = clienteAtualizado.id;
                }
                else if (contrato.cliente) {
                    const novoCliente = await clienteDAO.salvar(contrato.cliente,false, client);
                    clienteId = novoCliente.id;
                }
            } else {
                clienteId = contratoSalvo.cliente.id;
            }

            let enderecoId = null;
            if (typeof (contrato.endereco) != 'undefined') {
                let enderecoDAO = new PsqlEnderecoDAO();
                if (contrato.endereco && contratoSalvo.endereco) {
                    contrato.endereco.id = contratoSalvo.endereco.id;
                    const enderecoAtualizado = await enderecoDAO.atualizar(contrato.endereco);
                    enderecoId = contratoAtualizado.id;
                } else if (!contrato.endereco && contratoSalvo.endereco) {
                    await this.deletar(contratoSalvo.endereco.id);
                }
            }

            const numero = typeof (contrato.numero) != 'undefined' ? contrato.numero : contratoSalvo.numero;
            const produtoId = typeof (contrato.produto) != 'undefined' && contrato.produto.id ? contrato.produto.id : contratoSalvo.produto.id;
            const bancoId = typeof (contrato.banco) != 'undefined' && contrato.banco.id ? contrato.banco.id : (contratoSalvo.banco ? contratoSalvo.banco.id : null);
            const data = typeof (contrato.data) != 'undefined' ? contrato.data : contratoSalvo.data;
            const valor = typeof (contrato.valor) != 'undefined' ? contrato.valor : contratoSalvo.valor;
            const status = typeof (contrato.status) != 'undefined' ? contrato.status : contratoSalvo.status;
            const corretorId = typeof (contrato.corretor) != 'undefined' && contrato.corretor.id ? contrato.corretor.id : (contratoSalvo.corretor ? contratoSalvo.corretor.id : null);
            const dtLiberacao = typeof (contrato.dtLiberacao) != 'undefined' ? contrato.dtLiberacao : contratoSalvo.dtLiberacao;
            const comissaoPaga = typeof (contrato.comissaoPaga) != 'undefined' ? contrato.comissaoPaga : contratoSalvo.comissaoPaga;

            let queryAtualizarContrato = "update contratos set numero=$1, produto_id=$2, banco_id=$3, " +
                "data=$4, valor=$5, cliente_id=$6, endereco_id=$7, status=$8, corretor_id=$9, dt_liberacao=$10, comissao_paga=$11 where id=$12 returning *";
            const result = await client.query(queryAtualizarContrato, [numero, produtoId, bancoId,
                data, valor, clienteId, enderecoId, status, corretorId, dtLiberacao, comissaoPaga, contrato.id]);

            if (rollback) {
                client.query('COMMIT');
            }
            return await this.criarObjetoContrato(result.rows[0]);

        } catch (e) {
            if (rollback) {
                client.query('ROLLBACK');
            }
            PgUtil.checkError(e);
        } finally {
            if(!dbClient){
                client.release();
            }
            
        }
    }
    //"corretorId", "cpf", "clienteNome", "bancoId", "orgaoId", "dataInicial","dataFinal",
    //  "dtLiberacaoInicial","dtLiberacaoFinal", "status", "valorMinimo", "valorMaximo", "clienteId"
    async listarPorCriterios(criterios) {

        let atributos = Object.keys(criterios);
        let numCriterios = atributos.length;
        let valoresQuery = [];
        let contratos = [];

        let query = "select contratos.id,numero,produto_id, data, cliente_id, " +
            "dt_liberacao,contratos.endereco_id,status, corretor_id, valor, banco_id , comissao_paga from contratos ";

        if (criterios["orgaoId"]) {
            query += " left join produtos on produtos.id = contratos.produto_id "
        }

        if (criterios["cpf"] || criterios["clienteNome"]) {
            query += " left join clientes on clientes.id = contratos.cliente_id "
        }

        if (numCriterios > 0) {
            query += " where ";
        }
        const client = await pool.connect();
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
                    case 'numero':
                        query += 'numero=$' + (i + 1);
                        valoresQuery.push(criterios['numero']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;
                    case 'cpf':
                        query += 'clientes.cpf=$' + (i + 1);
                        valoresQuery.push(criterios['cpf']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;
                    case 'clienteNome':
                        query += 'clientes.nome like $' + (i + 1);
                        valoresQuery.push('%' + criterios['clienteNome'] + '%');
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
                        query += " dt_liberacao >= $" + (i + 1);
                        valoresQuery.push(criterios['dtLiberacaoInicial']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;
                    case 'dtLiberacaoFinal':
                        query += " dt_liberacao <= $" + (i + 1);
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

                    case 'comissaoPaga':
                        query += " comissao_paga = $" + (i + 1);
                        valoresQuery.push(criterios['comissaoPaga']);
                        if (i < numCriterios - 1) {
                            query += " and ";
                        }
                        break;
                }
            }
            const res = await client.query(query, valoresQuery);
            const rowsContrato = res.rows;
            for (let i = 0; i < rowsContrato.length; i++) {
                let contrato = await this.criarObjetoContrato(rowsContrato[i]);
                contratos.push(contrato);
            }
            return contratos;

        } catch (e) {
            PgUtil.checkError(e);
        } finally {
            client.release();
        }
    }

    async deletar(id, rollback = false) {
        const client = await pool.connect();
        try {
            const contrato = await this.obterPorId(id);
            const enderecoID = contrato.endereco ? contrato.endereco.id : null;
            if (rollback) {
                await client.query("BEGIN");
            }

            await client.query("delete from contratos where id=$1", [id]);
            if (enderecoID) {
                await client.query("delete from enderecos where id=$1", [enderecoID]);
            }
            if (rollback) {
                client.query("COMMIT");
            }
            return id;

        } catch (e) {
            await client.query("ROLLBACK");
            PgUtil.checkError(e);
        } finally {
            client.release();
        }
    }

    async criarObjetoContrato(row) {
        let bancoDAO = new PsqlBancoDAO();
        let produtoDAO = new PsqlProdutoDAO();
        let clienteDAO = new PsqlClienteDao();
        let enderecoDAO = new PsqlEnderecoDAO();
        let corretorDAO = new PsqlCorretorDAO();
        let contrato = new Contrato();
        contrato.id = row.id;
        contrato.numero = row.numero;
        contrato.data = row.data ? row.data.toISOString().slice(0, 10) : row.data;
        contrato.status = row.status;
        contrato.dtLiberacao = row.dt_liberacao ? row.dt_liberacao.toISOString().slice(0, 10) : row.dt_liberacao;
        contrato.valor = row.valor;
        contrato.comissaoPaga = row.comissao_paga ? true : false;
        if (row.banco_id) {
            let banco = await bancoDAO.obterPorId(row.banco_id);
            contrato.banco = banco;
        }
        if (row.produto_id) {
            let produto = await produtoDAO.obterPorId(row.produto_id);
            contrato.produto = produto;
        }
        if (row.cliente_id) {
            let cliente = await clienteDAO.obterPorId(row.cliente_id);
            contrato.cliente = cliente;
        }
        if (row.endereco_id) {
            let endereco = await enderecoDAO.obterPorId(row.endereco_id);
            contrato.endereco = endereco;
        }
        if (row.corretor_id) {
            let corretor = await corretorDAO.obterPorId(row.corretor_id);
            contrato.corretor = corretor;
        }
        return contrato;
    }
}

module.exports = PsqlContratoDAO;