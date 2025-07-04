class ExceptionUtil {
    static enviarExcessao(e1, res) {
        try {
            if(!e1.statusCode){
                throw e1;
            }
            return res.status(e1.statusCode).send({ excessao: e1.name, msg: e1.message, atributo: e1.atributo });
        } catch (e2) {
            console.log(e2);
            return res.status(500).send({ excessao: "ERRO_DE_SERVIDOR", msg: "Ocorreu um erro no servidor", atributo: null });
        }
    }
}

module.exports = ExceptionUtil;

