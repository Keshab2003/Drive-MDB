const express = require('express');
const router = express.Router();
const {body , validationResult} = require('express-validator');
const { default: mongoose } = require('mongoose');
const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//register the new user
router.get('/register' , (req , res) => {
    res.render('register');
});

router.post('/register' , 
    body('email').trim().isEmail().isLength({min:13}),
    body('name').trim().isLength({min:3}),
    body('password').trim().isLength({min : 5}),
    async(req , res) => {

        const errors = validationResult(req);
        // const newUser = [];
        if (!errors.isEmpty()) {
            return res.status(200).json({
                errors:errors.array(),
                message:"Invalid Data"

            })
        }
            const {email , name , password} = req.body;

            const hashedPassword = await bcrypt.hash(password , 10);

            const newUser = await user.create({
                name:name,
                email:email,
                password:hashedPassword
            })


        console.log(req.body);
        // res.send(errors);
        // res.send("User registered Successfully");
        // res.json(newUser);
        res.render('login');
});

//login and autheticate the user
router.get('/login' , (req , res) =>{
    res.render('login');
})

router.post('/login' ,
    body('name').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),
    async (req,res) => {
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                errors:errors.array(),
                message:"Invalid Data"
            });
        }

        const {name , password} = req.body;

        const users = await user.findOne({name:name});
        if(!users){
            return res.status(200).json({
                message:"UserName or Password is incorrect"
            });
        }

        const isValidPassword = await bcrypt.compare(password , users.password);
        if(!isValidPassword){
            return res.status(200).json({
                message:"User Name or Password is incorrect"
            });
        }
        
        
        const token = jwt.sign({
            id:users._id ,
            name:users.name ,
            email:users.email 
        },
        process.env.JWT_SECRET
        );

        res.cookie('token' , token);

        res.render('home');
        // res.send("User logged in successfully");
});

module.exports = router;