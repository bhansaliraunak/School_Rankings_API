const mongoose = require('mongoose');

var PrePrimarySchools = require(`${__base}/models/PrePrimarySchools`);

exports.createPrePrimarySchool = (req, res, next)=>{
   
    const { body: {prePrimarySchools} } = req;

    const finalPrePrimarySchool = new PrePrimarySchools(prePrimarySchools);

    return finalPrePrimarySchool.save().then(()=> res.json({ prePrimarySchools: finalPrePrimarySchool.toAuthJSON() }));
}

exports.getAllPrePrimarySchools = (req, res, next) => {
   
        PrePrimarySchools.find((err,school)=>{
            if(err){
                return next(err);
            }
            return res.json(school);
        });
    
}

exports.getPrePrimarySchoolById = (req, res, next) => {
    console.log('ENTERED!!!');
    PrePrimarySchools.findById( req.params.id, (err, school)=>{
        if(err){
            return next(err);
        }
        return res.json(school);
    });
}

