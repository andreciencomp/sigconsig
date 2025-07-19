const UsuarioService = require('./UsuarioService');
const BancoService = require('./BancoService');
const OrgaoService = require('./OrgaoService');
const EstadosCidadesService = require('./EstadoCidadesService');
const CorretorService = require('./CorretorService');
const ClienteService = require('./ClienteService');
const ProdutoService = require('./ProdutoService');
const ComissionamentoService = require('./ComissionamentoService');
const ContratoService = require('./ContratoService');
const PagamentoService = require('./PagamentoService');
const AuthService = require('./AuthService');

class FachadaNegocio{

    async obterUsuarioPorId(id){
        const usuarioService = new UsuarioService();
        return await usuarioService.obterUsuarioPorId(id);
    }

    async login(nomeUsuario, senha){
        const authService = new AuthService();
        return await authService.login(nomeUsuario, senha);
    }

    async cadastrarUsuario(usuario){
        const usuarioService = new UsuarioService();
        return await usuarioService.cadastrarUsuario(usuario);
    }

    async listarUsuarios(criterios=null){
        const usuarioService = new UsuarioService();
        return await usuarioService.listarUsuarios(criterios);
    }

    async atualizarSenha(usuario){
        const usuarioService = new UsuarioService();
        return await usuarioService.atualizarSenha(usuario);
    }

    async deletarUsuario(id){
        const usuarioService = new UsuarioService();
        return await usuarioService.deletarUsuario(id);

    }

    async obterBancoPorCodigo(codigo){

        const bancoService = new BancoService();
        return await bancoService.obterBancoPorCodigo(codigo);
    }

    async cadastrarBanco(banco){
        const bancoService = new BancoService();
        return await bancoService.cadastrarBanco(banco);

    }

    async atualizarBanco(campos){
        const bancoService = new BancoService();
        return await bancoService.atualizarBanco(campos);
    }

    async listarBancos(){
        const bancoService = new BancoService();
        return await bancoService.listarBancos();
    }

    async deletarBanco(id){
        const bancoService = new BancoService();
        return await bancoService.deletarBanco(id);
    }

    async obterOrgaoPorID(id){
        const orgaoService = new OrgaoService();
        return await orgaoService.obterOrgaoPorID(id);
    }

    async cadastrarOrgao(orgao){
        const orgaoService = new OrgaoService();
        return await orgaoService.cadastrarOrgao(orgao);
    }

    async atualizarOrgao(orgao){
        const orgaoService = new OrgaoService();
        return await orgaoService.atualizarOrgao(orgao);
    }

    async listarOrgaos(){
        const orgaoService = new OrgaoService();
        return await orgaoService.listarOrgaos();
    }

    async deletarOrgao(id){
        const orgaoService = new OrgaoService();
        return await orgaoService.deletarOrgao(id);
    }

    async obterEstadoPorID(id){
        const estadosCidadesService = new EstadosCidadesService();
        return await estadosCidadesService.obterEstadoPorId(id);
    }

    async cadastrarEstado(estado){
        const estadosCidadesService = new EstadosCidadesService();
        return await estadosCidadesService.cadastrarEstado(estado);
    }

    async atualizarEstado(estado){
        const estadosCidadesService = new EstadosCidadesService();
        return await estadosCidadesService.atualizarEstado(estado);
    }

    async listarEstados(){
        const estadosCidadesService = new EstadosCidadesService();
        return await estadosCidadesService.listarEstados();
    }

    async deletarEstado(id){
        const estadosCidadesService = new EstadosCidadesService();
        return await estadosCidadesService.deletarEstado(id);
    }

    async obterCidadePorId(id){
        const estadosCidadesService = new EstadosCidadesService();
        return estadosCidadesService.obterCidadePorId(id); 
    }

    async cadastrarCidade(cidade){
        const estadosCidadesService = new EstadosCidadesService();
        return await estadosCidadesService.cadastrarCidade(cidade);
    }

    async atualizarCidade(cidade){
        const estadosCidadesService = new EstadosCidadesService();
        return await estadosCidadesService.atualizarCidade(cidade);
    }

    async listarCidades(){
        const estadosCidadesService = new EstadosCidadesService();
        return await estadosCidadesService.listarCidades();
    }

    async listarCidadesPorEstado(estado_id){
        const estadosCidadesService = new EstadosCidadesService();
        return await estadosCidadesService.listarCidadesPorEstado(estado_id);
    }

    async deletarCidade(id){
        const estadosCidadesService = new EstadosCidadesService();
        return await estadosCidadesService.deletarCidade(id);
    }

    async obterCorretorPorID(id){
        const corretorService = new CorretorService();
        return await corretorService.obterCorretorPorID(id);
    }

    async cadastrarCorretor(corretor){
        const corretorService = new CorretorService();
        return await corretorService.cadastrar(corretor);
    }

    async atualizarCorretor(corretor){
        const corretorService = new CorretorService();
        return await corretorService.atualizarCorretor(corretor);
    }

    async listarTodosCorretores(){
        const corretorService = new CorretorService();
        return await corretorService.listarTodos();
    }

    async deletarCorretor(id){
        const corretorService = new CorretorService();
        return await corretorService.deletarCorretor(id);
    }

    async obterClientePorId(id){
        const clienteService = new ClienteService();
        return await clienteService.obterPorId(id);
    }

    async obterClientePorCpf(cpf){
        const clienteService = new ClienteService();
        return await clienteService.obterPorCpf(cpf);
    }

    async cadastrarCliente(cliente){
        const clienteService = new ClienteService();
        return await clienteService.cadastrar(cliente);
    }

    async atualizarCliente(cliente){
        const clienteService = new ClienteService();
        return await clienteService.atualizarCliente(cliente);
    }

    async listarClientes(){
        const clienteService = new ClienteService();
        return await clienteService.listarClientes();
    }

    async listarClientesPorNomeLike(nome){
        const clienteService = new ClienteService();
        return await clienteService.listarClientesPorNomeLike(nome);
    }

    async deletarCliente(id){
        const clienteService = new ClienteService();
        return await clienteService.deletarCliente(id);
    }

    async obterProdutoPorID(id){
        const produtoService = new ProdutoService();
        return await produtoService.obterProdutoPorID(id);
    }

    async cadastrarProduto(produto){
        const produtoService = new ProdutoService();
        return await produtoService.cadastrar(produto);
    }

    async atualizarProduto(produto){
        const produtoService = new ProdutoService();
        return await produtoService.atualizarProduto(produto);
    }
    async listarProdutos(criterios=null){
        const produtoService = new ProdutoService();
        return await produtoService.listarProdutos(criterios);
    }
    async deletarProduto(id){
        const produtoService = new ProdutoService();
        return await produtoService.deletar(id);
    }

    async existeProduto(produto){
        const produtoService = new ProdutoService();
        return await produtoService.existe(produto);
    }
    
    async obterComissionamentoPromotoraPorId(id){
        const comissionamentoService = new ComissionamentoService();
        return await comissionamentoService.obterComissionamentoPromotoraPorId(id);
    }

    async cadastrarComissionamentoPromotora(comissionamento){
        const comissionamentoService = new ComissionamentoService();
        return await comissionamentoService.cadastrarComissionamentoPromotora(comissionamento);
    }

    async cadastrarComissionamentoCorretor(comissionamento){
        const comissionamentoService = new ComissionamentoService();
        return await comissionamentoService.cadastrarComissionamentoCorretor(comissionamento);
    }

    async obterContratoPorID(id){
        const contratoService = new ContratoService();
        return await contratoService.obterPorID(id);
    }

    async cadastrarContrato(contrato){
        const contratoService = new ContratoService();
        return await contratoService.cadastrar(contrato);
    }

    async atualizarContrato(contrato){
        const contratoService = new ContratoService();
        return await contratoService.atualizar(contrato);
    }

    async liberarContrato(contratoId, dtLiberacao){
        const contratoService = new ContratoService();
        return await contratoService.liberar(contratoId, dtLiberacao);
    }

    async liberarVariosContratos(arrayContratoId, dtLiberacao){
        const contratoService = new ContratoService();
        return await contratoService.liberarVarios(arrayContratoId, dtLiberacao);
    }

    async listarContratos(criterios=null){
        const contratoService = new ContratoService();
        return await contratoService.listarContratos(criterios);
    }

    async deletarContrato(id){
        const contratoService = new ContratoService();
        return await contratoService.deletarContrato(id);
    }

    async gerarPagamentoDeComissao(contratoID){
        const pagamentoService = new PagamentoService();
        return await pagamentoService.gerarPagamentoComissao(contratoID);
    }

    async efetivarPagamento(id){
        const pagamentoService = new PagamentoService();
        return await pagamentoService.efetivarPagamento(id);
    }
    
    async listarTodosPagamentos(){
        const pagamentoService = new PagamentoService();
        return await pagamentoService.listarTodosPagamentos();
    }

    async deletarPagamentoComissao(id){
        const pagamentoService = new PagamentoService();
        return await pagamentoService.deletarPagamentoComissao(id);
    }

}

module.exports = FachadaNegocio;