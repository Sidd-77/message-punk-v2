const asyncHandler = require('express-async-handler')
const User = require("../models/user");
const generateToken = require('../config/genrateToken');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const matchPassword = async (enteredPass, hasedPass) => {
    return bcrypt.compare(enteredPass, hasedPass);
}

const registerUser = asyncHandler(async (req, res)=> {

    const {email, password, username, pic} = req.body;

    if(!email || !password || !username){
        res.status(400);
        throw new Error("Please enter all fields");
    }

    const userExists = await User.findOne({email:email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        pic:"https://robohash.org/"+username,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            username: user.username,
            password: user.password,
            pic: user.pic,
            token: generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error("Failed to create user");
    }

})

const authUser = asyncHandler( async (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password ){
        res.status(400);
        throw new Error("Please enter all fields");
    }

    const user = await User.findOne({email:email});
    if(user){
        if(await matchPassword(password, user.password)){
            res.json({
                _id: user._id,
                username: user.username,
                password: user.password,
                pic: user.pic,
                token: generateToken(user._id),
            })
        }else{
            res.status(401);
            throw new Error("Wrong password");
        }
    }else{
        res.status(401);
        throw new Error("User not found");
    }
})

const allUsers = asyncHandler( async(req, res)=>{
    const keyword = req.query.search;
    const result = await User.find({
        $or : [
            {username : { $regex: keyword, $options: "i"}},
            {email : {$regex: keyword,  $options: "i"}},
        ]
    }).find({_id:{$ne:req.user._id}});

    res.send(result);
})

module.exports = {registerUser, authUser, allUsers};