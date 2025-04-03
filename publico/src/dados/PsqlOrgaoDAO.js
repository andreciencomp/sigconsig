const PgUtil = require('./PgUtil');
const { pool } = require('../../../servicos/database_service');
const Orgao = require('../entidades/Orgao');

class PsqlOrgaoDAO {

    static instancia = new PsqlOrgaoDAO();

    async existePorSigla(sigla) {
        const query = "select sigla from orgaos where sigla = $1";
        let { rows } = await pool.query(query, [sigla]);
        console.log(rows);
        return rows.length > 0;
    }

    async existePorNome(nome) {
        const query = "select nome from orgaos where nome = $1";
        let { rows } = await pool.query(query, [nome]);
        return rows.length > 0;
    }

    async salvar(orgao) {
        try {
            let strQuery = 'insert into orgaos (sigla, nome) values ($1, $2)';
            await pool.query(strQuery, [orgao.sigla, orgao.nome]);
        } catch (e) {

            PgUtil.checkError(e);
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
}

module.exports = PsqlOrgaoDAO;