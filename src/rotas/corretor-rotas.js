const express = require('express');
const router = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const CorretorValidator = require('../validators/CorretorValidator');

router.get('/corretores/:id',authService.usuarioCadastroFiltro, async (req,res)=>{
    try{
        const fachada = new FachadaNegocio();
        const corretor = await fachada.obterCorretorPorID(req.params.id);
        return res.status(200).send(corretor);

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
})

router.post('/corretores/cadastrar', authService.usuarioAdminFiltro, async (req, res) => {
    const fachada = new FachadaNegocio();
    try {
        CorretorValidator.validarCadastro(req.body);
        const corretorId = await fachada.cadastrarCorretor(req.body);
        return res.status(201).send(corretorId);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.put('/corretores/atualizar', authService.usuarioAdminFiltro, async (req, res)=>{
    const fachada = new FachadaNegocio();
    try{
        CorretorValidator.validarAtualizacao(req.body);
        const corretorId = await fachada.atualizarCorretor(req.body);
        return res.status(200).send(corretorId);
        
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
})

router.get('/corretores', authService.usuarioAutenticadoFiltro, async (req, res) => {
    const fachada = new FachadaNegocio();
    try {
        const corretores = await fachada.listarTodosCorretores();
        return res.status(200).send(corretores);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

});

router.delete('/corretores/deletar/:id', authService.usuarioAdminFiltro, async (req, res)=>{
    const fachada = new FachadaNegocio();
    try{
        const corretorId = await fachada.deletarCorretor(req.params.id);
        return res.status(200).send(corretorId);

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
})

module.exports = router;