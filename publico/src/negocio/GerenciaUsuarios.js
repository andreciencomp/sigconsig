const FachadaDados = require('../dados/FachadaDados');
const UsuarioAdm = require('../entidades/UsuarioAdm');
const UsuarioFinanceiro = require('../entidades/UsuarioFinanceiro');
const UsuarioCadastro = require('../entidades/UsuarioCadastro');
const DadosInvalidosException = require('../excessoes/DadosInvalidosException');
const SenhaIncorretaException = require('../excessoes/SenhaIncorretaException');
const UsuarioInexistenteException = require('../excessoes/UsuarioInexistenteException');

class GerenciaUsuarios{

    async obterUsuarioPorId(id){
        let fachada =  FachadaDados.getInstancia;
        let usuario =  await fachada.obterUsuarioPorId(id);
        return  usuario;
    }

     async login(nomeUsuario, senha){
        let fachada =  FachadaDados.instancia;
        let usuario =  await fachada.obterUsuarioSuperPorNome(nomeUsuario) ||
                        await fachada.obterUsuarioAdmPorNome(nomeUsuario) ||
                        await fachada.obterUsuarioFinanceiroPorNome(nomeUsuario) ||
                        await fachada.obterUsuarioCadastroPorNome(nomeUsuario); 
    
        if (usuario){
            if (usuario.senha === senha){
                usuario.senha = '';
                return usuario;
            }
            throw new SenhaIncorretaException("A senha está incorreta");
        }else{
            throw new UsuarioInexistenteException("Usuário não encontrado");
        }
        

    }

    async cadastrarUsuario(nomeUsuario, senha, tipo){
        let dao = FachadaDados.instancia;
        
            if(tipo == 'USUARIO_ADMIN'){
                let usuario = new UsuarioAdm();
                usuario.nomeUsuario = nomeUsuario;
                usuario.senha = senha;
                usuario.tipo = tipo;
                await dao.salvarUsuarioAdmin(usuario);
            }
            else if(tipo == 'USUARIO_FINANCEIRO'){
                let usuario = new UsuarioFinanceiro();
                usuario.nomeUsuario = nomeUsuario;
                usuario.senha = senha;
                usuario.tipo = tipo;
                await dao.salvarUsuarioFinanceiro(usuario);

            }
            else if(tipo == 'USUARIO_CADASTRO'){
                let usuario = new UsuarioCadastro();
                usuario.nomeUsuario = nomeUsuario;
                usuario.senha = senha;
                usuario.tipo = tipo;
                await dao.salvarUsuarioCadastro(usuario);

            }else{
                throw new DadosInvalidosException("Tipo de usuário inválido");
            }

    }

        
    
}

module.exports = GerenciaUsuarios;