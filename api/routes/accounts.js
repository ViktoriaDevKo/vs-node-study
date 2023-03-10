const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Account = require('../models/accounts');
const User = require('../models/users');



router.get('/', (req, res, next)=>{
    Account.find()
    .populate("_id_User", "login")
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

router.post('/', (req, res, next)=>{
   //creating an acc throug main page
    User.findById(req.body._id_User)
    .then(user =>{
        if(!user){
            return res.status(404).json({
                message :"User not found"
            });
        }
        const account = new Account({
            _id_User: req.body._id_User,
            _id:  new mongoose.Types.ObjectId(),
            resourceName: req.body.resourceName,
            login: req.body.login,
            salt: req.body.salt,
            hash : req.body.hash,
            typeOfAccount: req.body.typeOfAccount,
            tags: req.body.tags
        });
        return account
            .save()})
        .then(result =>{
            console.log(result);
            res.status(200).json({
                message: "/account/ post request",
                createdAccount : result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:accountId', (req, res, next)=>{
    const id = req.params.accountId;
    Account.findById(id)
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

router.patch('/:accountId', (req, res, next)=>{
    const id = req.params.accountId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Account.updateOne({
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

router.delete('/:accountId', (req, res, next)=>{
    const id = req.params.accountId;
    Account.remove({
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


module.exports = router;