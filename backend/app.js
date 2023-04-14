require('dotenv').config();
require('./db/db');
const express = require('express');
const app = express();
const PORT = process.env.PORT
const router = require('./routers/users');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/', router);

app.get('/', (req, res)=>{
    res.json('i am from express server');
})

app.listen(PORT, ()=>{
    console.log('server started at port:',PORT)
})