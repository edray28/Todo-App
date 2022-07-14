//modules
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost/todo_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
app.set("view engine", "pug");

//routes 
app.use(require("./routes/index"))
app.use(require("./routes/todo"))

//server 
app.listen(3000, () => {
    console.log(`Server Started and Port running at 3000`);
})



