const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()
const chats = require('./data/data');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json());


connectDB();

app.get('/test',(req,res)=>{
    console.log("got req");
    res.send("got")
})

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})