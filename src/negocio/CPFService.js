class CPFService {
    static formatarParaApenasNumeros(strCPF) {
        let novoCPF = strCPF.replaceAll(" ","");
        novoCPF = novoCPF.replaceAll(".", "");
        novoCPF = novoCPF.replaceAll("-", "");
        return novoCPF;
    }
}

module.exports = CPFService;