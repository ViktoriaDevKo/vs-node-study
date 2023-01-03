const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "/task/regular  get request"
    });
});

router.post('/', (req, res, next)=>{
    res.status(200).json({
        message: "/task/regular  post request"
    });
});

router.get('/:taskId', (req, res, next)=>{
    const id = req.params.taskId;
    if (id === 'sp'){
        res.status(200).json({
            message: "/task/regular/sp  get request",
            id: id
        });
    }else{
        res.status(200).json({
            message: "/tasks/regular/  get request",
            id: id
        });
    }
    
});

router.patch('/:taskId', (req, res, next)=>{
    const id = req.params.taskId;
    if (id === 'sp'){
        res.status(200).json({
            message: "/task/regular/sp  patch request",
            id: id
        });
    }else{
        res.status(200).json({
            message: "/task/regular  patch request",
            id: id
        });
    }
    
});

router.delete('/:taskId', (req, res, next)=>{
    const id = req.params.taskId;
    if (id === 'sp'){
        res.status(200).json({
            message: "/task/regular/sp  delete request",
            id: id
        });
    }else{
        res.status(200).json({
            message: "/task/regular  delete request",
            id: id
        });
    }
    
});


module.exports = router;