const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc  Test route
// @acess Public
router.get('/',(req,res)=>{
    res.send('From ROutess....Auth')
})

module.exports = router