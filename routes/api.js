var express= require('express');
var paginationMiddleware = require('express-pagination-middleware');
var mongojs = require('mongojs');
var router= express.Router();
var db= mongojs('mongodb://srankings:srankings123@ds145750.mlab.com:45750/school-rankings',['quotes']);

var userPaginationMiddleware = paginationMiddleware({
  sort:{
      validKeys: ["created"]
  },
  limit:{
    min:5,
    max:20
  }
});

//GET All School Information
router.get('/schools', userPaginationMiddleware, (req, res, next)=>{
  db.quotes.find().skip(req.pagination.skip).limit(req.pagination.limit,(err, quotes)=>{
    if(err){
      res.send(err);
    }
    res.json(quotes);
  });
});

module.exports= router;
