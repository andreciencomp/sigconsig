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

    async listarTodos(){
        const strQuery = 'select * from cidades';
        try{
            let cidades = [];
            const {rows} = await pool.query(strQuery);
            for(var i=0; i < rows.length; i++){
                let cidade = new Cidade();
                cidade.id = rows[i].id;
                cidade.nome = rows[i].nome;
                let estadoDao = new PsqlEstadoDAO();
                let estado =  await estadoDao.obter(rows[i].estado_id);
                cidade.estado = estado;
                cidades.push(cidade);
            }
            return cidades;

        }catch(e){
            PgUtil.checkError(e);
        }
    }

    async listarPorEstado(estado_id){
        const strQuery = 'select * from cidades where estado_id = $1';
        try{
            let cidades = []
            const {rows} = await pool.query(strQuery,[estado_id]);
            for(var i = 0; i < rows.length ; i++){
                let cidade = new Cidade();
                cidade.id = rows[i].id;
                cidade.nome = rows[i].nome;
                let estadoDao = new PsqlEstadoDAO();
                let estado = await estadoDao.obter(estado_id);
                cidade.estado = estado;
                cidades.push(cidade);
            }
            return cidades;
        }catch(e){
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlCidadeDao;