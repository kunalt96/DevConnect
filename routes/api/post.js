const express = require('express');
const router = express.Router();

// @route GET api/posts
// @desc  Test route
// @acess Public
router.get('/',(req,res)=>{
    res.send('From ROutess....POST')
})

module.exports = router