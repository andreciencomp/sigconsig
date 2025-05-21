const DAOFactory = require('./DAOFactory');

class FachadaDados{

    static instancia = new FachadaDados();

    static getInstancia(){

        if(this.instancia == null){
            this.instancia = new FachadaDados();
            return this.instancia;
        }

        return this.instancia;
    }

    salvarUsuario(usuario){

        console.log("Não implementado ainda");
    }

    async obterUsuarioPorId(id){

        let dao = await DAOFactory.getUsuarioSuperDAO();  
        let usr;
        usr =  await dao.obter(id);
        return usr;
    }

    async obterUsuarioSuperPorNome(nomeUsuario){
        const dao = await DAOFactory.getUsuarioSuperDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async obterUsuarioAdmPorNome(nomeUsuario){
        const dao = await DAOFactory.getUsuarioAdmDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async obterUsuarioFinanceiroPorNome(nomeUsuario){
        const dao = await DAOFactory.getUsuarioFinanceiroDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async obterUsuarioCadastroPorNome(nomeUsuario){
        const dao = await DAOFactory.getUsuarioCadastroDAO();
        let usr = await dao.obterPorNome(nomeUsuario);
        return usr;
    }

    async salvarUsuarioSuper(usuario){
        const dao = await DAOFactory.getUsuarioSuperDAO();
        await dao.salvar(usuario);
    }

    async salvarUsuarioAdmin(usuario){
        const dao = await DAOFactory.getUsuarioAdmDAO();
        await dao.salvar(usuario);
    }

    async salvarUsuarioFinanceiro(usuario){
        const dao = await DAOFactory.getUsuarioFinanceiroDAO();
        await dao.salvar(usuario);
    }

    async salvarUsuarioCadastro(usuario){
        const dao = await DAOFactory.getUsuarioCadastroDAO();
        await dao.salvar(usuario);
    }

    async obterBancoPorCodigo(codigo){
        const dao = await DAOFactory.getBancoDAO();
        return await dao.obterPorCodigo(codigo);
    }

    async salvarBanco(banco){
        const dao = await DAOFactory.getBancoDAO();
        return await dao.salvar(banco);
    }

    async listarBancos(){
        const dao = await DAOFactory.getBancoDAO();
        return await dao.listar();
    }

    async existeOrgaoPorSigla(sigla){
        const dao= await DAOFactory.getOrgaoDAO();
        return await dao.existePorSigla(sigla);
    }

    async existeOrgaoPorNome(nome){
        const dao= await DAOFactory.getOrgaoDAO();
        return await dao.existePorNome(nome);
    }

    async salvarOrgao(orgao){

        const dao = await DAOFactory.getOrgaoDAO();
        return await dao.salvar(orgao);
    }

    async listarOrgaos(){

        const dao = await DAOFactory.getOrgaoDAO();
        return await dao.listar();
    }

    async obterEstadoPorId(id){
        const dao = await DAOFactory.getEstadoDAO();
        return await dao.obter(id);
    }

    async listarEstados(){
        const dao = await DAOFactory.getEstadoDAO();
        return await dao.listar();
    }

    async obterCidadePorId(id){
        const dao = await DAOFactory.getCidadeDao();
        return await dao.obterPorId(id);
    }

    async listarCidades(){
        const dao = await DAOFactory.getCidadeDao();
        return await dao.listarTodos();
    }

    async listarCidadesPorEstado(estado_id){
        const dao = await DAOFactory.getCidadeDao();
        return await dao.listarPorEstado(estado_id);
    }

    async obterCorretorPorId(id){
        const dao = await DAOFactory.getCorretorDao();
        return await dao.obterPorId(id);
    }

    async salvarCorretor(corretor){
        const dao = await DAOFactory.getCorretorDao();
        return await dao.salvar(corretor);
    }

    async listarTodosCorretores(){
        const dao = await DAOFactory.getCorretorDao();
        return await dao.listarTodos();
    }

    async obterClientePorId(id){
        const dao = await DAOFactory.getClienteDao();
        return await dao.obterPorId(id);
    }

    async obterClientePorCpf(cpf){
        const dao = await DAOFactory.getClienteDao();
        return await dao.obterPorCpf(cpf);
    }

    async listarClientesPorNomeLike(nome){
        const dao = await DAOFactory.getClienteDao();
        return await dao.listarPorNomeLike(nome);
    }

    async atualizarCliente(cliente){
        const dao = await DAOFactory.getClienteDao();
        return await dao.atualizar(cliente);
    }

    async salvarCliente(cliente){
        const dao = await DAOFactory.getClienteDao();
        return await dao.salvar(cliente);
    }

    async salvarProduto(produto){
        const dao = await DAOFactory.getProdutoDAO();
        return await dao.salvar(produto);
    }

    async existeProduto(produto){
        const dao = await DAOFactory.getProdutoDAO();
        return await dao.existe(produto);
    }

    async listarProdutosPorCriterios(criterios){
        const dao = await DAOFactory.getProdutoDAO();
        return await dao.listarProdutosPorCriterios(criterios);
    }

    async obterComissionamentoPromotoraPorId(id){
        let dao = await DAOFactory.getComissionamentoPromotoraDAO();
        return await dao.obterPorId(id);
    }

    async obterComissionamentoPromotora(produtoId, bancoId){
        let dao  = await DAOFactory.getComissionamentoPromotoraDAO();
        return await dao.obterPorProdutoEBanco(produtoId, bancoId);
    }

    async salvarComissionamentoPromotora(comissionamento){
        let dao = await DAOFactory.getComissionamentoPromotoraDAO();
        return await dao.salvar(comissionamento); 
    }

    async existeComissionamentoPromotora(produtoId, bancoId){
        let dao = await DAOFactory.getComissionamentoPromotoraDAO();
        return await dao.existe(produtoId, bancoId);
    }

    async obterComissionamentoCorretor(corretorId, bancoId, produtoId){
        const dao = await DAOFactory.getComissionamentoCorretorDAO();
        return dao.obter(corretorId, bancoId, produtoId);
    }

    async salvarComissionamentoCorretor(comissionamento){
        let dao = await DAOFactory.getComissionamentoCorretorDAO();
        return await dao.salvar(comissionamento);
    }

    async existeComissionamentoCorretor(comissionamento){
        let dao = await DAOFactory.getComissionamentoCorretorDAO();
        return await dao.existe(comissionamento);
    }

    async obterContaBancariaPorId(id){
        let dao = await DAOFactory.getContaBancariaDao();
        return await dao.obterPorId(id);
    }

    async obterContratoPorId(id){
        const dao = await DAOFactory.getContratoDAO();
        return await dao.obterPorId(id);
    }

    async salvarContrato(contrato){
        let dao = await DAOFactory.getContratoDAO();
        return await dao.salvar(contrato,true);
    }

    async atualizarContrato(contrato, rollback){
        let dao = await DAOFactory.getContratoDAO();
        return await dao.atualizar(contrato, rollback);
    }

    async listarContratosPorCriterios(criterios){
        const dao = await DAOFactory.getContratoDAO();
        return await dao.listarPorCriterios(criterios);
    }

    async salvarPagamentoComissao(pagamentoComissao){
        const dao = await DAOFactory.getPagamentoComissaoDAO();
        return await dao.salvar(pagamentoComissao);
    }

    async existePagamentoPorContratoId(contratoId){
        const dao = await DAOFactory.getPagamentoComissaoDAO();
        return await dao.existePorContratoId(contratoId);
    }

}

module.exports = FachadaDados;