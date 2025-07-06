const jwt = require('jsonwebtoken');
const TokenInvalidoException = require('../excessoes/TokenInvalidoException');

class JwtUtil {

    static gerarToken = (dado) => {
        const token = jwt.sign(dado, process.env.SECURE_KEY, { expiresIn: '1d' });
        return token;
    }

    static decodificarToken = (token) => {
        let tokenDecodificado = null;
        let tokenException = null;
        jwt.verify(token, process.env.SECURE_KEY, async (err, decoded) => {
            if (err) {
                tokenException = new TokenInvalidoException("Token inválido");
            }
            tokenDecodificado = decoded;
        });
        if(tokenException){
            throw new TokenInvalidoException("Token inválido");
        }
        return tokenDecodificado;
    }
}

module.exports = JwtUtil;