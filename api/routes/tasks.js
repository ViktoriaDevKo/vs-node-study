const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require("../models/tasks"); 
const User = require("../models/users");

router.get('/', (req, res, next)=>{
    Task.find()
    .populate('_id_User')
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

 //adding a new task on the main page and through add new button
router.post('/', (req, res, next)=>{
    //TODO pass the user id from local storage or make a request in order to find id of the current user
    User.findById(req.body.AccID)
    .then(user =>{
            const task = new Task({
                _id:  mongoose.Types.ObjectId(),
                task: req.body.task,
                typeOfTask: req.body.type,
                description: req.body.description,
                datePerforming: new Date(req.body.datePerf),
                priority: req.body.priority,
                _id_User: req.body.AccID, 
                tags: req.body.tags
        });
    return task.save()
    })
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message: "/task/ post request",
                createdTask : task
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
    Task.findById(id)
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

    Task.updateOne({
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
    Task.remove({
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