const express = require('express');
const router = express.Router();


router.use('/alt', require('./alt'));
router.use('/users', require('./user'))
router.use('/', require('./home'));


module.exports = router;
