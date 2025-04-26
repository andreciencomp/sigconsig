const PgUtil = require('./PgUtil');
const { pool } = require('../../../servicos/database_service');
const Orgao = require('../entidades/Orgao');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');

class PsqlOrgaoDAO {

    static instancia = new PsqlOrgaoDAO();

    async obterPorId(id){
        try{
            const query = "select * from orgaos where id=$1";
            const res = await pool.query(query,[id]);
            if(res.rowCount == 0){
                throw EntidadeNaoEncontradaException("O orgão não existe.");
            }
            let orgao = new Orgao();
            orgao.id = res.rows[0].id;
            orgao.sigla = res.rows[0].sigla;
            orgao.nome = res.rows[0].nome;
            
            return orgao;
        }catch(e){
            PgUtil.checkError(e);
        }
    }

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