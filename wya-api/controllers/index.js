const express = require('express');
const router = express.Router();


router.use('/alt', require('./alt'))
router.use('/auth', require('./auth'))
router.use('/user', require('./user'))
router.use('/room', require('./room'))
router.use('/', (req, res, next)=>{
    res.status(200).json({
        message: "Hello, World"
    })
})


module.exports = router;