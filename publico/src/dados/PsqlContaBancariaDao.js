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
            const result = await client.query(query,[id]);
            if(result.rowCount == 0){
                throw new EntidadeNaoEncontradaException("A conta bancária não existe.");
            }
            return await this.criarObjetoContaBancaria(result.rows[0]);

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

    async atualizar(contaBancaria, pgClient=null){
        const client = pgClient ? pgClient : await pool.connect();
        try{
            const contaBancariaSalva = await this.obterPorId(contaBancaria.id, client);
            const numAgencia = typeof(contaBancaria.numAgencia) != 'undefined' ? contaBancaria.numAgencia : contaBancariaSalva.numAgencia;
            const numConta = typeof(contaBancaria.numConta) != 'undefined' ? contaBancaria.numConta : contaBancariaSalva.numConta;
            const numDigito = typeof(contaBancaria.digito) != 'undefined' ? contaBancaria.digito : contaBancariaSalva.digito;
            const bancoID = contaBancaria.banco && typeof(contaBancaria.banco.id) != 'undefined' ? contaBancaria.banco.id : null;
            if(typeof(contaBancaria.banco) != 'undefined' && contaBancaria.banco == null){
                if(contaBancariaSalva.banco){
                    const bancoDAO = new PsqlBancoDAO();
                    await bancoDAO.deletar(contaBancariaSalva.banco.id);
                }
            }
            const query="update contas_bancarias set num_agencia=$1, num_conta=$2, digito=$3, banco_id=$4 where id=$5 returning * ";
            const result = await client.query(query, [numAgencia, numConta, numDigito, bancoID, contaBancaria.id]);
            return await this.criarObjetoContaBancaria(result.rows[0]);

        }catch(e){
            PgUtil.checkError(e);

        }finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    async deletar(id, pgClient=null){
        const client = pgClient ? pgClient : await pool.connect();
        try{
            const result = await client.query("delete from contas_bancarias where id=$1 returning * ",[id]);
            if(result.rowCount == 0){
                throw new EntidadeNaoEncontradaException("Conta bancária não encontrada.");
            }
            return await this.criarObjetoContaBancaria(result.rows[0]);

        }catch(e){
            console.log(e);
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