const UsuarioCadastro = require('../entidades/UsuarioCadastro');
const {pool} = require('../../../servicos/database_service');

class PsqlUsuarioCadastroDAO{

        static instancia = new PsqlUsuarioCadastroDAO();
        
        async obter(id){
            let tipo = UsuarioCadastro.USUARIO_CADASTRO;
            let strQuery = 'select * from usuarios where nome_usuario=$1 and tipo=$2';
            const {rows} = await pool.query(strQuery,[id,tipo]);
            let data = await rows[0];
            if(data){
                let usuario = new UsuarioCadastro();
                usuario.id = await data.id;
                usuario.nomeUsuario = await data.nome_usuario;
                usuario.senha = await data.senha;
                return usuario;
            }
            return null;
        }

        async obterPorNome(nomeUsuario){
            let tipo = UsuarioCadastro.USUARIO_CADASTRO;
            let strQuery = 'select * from usuarios where nome_usuario=$1 and tipo=$2';
            const {rows} = await pool.query(strQuery,[nomeUsuario, tipo]);
            let data =  rows[0];
            if(data){
                let usuario = new UsuarioCadastro();
                usuario.id = data.id;
                usuario.nomeUsuario = data.nome_usuario;
                usuario.senha = data.senha;
                return usuario;
            }
            return null;
        }

        async salvar(usuario){
            let strQuery = "insert into usuarios (nome_usuario, senha, tipo) values ($1, $2, $3)";
            try{
                const {rows} = await pool.query(strQuery, 
                    [usuario.nomeUsuario, usuario.senha,UsuarioCadastro.USUARIO_CADASTRO]);
            }catch(e){
                throw 'BD_EXCEPTION';

            }

        }


}

module.exports = PsqlUsuarioCadastroDAO;




