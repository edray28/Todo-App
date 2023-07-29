//modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const app = express();
const path = require('path');

mongoose.set('strictQuery', false);
const dbcon = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, console.log(`Database Connected`));
    } catch (error) {
        console.log("Database Connection Failed: " + error);
        process.exit(1);
    };
};


//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(
    '/static',
    express.static(path.join(__dirname, 'public')),
);
app.get('/views', (req, res) => res.render('index'))
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");
//app.use('/', app.static(path.join(__dirname, '/views')));

//routes 
app.use(require("./routes/index"))
app.use(require("./routes/todo"))

//server 
dbcon().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Started and Port running at ${PORT}`);
    })
})





