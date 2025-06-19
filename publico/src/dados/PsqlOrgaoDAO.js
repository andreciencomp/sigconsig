const PgUtil = require('./PgUtil');
const { pool } = require('../../../servicos/database_service');
const Orgao = require('../entidades/Orgao');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const Produto = require('../entidades/Produto');

class PsqlOrgaoDAO {

    static instancia = new PsqlOrgaoDAO();

    async obterPorId(id, dbClient = null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            const res = await client.query("select * from orgaos where id=$1", [id]);
            if (res.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("O orgão não existe.");
            }
            return this.criarObjetoOrgao(res.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!dbClient) {
                client.release();
            }
        }
    }

    async existePorID(id, pgClient){
        const client = pgClient ? pgClient : await pool.connect();
        try{
            const result = await client.query('select id from orgaos where id=$1',[id]);
            return result.rowCount > 0;

        }catch(e){
            PgUtil.checkError(e);

        }finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    async existePorSigla(sigla, pgClient=null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const query = "select sigla from orgaos where sigla = $1";
            const { rows } = await client.query(query, [sigla]);
            return rows.length > 0;
        } catch (e) {
            PgUtil.checkError(e);
        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async existePorNome(nome, pgClient=null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const query = "select nome from orgaos where nome = $1";
            const { rows } = await client.query(query, [nome]);
            return rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async salvar(orgao, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            let strQuery = 'insert into orgaos (sigla, nome) values ($1, $2) returning *';
            const { rows } = await client.query(strQuery, [orgao.sigla, orgao.nome]);
            return this.criarObjetoOrgao(rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async atualizar(orgao, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const orgaoCadastrado = await this.obterPorId(orgao.id);
            const novaSigla = typeof (orgao.sigla) != 'undefined' ? orgao.sigla : orgaoCadastrado.sigla;
            const novoNome = typeof (orgao.nome) != 'undefined' ? orgao.nome : orgaoCadastrado.nome;
            const result = await client.query("update orgaos set sigla=$1, nome=$2 where id=$3 returning * ", [novaSigla, novoNome, orgao.id]);
            return this.criarObjetoOrgao(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async listar() {
        let orgaos = [];
        try {
            let { rows } = await pool.query('select * from orgaos');
            for (var i = 0; i < rows.length; i++) {
                let orgao = new Orgao();
                orgao.id = rows[i].id;
                orgao.sigla = rows[i].sigla;
                orgao.nome = rows[i].nome;
                orgaos.push(orgao);
            }
            return orgaos;

        } catch (e) {

            PgUtil.checkError(e);
        }
    }

    async deletar(id, dbClient = null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            const result = await client.query("delete from orgaos where id=$1 returning * ", [id]);
            if (result.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("Orgão não encontrato.");
            }
            return this.criarObjetoOrgao(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
        } finally {
            if (!dbClient) {
                client.release();
            }
        }
    }

    criarObjetoOrgao(row) {
        const orgao = new Orgao();
        orgao.id = row.id;
        orgao.sigla = row.sigla;
        orgao.nome = row.nome;
        return orgao;
    }
}

module.exports = PsqlOrgaoDAO;