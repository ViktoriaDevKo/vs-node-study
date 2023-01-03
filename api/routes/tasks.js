const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "/task/  get request"
    });
});

router.post('/', (req, res, next)=>{
    res.status(200).json({
        message: "/task/  post request"
    });
});

router.get('/:taskId', (req, res, next)=>{
    const id = req.params.accountId;
    if (id === 'sp'){
        res.status(200).json({
            message: "/task/sp  get request",
            id: id
        });
    }else{
        res.status(200).json({
            message: "/task/  get request",
            id: id
        });
    }
    
});

router.patch('/:taskId', (req, res, next)=>{
    const id = req.params.accountId;
    if (id === 'sp'){
        res.status(200).json({
            message: "/task/sp  patch request",
            id: id
        });
    }else{
        res.status(200).json({
            message: "/task/  patch request",
            id: id
        });
    }
    
});

router.delete('/:taskId', (req, res, next)=>{
    const id = req.params.accountId;
    if (id === 'sp'){
        res.status(200).json({
            message: "/task/sp  delete request",
            id: id
        });
    }else{
        res.status(200).json({
            message: "/accounts/  delete request",
            id: id
        });
    }
    
});


module.exports = router;