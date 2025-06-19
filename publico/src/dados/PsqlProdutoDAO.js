const PgUtil = require('./PgUtil');
const { pool } = require('../../../servicos/database_service');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const Produto = require('../entidades/Produto');
const PsqlOrgaoDAO = require('./PsqlOrgaoDAO');
const paraSnakeCase = require('../../../servicos/util');

class PsqlProdutoDAO {
    static instancia = new PsqlProdutoDAO;

    async obterPorId(id, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const produtoQuery = "select * from produtos where id=$1";
            const result = await client.query(produtoQuery, [id]);
            if (result.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("O produto não existe.");
            }
            return await this.criarObjetoProduto(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async obter(produto, pgClient) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const produtoQuery = "select * from produtos where orgao_id=$1 and carencia=$2 and qtd_parcelas=$3";
            const result = await client.query(produtoQuery, [produto.orgao.id, produto.carencia, produto.qtdParcelas]);
            if (result.rowCount == 0) {
                return null;
            }
            return await this.criarObjetoProduto(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async listarProdutosPorCriterios(criterios) {
        try {
            let colunas = [];
            let indice = 1;
            let strQuery = "select * from produtos where ";
            if (criterios.orgao) {
                strQuery += " orgao_id=$" + indice;
                colunas.push(criterios.orgao.id);
                indice++;
                if (criterios.carencia || criterios.qtdParcelas) {
                    strQuery += " and ";
                }
            }
            if (criterios.carencia) {
                strQuery += " carencia=$" + indice;
                colunas.push(criterios.carencia);
                indice++;
                if (criterios.qtdParcelas) {
                    strQuery += " and ";
                }
            }
            if (criterios.qtdParcelas) {
                strQuery += " qtd_parcelas=$" + indice;
                colunas.push(criterios.qtdParcelas);
            }
            let result = await pool.query(strQuery, colunas);
            let produtos = [];
            for (let i = 0; i < result.rows.length; i++) {
                produtos.push(await this.criarObjetoProduto(result.rows[i]));
            }
            return produtos;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async salvar(produto, dbClient = null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            const query = "insert into produtos(orgao_id, carencia, qtd_parcelas) values ($1, $2, $3) returning * ";
            const { rows } = await client.query(query, [produto.orgao.id, produto.carencia, produto.qtdParcelas]);
            return await this.criarObjetoProduto(rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
        } finally {
            if (!dbClient) {
                client.release();
            }
        }
    }

    async atualizar(produto, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const produtoCadastrado = await this.obterPorId(produto.id);
            const novaCarencia = typeof (produto.carencia) != 'undefined' ? produto.carencia : produtoCadastrado.carencia;
            const novaQtdParcelas = typeof (produto.qtdParcelas) != 'undefined' ? produto.qtdParcelas : produtoCadastrado.qtdParcelas;
            const novoOrgaoID = typeof (produto.orgao.id) != 'undefined' ? produto.orgao.id : produtoCadastrado.orgao.id;
            const result = await client.query('update produtos set orgao_id=$1, carencia=$2, qtd_parcelas=$3 where id=$4 returning * ',
                [novoOrgaoID, novaCarencia, novaQtdParcelas, produto.id]);
            return await this.criarObjetoProduto(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async deletar(id, dbClient = null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            const result = await client.query("delete from produtos where id=$1 returning * ", [id]);
            if (result.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("Produto não encontrado.");
            }
            return this.criarObjetoProduto(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
        } finally {
            if (!dbClient) {
                client.release;
            }
        }
    }

    async existePorID(id, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const result = await client.query('select id from produtos where id=$1', [id]);
            return result.rowCount > 0;

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async existe(produto) {
        try {
            const query = "select id from produtos where orgao_id=$1 and carencia=$2 and qtd_parcelas=$3";
            const resultado = await pool.query(query, [produto.orgao.id, produto.carencia, produto.qtdParcelas]);
            return resultado.rowCount > 0;
        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async criarObjetoProduto(rowProduto) {
        let produto = new Produto();
        produto.id = rowProduto.id;
        produto.carencia = rowProduto.carencia;
        produto.qtdParcelas = rowProduto.qtd_parcelas;
        const orgaoDAO = new PsqlOrgaoDAO();
        const orgao = await orgaoDAO.obterPorId(rowProduto.orgao_id);
        produto.orgao = orgao;
        return produto;
    }
}

module.exports = PsqlProdutoDAO;