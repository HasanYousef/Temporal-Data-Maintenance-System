const express = require('express');
const mongoose = require('mongoose');

//const schema = require('./schema/schema');
//const keys = require('./config/keys');

// setting the uploads folder to public
//express.static('uploads');                  //????????????????????????????

const app = express();
app.listen(process.env.PORT || 3001, () => { console.log('Server Up') });

//-----------------------------------------------DB
// second argument is just for removing a warning
/*
mongoose.connect(keys.mongo.dbURL, { useUnifiedTopology: true, useNewUrlParser: true, autoIndex: true }).then(() => {
  console.log('connected to DB');
}).catch(err => console.error(err));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
*/

//-----------------------------------------------api developer tests
app.use('/', require('./routes'));