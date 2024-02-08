const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

//signup
router.post('/users/signup', (req, res) => {
        const user = new User(req.body);
        user.save().then(() => {
            res.status(201).send();
        }).catch((error) => {
            res.status(500).send(error);
        });
});

//get all users
router.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send(users);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//user login
router.post("/users/login", async (req, res)=>{
    try{
        const inputPassword = req.body.password;
        let user = await User.findOne({username: req.body.username});
        if(!user) {
            return res.status(404).send({error: "User not found"});
        }
        if(user.password !== inputPassword){
            return res.status(401).send({error: "Username and password don't match"});
        }
    
    const token = jwt.sign({username: user.username}, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNjcyNzU1NCwiaWF0IjoxNzA2NzI3NTU0fQ.vNymv_ch6QX7CKgLLRsd1mluQmyPD88ThwlYY-imcn0");
    res.cookie("t", token, {expire: new Date() + 9999});
    return res.json({
        token,
        user: {
            _id: user._id,
            username: user.username,
        }
    })

    }catch(error){
        res.status(401).json({error: "Could not sign in"});
    }
})

module.exports = router;