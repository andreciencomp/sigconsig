class PagamentoComissao{

    constructor(id=this.id, contrato=null,corretor=null, valorCorretor=null, valorPromotora=null, percentagemCorretor=null,
         percentagemPromotora=null, efetivado=false, cadastradoPor=null, dtCadastro=null,efetivadoPor=null, efetivadoEm=null, dtEfetivacao=null){
        this.id = id;
        this.contrato = contrato;
        this.corretor = corretor;
        this.valorCorretor = valorCorretor;
        this.valorPromotora = valorPromotora;
        this.percentagemCorretor = percentagemCorretor;
        this.percentagemPromotora = percentagemPromotora;
        this.efetivado = efetivado;
        this.cadastradoPor = cadastradoPor;
        this.dtCadastro = dtCadastro;
        this.efetivadoPor = efetivadoPor;
        this.dtEfetivacao = dtEfetivacao;
    }
}

module.exports = PagamentoComissao;