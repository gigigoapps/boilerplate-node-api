'use strict'

const exception = require('express-deliver').exception

exception.InvalidData = class InvalidData extends exception.BaseException{
    constructor(data){
        super(2001,'Invalid data',data)
        this.statusCode = 400
    }
}