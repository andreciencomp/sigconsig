let PgUtil = require('./PgUtil');
let Endereco = require('../entidades/Endereco');
let Estado = require('../entidades/Estado');
const { pool } = require('../../../servicos/database_service');

class PsqlClienteDao{
    static instancia = new PsqlClienteDao();

    async salvar(cliente){
        try{
            await pool.query('BEGIN');
            let enderecoId = null;
            if(cliente.endereco){
                let endereco = new Endereco();
                let estadoId = cliente.endereco.estado ? cliente.endereco.estado.id : null;
                let cidadeId = cliente.endereco.cidade ? cliente.endereco.cidade.id : null;
                let enderecoQuery = "insert into enderecos (cep, rua, numero, bairro, telefone, estado_id, cidade_id) values ($1, $2, $3, $4, $5, $6, $7) returning id";
                const resEndereco = await pool.query(enderecoQuery, [cliente.endereco.cep,
                     cliente.endereco.rua, cliente.endereco.numero, cliente.endereco.bairro,cliente.endereco.telefone, estadoId, cidadeId]);
                enderecoId = resEndereco.rows[0].id;
            }
            const clienteQuery = "insert into clientes (cpf, nome, dt_nascimento, endereco_id) values ($1, $2, $3, $4) returning id"
            let resCliente = await pool.query(clienteQuery, [cliente.cpf, cliente.nome, cliente.dtNascimento, enderecoId]);
            await pool.query('COMMIT');
            return resCliente.rows[0].id;

        }catch(e){
            await pool.query('ROLLBACK');
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlClienteDao;