/* Classe responsável por retornar a mensagem de excessão para a API */
class ExceptionService{

    static USUARIO_INEXISTENTE_EXCEPTION = {excessao: 'USUARIO_INEXISTENTE_EXCEPTION',
                                        msg:'Usuário não encontrado' };

    static SENHA_INCORRETA_EXCEPTION = {excessao: 'SENHA_INCORRETA_EXCEPTION',
                                        msg:'Senha incorreta' };

    static USUARIO_N_AUTORIZADO_EXCEPTION = {excessao: 'USUARIO_N_AUTORIZADO_EXCEPTION',
                                        msg:'O usuário não tem permissão para realizar a operação' };

    static DADOS_INVALIDOS_EXCEPTION = {excessao: 'DADOS_INVALIDOS_EXCEPTION',
                                        msg:'Formato inválido' };

    static HEADER_N_ENCONTRADO_EXCEPTION = {excessao: 'HEADER_N_ENCONTRADO_EXCEPTION',
                                        msg:'O cabeçalho não foi encontrado' };
    
    static METODO_AUTH_INVALIDO_EXCEPTION = {excessao: 'METODO_AUTH_INVALIDO_EXCEPTION',
                                        msg:'Método de autenticação inválido' };

    static TOKEN_INVALIDO_EXCEPTION = {excessao: 'TOKEN_INVALIDO_EXCEPTION', 
                                        msg:'Token inválido'}

    static TOKEN_N_ENCONTRADO_EXCEPTION = {excessao: 'TOKEN_N_ENCONTRADO_EXCEPTION', 
                                        msg:'Token inválido'};

    static USUARIO_N_AUTENTICADO_EXCEPTION = {excessao: 'USUARIO_N_AUTENTICADO_EXCEPTION',
                                        msg:'Usuário não autenticado' };


    static checkError(e, res){

        

        switch(e){
            case 'USUARIO_INEXISTENTE_EXCEPTION':
                res.status(401).send(ExceptionService.USUARIO_INEXISTENTE_EXCEPTION);
                break;

            case 'SENHA_INCORRETA_EXCEPTION':
                res.status(401).send(ExceptionService.SENHA_INCORRETA_EXCEPTION);
                break;

            case 'USUARIO_N_AUTORIZADO_EXCEPTION':
                res.status(401).send(ExceptionService.USUARIO_N_AUTORIZADO_EXCEPTION);
                

            case 'CHAVE_REPETIDA_EXCEPTION':
                res.status(401).send({excessao:e, msg:'Duplicação de dados'});
                break;
            
            case 'BD_EXCEPTION':
                res.status(500).send({excessao:'BD_EXCEPTION',msg:'Erro no BD'});
                break;

            case 'DADOS_INVALIDOS_EXCEPTION':
                res.status(401).send(ExceptionService.DADOS_INVALIDOS_EXCEPTION);
                break;

            case 'HEADER_N_ENCONTRADO_EXCEPTION':
                res.status(401).send(ExceptionService.HEADER_N_ENCONTRADO_EXCEPTION);
                break;

            case 'METODO_AUTH_INVALIDO_EXCEPTION':
                res.status(400).send(ExceptionService.METODO_AUTH_INVALIDO_EXCEPTION);
                break;

            case 'USUARIO_N_AUTENTICADO_EXCEPTION':
                res.status(401).send(ExceptionService.USUARIO_N_AUTENTICADO_EXCEPTION);
                break;

            case 'TOKEN_INVALIDO_EXCEPTION':
                res.status(401).send(ExceptionService.TOKEN_INVALIDO_EXCEPTION);
                break;

            case 'TOKEN_N_ENCONTRADO_EXCEPTION':
                res.status(400).send(ExceptionService.TOKEN_N_ENCONTRADO_EXCEPTION);
                break;

            default:
                console.log(e);
                res.status(500).send({excessao:'500', msg:'Erro no servidor'});
                break;
            
        }

    }


}

module.exports = ExceptionService;

