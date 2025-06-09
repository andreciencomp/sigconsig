class ExceptionService {
    static enviarExcessao(e, res) {
        try {
            return res.status(e.statusCode).send({ excessao: e.name, msg: e.message, atributo: e.atributo });
        } catch (e2) {
            console.log(e2);
            return res.status(500).send({ excessao: "ERRO_DE_SERVIDOR", msg: "Ocorreu um erro no servidor", atributo: null });
        }
    }
}

module.exports = ExceptionService;

