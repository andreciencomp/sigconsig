const { pool } = require('../../../servicos/database_service')
const PgUtil = require('../dados/PgUtil');
const Cidade = require('../entidades/Cidade');
const Endereco = require('../entidades/Endereco');
const Estado = require('../entidades/Estado');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');

class PsqlEnderecoDAO {

    static instancia = new PsqlEnderecoDAO();

    async obterPorId(id) {
        try {
            let enderecoQuery = "select * from enderecos where id=$1";
            const resEndereco = await pool.query(enderecoQuery, [id]);
            if(resEndereco.rowCount == 0){
                throw new EntidadeNaoEncontradaException("O endereço não existe.");
            }
            let endereco = new Endereco();
            endereco.id = resEndereco.rows[0].id;
            endereco.cep = resEndereco.rows[0].cep;
            endereco.rua = resEndereco.rows[0].rua;
            endereco.numero = resEndereco.rows[0].numero;
            endereco.bairro = resEndereco.rows[0].bairro;
            endereco.telefone = resEndereco.rows[0].telefone;
            let estado = null;
            if(resEndereco.rows[0].estado_id){
                const estadoQuery = "select * from estados where id=$1";
                const resEstado = await pool.query(estadoQuery,[resEndereco.rows[0].estado_id]);
                estado = new Estado();
                estado.id = resEstado.rows[0].id;
                estado.sigla = resEstado.rows[0].sigla;
                estado.nome = resEstado.rows[0].nome;
            }
            endereco.estado = estado;
            if(resEndereco.rows[0].cidade_id){
                const queryCidade = "select * from cidades where id=$1";
                const resCidade = await pool.query(queryCidade, [resEndereco.rows[0].cidade_id]);
                let cidade = new Cidade();
                cidade.id = resCidade.rows[0].id;
                cidade.nome = resCidade.rows[0].nome;
                cidade.estado = estado;
                endereco.cidade = cidade; 
            }
            return endereco;
            
        } catch (e) {
            PgUtil.checkError(e);
        }


    }

    async salvar(estadoId, cidadeId, cep, rua, numero, bairro, telefone) {
        try {
            let query = "insert into enderecos (estado_id, cidade_id, cep, rua, numero, bairro, telefone)" +
                "values ($1, $2, $3, $4, $5, $6, $7) returning id";
            const { rows } = await pool.query(query, [estadoId, cidadeId, cep, rua, numero, bairro, telefone]);
            return rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

}

module.exports = PsqlEnderecoDAO;