'use strict'

const expressDeliver = require('express-deliver')
const exception = expressDeliver.exception
const parameters = requireRoot('parameters')
const dataService = requireRoot('app/services/dataService')
const jwt = require('jsonwebtoken')
const passport = require('passport')

module.exports = expressDeliver.wrapper({
    *index(){
        let list = yield dataService.getList()
        return list
    },
    params(req){
        return {
            params : req.params, // url params (/project/:id)
            query : req.query,   // query string (/project?id=4)
            body : req.body      //HTTP body (urlencoded,json,..)
        }
    },
    error(){
        //Defined in fn/customExceptions
        throw exception.InvalidData
    },
    login(){
        return jwt.sign({userId:'9819039504'},parameters.jwt.secret,{
            expiresIn: parameters.jwt.expireTime
        })
    },
    getProfile(req){
        return req.user
    },
    authenticationFail(){
        return 'cacas'
    }
})

module.exports.authenticationSuccess = (req,res,next)=>{
    console.log(req.user)
    next()
}

module.exports.authenticationFail = (err,req,res,next)=>{
    throw new expressDeliver.exception.Unauthorized()
}
