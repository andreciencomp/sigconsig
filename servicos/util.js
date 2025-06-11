const paraSnakeCase = function (str) {
    for (let i = 0; i < str.length; i++) {
        if (isNaN(Number(str[i])) && str[i] === str[i].toUpperCase()) {
            str = (str.replace(str[i], '_' + str[i].toLowerCase()));
        }
    }
    return str;
}

const paraCamelCase = function (str) {
    let strResult = "";
    let upper = false;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '_') {
            upper = true;
        }
        else if(upper){
            strResult+= str[i].toUpperCase();
            upper = false;
        }else if(str[i] != '_'){
            strResult += str[i];
        }
    }
    return strResult;
}

module.exports = {paraSnakeCase, paraCamelCase};