const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');

router.get('/', (req, res, next)=>{
    User.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    });

   
});


router.get('/:userId', (req, res, next)=>{
    const id = req.params.userId;
    User.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({ message: "No valid entry found for provided id"});
        }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
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
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    


    res.status(200).json({
        message: "/user/ post request",
        createdUser : user
    });
});

module.exports = router;