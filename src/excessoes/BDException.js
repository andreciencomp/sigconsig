const APIException = require("./APIException");

class BDException extends APIException{
    constructor(mensagem){
        super(mensagem, 500,null);
        this.name = "BD_EXCEPTION";
    }
}

module.exports = BDException;