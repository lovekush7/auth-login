const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./Routes/auth');
const postRoute = require('./Routes/post');
var PORT = process.env.PORT || 8000;


dotenv.config();

app.use(cors());

mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('connected to db'));

app.use(express.json());

//route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.get('/', (req, res) => {
    res.send('we are on home');
});
app.listen(PORT);

//DB_CONNECT=mongodb+srv://bond:jamesbond@cluster0.h7soh.mongodb.net/<dbname>?retryWrites=true&w=majority
//mongodb+srv://root:root@cluster0.kpmgn.mongodb.net/<dbname>?retryWrites=true&w=majority