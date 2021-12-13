// loading the environment variables (DB username, password, URL...)
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = express();
app.listen(process.env.PORT || 3000, () => { console.log('Server Up') });

// setting the images and styles folder to public
app.use(express.static('public'));

app.use(bodyParser.json());

//-----------------------------------------------DB
// first argument is the DB URL, "mongodb://127.0.0.1:27017" is the default local hosted DB URL
// second argument is just for removing a warning
mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017", { useUnifiedTopology: true, useNewUrlParser: true, autoIndex: true }).then(() => {
  console.log('connected to DB');
}).catch(err => console.error(err));

//-----------------------------------------------api developer tests
app.use('/', require('./routes'));