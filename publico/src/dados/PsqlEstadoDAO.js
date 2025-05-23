const { pool } = require('../../../servicos/database_service')
const Estado = require('../entidades/Estado');
const PgUtil = require('../dados/PgUtil');

class PsqlEstadoDAO {

    static instancia = new PsqlEstadoDAO();

    async obter(id) {

        let strQuery = "select * from estados where id=$1";
        try {
            const { rows } = await pool.query(strQuery, [id]);
            if (await rows[0]) {
                let estado = new Estado();
                estado.id = rows[0].id;
                estado.sigla = rows[0].sigla;
                estado.nome = rows[0].nome;
                return estado;
            }
            return null;

        } catch (e) {

            PgUtil.checkError(e);
        }
    }

    async obterPorSigla(sigla) {

        const strQuery = "select * from estados where sigla = $1";
        try {
            const { rows } = await pool.query(strQuery, [sigla]);
            if (await rows[0]) {
                const estado = new Estado();
                estado.id = rows[0].id;
                estado.sigla = rows[0].sigla;
                estado.nome = rows[0].nome;
                return estado;
            }
            return null;
        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async salvar(estado){
        const query = "insert into estados(sigla, nome) values($1, $2) returning id";
        try{
            const result = await pool.query(query, [estado.sigla, estado.nome]);
            return result.rows[0].id;

        }catch(e){
            PgUtil.checkError(e); 
        }
    }

    async listar() {
        const strQuery = 'select * from estados';
        try{
            const { rows } = await pool.query(strQuery);
            let lista = [];
            for(var i = 0; i < rows.length; i++){
                let estado = new Estado();
                estado.id = rows[i].id;
                estado.sigla = rows[i].sigla;
                estado.nome = rows[i].nome;
                lista.push(estado);
            }
            return lista;
                       
        }catch(e){
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlEstadoDAO;