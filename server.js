const express = require('express');
const bodyParser = require('body-parser');


// create express app
const app = express();

//parse request of content-type  - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

//parse requests of content-type
app.use(express.json())

// configuring database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

//Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
})
    .then(() => {
        console.log("Succesfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Existing now...', err);
        process.exit();
    })
const routes = require('./app/routes/notes.routes.js')

app.use('/', routes)

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to easy notes application. take notes quickly. Organize and keep track of all your notes." })
})

// listen for requests
app.listen(3000, () => {
    console.log("server is listening on port 3000");
})

//Require Notes routes
// require('./app/routes/notes.routes.js')