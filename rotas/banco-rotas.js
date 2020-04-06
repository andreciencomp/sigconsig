const express = require('express');
const roteadorBancos = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');

roteadorBancos.get('/bancos/:codigo',async (req, res, next)=>{

    try{

        let fachada = await FachadaNegocio.instancia;
        let banco = await fachada.obterBancoPorCodigo(req.params.codigo);
        res.status(200).send(banco);
        return;
    }catch(e){

        console.log(e);
        res.status(500).send(authService.criarPayload(null,null,e,"Erro"));
    }



});

roteadorBancos.post('/bancos/cadastrar',
            authService.usuarioAdminFiltro, async(req, res, next)=>{
        
        try{

            let fachada = FachadaNegocio.instancia;
            await fachada.cadastrarBanco(req.body.codigo, req.body.nome);
            res.status(201).send(authService.criarPayload(null,null,null,'OK'));
        }catch(e){
            if (e == 'BD_EXCEPTION'){
                res.status(400).send(authService.criarPayload(null,null,e,'Erro no Banco de dados'));
                return;
            }
            else if(e == 'DADOS_INVALIDOS'){
                res.status(400).send(authService.criarPayload(null,null,e,'Dados inválidos'));
                return;
            }else{
                res.status(400).send(authService.criarPayload(null,null,e,'Erro desconhecido'));
                return;
            }
            

        }


});

module.exports = roteadorBancos;

