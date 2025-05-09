let paraSnakeCase = function(str){
    for(let i = 0; i < str.length; i++){
        if(isNaN(Number(str[i])) && str[i] === str[i].toUpperCase()){
            str = (str.replace(str[i],'_' + str[i].toLowerCase()));
        }
    }
    return str;
}

module.exports = paraSnakeCase;