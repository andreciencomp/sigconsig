const express = require('express');
const roteador = express.Router();
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const authService = require('../servicos/auth_service');
const ExceptionService = require('../servicos/ExceptionService');
const Usuario = require('../publico/src/entidades/Usuario');
const UsuarioNaoAutorizadoException = require('../publico/src/excessoes/UsuarioNaoAutorizadoException');
const DadosInvalidosException = require('../publico/src/excessoes/DadosInvalidosException');
const ValidarUsuario = require('../publico/validators/UsuarioValidator');

roteador.post('/usuarios/cadastrar',
    authService.usuarioAdminFiltro, async (req, res, next) => {
        try {
            const usuario = req.body;
            ValidarUsuario(usuario);
            if(usuario.tipo == Usuario.USUARIO_SUPER){
                throw new DadosInvalidosException("Este tipo de usuário não pode ser cadastrado.");
            }
            if((usuario.tipo == Usuario.USUARIO_ADMIN && req.dadosUsuario.tipo != Usuario.USUARIO_SUPER)){
                throw new UsuarioNaoAutorizadoException("Apenas o usuário SUPER pode realizar esta operação.");
            }
            let fachada = new FachadaNegocio();
            const novoUsuarioID = await fachada.cadastrarUsuario(usuario);
            res.status(201).send({ dados: {id : novoUsuarioID} });

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    });

module.exports = roteador;