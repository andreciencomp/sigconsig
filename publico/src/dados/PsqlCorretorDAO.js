const { pool } = require('../../../servicos/database_service')
const PgUtil = require('../dados/PgUtil');
const Corretor = require('../entidades/Corretor');
const Endereco = require('../entidades/Endereco');
const ContaBancaria = require('../entidades/ContaBancaria');
const Banco = require('../entidades/Banco');
const Estado = require('../entidades/Estado');
const Cidade = require('../entidades/Cidade');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PsqlEnderecoDAO = require('./PsqlEnderecoDAO');
const PsqlContaBancariaDAO = require('./PsqlContaBancariaDao');

class PsqlCorretorDAO {
    static instancia = new PsqlCorretorDAO();

    async obterPorId(id, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const corretorQuery = "select * from corretores where id=$1";
            const result = await client.query(corretorQuery, [id]);
            if (result.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("O corretor não existe");
            }
            return await this.criarObjetoCorretor(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    async salvar(corretor, canRollback = false, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            if (canRollback) {
                client.query("BEGIN");
            }
            let enderecoID = null;
            if (corretor.endereco) {
                const enderecoDAO = new PsqlEnderecoDAO();
                const novoEndereco = await enderecoDAO.salvar(corretor.endereco, client);
                enderecoID = novoEndereco.id;
            }
            let contaBancariaID = null;
            if (corretor.contaBancaria) {
                const contaBancariaDAO = new PsqlContaBancariaDAO();
                const contaBancaria = await contaBancariaDAO.salvar(corretor.contaBancaria, client);
                contaBancariaID = contaBancaria.id;
            }
            const query = "insert into corretores (codigo, cpf, nome, dt_nascimento, conta_bancaria_id, endereco_id, ativo) " +
                "values($1, $2, $3, $4, $5, $6, $7) returning * ";
            const { rows } = await client.query(query, [corretor.codigo, corretor.cpf, corretor.nome,
            corretor.dtNascimento, contaBancariaID, enderecoID, corretor.ativo]);
            if (canRollback) {
                await client.query('COMMIT');
            }
            return await this.criarObjetoCorretor(rows[0]);

        } catch (e) {
            if (canRollback) {
                await pool.query('ROLLBACK');
            }
            PgUtil.checkError(e);
            
        } finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    async listarTodos() {
        try {
            let corretores = [];
            const { rows } = await pool.query("select * from corretores");
            for (var i = 0; i < rows.length; i++) {
                let corretor = new Corretor();
                corretor.id = rows[i].id;
                corretor.codigo = rows[i].codigo;
                corretor.nome = rows[i].nome;
                corretor.cpf = rows[i].cpf;
                corretor.dtNascimento = rows[i].dt_nascimento;
                corretor.ativo = rows[i].ativo;
                if (rows[i].endereco_id) {
                    const queryEndereco = "select * from enderecos where id=$1";
                    const resEndereco = await pool.query(queryEndereco, [rows[i].endereco_id]);
                    let rowEndereco = resEndereco.rows[0];
                    let endereco = new Endereco();
                    endereco.id = rowEndereco.id;
                    endereco.cep = rowEndereco.cep;
                    endereco.rua = rowEndereco.rua;
                    endereco.numero = rowEndereco.numero;
                    endereco.bairro = rowEndereco.bairro;
                    endereco.telefone = rowEndereco.telefone;

                    if (rowEndereco.estado_id) {
                        const queryEstado = "select * from estados where id=$1";
                        const resEstado = await pool.query(queryEstado, [rowEndereco.estado_id]);
                        const rowEstado = resEstado.rows[0];
                        let estado = new Estado(rowEstado.id, rowEstado.sigla, rowEstado.nome);
                        endereco.estado = estado;
                    }

                    if (resEndereco.rows[0].cidade_id) {
                        const queryCidade = "select * from cidades where id=$1";
                        const resCidade = await pool.query(queryCidade, [resEndereco.rows[0].cidade_id]);
                        let rowCidade = resCidade.rows[0];
                        let cidade = new Cidade();
                        cidade.id = rowCidade.id;
                        cidade.nome = rowCidade.nome;
                        if (endereco.estado) {
                            cidade.estado = endereco.estado;
                        }
                        endereco.cidade = cidade;
                    }

                    corretor.endereco = endereco;
                    corretores.endereco = endereco;

                }

                if (rows[i].conta_bancaria_id) {
                    const queryConta = "select * from contas_bancarias where id=$1";
                    const resConta = await pool.query(queryConta, [rows[i].conta_bancaria_id]);
                    const rowConta = resConta.rows[0];
                    let contaBancaria = new ContaBancaria();
                    contaBancaria.id = rowConta.id;
                    contaBancaria.numAgencia = rowConta.num_agencia;
                    contaBancaria.numConta = rowConta.numConta;
                    contaBancaria.digito = rowConta.digito;
                    if (rowConta.banco_id) {
                        const queryBanco = "select * from bancos where id=$1";
                        const resBanco = await pool.query(queryBanco, [rowConta.banco_id]);
                        const rowBanco = resBanco.rows[0];
                        let banco = new Banco(rowBanco.id, rowBanco.codigo, rowBanco.nome);
                        contaBancaria.banco = banco;
                    }
                    corretor.contaBancaria = contaBancaria;
                }

                corretores.push(corretor);
            }
            return corretores;


        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async criarObjetoCorretor(row, pgClient = null) {
        let corretor = new Corretor();
        corretor.id = row.id;
        corretor.codigo = row.codigo;
        corretor.cpf = row.cpf;
        corretor.nome = row.nome;
        corretor.dtNascimento = row.dt_nascimento;
        corretor.ativo = row.ativo;
        if (row.endereco_id) {
            const enderecoDAO = new PsqlEnderecoDAO();
            const endereco = await enderecoDAO.obterPorId(row.endereco_id, pgClient);
            corretor.endereco = endereco;
        }
        if (row.conta_bancaria_id) {
            const daoContaBancaria = new PsqlContaBancariaDAO();
            corretor.contaBancaria = await daoContaBancaria.obterPorId(row.conta_bancaria_id, pgClient);
        }
        return corretor;
    }
}

module.exports = PsqlCorretorDAO;