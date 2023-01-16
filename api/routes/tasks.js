const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require("../models/tasks"); 

router.get('/', (req, res, next)=>{

    Task.find()
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
    //adding a new task on the main page
    const task = new Task({
        _id: new mongoose.Types.ObjectId,
        task: req.body.task,
        type: req.body.type,
        description: req.body.description,
        datePerf: req.body.datePerf,
        priority: req.body.priority,
        _id_Account: req.body.AccID, 
        tags: req.body.tags
});
    Task
        .save()
        .then(result =>{
            console.log(result);
            res.status(200).json({
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

router.get('/all/:taskId', (req, res, next)=>{
    const id = req.params.taskId;
    if (id === 'sp'){
        res.status(200).json({
            message: "/task/all/sp  get request",
            id: id
        });
    }else{
        res.status(200).json({
            message: "/tasks/all/  get request",
            id: id
        });
    }
    
});

router.patch('/all/:taskId', (req, res, next)=>{
    const id = req.params.taskId;
    if (id === 'sp'){
        res.status(200).json({
            message: "/task/all/sp  patch request",
            id: id
        });
    }else{
        res.status(200).json({
            message: "/task/all/  patch request",
            id: id
        });
    }
    
});

router.delete('/all/:taskId', (req, res, next)=>{
    const id = req.params.taskId;
    if (id === 'sp'){
        res.status(200).json({
            message: "/task/all/sp  delete request",
            id: id
        });
    }else{
        res.status(200).json({
            message: "/task/all/  delete request",
            id: id
        });
    }
    
});


module.exports = router;