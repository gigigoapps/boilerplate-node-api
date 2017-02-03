'use strict'

const exception = require('express-deliver').exception

exception.InvalidData = class InvalidData extends exception.BaseException{
    constructor(data){
        super(2001,'Invalid data',data)
        this.statusCode = 400
    }
}

exception.Unauthorized = class Unauthorized extends exception.BaseException{
    constructor(data){
        super(2002,'Unauthorized',data)
        this.statusCode = 401
    }
}