const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "/user/  get request"
    });
});

router.post('/', (req, res, next)=>{
    //adding a new task on the main page

    const user = new User({
        _id: new mongoose.Types.ObjectId,
        login: req.body.login,
        password: req.body.password,
        type: req.body.type
    });
    user
        .save()
        .then(result =>{
            console.log(result);
        })
        .catch(err => console.log(err));
    
    res.status(200).json({
        message: "/user/ post request",
        createdUser : user
    });
});

module.exports = router;