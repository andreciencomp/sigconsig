const { pool } = require('../../../servicos/database_service')
const PgUtil = require('../dados/PgUtil');
const Corretor = require('../entidades/Corretor');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PsqlEnderecoDAO = require('./PsqlEnderecoDAO');
const PsqlContaBancariaDAO = require('./PsqlContaBancariaDao');

class PsqlCorretorDAO {
    static instancia = new PsqlCorretorDAO();

    async obterPorId(id, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const corretorQuery = "select * from corretores where id=$1";
            const result = await client.query(corretorQuery, [id]);
            if (result.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("É nescessário o id do corretor para atualizar.");
            }
            return await this.criarObjetoCorretor(result.rows[0], client);

        } catch (e) {
            PgUtil.checkError(e);

        } finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    async salvar(corretor, canRollback = false, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            if (canRollback) {
                client.query("BEGIN");
            }
            let enderecoID = null;
            if (corretor.endereco) {
                const enderecoDAO = new PsqlEnderecoDAO();
                const novoEndereco = await enderecoDAO.salvar(corretor.endereco, client);
                enderecoID = novoEndereco.id;
            }
            let contaBancariaID = null;
            if (corretor.contaBancaria) {
                const contaBancariaDAO = new PsqlContaBancariaDAO();
                const contaBancaria = await contaBancariaDAO.salvar(corretor.contaBancaria, client);
                contaBancariaID = contaBancaria.id;
            }
            const query = "insert into corretores (codigo, cpf, nome, dt_nascimento, conta_bancaria_id, endereco_id, ativo) " +
                "values($1, $2, $3, $4, $5, $6, $7) returning * ";
            const { rows } = await client.query(query, [corretor.codigo, corretor.cpf, corretor.nome,
            corretor.dtNascimento, contaBancariaID, enderecoID, corretor.ativo]);
            if (canRollback) {
                await client.query('COMMIT');
            }
            return await this.criarObjetoCorretor(rows[0], client);

        } catch (e) {
            if (canRollback) {
                await pool.query('ROLLBACK');
            }
            PgUtil.checkError(e);
            
        } finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    async atualizar(corretor, canRollback=false, pgClient=null){
        const client = pgClient ? pgClient : await pool.connect();
        try{
            if(canRollback){
                await client.query("BEGIN");
            }
            let enderecoID = null;
            const corretorSalvo = await this.obterPorId(corretor.id,client);
            if(typeof(corretor.endereco) != 'undefined' && corretor.endereco == null){
                if(corretorSalvo.endereco){
                    const enderecoDAO = new PsqlEnderecoDAO();
                    await enderecoDAO.deletar(corretorSalvo.endereco.id, client);
                }
            }else if(corretor.endereco){
                const enderecoDAO = new PsqlEnderecoDAO();
                if(corretorSalvo.endereco){
                    corretor.endereco.id = corretorSalvo.endereco.id;
                    await enderecoDAO.atualizar(corretor.endereco,client);
                    enderecoID = corretor.endereco.id;
                }else{
                    const novoEndereco = await enderecoDAO.salvar(corretor.endereco,client);
                    enderecoID = novoEndereco.id;
                }
                
            }else{
                enderecoID = corretorSalvo.endereco ? corretorSalvo.endereco.id : null;
            }
            let contaBancariaID = null;
            if(typeof(corretor.contaBancaria) != 'undefined' && corretor.contaBancaria == null){
                if(corretorSalvo.contaBancaria){
                    const contaBancariaDAO = new PsqlContaBancariaDAO();
                    await contaBancariaDAO.deletar(corretorSalvo.contaBancaria.id);
                }
            }else if(corretor.contaBancaria){
                const contaBancariaDAO = new PsqlContaBancariaDAO();
                if(corretorSalvo.contaBancaria){
                    corretor.contaBancaria.id = corretorSalvo.contaBancaria.id;
                    await contaBancariaDAO.atualizar(corretor.contaBancaria, client);
                    contaBancariaID = corretor.contaBancaria.id;
                }else{
                    const novaContaBancaria = await contaBancariaDAO.salvar(corretor.contaBancaria,client);
                    contaBancariaID = novaContaBancaria.id;
                }
                
            }else{
                contaBancariaID = corretorSalvo.contaBancaria ? corretorSalvo.contaBancaria.id : null;
            }
            const codigo = typeof(corretor.codigo) != 'undefined' ? corretor.codigo : corretorSalvo.codigo;
            const cpf = typeof(corretor.cpf) != 'undefined' ? corretor.cpf : corretorSalvo.cpf;
            const nome = typeof(corretor.nome) != 'undefined' ? corretor.nome : corretorSalvo.nome;
            const dtNascimento = typeof(corretor.dtNascimento) ? corretor.dtNascimento : corretorSalvo.dtNascimento;
            const ativo = typeof(corretor.ativo) != 'undefined' ? corretor.ativo : corretorSalvo.ativo;

            const query = "update corretores set codigo=$1, cpf=$2, nome=$3,"
                 + " dt_nascimento=$4, conta_bancaria_id=$5, endereco_id=$6, ativo=$7 where id=$8 returning * ";
            const result = await client.query(query,[codigo, cpf, nome, dtNascimento, contaBancariaID, enderecoID, ativo, corretor.id]);
                 
            if(canRollback){
                client.query("COMMIT");
            }
            return this.criarObjetoCorretor(result.rows[0], client);


        }catch(e){
            if(canRollback){
                client.query("ROLLBACK");
            }
            PgUtil.checkError(e);
        }finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    async listarTodos(pgClient=null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            let corretores = [];
            const { rows } = await client.query("select * from corretores");
            for (let i = 0; i < rows.length; i++) {
                const corretor = await this.criarObjetoCorretor(rows[i], client);
                corretores.push(corretor);
            }
            return corretores;

        } catch (e) {
            PgUtil.checkError(e);

        } finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    async criarObjetoCorretor(row, pgClient = null) {
        let corretor = new Corretor();
        corretor.id = row.id;
        corretor.codigo = row.codigo;
        corretor.cpf = row.cpf;
        corretor.nome = row.nome;
        corretor.dtNascimento = row.dt_nascimento ? row.dt_nascimento.toISOString().slice(0,10): null;
        corretor.ativo = row.ativo;
        if (row.endereco_id) {
            const enderecoDAO = new PsqlEnderecoDAO();
            const endereco = await enderecoDAO.obterPorId(row.endereco_id, pgClient);
            corretor.endereco = endereco;
        }
        if (row.conta_bancaria_id) {
            const daoContaBancaria = new PsqlContaBancariaDAO();
            corretor.contaBancaria = await daoContaBancaria.obterPorId(row.conta_bancaria_id, pgClient);
        }
        return corretor;
    }
}

module.exports = PsqlCorretorDAO;