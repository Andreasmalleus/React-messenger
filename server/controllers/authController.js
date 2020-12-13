const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const hash =  (password) => {
    return bcrypt.hashSync(password, saltRounds);
}

exports.signup = (req,res) => {
    const user = new User({
        ...req.body,
        password : hash(req.body.password)
    })
    user.save((err) => {
        if(err){
            res.sendStatus(500);
            return 'User creation error'
        }
        console.log('User created');
        res.sendStatus(200);
    })
}

exports.login = (req,res) => {
    var filter = {username: req.body.username}
    if(!req.body.isUsername){
        filter = {email : req.body.username}
    }
    User.findOne(filter).lean().exec((err, user) => {
        if(err){
            res.json(err);
            console.log(err)
        }
        if(user == null){
            res.sendStatus(500);
            console.log('User not found');
            return 'User not found';
        }
        if(bcrypt.compareSync(req.body.password, user.password)){
            console.log('Correct password');
            jwt.sign(user, jwtSecret, (err, token) =>{
                if(err){
                    res.sendStatus(500);
                    console.log('Token error');
                }
                console.log('Token created');
                res.status(200).send({
                    token: token,
                    user : user
                })
            });
        }else{
            res.sendStatus(500);
            console.log('Wrong password')
        }
    })
}