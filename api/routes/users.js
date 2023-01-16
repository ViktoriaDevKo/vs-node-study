const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');

router.get('/', (req, res, next)=>{
    
    User.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    });

   
});

//for loging in 
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

//for registration 
//TODO: Add 
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
            res.status(200).json({
                message: "/user/ post request",
                createdUser : user
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    


  
});

router.delete("/:userId", (req, res, next) =>{
    const id = req.params.userId;
    User.remove({
        _id: id
    })
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});


router.patch("/:userId", (req, res, next) =>{
    const id = req.params.userId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    User.updateOne({
        _id: id
    }, {$set: updateOps} )
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});


module.exports = router;