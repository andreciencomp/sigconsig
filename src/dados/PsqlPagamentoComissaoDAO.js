const { pool } = require("../helpers/pg_helper");
const PagamentoComissao = require("../entidades/PagamentoComissao");
const EntidadeNaoEncontradaException = require("../excessoes/EntidadeNaoEncontrada");
const PgUtil = require("../utils/PgUtil");
const Usuario = require("../entidades/Usuario");

class PsqlPagamentoComissaoDAO {

    constructor() {
        this.querySelect = "select pagamentos_comissoes.id, contratos.id as contrato_id, contratos.valor, valor_corretor, valor_promotora, " +
            "percentagem_promotora, percentagem_corretor, efetivado, cadastrado_por, dt_cadastro, efetivado_por, dt_efetivacao, corretores.id as corretor_id " +
            "from pagamentos_comissoes left join contratos on contratos.id = pagamentos_comissoes.contrato_id " +
            "left join corretores on corretores.id = pagamentos_comissoes.corretor_id where ";
    }

    async obterPorId(id) {
        try {
            const strQuery = this.querySelect + " pagamentos_comissoes.id=$1";
            const result = await pool.query(strQuery, [id]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Pagamento inexistente.");
            }
            return this.criarObjeto(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async salvar(pagamento) {
        try {
            const strQuery = "insert into pagamentos_comissoes(corretor_id, contrato_id, percentagem_corretor, " +
                            "percentagem_promotora, valor_corretor, valor_promotora, efetivado, " +
                            "cadastrado_por, dt_cadastro, efetivado_por, dt_efetivacao) values" +
                            "($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning id ";

            const cadastradoPorId = pagamento.cadastradoPor && pagamento.cadastradoPor.id ? pagamento.cadastradoPor.id : null;
            const efetivadoPorId = pagamento.efetivadoPor && pagamento.efetivadoPor.id ? pagamento.efetivadoPor.id : null;
            const dtCadastro = new Date();

            const { rows } = await pool.query(strQuery, [pagamento.corretor.id, pagamento.contrato.id, pagamento.percentagemCorretor,
                pagamento.percentagemPromotora, pagamento.valorCorretor, pagamento.valorPromotora, pagamento.efetivado,
                cadastradoPorId, dtCadastro, efetivadoPorId, pagamento.dtEfetivacao]);
            return rows[0];

        } catch (e) {
            throw PgUtil.checkError(e);

        }
    }

    async atualizar(pagamento) {
        try {
            const pagamentoCadastrado = await this.obterPorId(pagamento.id);
            const contratoId = typeof (pagamento.contrato) != 'undefined' && pagamento.contrato.id ? pagamento.contrato.id : pagamentoCadastrado.contrato.id;
            const corretorId = typeof (pagamento.contrato) != 'undefined' && pagamento.corretor.id ? pagamento.corretor.id : pagamentoCadastrado.corretor.id;
            const valorPromotora = typeof (pagamento.valorPromotora) != 'undefined' ? pagamento.valorPromotora : pagamentoCadastrado.valorPromotora;
            const valorCorretor = typeof (pagamento.valorCorretor) != 'undefined' ? pagamento.valorCorretor : pagamentoCadastrado.valorCorretor;
            const percentagemPromotora = typeof (pagamento.percentagemPromotora) != 'undefined' ? pagamento.percentagemPromotora : pagamentoCadastrado.percentagemPromotora;
            const percentagemCorretor = typeof (pagamento.percentagemCorretor) != 'undefined' ? pagamento.percentagemCorretor : pagamentoCadastrado.percentagemCorretor;
            const cadastradoPorId = typeof(pagamento.cadastradoPor) != 'undefined' ? pagamento.cadastradoPor.id : pagamentoCadastrado.cadastradoPor.id;
            const dtCadastro = typeof(pagamento.dtCadastro) != 'undefined' ? pagamento.dtCadastro : pagamentoCadastrado.dtCadastro;
            const efetivado = typeof (pagamento.efetivado) != 'undefined' ? pagamento.efetivado : pagamentoCadastrado.efetivado;
            const efetivadoPorId = typeof(pagamento.efetivadoPor) != 'undefined' ? pagamento.efetivadoPor.id : pagamentoCadastrado.efetivadoPor.id;
            const dtEfetivacao = typeof (pagamento.dtEfetivacao) != 'undefined' ? pagamento.dtEfetivacao : pagamentoCadastrado.dtEfetivacao;

            const strQuery = 'update pagamentos_comissoes set contrato_id=$1, corretor_id=$2, valor_promotora=$3, valor_corretor=$4, percentagem_promotora=$5, ' +
                'percentagem_corretor=$6, efetivado=$7,cadastrado_por=$8, dt_cadastro=$9, efetivado_por=$10, dt_efetivacao=$11 where id=$12 returning id';

            const result = await pool.query(strQuery,[contratoId, corretorId, valorPromotora, valorCorretor, percentagemPromotora,
                             percentagemCorretor,efetivado, cadastradoPorId, dtCadastro, efetivadoPorId, dtEfetivacao, pagamento.id]);
            return result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async existe(id) {
        try {
            const result = await pool.query("select id from pagamentos_comissoes where id=$1", [id]);
            return result.rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async existePorContratoId(contratoId) {
        try {
            const query = "select id from pagamentos_comissoes where contrato_id=$1";
            const result = await pool.query(query, [contratoId]);
            return result.rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    //criterios {corretorId: number, cadastradoPor: number, efetivadoPor: number, efetivado:boolean}
    async listar(criterios=null){
        try{
            let strQuery = "select * from pagamentos_comissoes";
            const values = [];
            if(criterios){
                strQuery+= " where ";
                const keys = Object.keys(criterios);
                for(let i = 0; i < keys.length; i++){
                    strQuery+= " " + keys[i] + "=$" + (i+1);
                    values.push(criterios[keys[i]]);
                    if(i < keys.length -1){
                        strQuery+= " and ";
                    }
                }
            }
            const result = await pool.query(strQuery, values);
            const pagamentos = [];
            result.rows.forEach(row=>{
                pagamentos.push(this.criarObjeto(row))
            });
            return pagamentos;
            
        }catch(e){
            PgUtil.checkError(e);
        }
    }

    async listarTodos() {
        try {
            const pagamentos = [];
            const strQuery = this.querySelect + "true order by efetivado desc, dt_efetivacao desc";
            const result = await pool.query(strQuery)
            for (let i = 0; i < result.rows.length; i++) {
                const pagamento = this.criarObjeto(result.rows[i]);
                pagamentos.push(pagamento);
            }
            return pagamentos;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async deletar(id) {
        try {
            const result = await pool.query("delete from pagamentos_comissoes where id=$1 returning id", [id]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Pagamento inexistente.");
            }
            return result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    criarObjeto(row) {
        const pagamentoComissao = new PagamentoComissao();
        pagamentoComissao.id = row.id;
        pagamentoComissao.contrato = { id: row.contrato_id, valor: row.valor };
        pagamentoComissao.dtEfetivacao = row.dt_efetivacao;
        pagamentoComissao.percentagemPromotora = row.percentagem_promotora;
        pagamentoComissao.percentagemCorretor = row.percentagem_corretor;
        pagamentoComissao.valorPromotora = row.valor_promotora;
        pagamentoComissao.valorCorretor = row.valor_corretor;
        pagamentoComissao.efetivado = row.efetivado;
        pagamentoComissao.cadastradoPor = new Usuario(row.cadastrado_por);
        pagamentoComissao.dtCadastro = row.dt_cadastro;
        pagamentoComissao.efetivadoPor = row.efetivado_por ? { id: row.efetivado_por } : null;
        pagamentoComissao.corretor = { id: row.corretor_id };
        return pagamentoComissao;
    }
}

module.exports = PsqlPagamentoComissaoDAO;