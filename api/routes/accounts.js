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

module.exports = router;