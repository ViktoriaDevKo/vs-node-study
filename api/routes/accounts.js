const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "/accounts/  get request"
    });
});

router.post('/', (req, res, next)=>{
    res.status(200).json({
        message: "/accounts/  post request"
    });
});

router.get('/:accountId', (req, res, next)=>{
    const id = req.params.accountId;
    if (id === 'sp'){
        res.status(200).json({
            message: "/accounts/sp  get request",
            id: id
        });
    }else{
        res.status(200).json({
            message: "/accounts/  get request",
            id: id
        });
    }
    
});

router.patch('/:accountId', (req, res, next)=>{
    const id = req.params.accountId;
    if (id === 'sp'){
        res.status(200).json({
            message: "/accounts/sp  patch request",
            id: id
        });
    }else{
        res.status(200).json({
            message: "/accounts/  patch request",
            id: id
        });
    }
    
});

router.delete('/:accountId', (req, res, next)=>{
    const id = req.params.accountId;
    if (id === 'sp'){
        res.status(200).json({
            message: "/accounts/sp  delete request",
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