'use strict'

const parameters = requireRoot('parameters');

//Normal json parse within try/catch
exports.safeJSONParse = function(json){
    try{
        return JSON.parse(json)
    }catch(e){
        return null;
    }
}