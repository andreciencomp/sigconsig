const PsqlUsuarioSuperDAO = require('./PsqlUsuarioSuperDAO');
const config = require('../../../config')

class UsuarioSuperDAOFactory{

    static PSQL = 1;

    getDAO(){

        switch(config.BANCO_ATUAL){
            case (config.banco.PSQL):
                
                return  new PsqlUsuarioSuperDAO();

            
            default:
                return null;
        }
    }

}

module.exports = UsuarioSuperDAOFactory;