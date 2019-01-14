
const mongoose = require('mongoose'),
router = require('express').Router(),
auth = require('../../auth');

var Schools = require('../../../models/Schools'),
    url= require('url');

    
   
    

router.post('/', auth.optional,(req, res, next)=>{
    
    const { body: {schools} } = req;

    const finalSchool = new Schools(schools);

    return finalSchool.save().then(()=> res.json({ schools: finalSchool.toAuthJSON() }));
});

router.get('/', auth.optional, (req, res, next) => {

    var get_params = url.parse(req.url, true).query;

    if(get_params['limit']!=null || get_params['page']!=null){
        return Schools.paginate({}, Schools.find({}).limit(req.query.limit).skip(req.skip).lean().exec().then((schools)=>{
                return res.json({
                    object: 'schools',
                    page_count: req.query.page,
                    result: schools
                });
            }).catch(err=> next(err)));
    }
   
    
});

module.exports = router;