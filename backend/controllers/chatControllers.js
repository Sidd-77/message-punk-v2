const asyncHandler = require('express-async-handler')
const Chat = require('../models/chat');
const User = require('../models/user');

const accessChat = asyncHandler( async(req, res) => {
    const {userId} = req.body;

    if(!userId){
        console.log("userId param not set in request");
        return res.sendStatus(400);
    }
    
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}}
        ]
    }).populate("users", "-password").populate("latestMessage");
    
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username pic email",
    })
    
    if(isChat.length > 0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [userId, req.user._id],
        }

        try{
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id: createdChat._id}).populate("users","-password");
            res.status(200).json(fullChat);
        }catch(err){
            res.status(400);
            throw new Error(err.message);
        }
    }
})

const fetchChat = asyncHandler( async(req,res) => {
    try{
        Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
            .populate("users","-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async(results)=>{
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "username pic email",
                })

                res.status(200).json(results);
            })
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})

const createGroup = asyncHandler( async(req, res)=>{

    if( !req.body.users || !req.body.name){
        res.status(400);
        throw new Error("Please fill required fields");
    }

    var users = JSON.parse(req.body.users);

    if(users.length < 2){
        res.status(400);
        throw new Error("More than 2 users required to create group");
    }

    users.push(req.user);

    try{
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullChat = await Chat.findOne({_id: groupChat._id})
            .populate("users","-password")
            .populate("groupAdmin","-password");

        res.status(200).json(fullChat);

    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})

const renameGroup = asyncHandler( async(req, res)=>{
    const { chatName, chatId } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true,
        }
    ).populate("users","-password")
     .populate("groupAdmin","-password");

    if(!updatedChat){
        res.status(400);
        throw new Error("Chat not found");
    }else{
        res.json(updatedChat);
    }
})

const addToGroup = asyncHandler( async(req, res)=>{
    const {chatId, userId} = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(chatId,
        {
            $push: { users: userId},
        },
        {new: true}
    ).populate("users", "-password")
     .populate("groupAdmin", "-password");
    
    if(!updatedChat){
        res.status(400);
        throw new Error("Chat not found");
    }else{
        res.json(updatedChat);
    }
})

const removeFromGroup = asyncHandler( async(req, res)=>{
    const {chatId, userId} = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(chatId,
        {
            $pull: { users: userId},
        },
        {new: true}
    ).populate("users", "-password")
     .populate("groupAdmin", "-password");
    
    if(!updatedChat){
        res.status(400);
        throw new Error("Chat not found");
    }else{
        res.json(updatedChat);
    }
})

module.exports = {accessChat, fetchChat, createGroup, renameGroup, removeFromGroup, addToGroup};