const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
require('dotenv').config({path:__dirname+'/../.env'});

const protect = asyncHandler( async(req, res, next) => {
    let token;

    if( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);

            next();

        }catch(err){
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }else{
        res.status(401);
        throw new Error("Not authorized, No token found");
    }
})

module.exports = {protect};