'use strict'

const exception = require('express-deliver').exception

exception.DatabaseError = class DatabaseError extends exception.BaseException{
    constructor(data){
        super(2000,'Error with database',data);
        this.statusCode = 503;
    }
};

exception.InvalidData = class InvalidData extends exception.BaseException{
    constructor(data){
        super(2001,'Invalid data',data);
        this.statusCode = 400;
    }
};
