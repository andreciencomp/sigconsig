const { pool } = require('../../../servicos/database_service')
const PgUtil = require('../dados/PgUtil');
const ContaBancaria = require('../entidades/ContaBancaria');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PsqlBancoDAO = require('./PsqlBancoDAO');

class PsqlContaBancariaDAO {
    static instancia = new PsqlContaBancariaDAO();

    async obterPorId(id, pgClient=null){
        const client = pgClient ? pgClient : await pool.connect();
        try{
            const query = "select * from contas_bancarias where id=$1";
            const res = await client.query(query,[id]);
            if(res.rowCount == 0){
                throw new EntidadeNaoEncontradaException("A conta bancária não existe.");
            }
            let conta = new ContaBancaria();
            conta.id = res.rows[0].id;
            conta.numAgencia = res.rows[0].num_agencia;
            conta.numConta = res.rows[0].num_conta;
            conta.digito = res.rows[0].digito;
            if(res.rows[0].banco_id){
                let daoBanco = new PsqlBancoDAO();
                let banco = await daoBanco.obterPorId(res.rows[0].banco_id);
                conta.banco = banco;
            }
            return conta;
        }catch(e){
            PgUtil.checkError(e);
        }finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    async salvar(contaBancaria, pgClient=null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const query = "insert into contas_bancarias (banco_id, num_agencia, num_conta, digito) values($1, $2, $3, $4) returning * ";
            const { rows } = await client.query(query, [contaBancaria.banco.id, contaBancaria.numAgencia, contaBancaria.numConta, contaBancaria.digito]);
            return await this.criarObjetoContaBancaria(rows[0]);
        } catch (e) {
            PgUtil.checkError(e);
        }finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    async criarObjetoContaBancaria(row, pgClient=null){
        const conta = new ContaBancaria();
        conta.id = row.id;
        conta.numAgencia = row.num_agencia;
        conta.numConta = row.num_conta;
        conta.digito = row.digito;
        if(row.banco_id){
            const bancoDAO = new PsqlBancoDAO();
            conta.banco = await bancoDAO.obterPorId(row.banco_id,pgClient);
        }
        return conta;
    }
}

module.exports = PsqlContaBancariaDAO;