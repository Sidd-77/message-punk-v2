const mongoose = require('mongoose');

const connectDB = async()=>{
    const connection = await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("Connected");
        })
        .catch((err)=>{
            console.log(err);
        })
}

module.exports = connectDB;