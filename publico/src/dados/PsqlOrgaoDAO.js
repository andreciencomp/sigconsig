const PgUtil = require('./PgUtil');
const {pool} = require('../../../servicos/database_service');

class PsqlOrgaoDAO{
        
    static instancia = new PsqlOrgaoDAO();

    async salvar(orgao){

        try{
            let strQuery = 'insert into orgaos (sigla, nome) values ($1, $2)';
            await pool.query(strQuery,[orgao.sigla, orgao.nome]);
        }catch(e){

            PgUtil.checkError(e);
        }
    }


}

module.exports = PsqlOrgaoDAO;