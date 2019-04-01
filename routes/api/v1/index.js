
const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/schools', require('./schools'));
router.use('/preprimary', require('./preprimary'));
module.exports = router;