const UsuarioSuper = require('../entidades/UsuarioSuper');
const {pool} = require('../../../servicos/database_service');

class PsqlUsuarioSuperDAO{

        static instancia = new PsqlUsuarioSuperDAO();
        
        async obter(id){
            let tipo = UsuarioSuper.USUARIO_SUPER;
            let strQuery = 'select * from usuarios where nome_usuario=$1 and tipo=$2';
            const {rows} = await pool.query(strQuery,[id,tipo]);
            let data = await rows[0];
            if(data){
                let usuario = new UsuarioSuper();
                usuario.id = await data.id;
                usuario.nomeUsuario = await data.nome_usuario;
                usuario.senha = await data.senha;
                return usuario;
            }
            return null;
        }

        async obterPorNome(nomeUsuario){
            let tipo = UsuarioSuper.USUARIO_SUPER;
            let strQuery = 'select * from usuarios where nome_usuario=$1 and tipo=$2';
            const {rows} = await pool.query(strQuery,[nomeUsuario, tipo]);
            let data =  rows[0];
            if(data){
                let usuario = new UsuarioSuper();
                usuario.id = data.id;
                usuario.nomeUsuario = data.nome_usuario;
                usuario.senha = data.senha;
                return usuario;
            }
            return null;
        }


}

module.exports = PsqlUsuarioSuperDAO;




