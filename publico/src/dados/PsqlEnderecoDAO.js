const { pool } = require('../../../servicos/database_service')
const PgUtil = require('../dados/PgUtil');
const Cidade = require('../entidades/Cidade');
const Endereco = require('../entidades/Endereco');
const Estado = require('../entidades/Estado');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');

class PsqlEnderecoDAO {

    static instancia = new PsqlEnderecoDAO();

    async obterPorId(id) {
        const client = await pool.connect();
        try {
            let enderecoQuery = "select * from enderecos where id=$1";
            const resEndereco = await client.query(enderecoQuery, [id]);
            if (resEndereco.rowCount == 0) {
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
            if (resEndereco.rows[0].estado_id) {
                const estadoQuery = "select * from estados where id=$1";
                const resEstado = await client.query(estadoQuery, [resEndereco.rows[0].estado_id]);
                estado = new Estado();
                estado.id = resEstado.rows[0].id;
                estado.sigla = resEstado.rows[0].sigla;
                estado.nome = resEstado.rows[0].nome;
            }
            endereco.estado = estado;
            if (resEndereco.rows[0].cidade_id) {
                const queryCidade = "select * from cidades where id=$1";
                const resCidade = await client.query(queryCidade, [resEndereco.rows[0].cidade_id]);
                let cidade = new Cidade();
                cidade.id = resCidade.rows[0].id;
                cidade.nome = resCidade.rows[0].nome;
                cidade.estado = estado;
                endereco.cidade = cidade;
            }
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
                "values ($1, $2, $3, $4, $5, $6, $7) returning id";
            const { rows } = await client.query(query, [endereco.estado.id, endereco.cidade.id,
            endereco.cep, endereco.rua, endereco.numero, endereco.bairro, endereco.telefone]);
            return rows[0];

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

            return await this.criarObjetoEndereco(rows[0], client);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if(!dbClient){
                client.release();
            }
        }
    }

    async criarObjetoEndereco(row, client) {
        let endereco = new Endereco();
        endereco.id = row.id;
        endereco.cep = row.cep;
        endereco.rua = row.rua;
        endereco.numero = row.numero;
        endereco.bairro = row.bairro;
        endereco.telefone = row.telefone;
        let estado = null;
        if (row.estado_id) {
            const estadoQuery = "select * from estados where id=$1";
            const resEstado = await client.query(estadoQuery, [row.estado_id]);
            estado = new Estado();
            estado.id = resEstado.rows[0].id;
            estado.sigla = resEstado.rows[0].sigla;
            estado.nome = resEstado.rows[0].nome;
        }
        endereco.estado = estado;
        if (row.cidade_id) {
            const queryCidade = "select * from cidades where id=$1";
            const resCidade = await client.query(queryCidade, [row.cidade_id]);
            let cidade = new Cidade();
            cidade.id = resCidade.rows[0].id;
            cidade.nome = resCidade.rows[0].nome;
            cidade.estado = estado;
            endereco.cidade = cidade;
        }
        return endereco;
    }

}

module.exports = PsqlEnderecoDAO;