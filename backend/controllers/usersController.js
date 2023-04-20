const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const getUser = async (req, res) => {
try {
    const allUser = await User.find();
    if(!allUser){
        res.status(404).json({success:false, msg: "user not found"})
    } else {
        res.status(200).json({success:true, allUser, msg:"All Users"})
    }
} catch (error) {
    console.log(error)
}

}

const addUser = async(req, res) => {
    const {name, email, password} = req.body;
    console.log(req.body)
    
    try {
        const existingUser = await User.findOne({email})
        //password hashing 
        const saltRounds = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(password, saltRounds)
        if(!existingUser){
            const newUser = await User.create({name, email, secpass})
            res.status(200).json({success:true, newUser, msg:'user is created successfully'})
        }else{
            res.status(200).json({success:false, msg:"User already exist"})
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({success:false, msg:'Error occured while creating user in DB'})
    }
}

const loginUser = async(req, res) => {
    const {email, password} = req.body
    console.log(req.body)
  

    try {
        const signinUser = await User.findOne({email, password})
        // console.log(signinUser)
        if(!signinUser){
            res.status(404).json({success:false, msg:"User not found please registred first"})
        }
         if(signinUser.password !== password){
            res.status(400).send({success:false, msg:'password incorrect'})
        } 
        if (signinUser) {
            const validUser = await bcrypt.compare(
                password, signinUser.password
            );
            if(validUser){
                const userPayLoad = {email}
                //Generate the token
                const jwttoken = await jwt.sign(userPayLoad, process.env.SECREAT_KEY)
                console.log(jwttoken)
                return res.status(200).json({ success: true, response: "User login done", token: jwttoken })
            }
        }
        

    } catch (error) {
        console.log(error)
    }

}

const logoutUser = async (req, res) => {
    res.clearCookie('jwt'); // clear the token cookie
    res.json({success:true, msg:'logout successfully'})
  };

module.exports = {
    getUser,
    addUser,
    loginUser,
    logoutUser
}