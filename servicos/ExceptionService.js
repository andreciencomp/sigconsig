class ExceptionService{

    static checkError(e, res){

        switch(e){

            case 'CHAVE_REPETIDA_EXCEPTION':
                return res.status(401).send({excessao:e, msg:'Duplicação de dados'});
            
            case 'BD_EXCEPTION':
                return res.status(500).send({excessao:'BD_EXCEPTION',msg:'Erro no BD'});

            case 'DADOS_INVALIDOS_EXCEPTION':
                return res.status(401).send({excessao:e, msg:'Dados de entrada inválidos'});

            default:
                console.log(e);
                return res.status(500).send({excessao:'500', msg:'Erro no servidor'});
            
        }

    }


}

module.exports = ExceptionService;