class BDException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "BD_EXCEPTION";
    }
}

module.exports = BDException;