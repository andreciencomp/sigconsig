class APIException extends Error{
    constructor(mensagem, statusCode=500,atributo=null){
        super(mensagem);
        this.statusCode = statusCode;
        this.atributo = atributo;
    }
}

module.exports = APIException;