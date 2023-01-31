const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const RegTask = require('../models/regularTasks');
const User = require('../models/users');

router.get('/', (req, res, next)=>{
    RegTask.find()
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
    User.findById(req.body._id_User)
    .then(user =>{
        if(!user){
            return res.status(404).json({
                message :"User not found"
            });
        }
        const regTask = new RegTask({
            _id: new mongoose.Types.ObjectId,
            task: req.body.task,
            typeOfTask: req.body.typeOfTask,
            description: req.body.description,
            dateStarting: req.body.dateStarting,
            regularity: req.body.regularity,
            priority: req.body.priority,
            _id_User: req.body._id_User, 
            tags: req.body.tags
        });
        return regTask
        .save()})
        .then(result =>{
            console.log(result);
            res.status(200).json({
                message: "/user/ post request",
                createdTask : regTask
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:taskId', (req, res, next)=>{
    const id = req.params.taskId;
    RegTask.findById(id)
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

router.patch('/:taskId', (req, res, next)=>{
    const id = req.params.taskId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    RegTask.updateOne({
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

router.delete('/:taskId', (req, res, next)=>{
    const id = req.params.taskId;
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


module.exports = router;