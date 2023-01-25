const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');

router.get('/', (req, res, next)=>{
    
    User.find()
    .select('passing the needed fields names')
    .exec()
    .then(docs => {
        //console.log(docs);
        const response = {
            count : docs.length,
            products : docs.map(doc =>{
                return {
                    ...doc,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/product/' + doc._id
                    }
                }
            })  
        };
        res.status(200).json(response);
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    });

   
});

//for loging in 
//TODO: Add mechanism to store current user id in localstorage in order to further link it to the tasks
//by the end of the session(or logging out) delete from there
router.get('/:userId', (req, res, next)=>{
    const id = req.params.userId;
    User.findById(id)
    //.select('login type etc')
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
//TODO: Add crypting of the password 
//(hashing w. salt can do just think it through)
//TODO salt generator, coder function and decoder function
router.post('/', (req, res, next)=>{
    //adding a new user on the registration page page
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        login: req.body.login,
        //Calculate the hash before (bcript + salt)
        //as well as a decryptiption check
        salt: req.body.salt,
        hash : req.body.hash,
        type: req.body.type
    });
    user
        .save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message: "User created sucsessfuly",
                createdUser : {
                    login: result.login,
                    type: result.type
                }
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
        res.status(200).json({
            message : "user updated"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});


module.exports = router;