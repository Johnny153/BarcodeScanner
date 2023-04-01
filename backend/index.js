const express = require('express');

const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const cors = require('cors')
//import routes
 const productRoute = require('./routes/productRoute');
 const userRoute = require('./routes/userRoute');
dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT,
    {useNewUrlParser: true},
    () =>{
        console.log('Connected to DB')
        })

//Middlewares
app.use(bodyparser.json());
app.use(cors())

//route middlewares
app.use('/products/', productRoute);
app.use('/users/', userRoute);

app.listen(8080, () =>
{
    console.log('Server running');
})