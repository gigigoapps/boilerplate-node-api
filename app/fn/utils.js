'use strict'

const parameters = requireRoot('parameters');
const mongoose = require('mongoose');

//Normal json parse within try/catch
exports.safeJSONParse = function(json){
	try{
		return JSON.parse(json)
	}catch(e){
		return null;
	}
}

exports.toObjectId = function(str){
    var id = mongoose.Types.ObjectId.isValid(str) ? str : null;
    return new mongoose.Types.ObjectId(id);
};