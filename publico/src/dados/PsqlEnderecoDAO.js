const { pool } = require('../../../servicos/database_service')
const PgUtil = require('../dados/PgUtil');

class PsqlEnderecoDAO{

    static instancia = new PsqlEnderecoDAO();

    async salvar(estadoId, cidadeId, cep, rua, numero, bairro, telefone){
        try{
            let query = "insert into enderecos (estado_id, cidade_id, cep, rua, numero, bairro, telefone)" +
            "values ($1, $2, $3, $4, $5, $6, $7) returning id";
            const {rows} = await pool.query(query,[estadoId, cidadeId, cep, rua, numero, bairro, telefone]);
            return rows[0];

        }catch(e){
            PgUtil.checkError(e);
        }
    }

}

module.exports = PsqlEnderecoDAO;