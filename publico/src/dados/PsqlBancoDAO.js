const {pool} = require('../../../servicos/database_service');
const Banco = require('../entidades/Banco');
const ChaveRepetidaException = require('../excessoes/ChaveRepetidaException');
const PgUtil = require('./PgUtil');

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
            
            PgUtil.checkError(e);

        }
    
        
    }

    async salvar(banco){

        let strQuery = "insert into bancos(codigo,nome) values ($1, $2)";
        try{
            await  pool.query(strQuery, [banco.codigo, banco.nome]);
            return true;
        }catch(e){
            PgUtil.checkError(e);
        }
    }

    async listar(){

        let strQuery = "select * from bancos";
        try{
            const {rows} = await pool.query(strQuery);
            let lista = [];
            for(var i=0;i < (await rows.length);i++){
                let banco = new Banco();
                banco.id = await rows[i].id;
                banco.codigo = await rows[i].codigo;
                banco.nome = await rows[i].nome;
                lista.push(banco);
            }
            return lista
        }catch(e){
            console.log(e);
            throw 'BD_EXCEPTION';
        }

    }
    


}

module.exports = PsqlBancoDAO;