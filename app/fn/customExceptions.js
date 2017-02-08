'use strict'

const exception = require('express-deliver').exception

exception.InvalidData = class InvalidData extends exception.BaseException{
    constructor(data){
        super(2001,'Invalid data',data)
        this.statusCode = 400
    }
}

exception.ItemNotFound = class ItemNotFound extends exception.BaseException{
    constructor(data){
        super(2003,'Item Not Found',data)
        this.statusCode = 200
    }
}