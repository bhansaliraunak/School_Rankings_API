
const express = require('express');
const router = express.Router();


router.use('/preprimaryschools', require('./prePrimarySchools'));

module.exports = router;