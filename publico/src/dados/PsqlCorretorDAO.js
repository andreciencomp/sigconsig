const { pool } = require('../../../servicos/database_service')
const PgUtil = require('../dados/PgUtil');

class PsqlCorretorDAO{
    static instancia = new PsqlCorretorDAO();

    async salvar(corretor){
        try{
            let enderecoId = null;
            let contaBancariaId = null;
            await pool.query('BEGIN');
            if(corretor.endereco){
                let queryEndereco =  "insert into enderecos (estado_id, cidade_id, cep, rua, numero, bairro, telefone) " +
                "values ($1, $2, $3, $4, $5, $6, $7) returning id";
                let estadoId = corretor.endereco.estado ? corretor.endereco.estado.id : null;
                let cidadeId = corretor.endereco.cidade ? corretor.endereco.cidade.id : null;
                let {rows} = await pool.query(queryEndereco, [estadoId, cidadeId,
                     corretor.endereco.cep, corretor.endereco.rua,corretor.endereco.numero, corretor.endereco.bairro, corretor.endereco.telefone]);
                enderecoId = rows[0].id;
            }
            if(corretor.contaBancaria){
                let queryContaBancaria = "insert into contas_bancarias (num_agencia, num_conta, digito, banco_id) values ($1, $2, $3, $4) returning id";
                let bancoId = corretor.contaBancaria.banco ? corretor.contaBancaria.banco.id : null
                const {rows} = await pool
                    .query(queryContaBancaria,[corretor.contaBancaria.numAgencia,
                         corretor.contaBancaria.numConta, corretor.contaBancaria.digito, bancoId]);
                contaBancariaId = rows[0].id;
            }
            const query = "insert into corretores (codigo, cpf, nome, dt_nascimento, conta_bancaria_id, endereco_id, ativo) " +
                        "values($1, $2, $3, $4, $5, $6, $7) returning id";
            const {rows} = await pool.query(query, [corretor.codigo, corretor.cpf, corretor.nome,
                 corretor.dtNascimento, contaBancariaId, enderecoId, corretor.ativo]);
            await pool.query('COMMIT');
            return rows[0];
            
        }catch(e){
            await pool.query('ROLLBACK');
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlCorretorDAO;