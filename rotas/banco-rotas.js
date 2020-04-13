const express = require('express');
const roteadorBancos = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');

roteadorBancos.get('/bancos/obter/:codigo',async (req, res, next)=>{

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

roteadorBancos.get('/bancos/listar', async(req, res, next)=>{
    
    let fachada = FachadaNegocio.instancia;
    try{
        let bancos = await fachada.listarBancos();
        res.status(200).send(authService.criarPayload(null,bancos,null,null));
        return;

    }catch(e){
        switch(e){
            case 'BD_EXCEPTION':
                res.status(400).send(authService.criarPayload(null,null,e,'ERRO_BD'));
            default:
                res.status(500).send(authService.criarPayload(null,null,'ERRO','Erro desconhecido'));
                console.log("Erro desconhecido");
        }

    }
});



module.exports = roteadorBancos;

