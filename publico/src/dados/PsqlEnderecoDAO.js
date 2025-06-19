const { pool } = require('../../../servicos/database_service')
const PgUtil = require('../dados/PgUtil');
const Endereco = require('../entidades/Endereco');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PsqlCidadeDao = require('./PsqlCidadeDAO');
const PsqlEstadoDAO = require('./PsqlEstadoDAO');

class PsqlEnderecoDAO {

    async obterPorId(id) {
        const client = await pool.connect();
        try {
            let enderecoQuery = "select * from enderecos where id=$1";
            const resEndereco = await client.query(enderecoQuery, [id]);
            if (resEndereco.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("O endereço não existe.");
            }
            const endereco = await this.criarObjetoEndereco(resEndereco.rows[0]);

            return endereco;

        } catch (e) {
            PgUtil.checkError(e);
        } finally {
            client.release();
        }
    }

    async salvar(endereco, dbClient=null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            let query = "insert into enderecos (estado_id, cidade_id, cep, rua, numero, bairro, telefone)" +
                "values ($1, $2, $3, $4, $5, $6, $7) returning * ";
            const estadoID = endereco.estado ? endereco.estado.id : null;
            const cidadeID = endereco.cidade ? endereco.cidade.id : null;
            const { rows } = await client.query(query,
                 [estadoID, cidadeID, endereco.cep, endereco.rua, endereco.numero, endereco.bairro, endereco.telefone]);
            return await this.criarObjetoEndereco(rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
        } finally {
            if(!dbClient){
                 client.release();
            }  
        }
    }

    async atualizar(endereco, dbClient=null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            let enderecoSalvo = await this.obterPorId(endereco.id);
            let estadoId = null;
            if (typeof (endereco.estado) != "undefined") {
                if (endereco.estado && endereco.estado.id) {
                    estadoId = endereco.estado.id;
                }
                else if (enderecoSalvo.estado && enderecoSalvo.estado.id) {
                    estadoId = enderecoSalvo.estado.id;
                }
            }
            let cidadeId = null;
            if (endereco.cidade && endereco.cidade.id) {
                cidadeId = endereco.cidade.id;
            }
            else if (enderecoSalvo.cidade && enderecoSalvo.cidade.id) {
                cidadeId = enderecoSalvo.cidade.id;
            }

            let cep = typeof (endereco.cep) != 'undefined' ? endereco.cep : enderecoSalvo.cep;
            let rua = typeof (endereco.rua) != 'undefined' ? endereco.rua : enderecoSalvo.rua;
            let numero = typeof (endereco.numero) != 'undefined' ? endereco.numero : enderecoSalvo.numero;
            let bairro = typeof (endereco.bairro) != 'undefined' ? endereco.bairro : enderecoSalvo.bairro;
            let telefone = typeof (endereco.telefone) != 'undefined' ? endereco.telefone : enderecoSalvo.telefone;

            const query = "update enderecos set estado_id=$1, cidade_id=$2, cep=$3, rua=$4, numero=$5," +
                "bairro=$6, telefone=$7 where id=$8 returning * ";
            const { rows } = await client.query(query, [estadoId, cidadeId, cep, rua, numero, bairro, telefone, endereco.id]);

            return await this.criarObjetoEndereco(rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if(!dbClient){
                client.release();
            }
        }
    }

    async deletar(id, pgClient=null){
        const client = pgClient ? pgClient : await pool.connect();
        try{
            const result = await client.query("delete from enderecos where id=$1 returning * ",[id]);
            if(result.rowCount > 0){
                return await this.criarObjetoEndereco(result.rows[0]);
            }
            throw new EntidadeNaoEncontradaException("Endereço não encontrato");

        }catch(e){
            PgUtil.checkError(e)
        }finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    async criarObjetoEndereco(row) {
        let endereco = new Endereco();
        endereco.id = row.id;
        endereco.cep = row.cep;
        endereco.rua = row.rua;
        endereco.numero = row.numero;
        endereco.bairro = row.bairro;
        endereco.telefone = row.telefone;
        let estado = null;
        if (row.estado_id) {
            const estadoDAO = new PsqlEstadoDAO();
            estado = await estadoDAO.obter(row.estado_id);
        }
        endereco.estado = estado;
        if (row.cidade_id) {
            const cidadeDAO = new PsqlCidadeDao();
            let cidade = await cidadeDAO.obterPorId(row.cidade_id);
            cidade.estado = estado;
            endereco.cidade = cidade;
        }
        return endereco;
    }
}

module.exports = PsqlEnderecoDAO;