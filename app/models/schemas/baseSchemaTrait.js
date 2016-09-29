'use strict';

const toObjectId = requireRoot('app/fn/utils').toObjectId;
const _ = require('lodash')

module.exports = {
	statics : {
		findByIdSafe(_id){
		    return this.findById(toObjectId(_id)).exec();
		},
		findByIdAndUpdateSafe(_id,doc){
			return this.findByIdAndUpdate(toObjectId(_id),doc,{new:true}).exec();
		},
		pickPublicProperties(obj){
            if (_.isArray(obj))
                return _.map(obj,item=>_.pick(item,this.publicProperties))

            return _.pick(obj,this.publicProperties)
        }
    },

    methods : {
        pickPublicProperties(){
		    return _.pick(this,this.schema.statics.publicProperties)
        },
		updateAndReturn(doc){
			return this.update(doc).then(result =>{
				return this.constructor.findById(this._id).exec();
			});
		}
	}
};