const UsuarioAdm = require('../entidades/UsuarioAdm');
const {pool} = require('../../../servicos/database_service');

class PsqlUsuarioAdmDAO{

        static instancia = new PsqlUsuarioAdmDAO();
        
        async obter(id){
            let tipo = UsuarioAdm.USUARIO_ADMIN;
            let strQuery = 'select * from usuarios where nome_usuario=$1 and tipo=$2';
            const {rows} = await pool.query(strQuery,[id,tipo]);
            let data = await rows[0];
            if(data){
                let usuario = new UsuarioAdm();
                usuario.id = await data.id;
                usuario.nomeUsuario = await data.nome_usuario;
                usuario.senha = await data.senha;
                return usuario;
            }
            return null;
        }

        async obterPorNome(nomeUsuario){
            let tipo = UsuarioAdm.USUARIO_ADMIN;
            let strQuery = 'select * from usuarios where nome_usuario=$1 and tipo=$2';
            const {rows} = await pool.query(strQuery,[nomeUsuario, tipo]);
            let data =  rows[0];
            if(data){
                let usuario = new UsuarioAdm();
                usuario.id = data.id;
                usuario.nomeUsuario = data.nome_usuario;
                usuario.senha = data.senha;
                return usuario;
            }
            return null;
        }


}

module.exports = PsqlUsuarioAdmDAO;




