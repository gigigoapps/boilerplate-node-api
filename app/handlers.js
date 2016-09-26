'use strict';

const expressDeliver = require('express-deliver');
const debug = require('debug')('app:handlers')

module.exports = function(app){

    //404 and 500
    expressDeliver.handlers(app)

    //Listen to error responses
    expressDeliver.on('error',function(err){
        debug('error', err._request.url, err.code, err.message,err.data,err.stack);
    })
};