var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var schools = require('./schools.js');
var user = require('./users.js');

/*
* Routes that can be accessed by any one
*/
router.post('/login', auth.login);

/*
* Routes that can be accessed only by authenticated users
*/
router.get('/api/v1/schools', schools.getAll);
router.get('/api/v1/school/:id', schools.getOne);
router.post('/api/v1/school/', schools.create);
router.put('/api/v1/school/:id', schools.update);
router.delete('/api/v1/school/:id', schools.delete);

/*
* Routes that can be accessed only by authentication & authorized users
*/

router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;
