const PgUtil = require('../utils/PgUtil');
const { pool } = require('../helpers/pg_helper');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const Produto = require('../entidades/Produto');
const PsqlOrgaoDAO = require('./PsqlOrgaoDAO');

class PsqlProdutoDAO {

    async obterPorId(id) {
        try {
            const result = await pool.query("select * from produtos where id=$1", [id]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("O produto não existe.");
            }
            return await this.criarObjetoProduto(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async obter(produto) {
        try {
            const orgaoId = produto.orgao && produto.orgao.id ? produto.orgao.id : null;
            const carencia = produto.carencia ? produto.carencia : null;
            const qtdParcelas = produto.qtdParcelas ? produto.qtdParcelas : null;
            const strQuery = "select * from produtos where orgao_id=$1 and carencia=$2 and qtd_parcelas=$3";
            const result = await pool.query(strQuery, [orgaoId, carencia, qtdParcelas]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Produto inexistente.");
            }
            return await this.criarObjetoProduto(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async listarProdutosPorCriterios(criterios = null) {
        try {
            let strQuery = "select * from produtos where ";
            const colunas = [];
            let criterioEncontrato = false;
            if (criterios) {
                let indice = 1;
                if (criterios.orgaoId) {
                    criterioEncontrato = true
                    strQuery += " orgao_id=$" + indice;
                    colunas.push(criterios.orgaoId);
                    indice++;
                    if (criterios.carencia || criterios.qtdParcelas) {
                        strQuery += " and ";
                    }
                }
                if (criterios.carencia) {
                    criterioEncontrato = true;
                    strQuery += " carencia=$" + indice;
                    colunas.push(criterios.carencia);
                    indice++;
                    if (criterios.qtdParcelas) {
                        strQuery += " and ";
                    }
                }
                if (criterios.qtdParcelas) {
                    criterioEncontrato = true;
                    strQuery += " qtd_parcelas=$" + indice;
                    colunas.push(criterios.qtdParcelas);
                }  
            }
            if(!criterioEncontrato){
                strQuery += " true"
            }
            const result = await pool.query(strQuery, colunas);
            const produtos = [];
            for (let i = 0; i < result.rows.length; i++) {
                produtos.push(await this.criarObjetoProduto(result.rows[i]));
            }
            return produtos;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async salvar(produto) {
        try {
            const query = "insert into produtos(orgao_id, carencia, qtd_parcelas) values ($1, $2, $3) returning id ";
            const { rows } = await pool.query(query, [produto.orgao.id, produto.carencia, produto.qtdParcelas]);
            return rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async atualizar(produto) {
        try {
            const produtoCadastrado = await this.obterPorId(produto.id);
            const novaCarencia = typeof (produto.carencia) != 'undefined' ? produto.carencia : produtoCadastrado.carencia;
            const novaQtdParcelas = typeof (produto.qtdParcelas) != 'undefined' ? produto.qtdParcelas : produtoCadastrado.qtdParcelas;
            const novoOrgaoID = produto.orgao && typeof (produto.orgao.id) != 'undefined' ? produto.orgao.id : produtoCadastrado.orgao.id;
            const result = await pool.query('update produtos set orgao_id=$1, carencia=$2, qtd_parcelas=$3 where id=$4 returning id ',
                [novoOrgaoID, novaCarencia, novaQtdParcelas, produto.id]);
            return await result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async deletar(id) {
        try {
            const result = await pool.query("delete from produtos where id=$1 returning id ", [id]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Produto não encontrado.");
            }
            return result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async existePorID(id) {
        try {
            const result = await pool.query('select id from produtos where id=$1', [id]);
            return result.rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async existe(produto) {
        try {
            const query = "select id from produtos where orgao_id=$1 and carencia=$2 and qtd_parcelas=$3";
            const resultado = await pool.query(query, [produto.orgao.id, produto.carencia, produto.qtdParcelas]);
            return resultado.rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async criarObjetoProduto(rowProduto) {
        const produto = new Produto();
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