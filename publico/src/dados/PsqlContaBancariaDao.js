const { pool } = require('../../../servicos/database_service')
const PgUtil = require('../dados/PgUtil');

class PsqlContaBancariaDAO {
    static instancia = new PsqlContaBancariaDAO();

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