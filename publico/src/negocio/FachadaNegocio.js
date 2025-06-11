
const GerenciaUsuarios = require('../negocio/GerenciaUsuarios');
const GerenciaBancos = require('./GerenciaBancos');
const GerenciaOrgaos = require('./GerenciaOrgaos');
const GerenciaEstadosCidades = require('../negocio/GerenciaEstadosCidades');
const GerenciaCorretores = require('./GerenciaCorretores');
const GerenciaClientes = require('./GerenciaClientes');
const GerenciaProdutos = require('./GerenciaProdutos');
const GerenciaComissionamento = require('./GerenciaComissionamento');
const GerenciaContratos = require('./GerenciaContratos');

class FachadaNegocio{

    static instancia = new FachadaNegocio();

    constructor(){

        this.gerenciaUsuarios = new GerenciaUsuarios();
    }

    async obterUsuarioPorId(id){
        
        let usuario =  await this.gerenciaUsuarios.obterUsuarioPorId(id);
        return  usuario;
    }

    async login(nomeUsuario, senha){
        let usuario = await this.gerenciaUsuarios.login(nomeUsuario, senha);
        return usuario;
    }

    async cadastrarUsuario(usuario){
        
        return await this.gerenciaUsuarios.cadastrarUsuario(usuario);
    }

    async obterBancoPorCodigo(codigo){

        let gerenciaBancos = await new GerenciaBancos();
        let banco = await gerenciaBancos.obterBancoPorCodigo(codigo);
        return  banco;
    }

    async cadastrarBanco(codigo, nome){
        let gerenciaBancos = new GerenciaBancos();
        return await gerenciaBancos.cadastrarBanco(codigo, nome);

    }

    async atualizarBanco(campos){
        const gerenciaBancos = new GerenciaBancos();
        return await gerenciaBancos.atualizarBanco(campos);
    }

    async listarBancos(){
        let gerenciaBancos = new GerenciaBancos();
        return await gerenciaBancos.listarBancos();
    }

    async deletarBanco(id){
        const gerenciaBancos = new GerenciaBancos();
        return gerenciaBancos.deletarBanco(id);
    }

    async obterOrgaoPorID(id){
        const gerenciaOrgaos = new GerenciaOrgaos();
        return await gerenciaOrgaos.obterOrgaoPorID(id);
    }

    async cadastrarOrgao(sigla, nome){
        let gerenciaOrgaos = new GerenciaOrgaos();
        return await gerenciaOrgaos.cadastrarOrgao(sigla, nome);
    }

    async listarOrgaos(){
        const gerenciaOrgaos = new GerenciaOrgaos();
        const orgaos = await gerenciaOrgaos.listarOrgaos();
        return orgaos;
    }

    async deletarOrgao(id){
        const gerenciaOrgaos = new GerenciaOrgaos();
        return await gerenciaOrgaos.deletarOrgao(id);
    }

    async obterEstadoPorID(id){
        const gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return await gerenciaEstadosCidades.obterEstadoPorId(id);
    }

    async cadastrarEstado(estado){
        const gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return await gerenciaEstadosCidades.cadastrarEstado(estado);
    }

    async listarEstados(){
        let gerenciaEstadosCidades = new GerenciaEstadosCidades();
        let estados = await gerenciaEstadosCidades.listarEstados();
        return estados;
    }

    async deletarEstado(id){
        const gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return await gerenciaEstadosCidades.deletarEstado(id);
    }

    async obterCidadePorId(id){
        let gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return gerenciaEstadosCidades.obterCidadePorId(id); 
    }

    async cadastrarCidade(cidade){
        const gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return await gerenciaEstadosCidades.cadastrarCidade(cidade);
    }

    async listarCidades(){
        let gerenciaEstadosCidades = new GerenciaEstadosCidades();
        let cidades = await gerenciaEstadosCidades.listarCidades();
        return cidades;
    }

    async listarCidadesPorEstado(estado_id){
        let gerenciaEstadosCidades = new GerenciaEstadosCidades();
        let cidades = await gerenciaEstadosCidades.listarCidadesPorEstado(estado_id);
        return cidades;
    }

    async deletarCidade(id){
        const gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return await gerenciaEstadosCidades.deletarCidade(id);
    }

    async cadastrarCorretor(corretor){
        let gerenciaCorretores = new GerenciaCorretores();
        return await gerenciaCorretores.cadastrar(corretor);
    }

    async listarTodosCorretores(){
        let gerenciaCorretores = new GerenciaCorretores();
        return await gerenciaCorretores.listarTodos();
    }

    async obterClientePorId(id){
        const gerenciaClientes = new GerenciaClientes();
        return await gerenciaClientes.obterPorId(id);
    }

    async obterClientePorCpf(cpf){
        const gerenciaClientes = new GerenciaClientes();
        return await gerenciaClientes.obterPorCpf(cpf);
    }

    async cadastrarCliente(cliente){
        let gerenciaClientes = new GerenciaClientes();
        return await gerenciaClientes.cadastrar(cliente);
    }

    async listarClientesPorNomeLike(nome){
        let gerenciaClientes = new GerenciaClientes();
        return await gerenciaClientes.listarClientesPorNomeLike(nome);
    }

    async deletarCliente(id){
        const gerenciaClientes = new GerenciaClientes();
        return await gerenciaClientes.deletarCliente(id);
    }
    async cadastrarProduto(produto){
        const gerenciaProdutos = new GerenciaProdutos();
        return await gerenciaProdutos.cadastrar(produto);
    }

    async deletarProduto(id){
        const gerenciaProdutos = new GerenciaProdutos();
        return await gerenciaProdutos.deletar(id);
    }

    async existeProduto(produto){
        let gerenciaProdutos = new GerenciaProdutos();
        return await gerenciaProdutos.existe(produto);
    }

    async cadastrarComissionamentoPromotora(comissionamento){
        const gerenciaComissionamento = new GerenciaComissionamento();
        return await gerenciaComissionamento.cadastrarComissionamentoPromotora(comissionamento);
    }

    async cadastrarComissionamentoCorretor(comissionamento){
        const gerenciaComissionamento = new GerenciaComissionamento();
        return await gerenciaComissionamento.cadastrarComissionamentoCorretor(comissionamento);
    }

    async obterContratoPorID(id){
        const gerenciaContratos = new GerenciaContratos();
        return await gerenciaContratos.obterPorID(id);
    }

    async cadastrarContrato(contrato){
        const gerenciaContratos = new GerenciaContratos();
        return await gerenciaContratos.cadastrar(contrato);
    }

    async atualizarContrato(contrato){
        const gerenciaContratos = new GerenciaContratos();
        return await gerenciaContratos.atualizar(contrato);
    }

    async liberarContrato(contratoId, dtLiberacao){
        const gerenciaContratos = new GerenciaContratos();
        return await gerenciaContratos.liberar(contratoId, dtLiberacao);
    }

    async liberarVariosContratos(arrayContratoId, dtLiberacao){
        const gerenciaContratos = new GerenciaContratos();
        return await gerenciaContratos.liberarVarios(arrayContratoId, dtLiberacao);
    }

    async listarContratosPorCriterios(criterios){
        const gerenciaContratos = new GerenciaContratos();
        return await gerenciaContratos.listarPorCriterios(criterios);
    }

    async deletarContrato(id){
        const gerenciaContratos = new GerenciaContratos();
        return gerenciaContratos.deletarContrato(id);
    }

    async gerarPagamentoDeComissao(contratoID, usuarioID){
        const gerenciaPagamentoComissao = new GerenciaComissionamento();
        return await gerenciaPagamentoComissao.gerarPagamentoComissao(contratoID, usuarioID);
    }

}

module.exports = FachadaNegocio;