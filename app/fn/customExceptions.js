'use strict'

const exception = require('express-deliver').exception
const mongoose = require('mongoose');


exception.DatabaseError = class DatabaseError extends exception.BaseException{
    constructor(data){
        super(2000,'Error with database connection',data);
        this.statusCode = 400;
    }
};
exception.InvalidData = class InvalidData extends exception.BaseException{
    constructor(data){
        super(2001,'Invalid data',data);
        this.statusCode = 400;
    }
};




/**
 * MONGOOSE ESPECIFIC
 */
exception.DatabaseError = class DatabaseError extends exception.BaseException{
    constructor(data){
        super(1101,'Database Error',data);
    }
};

exception.ValidationFailed = class ValidationFailed extends exception.BaseException{
    constructor(data){
        super(1101,'Validation Failed',data);
    }
};

exception.InvalidObjectId = class InvalidObjectId extends exception.BaseException{
    constructor(data){
        super(1102,'Invalid ObjectId',data);
    }
};

exception.CastFailed = class CastFailed extends exception.BaseException{
    constructor(data){
        super(1103,'Cast Failed',data);
    }
};

exception.ItemNotFound = class ItemNotFound extends exception.BaseException{
    constructor(data){
        super(1104,'Item Not Found',data);
    }
};

exception.DuplicateKey = class DuplicateKey extends exception.BaseException{
    constructor(data){
        super(1105,'Duplicate Key',data);
    }
};



var exceptionFrom = exception.from;

//Override exception from
exception.from = function(error){
    //Mongoose Validation error
    if (error instanceof mongoose.Error.ValidationError){
        return new exception.ValidationFailed(error.errors);
    }

    //Mongoose Cast error
    if (error instanceof mongoose.Error.CastError){
        if (error.kind=='ObjectId'){
            return new exception.InvalidObjectId(error);
        }
        return new exception.CastFailed(error);
    }

    //MongoDB error
    if (error instanceof mongoose.mongo.MongoError){

        //Duplicate key
        if (error.code == 11000){
            return new exception.DuplicateKey(error);
        }

        //Generic
        return new exception.DatabaseError(error);
    }

    return exceptionFrom.apply(null,arguments)
}