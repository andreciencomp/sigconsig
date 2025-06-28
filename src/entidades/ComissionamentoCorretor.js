const Comissionamento = require('./Comissionamento');

class ComissionamentoCorretor extends Comissionamento{

    constructor(id=null, produto=null,porcentagem=null,banco=null, corretor=null){
        super(id, produto, porcentagem, banco);
        this.corretor = corretor;
    }
}

module.exports = ComissionamentoCorretor;