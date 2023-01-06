const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


const accountsRoutes = require('./api/routes/accounts');
const tasksRoutes = require('./api/routes/tasks');
const regularTasksRoutes = require('./api/routes/regularTasks');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//middleware
app.use('/accounts', accountsRoutes);
app.use('/tasks', tasksRoutes);
app.use('/tasks/regular', regularTasksRoutes);

//error handling block
app.use((req,res,next)=>{
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});


app.use((error, req, res, next)=>{
    res.status(error.status || 500 );
    res.json({
        error:{
            message : error.message
        }
    });

});


//TODO: CrossOriginResourceSharing errors handling
module.exports = app;