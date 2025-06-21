
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

    async obterUsuarioPorId(id){
        const gerenciaUsuarios = new GerenciaUsuarios();
        return await gerenciaUsuarios.obterUsuarioPorId(id);
    }

    async login(nomeUsuario, senha){
        const gerenciaUsuarios = new GerenciaUsuarios();
        return await gerenciaUsuarios.login(nomeUsuario, senha);
    }

    async cadastrarUsuario(usuario){
        const gerenciaUsuarios = new GerenciaUsuarios();
        return await gerenciaUsuarios.cadastrarUsuario(usuario);
    }

    async obterBancoPorCodigo(codigo){

        const gerenciaBancos = new GerenciaBancos();
        return await gerenciaBancos.obterBancoPorCodigo(codigo);
    }

    async cadastrarBanco(banco){
        const gerenciaBancos = new GerenciaBancos();
        return await gerenciaBancos.cadastrarBanco(banco);

    }

    async atualizarBanco(campos){
        const gerenciaBancos = new GerenciaBancos();
        return await gerenciaBancos.atualizarBanco(campos);
    }

    async listarBancos(){
        const gerenciaBancos = new GerenciaBancos();
        return await gerenciaBancos.listarBancos();
    }

    async deletarBanco(id){
        const gerenciaBancos = new GerenciaBancos();
        return await gerenciaBancos.deletarBanco(id);
    }

    async obterOrgaoPorID(id){
        const gerenciaOrgaos = new GerenciaOrgaos();
        return await gerenciaOrgaos.obterOrgaoPorID(id);
    }

    async cadastrarOrgao(orgao){
        const gerenciaOrgaos = new GerenciaOrgaos();
        return await gerenciaOrgaos.cadastrarOrgao(orgao);
    }

    async atualizarOrgao(orgao){
        const gerenciaOrgaos = new GerenciaOrgaos();
        return await gerenciaOrgaos.atualizarOrgao(orgao);
    }

    async listarOrgaos(){
        const gerenciaOrgaos = new GerenciaOrgaos();
        return await gerenciaOrgaos.listarOrgaos();
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
        const gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return await gerenciaEstadosCidades.listarEstados();
    }

    async deletarEstado(id){
        const gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return await gerenciaEstadosCidades.deletarEstado(id);
    }

    async obterCidadePorId(id){
        const gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return gerenciaEstadosCidades.obterCidadePorId(id); 
    }

    async cadastrarCidade(cidade){
        const gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return await gerenciaEstadosCidades.cadastrarCidade(cidade);
    }

    async atualizarCidade(cidade){
        const gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return await gerenciaEstadosCidades.atualizarCidade(cidade);
    }

    async listarCidades(){
        const gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return await gerenciaEstadosCidades.listarCidades();
    }

    async listarCidadesPorEstado(estado_id){
        const gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return await gerenciaEstadosCidades.listarCidadesPorEstado(estado_id);
    }

    async deletarCidade(id){
        const gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return await gerenciaEstadosCidades.deletarCidade(id);
    }

    async obterCorretorPorID(id){
        const gerenciaCorretores = new GerenciaCorretores();
        return await gerenciaCorretores.obterCorretorPorID(id);
    }

    async cadastrarCorretor(corretor){
        const gerenciaCorretores = new GerenciaCorretores();
        return await gerenciaCorretores.cadastrar(corretor);
    }

    async atualizarCorretor(corretor){
        const gerenciaCorretores = new GerenciaCorretores();
        return await gerenciaCorretores.atualizarCorretor(corretor);
    }

    async listarTodosCorretores(){
        const gerenciaCorretores = new GerenciaCorretores();
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
        const gerenciaClientes = new GerenciaClientes();
        return await gerenciaClientes.cadastrar(cliente);
    }

    async atualizarCliente(cliente){
        const gerenciaClientes = new GerenciaClientes();
        return await gerenciaClientes.atualizarCliente(cliente);
    }

    async listarClientes(){
        const gerenciaClientes = new GerenciaClientes();
        return await gerenciaClientes.listarClientes();
    }

    async listarClientesPorNomeLike(nome){
        const gerenciaClientes = new GerenciaClientes();
        return await gerenciaClientes.listarClientesPorNomeLike(nome);
    }

    async deletarCliente(id){
        const gerenciaClientes = new GerenciaClientes();
        return await gerenciaClientes.deletarCliente(id);
    }

    async obterProdutoPorID(id){
        const gerenciaProdutos = new GerenciaProdutos();
        return await gerenciaProdutos.obterProdutoPorID(id);
    }

    async cadastrarProduto(produto){
        const gerenciaProdutos = new GerenciaProdutos();
        return await gerenciaProdutos.cadastrar(produto);
    }

    async atualizarProduto(produto){
        const gerenciaProdutos = new GerenciaProdutos();
        return await gerenciaProdutos.atualizarProduto(produto);
    }

    async deletarProduto(id){
        const gerenciaProdutos = new GerenciaProdutos();
        return await gerenciaProdutos.deletar(id);
    }

    async existeProduto(produto){
        const gerenciaProdutos = new GerenciaProdutos();
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