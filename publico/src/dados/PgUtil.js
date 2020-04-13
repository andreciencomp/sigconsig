class PgUtil{

    static checkError(e){

        switch(e.code){

            case '23505':
                throw 'CHAVE_REPETIDA_EXCEPTION';
            default:
                throw 'BD_EXCEPTION';
        }
    }
}

module.exports = PgUtil;