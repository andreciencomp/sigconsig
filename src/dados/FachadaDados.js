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
        const dao = DAOFactory.getUsuarioDAO();
        return await dao.obter(id);
    }

    async obterUsuarioPorNome(nomeUsuario){
        const dao = DAOFactory.getUsuarioDAO();
        return await dao.obterPorNome(nomeUsuario);
    }

    async salvarUsuario(usuario){
        const dao = DAOFactory.getUsuarioDAO();
        return await dao.salvar(usuario);
    }

    async obterUsuarioSuperPorNome(nomeUsuario) {
        const dao = DAOFactory.getUsuarioSuperDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async obterUsuarioAdmPorNome(nomeUsuario) {
        const dao = DAOFactory.getUsuarioAdmDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async obterUsuarioFinanceiroPorNome(nomeUsuario) {
        const dao = DAOFactory.getUsuarioFinanceiroDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async obterUsuarioCadastroPorNome(nomeUsuario) {
        const dao = DAOFactory.getUsuarioCadastroDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }



    async salvarUsuarioSuper(usuario) {
        const dao = DAOFactory.getUsuarioSuperDAO();
        return await dao.salvar(usuario);
    }

    async salvarUsuarioAdmin(usuario) {
        const dao = DAOFactory.getUsuarioAdmDAO();
        return await dao.salvar(usuario);
    }

    async salvarUsuarioFinanceiro(usuario) {
        const dao = DAOFactory.getUsuarioFinanceiroDAO();
        return await dao.salvar(usuario);
    }

    async salvarUsuarioCadastro(usuario) {
        const dao = DAOFactory.getUsuarioCadastroDAO();
        return await dao.salvar(usuario);
    }

    async obterBancoPorID(id){
        const dao = DAOFactory.getBancoDAO();
        return await dao.obterPorId(id);
    }

    async obterBancoPorCodigo(codigo) {
        const dao = DAOFactory.getBancoDAO();
        return await dao.obterPorCodigo(codigo);
    }

    async salvarBanco(banco) {
        const dao = DAOFactory.getBancoDAO();
        return await dao.salvar(banco);
    }

    async atualizarBanco(campos){
        const dao = DAOFactory.getBancoDAO();
        return await dao.atualizar(campos);
    }

    async listarBancos() {
        const dao = DAOFactory.getBancoDAO();
        return await dao.listar();
    }

    async deletarBanco(id) {
        const dao = DAOFactory.getBancoDAO();
        return await dao.deletar(id);
    }

    async existeCodigoDeBanco(codigo){
        const dao = DAOFactory.getBancoDAO();
        return await dao.existeCodigo(codigo);
    }

    async existeNomeDeBanco(nome){
        const dao = DAOFactory.getBancoDAO();
        return await dao.existeNome(nome);
    }

    async existeOrgaoPorSigla(sigla) {
        const dao = DAOFactory.getOrgaoDAO();
        return await dao.existePorSigla(sigla);
    }

    async existeOrgaoPorNome(nome) {
        const dao = DAOFactory.getOrgaoDAO();
        return await dao.existePorNome(nome);
    }

    async obterOrgaoPorID(id){
        const dao = DAOFactory.getOrgaoDAO();
        return await dao.obterPorId(id);
    }

    async salvarOrgao(orgao) {
        const dao = DAOFactory.getOrgaoDAO();
        return await dao.salvar(orgao);
    }

    async atualizarOrgao(orgao){
        const dao = DAOFactory.getOrgaoDAO();
        return await dao.atualizar(orgao);
    }

    async listarOrgaos() {
        const dao = DAOFactory.getOrgaoDAO();
        return await dao.listar();
    }

    async existeOrgaoPorID(id){
        const dao = DAOFactory.getOrgaoDAO();
        return await dao.existePorID(id);
    }

    async deletarOrgao(id){
        const dao = DAOFactory.getOrgaoDAO();
        return await dao.deletar(id);
    }

    async obterEstadoPorId(id) {
        const dao = DAOFactory.getEstadoDAO();
        return await dao.obter(id);
    }

    async existeEstadoPorSigla(sigla){
        const dao = DAOFactory.getEstadoDAO();
        return await dao.existePorSigla(sigla);
    }

    async salvarEstado(estado) {
        const dao = DAOFactory.getEstadoDAO();
        return await dao.salvar(estado);
    }

    async atualizarEstado(estado){
        const dao = DAOFactory.getEstadoDAO();
        return await dao.atualizar(estado);
    }

    async deletarEstado(id) {
        const dao = DAOFactory.getEstadoDAO();
        return await dao.deletar(id);
    }

    async listarEstados() {
        const dao = DAOFactory.getEstadoDAO();
        return await dao.listar();
    }

    async obterCidadePorId(id) {
        const dao = DAOFactory.getCidadeDao();
        return await dao.obterPorId(id);
    }

    async existeCidadePorID(id){
        const dao = DAOFactory.getCidadeDao();
        return await dao.existePorID(id);
    }

    async existeCidadeNoEstadoPorNome(nome, estadoID) {
        const dao = DAOFactory.getCidadeDao();
        return await dao.existeNoEstadoPorNome(nome, estadoID);
    }

    async salvarCidade(cidade) {
        const dao = DAOFactory.getCidadeDao();
        return await dao.salvar(cidade);
    }

    async atualizarCidade(cidade){
        const dao = DAOFactory.getCidadeDao();
        return await dao.atualizar(cidade);
    }

    async listarCidades() {
        const dao = DAOFactory.getCidadeDao();
        return await dao.listarTodos();
    }

    async listarCidadesPorEstado(estado_id) {
        const dao = DAOFactory.getCidadeDao();
        return await dao.listarPorEstado(estado_id);
    }

    async deletarCidade(id) {
        const dao = DAOFactory.getCidadeDao();
        return await dao.deletar(id);
    }

    async obterCorretorPorId(id) {
        const dao = DAOFactory.getCorretorDao();
        return await dao.obterPorId(id);
    }

    async salvarCorretor(corretor) {
        const dao = DAOFactory.getCorretorDao();
        return await dao.salvar(corretor);
    }

    async atualizarCorretor(corretor){
        const dao = DAOFactory.getCorretorDao();
        return await dao.atualizar(corretor);
    }

    async listarTodosCorretores() {
        const dao = DAOFactory.getCorretorDao();
        return await dao.listarTodos();
    }

    async deletarCorretor(id){
        const dao = DAOFactory.getCorretorDao();
        return await dao.deletar(id);
    }

    async obterClientePorId(id) {
        const dao = DAOFactory.getClienteDao();
        return await dao.obterPorId(id);
    }

    async obterClientePorCpf(cpf) {
        const dao = DAOFactory.getClienteDao();
        return await dao.obterPorCpf(cpf);
    }

    async listarClientes(){
        const dao = DAOFactory.getClienteDao();
        return await dao.listar();
    }

    async listarClientesPorNomeLike(nome) {
        const dao = DAOFactory.getClienteDao();
        return await dao.listarPorNomeLike(nome);
    }

    async atualizarCliente(cliente) {
        const dao = DAOFactory.getClienteDao();
        return await dao.atualizar(cliente);
    }

    async salvarCliente(cliente) {
        const dao = DAOFactory.getClienteDao();
        return await dao.salvar(cliente);
    }

    async deletarCliente(id){
        const dao = DAOFactory.getClienteDao();
        return await dao.deletar(id);
    }

    async obterProduto(produto){
        const dao = DAOFactory.getProdutoDAO();
        return await dao.obter(produto);
    }
    async obterProdutoPorID(id){
        const dao = DAOFactory.getProdutoDAO();
        return await dao.obterPorId(id);
    }

    async salvarProduto(produto) {
        const dao = DAOFactory.getProdutoDAO();
        return await dao.salvar(produto);
    }

    async atualizarProduto(produto){
        const dao = DAOFactory.getProdutoDAO();
        return await dao.atualizar(produto);
    }

    async deletarProduto(id){
        const dao = DAOFactory.getProdutoDAO();
        return await dao.deletar(id);
    }

    async existeProdutoPorID(id){
        const dao = DAOFactory.getProdutoDAO();
        return await dao.existePorID(id);
    }

    async existeProduto(produto) {
        const dao = DAOFactory.getProdutoDAO();
        return await dao.existe(produto);
    }

    async listarProdutos(criterios=null) {
        const dao = DAOFactory.getProdutoDAO();
        return await dao.listarProdutosPorCriterios(criterios);
    }

    async obterComissionamentoPromotoraPorId(id) {
        const dao = DAOFactory.getComissionamentoPromotoraDAO();
        return await dao.obterPorId(id);
    }

    async obterComissionamentoPromotora(bancoId, produtoId) {
        let dao = DAOFactory.getComissionamentoPromotoraDAO();
        return await dao.obterPorBancoIdEProdutoId(bancoId, produtoId);
    }

    async salvarComissionamentoPromotora(comissionamento) {
        let dao = DAOFactory.getComissionamentoPromotoraDAO();
        return await dao.salvar(comissionamento);
    }

    async existeComissionamentoPromotora(produtoId, bancoId) {
        let dao = DAOFactory.getComissionamentoPromotoraDAO();
        return await dao.existe(produtoId, bancoId);
    }

    async obterComissionamentoCorretor(corretorId, bancoId, produtoId) {
        const dao = DAOFactory.getComissionamentoCorretorDAO();
        return dao.obter(corretorId, bancoId, produtoId);
    }

    async salvarComissionamentoCorretor(comissionamento) {
        let dao = DAOFactory.getComissionamentoCorretorDAO();
        return await dao.salvar(comissionamento);
    }

    async existeComissionamentoCorretor(comissionamento) {
        let dao = DAOFactory.getComissionamentoCorretorDAO();
        return await dao.existe(comissionamento);
    }

    async obterContaBancariaPorId(id) {
        let dao = DAOFactory.getContaBancariaDao();
        return await dao.obterPorId(id);
    }

    async obterContratoPorId(id) {
        const dao = DAOFactory.getContratoDAO();
        return await dao.obterPorId(id);
    }

    async salvarContrato(contrato) {
        let dao = DAOFactory.getContratoDAO();
        return await dao.salvar(contrato);
    }

    async atualizarContrato(contrato) {
        let dao = DAOFactory.getContratoDAO();
        return await dao.atualizar(contrato);
    }

    async listarContratos(criterios=null) {
        const dao = DAOFactory.getContratoDAO();
        return await dao.listar(criterios);
    }

    async deletarContrato(id) {
        const dao = DAOFactory.getContratoDAO();
        return await dao.deletar(id);
    }

    async obterPagamentoComissaoPorId(id){
        const dao = DAOFactory.getPagamentoComissaoDAO();
        return await dao.obterPorId(id);
    }

    async salvarPagamentoComissao(pagamentoComissao) {
        const dao = DAOFactory.getPagamentoComissaoDAO();
        return await dao.salvar(pagamentoComissao);
    }

    async atualizarPagamentoComissao(pagamentoComissao){
        const dao = DAOFactory.getPagamentoComissaoDAO();
        return await dao.atualizar(pagamentoComissao);
    }
   
    async existePagamento(id){
        const dao = DAOFactory.getPagamentoComissaoDAO();
        return await dao.existe(id);
    }

    async existePagamentoPorContratoId(contratoId) {
        const dao = DAOFactory.getPagamentoComissaoDAO();
        return await dao.existePorContratoId(contratoId);
    }

    async listarTodosPagamentos(){
        const dao = DAOFactory.getPagamentoComissaoDAO();
        return await dao.listarTodos();
    }

    async deletarPagamentoComissao(id){
        const dao = DAOFactory.getPagamentoComissaoDAO();
        return await dao.deletar(id);
    }
}

module.exports = FachadaDados;