const FachadaDados = require('../dados/FachadaDados');

class GerenciaEstadosCidades{

    async obterEstadoPorId(id){
        let fachada = FachadaDados.instancia;
        return await fachada.obterEstadoPorId();

    }
    
}

 let testar = async()=>{
    let g = await new GerenciaEstadosCidades();

let e =  await g.obterEstadoPorId(1);
console.log(e);
}

testar();


module.exports = GerenciaEstadosCidades;