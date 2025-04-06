const { pool } = require('../../../servicos/database_service');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PgUtil = require('./PgUtil');
const Cidade = require('../entidades/Cidade');
const DAOFactory = require('./DAOFactory');
const PsqlEstadoDAO = require('./PsqlEstadoDAO');

class PsqlCidadeDao {

    static instancia = new PsqlCidadeDao();

    async obterPorId(id) {
        const strQuery = 'select * from cidades where id = $1';
        try {
            const { rows } = await pool.query(strQuery, [id]);
            if (rows.length == 0) {
                return null;
            }
            let cidade = new Cidade();
            cidade.id = rows[0].id;
            cidade.nome = rows[0].nome;
            const estadoDao = await new PsqlEstadoDAO();
            let estado = await estadoDao.obter(rows[0].estado_id);
            cidade.estado = estado; 
            return cidade;

        } catch (e) {
            PgUtil.checkError(e);

        }

    }
}

module.exports = PsqlCidadeDao;