const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//mongodb://localhost:27017
//
mongoose.set('strictQuery', false);
mongoose.connect( process.env.MONGO_ATLAS_ADDRES,
    {
        useNewUrlParser: true,
      //  useFindAndModify: false,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const userdRoutes = require('./api/routes/users');
const accountsRoutes = require('./api/routes/accounts');
const tasksRoutes = require('./api/routes/tasks');
const regularTasksRoutes = require('./api/routes/regularTasks');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//handling CORS mistakes
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

//middleware handling url routes 
app.use('/accounts', accountsRoutes);
app.use('/tasks', tasksRoutes);
app.use('/tasks/regular', regularTasksRoutes);
app.use('/users',userdRoutes);


//basic error handling block
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


module.exports = app;