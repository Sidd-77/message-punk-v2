const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()
const chats = require('./data/data');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const connectDB = require('./config/db');

app.use(cors({
    origin:"http://localhost:5173"
}));

connectDB();

app.get('/test',(req,res)=>{
    console.log("got req");
    res.send("got")
})

app.get('/api/chat', (req,res)=>{
    res.send(chats);
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})