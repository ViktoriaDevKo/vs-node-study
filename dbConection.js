const mongoose = require('mongoose');

function Connect(route = "users")
{
    let url;
    switch(route)
    {

        case "users":
        url = process.env.USER_SCHEME;
        break;
        case "tasks":
        url = process.env.TASK_SCHEME;
        break;
        case "accounts":
        url = process.env.ACCOUNT_SCHEME;
        break;
        case "regtasks":
        url = process.env.REG_TASKS_SCHEME;
        break;
        
        
    }
    
mongoose.set('strictQuery', false);
mongoose.connect(url,
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

}