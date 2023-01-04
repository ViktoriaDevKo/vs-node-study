const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "/task/  get request"
    });
});

router.post('/', (req, res, next)=>{
    res.status(200).json({
        message: "/task/ post request"
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