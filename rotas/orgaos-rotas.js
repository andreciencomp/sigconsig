const express = require('express');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const authService = require('../servicos/auth_service');

const roteador = express.Router();


roteador.post('/orgaos/cadastrar/:sigla/:nome',authService.usuarioAdminFiltro, async (req, res, next)=>{

    let fachada = FachadaNegocio.instancia;
    let sigla = req.params.sigla;
    let nome = req.params.nome;
    try{
        await fachada.cadastrarOrgao(sigla, nome);
        return res.status(201).send({excessao:null, msg:'OK'});
    }catch(e){
        switch(e){
            case 'CHAVE_REPETIDA_EXCEPTION':
                return res.status(401).send({excessao:'CHAVE_REPETIDA_EXCEPTION', msg: 'Registro já existente'});
            
            case 'BD_EXCEPTION':
                return res.status(401).send({excessao:'BD_EXCEPTION',msg:'Erro de BD'});

            default:
                console.log(e);
                return res.status(500).send({excessao:'500', msg:'Erro no servidor'});

        }
    }


});



module.exports = roteador;