const { pool } = require('../../../servicos/database_service')
const PgUtil = require('../dados/PgUtil');
const ContaBancaria = require('../entidades/ContaBancaria');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PsqlBancoDAO = require('./PsqlBancoDAO');

class PsqlContaBancariaDAO {
    static instancia = new PsqlContaBancariaDAO();

    async obterPorId(id){
        try{
            const query = "select * from contas_bancarias where id=$1";
            const res = await pool.query(query,[id]);
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
        }
    }

    async salvar(bancoId, numAgencia, numConta, digito) {
        try {
            const query = "insert into contas_bancarias (num_agencia, num_conta, digito) values($1, $2, $3, $4) returning id";
            const { rows } = await pool.query(query, [bancoId, numAgencia, numConta, digito]);
            return rows[0];
        } catch (e) {
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlContaBancariaDAO;