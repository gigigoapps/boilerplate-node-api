'use strict'

const mongoose = require('mongoose');
const baseSchemaTrait = require('./schemas/baseSchemaTrait');

const projectSchema = new mongoose.Schema({
    name: { 
        type: String, 
        trim: true,
        required: true
    },
    slug: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        index: { unique: true } 
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt: Date
});


projectSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

projectSchema.statics = {
    createRandom : function(name,password,slug,rol){
        return this.create({
            name:'Name '+Date.now(),
            slug:'Slug '+Date.now()
        });
    }
};

projectSchema.statics.publicProperties = ['name','slug']

//Apply trait
Object.assign(projectSchema.statics,baseSchemaTrait.statics);
Object.assign(projectSchema.methods,baseSchemaTrait.methods);

module.exports = mongoose.model( 'project', projectSchema);
