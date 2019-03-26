const mongoose = require('mongoose'),
crypto = require('crypto'),
jwt = require('jsonwebtoken');

var mongoosePaginate = require('mongoose-paginate');

var searchable = require('mongoose-searchable');

const { Schema } = mongoose;


const SchoolSchema = new Schema({
    school_name: String,
    school_address_1: String,
    school_address_2: String,
    school_state: String,
    school_city: String,
    school_areacity: String,
    school_admission_status: String,
    school_ranking: Number,
    school_imageUrl_157_157_jpg: String,
    school_imageUrl_1600_456_jpg: String,
    school_official_url: String,
    school_overview_1: String,
    school_overview_2: String,
    school_pre_primary_school_ref_id: String,
    school_primary_school_ref_id: String,
    school_middle_school_ref_id: String,
    school_secondary_school_ref_id: String,
    school_senior_secondary_school_ref_id: String,
    school_total_students_count: Number,
    school_application_status: String,
    school_application_deadline: String,
    school_total_seats_count: Number,
    school_students_applied_count: Number,
    school_students_accepted_count: Number,
    school_seats_remaining_count: Number,
    school_males_count: Number,
    school_females_count: Number
});

SchoolSchema.index({
    school_name: 'text',
    school_state: 'text',
    school_city: 'text',
    school_areacity: 'text',
    school_admission_status: 'text',
}, {
    name: 'School Search Index',
    weights: {
        school_name: 10,
        school_state: 8,
        school_city: 6,
        school_areacity: 4,
        school_admission_status: 2
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
        school_address_1: this.school_address_1,
        school_address_2: this.school_address_2,
        school_state: this.school_state,
        school_city: this.school_city,
        school_areacity: this.school_areacity,
        school_admission_status: this.school_admission_status,
        school_ranking: this.school_ranking,
        school_imageUrl_157_157_jpg: this.school_imageUrl_157_157_jpg,
        school_imageUrl_1600_456_jpg: this.school_imageUrl_1600_456_jpg,
        school_official_url: this.school_official_url,
        school_overview_1: this.school_overview_1,
        school_overview_2: this.school_overview_2,
        school_pre_primary_school_ref_id: this.school_pre_primary_school_ref_id,
        school_primary_school_ref_id: this.school_primary_school_ref_id,
        school_middle_school_ref_id: this.school_middle_school_ref_id,
        school_secondary_school_ref_id: this.school_secondary_school_ref_id,
        school_senior_secondary_school_ref_id: this.school_senior_secondary_school_ref_id,
        school_total_students_count: this.school_total_students_count,
        school_application_status: this.school_application_status,
        school_application_deadline: this.school_application_deadline,
        school_total_seats_count: this.school_total_seats_count,
        school_students_applied_count: this.school_students_applied_count,
        school_students_accepted_count: this.school_students_accepted_count,
        school_seats_remaining_count: this.school_seats_remaining_count,
        school_males_count: this.school_males_count,
        school_females_count: this.school_females_count,
        _id: this._id,
        exp: parseInt(expirationDate.getDate()/1000, 10)
    }, 'secret');
}

SchoolSchema.methods.toAuthJSON = function(){

    return{
        school_name: this.school_name,
        school_address_1: this.school_address_1,
        school_address_2: this.school_address_2,
        school_state: this.school_state,
        school_city: this.school_city,
        school_areacity: this.school_areacity,
        school_admission_status: this.school_admission_status,
        school_ranking: this.school_ranking,
        school_imageUrl_157_157_jpg: this.school_imageUrl_157_157_jpg,
        school_imageUrl_1600_456_jpg: this.school_imageUrl_1600_456_jpg,
        school_official_url: this.school_official_url,
        school_overview_1: this.school_overview_1,
        school_overview_2: this.school_overview_2,
        school_pre_primary_school_ref_id: this.school_pre_primary_school_ref_id,
        school_primary_school_ref_id: this.school_primary_school_ref_id,
        school_middle_school_ref_id: this.school_middle_school_ref_id,
        school_secondary_school_ref_id: this.school_secondary_school_ref_id,
        school_senior_secondary_school_ref_id: this.school_senior_secondary_school_ref_id,
        school_total_students_count: this.school_total_students_count,
        school_application_status: this.school_application_status,
        school_application_deadline: this.school_application_deadline,
        school_total_seats_count: this.school_total_seats_count,
        school_students_applied_count: this.school_students_applied_count,
        school_students_accepted_count: this.school_students_accepted_count,
        school_seats_remaining_count: this.school_seats_remaining_count,
        school_males_count: this.school_males_count,
        school_females_count: this.school_females_count,
        _id: this._id,
        token: this.generateJWT()
    };
};

var Schools = mongoose.model('Schools', SchoolSchema);
module.exports = Schools;
