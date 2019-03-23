const mongoose = require('mongoose'),
crypto = require('crypto'),
jwt = require('jsonwebtoken');

var mongoosePaginate = require('mongoose-paginate');

var searchable = require('mongoose-searchable');

const { Schema } = mongoose;


const SchoolSchema = new Schema({
    school_name: String,
    school_state: String,
    school_city: String,
    school_cityarea: String,
    school_admission_status: String,
    school_ranking: Number
});

SchoolSchema.index({
    school_name: 'text',
    school_state: 'text',
    school_city: 'text',
    school_cityarea: 'text',
    school_admission_status: 'text',
}, {
    name: 'School Search Index',
    weights: {
        school_name: 10,
        school_state: 8,
        school_city: 6,
        school_cityarea: 4,
        school_admission_status: 2,
    }
});

SchoolSchema.plugin(mongoosePaginate);
SchoolSchema.plugin(searchable);

SchoolSchema.methods.generateJWT = function(){

    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate()+60);

    return jwt.sign({
        school_name: this.school_name,
        school_state: this.school_state,
        school_city: this.school_city,
        school_cityarea: this.school_cityarea,
        school_admission_status: this.school_admission_status,
        school_ranking: this.school_ranking,
        id: this._id,
        exp: parseInt(expirationDate.getDate()/1000, 10)
    }, 'secret');
}

SchoolSchema.methods.toAuthJSON = function(){

    return{
        school_name: this.school_name,
        school_state: this.school_state,
        school_city: this.school_city,
        school_cityarea: this.school_cityarea,
        school_admission_status: this.school_admission_status,
        school_ranking: this.school_ranking,
        _id: this._id,
        token: this.generateJWT()
    };
};




var Schools = mongoose.model('Schools', SchoolSchema);


module.exports = Schools;
