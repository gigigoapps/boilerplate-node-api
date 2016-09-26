'use strict';

const expressDeliver = require('express-deliver')
const exception = expressDeliver.exception
const parameters = requireRoot('parameters');
const dataService = requireRoot('app/services/dataService');

module.exports = expressDeliver.wrapper({
    index(req,res){
        return dataService.getList()
    },
    params(req,res){
        return {
            params : req.params, // url params (/project/:id)
            query : req.query,   // query string (/project?id=4)
            body : req.body      //HTTP body (urlencoded,json,..)
        }
    },
    error(req,res){
        //Defined in fn/customExceptions
		throw exception.InvalidData
	}
})
