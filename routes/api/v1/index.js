
const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/schools', require('./schools'));
router.use('/schools', require('./schools/index'));
module.exports = router;