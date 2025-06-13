let PgUtil = require('./PgUtil');
const { pool } = require('../../../servicos/database_service');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PsqlEnderecoDAO = require('./PsqlEnderecoDAO');
const Cliente = require('../entidades/Cliente');

class PsqlClienteDao {

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
            return  await this.criarObjetoCliente(res.rows[0]);
        } catch (e) {
            PgUtil.checkError(e);
        } finally{
            client.release();
        }
    }

    async listar(dbClient=null){
        const client = dbClient ? dbClient : await pool.connect();
        try{
            const clientes = [];
            const result = await client.query("select * from clientes");
            for(let i=0; i < result.rowCount; i++){
                const cliente = await this.criarObjetoCliente(result.rows[i]);
                clientes.push(cliente);
            }
            return clientes;
            
        }catch(e){
            PgUtil.checkError(e);

        }finally{
            if(!dbClient){
                 client.release();
            }
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

    async salvar(cliente, rollback=false, dbClient=null) {
        const client = dbClient ? dbClient :  await pool.connect();
        try {
            if(rollback){
                await client.query('BEGIN');
            }
            let enderecoId = null;
            if (cliente.endereco) {
                const enderecoDAO = new PsqlEnderecoDAO();
                const enderecoSalvo = await enderecoDAO.salvar(cliente.endereco,client);
                enderecoId = enderecoSalvo.id;
            }
            const clienteQuery = "insert into clientes (cpf, nome, dt_nascimento, endereco_id) values ($1, $2, $3, $4) returning id"
            let resCliente = await client.query(clienteQuery, [cliente.cpf, cliente.nome, cliente.dtNascimento, enderecoId]);
            if(rollback){
                await client.query('COMMIT');
            }
            return resCliente.rows[0];

        } catch (e) {
            if(rollback){
                await client.query('ROLLBACK');
            }
            PgUtil.checkError(e);
        }finally{
            if(!dbClient){
                client.release()
            }
            
        }
    }

    async atualizar(cliente, rollback=false, dbClient=null) {
        const client = dbClient ? dbClient : await pool.connect();
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

            const query = "update clientes set cpf=$1, nome=$2, dt_nascimento=$3 where id=$4 returning *";
            const resultado = await client.query(query, [cpf, nome, dtNascimento, cliente.id]);
            if(rollback){
                await client.query('COMMIT');
            }
            return await this.criarObjetoCliente(resultado.rows[0]);
            
        } catch (e) {
            if(rollback){
                await client.query('ROLLBACK');
            }
            PgUtil.checkError(e);
        }finally{
            if(!dbClient){
                client.release();
            }
            
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