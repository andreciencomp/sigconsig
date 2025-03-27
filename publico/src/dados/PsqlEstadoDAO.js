const {pool} = require('../../../servicos/database_service')
const Estado = require('../entidades/Estado');
const PgUtil = require('../dados/PgUtil');

class PsqlEstadoDAO{

    static instancia = new PsqlEstadoDAO();

    async obter(id){

        let strQuery = "select * from estados where id=$1";
        try{
            const {rows} = await pool.query(strQuery,[id]);
            console.log(await rows[0]);
            if (await rows[0]){

                let estado = new Estado();
                estado.id = rows[0].id;
                estado.sigla = rows[0].sigla;
                estado.nome = rows[0].nome;
                return estado;

            }
            return null;
            
        }catch(e){

            PgUtil.checkError(e);
        }


    }

}

module.exports = PsqlEstadoDAO;