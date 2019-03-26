const router = require('express').Router(),
auth = require('../../../auth'),
pre_primary_schools_controller = require('../controllers/prePrimarySchools.controller');


router.post('/', auth.optional, pre_primary_schools_controller.createPrePrimarySchool);

router.get('/', auth.optional, pre_primary_schools_controller.getAllPrePrimarySchools);

router.get('/:id', auth.optional, pre_primary_schools_controller.getPrePrimarySchoolById);

module.exports = router;