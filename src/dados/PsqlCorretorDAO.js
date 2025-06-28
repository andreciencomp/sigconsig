const { pool } = require('../helpers/pg_helper')
const PgUtil = require('../dados/PgUtil');
const Corretor = require('../entidades/Corretor');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PsqlEnderecoDAO = require('./PsqlEnderecoDAO');
const PsqlContaBancariaDAO = require('./PsqlContaBancariaDao');

class PsqlCorretorDAO {

    async obterPorId(id) {
        try {
            const corretorQuery = "select * from corretores where id=$1";
            const result = await pool.query(corretorQuery, [id]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Corretor inexistente.");
            }
            return await this.criarObjetoCorretor(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async salvar(corretor) {
        const client = await pool.connect();
        try {
            client.query("BEGIN");
            let enderecoId = null;
            if (corretor.endereco) {
                const enderecoDAO = new PsqlEnderecoDAO();
                const novoEndereco = await enderecoDAO.salvar(corretor.endereco, client);
                enderecoId = novoEndereco.id;
            }
            let contaBancariaId = null;
            if (corretor.contaBancaria) {
                const contaBancariaDAO = new PsqlContaBancariaDAO();
                const contaBancaria = await contaBancariaDAO.salvar(corretor.contaBancaria, client);
                contaBancariaId = contaBancaria.id;
            }
            const query = "insert into corretores (codigo, cpf, nome, dt_nascimento, conta_bancaria_id, endereco_id, ativo) " +
                "values($1, $2, $3, $4, $5, $6, $7) returning id ";
            const { rows } = await client.query(query, [corretor.codigo, corretor.cpf, corretor.nome,
            corretor.dtNascimento, contaBancariaId, enderecoId, corretor.ativo]);
            await client.query('COMMIT');
            return rows[0];

        } catch (e) {
            await pool.query('ROLLBACK');
            PgUtil.checkError(e);

        } finally {
            client.release();
        }
    }

    async atualizar(corretor) {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            let enderecoId = null;
            const corretorSalvo = await this.obterPorId(corretor.id, client);
            if (typeof (corretor.endereco) != 'undefined' && corretor.endereco == null) {
                if (corretorSalvo.endereco) {
                    const enderecoDAO = new PsqlEnderecoDAO();
                    await enderecoDAO.deletar(corretorSalvo.endereco.id, client);
                }
            } else if (corretor.endereco) {
                const enderecoDAO = new PsqlEnderecoDAO();
                if (corretorSalvo.endereco) {
                    corretor.endereco.id = corretorSalvo.endereco.id;
                    await enderecoDAO.atualizar(corretor.endereco, client);
                    enderecoId = corretor.endereco.id;
                } else {
                    const novoEndereco = await enderecoDAO.salvar(corretor.endereco, client);
                    enderecoId = novoEndereco.id;
                }

            } else {
                enderecoId = corretorSalvo.endereco ? corretorSalvo.endereco.id : null;
            }
            let contaBancariaID = null;
            if (typeof (corretor.contaBancaria) != 'undefined' && corretor.contaBancaria == null) {
                if (corretorSalvo.contaBancaria) {
                    const contaBancariaDAO = new PsqlContaBancariaDAO();
                    await contaBancariaDAO.deletar(corretorSalvo.contaBancaria.id);
                }
            } else if (corretor.contaBancaria) {
                const contaBancariaDAO = new PsqlContaBancariaDAO();
                if (corretorSalvo.contaBancaria) {
                    corretor.contaBancaria.id = corretorSalvo.contaBancaria.id;
                    await contaBancariaDAO.atualizar(corretor.contaBancaria, client);
                    contaBancariaID = corretor.contaBancaria.id;
                } else {
                    const novaContaBancaria = await contaBancariaDAO.salvar(corretor.contaBancaria, client);
                    contaBancariaID = novaContaBancaria.id;
                }

            } else {
                contaBancariaID = corretorSalvo.contaBancaria ? corretorSalvo.contaBancaria.id : null;
            }
            const codigo = typeof (corretor.codigo) != 'undefined' ? corretor.codigo : corretorSalvo.codigo;
            const cpf = typeof (corretor.cpf) != 'undefined' ? corretor.cpf : corretorSalvo.cpf;
            const nome = typeof (corretor.nome) != 'undefined' ? corretor.nome : corretorSalvo.nome;
            const dtNascimento = typeof (corretor.dtNascimento) ? corretor.dtNascimento : corretorSalvo.dtNascimento;
            const ativo = typeof (corretor.ativo) != 'undefined' ? corretor.ativo : corretorSalvo.ativo;

            const query = "update corretores set codigo=$1, cpf=$2, nome=$3,"
                + " dt_nascimento=$4, conta_bancaria_id=$5, endereco_id=$6, ativo=$7 where id=$8 returning id ";
            const result = await client.query(query, [codigo, cpf, nome, dtNascimento, contaBancariaID, enderecoId, ativo, corretor.id]);

            await client.query("COMMIT");
            return result.rows[0];

        } catch (e) {
            await client.query("ROLLBACK");
            PgUtil.checkError(e);

        } finally {
            client.release();

        }
    }

    async listarTodos() {
        try {
            let corretores = [];
            const { rows } = await pool.query("select * from corretores");
            for (let i = 0; i < rows.length; i++) {
                const corretor = await this.criarObjetoCorretor(rows[i]);
                corretores.push(corretor);
            }
            return corretores;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async deletar(id) {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const corretor = await this.obterPorId(id);
            if (corretor.endereco) {
                const enderecoDAO = new PsqlEnderecoDAO();
                await enderecoDAO.deletar(corretor.endereco.id, client);
            }
            if (corretor.contaBancaria) {
                const contaBancariaDAO = new PsqlContaBancariaDAO();
                await contaBancariaDAO.deletar(corretor.contaBancaria.id, client);
            }
            const result = await client.query("delete from corretores where id=$1 returning id ", [id]);
            if (result.rows.length == 0) {
                throw new EntidadeNaoEncontradaException("Corretor inexistente.");
            }
            await client.query("COMMIT");
            return result.rows[0];

        } catch (e) {
            await client.query("ROLLBACK");
            PgUtil.checkError(e);

        } finally {
            client.release();
        }
    }

    async criarObjetoCorretor(row) {
        let corretor = new Corretor();
        corretor.id = row.id;
        corretor.codigo = row.codigo;
        corretor.cpf = row.cpf;
        corretor.nome = row.nome;
        corretor.dtNascimento = row.dt_nascimento ? row.dt_nascimento.toISOString().slice(0, 10) : null;
        corretor.ativo = row.ativo;
        if (row.endereco_id) {
            const enderecoDAO = new PsqlEnderecoDAO();
            const endereco = await enderecoDAO.obterPorId(row.endereco_id);
            corretor.endereco = endereco;
        }
        if (row.conta_bancaria_id) {
            const daoContaBancaria = new PsqlContaBancariaDAO();
            corretor.contaBancaria = await daoContaBancaria.obterPorId(row.conta_bancaria_id);
        }
        return corretor;
    }
}

module.exports = PsqlCorretorDAO;