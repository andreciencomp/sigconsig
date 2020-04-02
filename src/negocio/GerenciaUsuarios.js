const FachadaDados = require('../dados/FachadaDados');

class GerenciaUsuarios{

    obterUsuarioPorId(id){
        let fachada =  FachadaDados.getInstancia();
        let usuario =  fachada.obterUsuarioPorId(id);
        return  usuario;
    }

     async login(nomeUsuario, senha){

        let fachada =  FachadaDados.instancia;
        let usuario =  await fachada.obterUsuarioSuperPorNome(nomeUsuario) ||
                        await fachada.obterUsuarioAdmPorNome(nomeUsuario) ||
                        await fachada.obterUsuarioFinanceiroPorNome(nomeUsuario)||
                        await fachada.obterUsuarioCadastroPorNome(nomeUsuario);
        
        if (usuario){
            if (usuario.senha === senha){
                usuario.senha = '';
                return usuario;
            }
            throw "SENHA_INCORRETA";
        }else{
            throw "USUARIO_INEXISTENTE";
        }
        

    }

    cadastrarUsuario(nomeUsuario, senha, tipo){

        
    }
}

module.exports = GerenciaUsuarios;