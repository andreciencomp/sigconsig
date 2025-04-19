const { pool } = require('../../../servicos/database_service')
const PgUtil = require('../dados/PgUtil');
const PsqlClienteDao = require('./PsqlClienteDAO');
const PsqlEnderecoDAO = require('./PsqlEnderecoDAO');

class PsqlContratoDAO {

    #construtor(){
        this.instancia = new PsqlContratoDAO();
    }

    static getInstancia(){
        if(!this.instancia){
            this.instancia = new PsqlContratoDAO();
            return this.instancia;
        }
        else{
            return this.instancia;
        }
    }

    async salvar(contrato) {
        try {
            let enderecoDAO = new PsqlEnderecoDAO();
            let clienteDAO = new PsqlClienteDao();

            pool.query('BEGIN');
            const queryContrato = "insert into contratos(numero, produto_id, data, cliente_id, dt_liberacao, endereco_id, status, corretor_id) " +
                "values($1, $2, $3, $4, $5, $6, $7, $8) returning id";
            let clienteId = contrato.cliente != null && contrato.cliente.id !=null ? contrato.cliente.id : null;

            if (clienteId == null) {
                contrato.cliente.endereco = contrato.endereco;
                clienteId = (await clienteDAO.salvar(contrato.cliente)).id;
                let endereco_contrato_id = null;
                if(contrato.endereco){
                    endereco_contrato_id = (await enderecoDAO.salvar(contrato.endereco.estado.id, contrato.endereco.estado.id, contrato.endereco.cep,
                        contrato.endereco.rua, contrato.endereco.numero, contrato.endereco.bairro, contrato.endereco.telefone)).id;
                }
                let resContrato = await pool.query(queryContrato, [contrato.numero, contrato.produto.id, contrato.data,
                clienteId, contrato.dtLiberacao, endereco_contrato_id, contrato.status, contrato.corretor.id]);
                pool.query('COMMIT');
                return resContrato.rows[0];

            } else {
                let endereco_contrato_id = null;
                if(contrato.endereco){
                    endereco_contrato_id = (await enderecoDAO.salvar(contrato.endereco.estado.id, contrato.endereco.cidade.id, contrato.endereco.cep,
                        contrato.endereco.rua, contrato.endereco.numero, contrato.endereco.bairro, contrato.endereco.telefone)).id;
                }
                
                let resContrato = await pool.query(queryContrato, [contrato.numero, contrato.produto.id, contrato.data,
                contrato.cliente.id, contrato.dtLiberacao, endereco_contrato_id, contrato.status, contrato.corretor.id]);
                pool.query('COMMIT');
                return resContrato.rows[0];
            }

        } catch (e) {
            pool.query('ROLLBACK');
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlContratoDAO;