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
            let cliente = new Cliente();
            cliente.id = res.rows[0].id;
            cliente.cpf = res.rows[0].cpf;
            cliente.nome = res.rows[0].nome;
            let dtNasc = res.rows[0].dt_nascimento;
            cliente.dtNascimento = dtNasc.toISOString().slice(0, 10);
            let enderecoDAO = new PsqlEnderecoDAO();
            if (res.rows[0].endereco_id) {
                const endereco = await enderecoDAO.obterPorId(res.rows[0].endereco_id);
                cliente.endereco = endereco;
            }
            return cliente;


        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async obterPorCpf(cpf) {
        try {
            const queryCliente = "select * from clientes where cpf=$1";
            const res = await pool.query(queryCliente, [cpf]);
            if (res.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("O cliente não existe.");
            }
            return this.criarObjetoCliente(res.rows[0]);
        } catch (e) {
            PgUtil.checkError(e);
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

    async atualizar(cliente) {
        try {
            pool.query('BEGIN');
            let daoEndereco = new PsqlEnderecoDAO();
            let clienteSalvo = await this.obterPorId(cliente.id);
            if (cliente.endereco) {
                await daoEndereco.atualizar(cliente.endereco);
            }

            let cpf = cliente.cpf ? cliente.cpf : clienteSalvo.cpf;
            let nome = cliente.nome ? cliente.nome : clienteSalvo.nome;
            let dtNascimento = cliente.dtNascimento ? cliente.dtNascimento : clienteSalvo.dtNascimento;

            const query = "update clientes set cpf=$1, nome=$2, dt_nascimento=$3 where id=$4";
            const res = await pool.query(query, [cpf, nome, dtNascimento, cliente.id]);
            pool.query('COMMIT');
            return cliente;
        } catch (e) {
            pool.query('ROLLBACK');
            PgUtil.checkError(e);
        }
    }

    async criarObjetoCliente(row) {
        let cliente = new Cliente();
        cliente.id = row.id;
        cliente.cpf = row.cpf;
        cliente.nome = row.nome;
        let dtNasc = row.dt_nascimento;
        cliente.dtNascimento = dtNasc.toISOString().slice(0, 10);
        let enderecoDAO = new PsqlEnderecoDAO();
        if (row.endereco_id) {
            const endereco = await enderecoDAO.obterPorId(row.endereco_id);
            cliente.endereco = endereco;
        }
        return cliente;
    }
}

module.exports = PsqlClienteDao;