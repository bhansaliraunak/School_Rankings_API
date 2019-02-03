const mongoose = require('mongoose'),
router = require('express').Router(),
auth = require('../../auth'),
ttl= 60 * 60 * 1,
axios = require('axios'),
redis = require('redis');

var Schools = require('../../../models/Schools'),
    url= require('url');

const client = redis.createClient();

client.on('error', (err)=> {
    console.log('Error: '+err);
});

     

router.post('/', auth.optional,(req, res, next)=>{
    
    const { body: {schools} } = req;

    const finalSchool = new Schools(schools);

    return finalSchool.save().then(()=> res.json({ schools: finalSchool.toAuthJSON() }));
});

router.get('/', auth.optional, (req, res, next) => {

    var get_params = url.parse(req.url, true).query;
  
    if(get_params['limit']!=null || get_params['page']!=null){
        
        return client.get('/api/v1/schools?page='+req.query.page+'&limit='+req.query.limit,(err,result)=>{
            if(result){
                console.log('/api/v1/schools?page='+req.query.page+'&limit='+req.query.limit);
                const resultJSON = JSON.parse(result);
                return res.status(200).json(resultJSON);
            }
            else
            {
                return axios.get(
                    Schools.paginate({}, Schools.find().limit(req.query.limit).skip(req.skip).lean().exec().then((schools)=>{
                        const responseJSON = schools;
                    client.setex('/api/v1/schools?page='+req.query.page+'&limit='+req.query.limit, 3600, JSON.stringify({ source: '_cache_get_scrank_all', ...responseJSON, }));
           
                        return res.status(200).json({
                            object: 'schools',
                            page_count: req.query.page,
                            result: schools
                        });
                    }).catch(err =>{
                        next(err);
                    })));    
            }
        });
    }
});

module.exports = router;