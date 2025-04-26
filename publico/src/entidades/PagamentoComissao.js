class PagamentoComissao{

    constructor(id=this.id, contrato=null,corretor=null, valorCorretor=null, valorPromotora=null, percentagemCorretor=null,
         percentagemPromotora=null, efetivado=false, cadastradoPor=null,efetivadoPor=null,dtPagamento=null){
        this.id = id;
        this.contrato = contrato;
        this.corretor = corretor;
        this.valorCorretor = valorCorretor;
        this.valorPromotora = valorPromotora;
        this.percentagemCorretor = percentagemCorretor;
        this.percentagemPromotora = percentagemPromotora;
        this.efetivado = efetivado;
        this.cadastradoPor = cadastradoPor;
        this.efetivadoPor = efetivadoPor;
        this.dtPagamento = dtPagamento;
    }
}

module.exports = PagamentoComissao;