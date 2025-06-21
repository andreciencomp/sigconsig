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

    async listarTodos(pgClient=null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            let corretores = [];
            const { rows } = await client.query("select * from corretores");
            for (let i = 0; i < rows.length; i++) {
                const corretor = await this.criarObjetoCorretor(rows[i]);
                corretores.push(corretor);
            }
            return corretores;
            
        } catch (e) {
            PgUtil.checkError(e);

        } finally{
            if(!pgClient){
                client.release();
            }
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