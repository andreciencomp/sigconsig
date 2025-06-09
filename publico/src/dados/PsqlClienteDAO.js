let PgUtil = require('./PgUtil');
let Endereco = require('../entidades/Endereco');
let Estado = require('../entidades/Estado');
const { pool } = require('../../../servicos/database_service');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PsqlEnderecoDAO = require('./PsqlEnderecoDAO');
const Cliente = require('../entidades/Cliente');

class PsqlClienteDao {
    static instancia = new PsqlClienteDao();

    async obterPorId(id) {
        try {
            const queryCliente = "select * from clientes where id=$1";
            const res = await pool.query(queryCliente, [id]);
            if (res.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("O cliente não existe.");
            }
            return  await this.criarObjetoCliente(res.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async obterPorCpf(cpf) {
        const client = await pool.connect();
        try {
            const queryCliente = "select * from clientes where cpf=$1";
            const res = await client.query(queryCliente, [cpf]);
            if (res.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("O cliente não existe.");
            }
            return  this.criarObjetoCliente(res.rows[0]);
        } catch (e) {
            PgUtil.checkError(e);
        } finally{
            client.release();
        }
    }

    async listarPorNomeLike(nome) {
        try {
            let clientes = [];
            const queryCliente = "select * from clientes where nome like $1";
            const res = await pool.query(queryCliente, ['%' + nome +'%']);
            for(let i=0;i < res.rowCount ; i++){
                let cliente = await this.criarObjetoCliente(res.rows[i]);
                clientes.push(cliente);
            }
            return clientes;
        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async salvar(cliente, rollback=false) {
        try {
            if(rollback){
                await pool.query('BEGIN');
            }
            let enderecoId = null;
            if (cliente.endereco) {
                let endereco = new Endereco();
                let estadoId = cliente.endereco.estado ? cliente.endereco.estado.id : null;
                let cidadeId = cliente.endereco.cidade ? cliente.endereco.cidade.id : null;
                let enderecoQuery = "insert into enderecos (cep, rua, numero, bairro, telefone, estado_id, cidade_id) values ($1, $2, $3, $4, $5, $6, $7) returning id";
                const resEndereco = await pool.query(enderecoQuery, [cliente.endereco.cep,
                cliente.endereco.rua, cliente.endereco.numero, cliente.endereco.bairro, cliente.endereco.telefone, estadoId, cidadeId]);
                enderecoId = resEndereco.rows[0].id;
            }
            const clienteQuery = "insert into clientes (cpf, nome, dt_nascimento, endereco_id) values ($1, $2, $3, $4) returning id"
            let resCliente = await pool.query(clienteQuery, [cliente.cpf, cliente.nome, cliente.dtNascimento, enderecoId]);
            if(rollback){
                await pool.query('COMMIT');
            }
            return resCliente.rows[0];

        } catch (e) {
            if(rollback){
                await pool.query('ROLLBACK');
            }
            PgUtil.checkError(e);
        }
    }

    async atualizar(cliente, rollback=false) {
        const client = await pool.connect();
        try {
            if(rollback){
                await client.query('BEGIN');
            }
            let daoEndereco = new PsqlEnderecoDAO();
            let clienteSalvo = await this.obterPorId(cliente.id);
            if (cliente.endereco) {
                await daoEndereco.atualizar(cliente.endereco);
            }

            let cpf = cliente.cpf ? cliente.cpf : clienteSalvo.cpf;
            let nome = cliente.nome ? cliente.nome : clienteSalvo.nome;
            let dtNascimento = cliente.dtNascimento ? cliente.dtNascimento : clienteSalvo.dtNascimento;

            const query = "update clientes set cpf=$1, nome=$2, dt_nascimento=$3 where id=$4";
            const res = await client.query(query, [cpf, nome, dtNascimento, cliente.id]);
            if(rollback){
                await client.query('COMMIT');
            }
            return cliente;
            
        } catch (e) {
            if(rollback){
                await client.query('ROLLBACK');
            }
            PgUtil.checkError(e);
        }finally{
            client.release();
        }
    }

    async criarObjetoCliente(row) {
        let cliente = new Cliente();
        cliente.id = row.id;
        cliente.cpf = row.cpf;
        cliente.nome = row.nome;
        cliente.dtNascimento = row.dt_nascimento ? row.dt_nascimento.toISOString().slice(0, 10) : null;
        let enderecoDAO = new PsqlEnderecoDAO();
        if (row.endereco_id) {
            const endereco = await enderecoDAO.obterPorId(row.endereco_id);
            cliente.endereco = endereco;
        }
        return cliente;
    }

    async deletar(id){
        const client = await pool.connect();
        try{
            const result = await client.query('delete from clientes where id=$1 returning id',[id]);
            if(result.rowCount == 0){
                throw new EntidadeNaoEncontradaException("Cliente inexistente.");
            }
            return result.rows[0].id;
        }catch(e){
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlClienteDao;