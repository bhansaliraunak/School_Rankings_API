const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../../auth');
const Users = mongoose.model('Users');

const user_controller = require('./controllers/users.controller');

router.post('/', auth.optional, user_controller.createUser);

//POST login route (optional, everyone has access)

router.post('/login', auth.optional, user_controller.createUserLogin);

//GET current route (required, only authenticated users have access)
router.get('/current', auth.optional, user_controller.getCurrentUser);

//GET current route (required, only authenticated users have access)
router.get('/', auth.optional, user_controller.getAllUsers);

module.exports = router;
