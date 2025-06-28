const APIException = require("./APIException");

class DAOFactoryException extends APIException{
    constructor(mensagem){
        super(mensagem, 500);
        this.name = "DAO_FACTORY_EXCEPTION"
    }
}

module.exports = DAOFactoryException;