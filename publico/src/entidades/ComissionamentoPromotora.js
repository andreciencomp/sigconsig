const Comissionamento = require('./Comissionamento');

class ComissionamentoPromotora extends Comissionamento{

    constructor(id=null, porcentagem=null, banco=null){
        super(id, porcentagem, banco);
    }
}

module.exports = ComissionamentoPromotora;