const {pool} = require('../../../servicos/database_service');
const Banco = require('../entidades/Banco');

class PsqlBancoDAO{
    static instancia = new PsqlBancoDAO();

    async obterPorCodigo(codigo){

        try{
            let strQuery = 'select * from bancos where codigo = $1';
            const {rows} = await pool.query(strQuery, [codigo]);
            if (await rows[0]){
                let data = await rows[0];
                let banco = new Banco();
                banco.id = data.id;
                banco.codigo = data.codigo;
                banco.nome = data.nome;
                return banco;

            }else{
                return null;
                
            }
        }catch(e){
            console.log(e);
            throw 'BD_EXCEPTION';

        }
    
        
    }

    async salvar(banco){

        let strQuery = "insert into bancos(codigo,nome) values ($1, $2)";
        try{
            await pool.query(strQuery, [banco.codigo, banco.nome]);
        }catch(e){
            console.log(e);
            throw 'BD_EXCEPTION';
        }
    }
}

module.exports = PsqlBancoDAO;