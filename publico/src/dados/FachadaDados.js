const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const DAOFactory = require('./DAOFactory');

class FachadaDados {
    static getInstancia() {
        if (this.instancia == null) {
            this.instancia = new FachadaDados();
            return this.instancia;
        }

        return this.instancia;
    }

    async obterUsuarioPorId(id) {
        const dao = await DAOFactory.getUsuarioDAO();
        return await dao.obter(id);
    }

    async obterUsuarioPorNome(nomeUsuario){
        const dao = await DAOFactory.getUsuarioDAO();
        return await dao.obterPorNome(nomeUsuario);
    }

    async obterUsuarioSuperPorNome(nomeUsuario) {
        const dao = await DAOFactory.getUsuarioSuperDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async obterUsuarioAdmPorNome(nomeUsuario) {
        const dao = await DAOFactory.getUsuarioAdmDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async obterUsuarioFinanceiroPorNome(nomeUsuario) {
        const dao = await DAOFactory.getUsuarioFinanceiroDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async obterUsuarioCadastroPorNome(nomeUsuario) {
        const dao = await DAOFactory.getUsuarioCadastroDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async salvarUsuarioSuper(usuario) {
        const dao = await DAOFactory.getUsuarioSuperDAO();
        return await dao.salvar(usuario);
    }

    async salvarUsuarioAdmin(usuario) {
        const dao = await DAOFactory.getUsuarioAdmDAO();
        return await dao.salvar(usuario);
    }

    async salvarUsuarioFinanceiro(usuario) {
        const dao = await DAOFactory.getUsuarioFinanceiroDAO();
        return await dao.salvar(usuario);
    }

    async salvarUsuarioCadastro(usuario) {
        const dao = await DAOFactory.getUsuarioCadastroDAO();
        return await dao.salvar(usuario);
    }

    async obterBancoPorID(id){
        const dao = await DAOFactory.getBancoDAO();
        return await dao.obterPorId(id);
    }

    async obterBancoPorCodigo(codigo) {
        const dao = await DAOFactory.getBancoDAO();
        return await dao.obterPorCodigo(codigo);
    }

    async salvarBanco(banco) {
        const dao = await DAOFactory.getBancoDAO();
        return await dao.salvar(banco);
    }

    async atualizarBanco(campos){
        const dao = await DAOFactory.getBancoDAO();
        return await dao.atualizar(campos);
    }

    async listarBancos() {
        const dao = await DAOFactory.getBancoDAO();
        return await dao.listar();
    }

    async deletarBanco(id) {
        const dao = await DAOFactory.getBancoDAO();
        return await dao.deletar(id);
    }

    async existeCodigoDeBanco(codigo){
        const dao = await DAOFactory.getBancoDAO();
        return await dao.existeCodigo(codigo);
    }

    async existeNomeDeBanco(nome){
        const dao = await DAOFactory.getBancoDAO();
        return await dao.existeNome(nome);
    }

    async existeOrgaoPorSigla(sigla) {
        const dao = await DAOFactory.getOrgaoDAO();
        return await dao.existePorSigla(sigla);
    }

    async existeOrgaoPorNome(nome) {
        const dao = await DAOFactory.getOrgaoDAO();
        return await dao.existePorNome(nome);
    }

    async obterOrgaoPorID(id){
        const dao = await DAOFactory.getOrgaoDAO();
        return await dao.obterPorId(id);
    }

    async salvarOrgao(orgao) {
        const dao = await DAOFactory.getOrgaoDAO();
        return await dao.salvar(orgao);
    }

    async listarOrgaos() {
        const dao = await DAOFactory.getOrgaoDAO();
        return await dao.listar();
    }

    async deletarOrgao(id){
        const dao = await DAOFactory.getOrgaoDAO();
        return await dao.deletar(id);
    }

    async obterEstadoPorId(id) {
        const dao = await DAOFactory.getEstadoDAO();
        return await dao.obter(id);
    }

    async existeEstadoPorSigla(sigla){
        const dao = await DAOFactory.getEstadoDAO();
        return await dao.existePorSigla(sigla);
    }

    async salvarEstado(estado) {
        const dao = await DAOFactory.getEstadoDAO();
        return await dao.salvar(estado);
    }

    async deletarEstado(id) {
        const dao = await DAOFactory.getEstadoDAO();
        return await dao.deletar(id);
    }

    async listarEstados() {
        const dao = await DAOFactory.getEstadoDAO();
        return await dao.listar();
    }

    async obterCidadePorId(id) {
        const dao = await DAOFactory.getCidadeDao();
        return await dao.obterPorId(id);
    }

    async existeCidadeNoEstadoPorNome(nome, estadoID) {
        const dao = await DAOFactory.getCidadeDao();
        return await dao.existeNoEstadoPorNome(nome, estadoID);
    }

    async salvarCidade(cidade) {
        const dao = await DAOFactory.getCidadeDao();
        return await dao.salvar(cidade);
    }

    async listarCidades() {
        const dao = await DAOFactory.getCidadeDao();
        return await dao.listarTodos();
    }

    async listarCidadesPorEstado(estado_id) {
        const dao = await DAOFactory.getCidadeDao();
        return await dao.listarPorEstado(estado_id);
    }

    async deletarCidade(id) {
        const dao = await DAOFactory.getCidadeDao();
        return await dao.deletar(id);
    }

    async obterCorretorPorId(id) {
        const dao = await DAOFactory.getCorretorDao();
        return await dao.obterPorId(id);
    }

    async salvarCorretor(corretor) {
        const dao = await DAOFactory.getCorretorDao();
        return await dao.salvar(corretor);
    }

    async listarTodosCorretores() {
        const dao = await DAOFactory.getCorretorDao();
        return await dao.listarTodos();
    }

    async obterClientePorId(id) {
        const dao = await DAOFactory.getClienteDao();
        return await dao.obterPorId(id);
    }

    async obterClientePorCpf(cpf) {
        const dao = await DAOFactory.getClienteDao();
        return await dao.obterPorCpf(cpf);
    }

    async listarClientes(){
        const dao = await DAOFactory.getClienteDao();
        return await dao.listar();
    }

    async listarClientesPorNomeLike(nome) {
        const dao = await DAOFactory.getClienteDao();
        return await dao.listarPorNomeLike(nome);
    }

    async atualizarCliente(cliente) {
        const dao = await DAOFactory.getClienteDao();
        return await dao.atualizar(cliente);
    }

    async salvarCliente(cliente) {
        const dao = await DAOFactory.getClienteDao();
        return await dao.salvar(cliente);
    }

    async deletarCliente(id){
        const dao = await DAOFactory.getClienteDao();
        return await dao.deletar(id);
    }

    async salvarProduto(produto) {
        const dao = await DAOFactory.getProdutoDAO();
        return await dao.salvar(produto);
    }

    async deletarProduto(id){
        const dao = await DAOFactory.getProdutoDAO();
        return await dao.deletar(id);
    }

    async existeProduto(produto) {
        const dao = await DAOFactory.getProdutoDAO();
        return await dao.existe(produto);
    }

    async listarProdutosPorCriterios(criterios) {
        const dao = await DAOFactory.getProdutoDAO();
        return await dao.listarProdutosPorCriterios(criterios);
    }

    async obterComissionamentoPromotoraPorId(id) {
        let dao = await DAOFactory.getComissionamentoPromotoraDAO();
        return await dao.obterPorId(id);
    }

    async obterComissionamentoPromotora(produtoId, bancoId) {
        let dao = await DAOFactory.getComissionamentoPromotoraDAO();
        return await dao.obterPorProdutoEBanco(produtoId, bancoId);
    }

    async salvarComissionamentoPromotora(comissionamento) {
        let dao = await DAOFactory.getComissionamentoPromotoraDAO();
        return await dao.salvar(comissionamento);
    }

    async existeComissionamentoPromotora(produtoId, bancoId) {
        let dao = await DAOFactory.getComissionamentoPromotoraDAO();
        return await dao.existe(produtoId, bancoId);
    }

    async obterComissionamentoCorretor(corretorId, bancoId, produtoId) {
        const dao = await DAOFactory.getComissionamentoCorretorDAO();
        return dao.obter(corretorId, bancoId, produtoId);
    }

    async salvarComissionamentoCorretor(comissionamento) {
        let dao = await DAOFactory.getComissionamentoCorretorDAO();
        return await dao.salvar(comissionamento);
    }

    async existeComissionamentoCorretor(comissionamento) {
        let dao = await DAOFactory.getComissionamentoCorretorDAO();
        return await dao.existe(comissionamento);
    }

    async obterContaBancariaPorId(id) {
        let dao = await DAOFactory.getContaBancariaDao();
        return await dao.obterPorId(id);
    }

    async obterContratoPorId(id) {
        const dao = await DAOFactory.getContratoDAO();
        return await dao.obterPorId(id);
    }

    async salvarContrato(contrato) {
        let dao = await DAOFactory.getContratoDAO();
        return await dao.salvar(contrato,true,null);
    }

    async atualizarContrato(contrato, rollback) {
        let dao = await DAOFactory.getContratoDAO();
        return await dao.atualizar(contrato, rollback);
    }

    async listarContratosPorCriterios(criterios) {
        const dao = await DAOFactory.getContratoDAO();
        return await dao.listarPorCriterios(criterios);
    }

    async deletarContrato(id) {
        const dao = await DAOFactory.getContratoDAO();
        return await dao.deletar(id);
    }

    async salvarPagamentoComissao(pagamentoComissao) {
        const dao = DAOFactory.getPagamentoComissaoDAO();
        return await dao.salvar(pagamentoComissao);
    }

    async existePagamentoPorContratoId(contratoId) {
        const dao = await DAOFactory.getPagamentoComissaoDAO();
        return await dao.existePorContratoId(contratoId);
    }
}

module.exports = FachadaDados;