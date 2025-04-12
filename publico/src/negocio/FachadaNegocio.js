
const GerenciaUsuarios = require('../negocio/GerenciaUsuarios');
const GerenciaBancos = require('./GerenciaBancos');
const Banco = require('../entidades/Banco');
const GerenciaOrgaos = require('./GerenciaOrgaos');
const GerenciaEstadosCidades = require('../negocio/GerenciaEstadosCidades');
const GerenciaCorretores = require('./GerenciaCorretores');

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

    async cadastrarUsuario(nomeUsuario, senha, tipo){
        
        await this.gerenciaUsuarios.cadastrarUsuario(nomeUsuario,senha,tipo);
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

    async listarBancos(){

        let gerenciaBancos = new GerenciaBancos();
        return await gerenciaBancos.listarBancos();
    }

    async cadastrarOrgao(sigla, nome){
        let gerenciaOrgaos = new GerenciaOrgaos();
        await gerenciaOrgaos.cadastrarOrgao(sigla, nome);
    }

    async listarOrgaos(){

        let gerenciaOrgaos = new GerenciaOrgaos();
        let orgaos = await gerenciaOrgaos.listarOrgaos();
        return orgaos;
    }

    async listarEstados(){
        let gerenciaEstadosCidades = new GerenciaEstadosCidades();
        let estados = await gerenciaEstadosCidades.listarEstados();
        return estados;
    }

    async obterCidadePorId(id){
        let gerenciaEstadosCidades = new GerenciaEstadosCidades();
        return gerenciaEstadosCidades.obterCidadePorId(id); 
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

    async cadastrarCorretor(corretor){
        let gerenciaCorretores = new GerenciaCorretores();
        return await gerenciaCorretores.cadastrar(corretor);
    }

    async listarTodosCorretores(){
        let gerenciaCorretores = new GerenciaCorretores();
        return await gerenciaCorretores.listarTodos();
    }
}

module.exports = FachadaNegocio;