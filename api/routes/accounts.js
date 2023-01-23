const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Account = require('../models/accounts');

router.get('/', (req, res, next)=>{
    Account.find()
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
    const account = new Account({
        _id_User: req.body._id_User,
        _id:  new mongoose.Types.ObjectId(),
        resourceName: req.body.resourceName,
        login: req.body.login,
        salt: req.body.salt,
        hash : req.body.hash,
        type: req.body.type,
        tags: req.body.tags
    });

    account
        .save()
        .then(result =>{
            console.log(result);
            res.status(200).json({
                message: "/account/ post request",
                createdAccount : account
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