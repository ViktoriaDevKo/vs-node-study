const express = require('express');
const app = express();
const morgan = require('morgan');

const accountsRoutes = require('./api/routes/accounts');
const tasksRoutes = require('./api/routes/tasks');
const regularTasksRoutes = require('./api/routes/regularTasks');

app.use(morgan('dev'));


//middleware
app.use('/accounts', accountsRoutes);
app.use('/tasks', tasksRoutes);
app.use('/tasks/regular', regularTasksRoutes);

app.use((req,res,next)=>{
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status );
    res.json({
        error:{
            message : error.message
        }
    });

});

module.exports = app;