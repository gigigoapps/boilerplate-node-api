'use strict';

//Globals definition
global.__basedir = __dirname;
global.requireRoot = function(name) {
    return require(__dirname + '/' + name);
};

//Basic includes
const debug = require('debug')('app:root');
debug('init');
const parameters = requireRoot('parameters');

//Start redis connection
const redisConnection = requireRoot('app/fn/redisConnection');
redisConnection.startClient();

//Initialize web app
const express = require('express');
const app = express();
requireRoot('app/middlewares')(app);
requireRoot('app/routes')(app);
requireRoot('app/handlers')(app);

//Start listening
app.listen(parameters.listenPort,function(){
    debug('listening',parameters.listenPort);
});

//Simple process log
process.on('exit', function () {
    debug('exit');
});
process.on('SIGINT', function () {
    debug('sigint');
    process.exit(1);
});