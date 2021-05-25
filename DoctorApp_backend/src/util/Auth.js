const { getSecret } = require('../shared/utils');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userSchema = require("../models/userModel");
const User = mongoose.model('User', userSchema);

module.exports = (req, res, next) => {
    let idToken;
    let tokenSecret = getSecret();
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idToken = req.headers.authorization.split('Bearer ')[1];
    }
    else {
        console.log('No token found');
        return res.status(403).json({error: 'Unauthorized'});
    }
    console.log(idToken);
    jwt.verify(idToken, tokenSecret, async (err, decoded) => {
        console.log(decoded);
        if(err){
            console.log(JSON.stringify(err));
            return res.status(403).json({error: 'Token Invalid'});
        }
        req.user = await User.findById(decoded.userId).lean();
        next();
    })
    .catch(err => {
        return res.status(403).json({error: 'Sever Error'});
    })
}