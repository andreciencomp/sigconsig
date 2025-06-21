const express = require('express');
const router = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const CorretorValidator = require('../publico/validators/CorretorValidator');

router.get('/corretores/:id',authService.usuarioCadastroFiltro, async (req,res)=>{
    try{
        const fachada = new FachadaNegocio();
        const corretor = await fachada.obterCorretorPorID(req.params.id);
        return res.status(200).send({dados: corretor});
        
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
})

router.post('/corretores/cadastrar', authService.usuarioAdminFiltro, async (req, res) => {
    const fachada = new FachadaNegocio();
    try {
        CorretorValidator.validarCadastro(req.body);
        const resposta = await fachada.cadastrarCorretor(req.body);
        return res.status(201).send({ dados: resposta });

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.get('/corretores', authService.usuarioAutenticadoFiltro, async (req, res) => {
    const fachada = new FachadaNegocio();
    try {
        const corretores = await fachada.listarTodosCorretores();
        return res.status(200).send({ dados: corretores });
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

});

module.exports = router;