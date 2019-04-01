const mongoose = require('mongoose'),
crypto = require('crypto'),
jwt = require('jsonwebtoken');

var mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;


const PrePrimarySchoolSchema = new Schema({
    pre_primary_school_admission_status: String,
    pre_primary_school_students_count: Number,
    pre_primary_school_application_status: String,
    pre_primary_school_application_deadline: String,
    pre_primary_school_seats_count: Number,
    pre_primary_school_seats_remaining_count: Number,
    pre_primary_school_students_applied_count: Number,
    pre_primary_school_students_accepted_count: Number,
    pre_primary_school_males_count: Number,
    pre_primary_school_females_count: Number
});


PrePrimarySchoolSchema.plugin(mongoosePaginate);


PrePrimarySchoolSchema.methods.generateJWT = function(){

    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate()+60);

    return jwt.sign({
        pre_primary_school_admission_status: this.pre_primary_school_admission_status,
        pre_primary_school_students_count: this.pre_primary_school_students_count,
        pre_primary_school_application_status: this.pre_primary_school_application_status,
        pre_primary_school_application_deadline: this.pre_primary_school_application_deadline,
        pre_primary_school_seats_count: this.pre_primary_school_seats_count,
        pre_primary_school_seats_remaining_count: this.pre_primary_school_remaining_seats_count,
        pre_primary_school_students_applied_count: this.pre_primary_school_students_applied_count,
        pre_primary_school_students_accepted_count: this.pre_primary_school_students_accepted_count,
        pre_primary_school_males_count: this.pre_primary_school_males_count,
        pre_primary_school_females_count: this.pre_primary_school_females_count,
        _id: this._id,
        exp: parseInt(expirationDate.getDate()/1000, 10)
    }, 'secret');
}

PrePrimarySchoolSchema.methods.toAuthJSON = function(){

    return{
    pre_primary_school_admission_status: this.pre_primary_school_admission_status,
    pre_primary_school_students_count: this.pre_primary_school_students_count,
    pre_primary_school_application_status: this.pre_primary_school_application_status,
    pre_primary_school_application_deadline: this.pre_primary_school_application_deadline,
    pre_primary_school_seats_count: this.pre_primary_school_seats_count,
    pre_primary_school_seats_remaining_count: this.pre_primary_school_remaining_seats_count,
    pre_primary_school_students_applied_count: this.pre_primary_school_students_applied_count,
    pre_primary_school_students_accepted_count: this.pre_primary_school_students_accepted_count,
    pre_primary_school_males_count: this.pre_primary_school_males_count,
    pre_primary_school_females_count: this.pre_primary_school_females_count,
    _id: this._id,
    token: this.generateJWT()
    };
};

var PrePrimarySchools = mongoose.model('PrePrimarySchools', PrePrimarySchoolSchema);
module.exports = PrePrimarySchools;
