'use strict';

const debug = require('debug')('app:services:data')
const q = require('q');
const utils = requireRoot('app/fn/utils')

exports.getList = function(){
    debug('list','waiting 500 ms')

    let defer = q.defer()

    setTimeout(()=>{
        debug('list','done')
        let obj = utils.safeJSONParse('{"foo":"bar","bob":2}');
        defer.resolve(obj)
    },500)

    return defer.promise;
}
