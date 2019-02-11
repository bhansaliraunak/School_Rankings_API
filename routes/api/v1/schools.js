const router = require('express').Router(),
auth = require('../../auth'),
schools_controller = require('./controllers/schools.controller');


router.post('/', auth.optional, schools_controller.createSchool);

router.get('/', auth.optional, schools_controller.getAllSchoolsWithPagination);

router.get('/:id', auth.optional, schools_controller.getSchoolById);

module.exports = router;