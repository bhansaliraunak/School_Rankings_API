const mongoose = require('mongoose'),
crypto = require('crypto'),
jwt = require('jsonwebtoken');

var mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;


const SchoolSchema = new Schema({
    school_name: String,
    school_state: String,
    school_city: String,
    school_cityarea: String,
    school_admission_status: String,
    school_ranking: Number
});

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


SchoolSchema.plugin(mongoosePaginate);
var Schools= mongoose.model('Schools',SchoolSchema);
module.exports= Schools;
