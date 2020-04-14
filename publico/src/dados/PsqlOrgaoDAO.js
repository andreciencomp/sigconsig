const PgUtil = require('./PgUtil');
const {pool} = require('../../../servicos/database_service');
const Orgao = require('../entidades/Orgao');

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

    async listar(){
        let orgaos = [];
        try{
            let {rows} = await pool.query('select * from orgaos');
            for(var i=0;i< rows.length;i++){
                let orgao = new Orgao();
                orgao.id = rows[0];
                orgao.sigla = rows[1];
                orgao.nome = rows[2];
                console.log(orgao);
                orgaos.push(orgao);

            }
            return orgaos;

        }catch(e){

            PgUtil.checkError(e);

        }
    }


}

module.exports = PsqlOrgaoDAO;