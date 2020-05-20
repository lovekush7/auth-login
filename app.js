const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
var PORT = process.env.PORT || 8000;
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());
//import Routes
const postRoute = require('./Routes/post');
app.use('/posts', postRoute);

app.get('/', (req, res) => {
  res.send('We are on home');
});


//connected to db
mongoose.connect(process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () =>
    console.log('connected to db')
);


app.listen(PORT);