const User = require('../models/userSchema');
const SECREAT_KEY = 'ksfkskljfsl'
const jwt = require('jsonwebtoken');

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
    
    try {
        const existingUser = await User.findOne({email})
        if(!existingUser){
            const newUser = await User.create({name, email, password})
            res.status(200).json({success:true, newUser, msg:'user is created successfully'})
        }else{
            res.status(200).json({success:false, msg:"User already exist"})
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({success:false, msg:'Error occured while creating user in DB'})
    }
}

const signinUser = async(req, res) => {
    const {email, password} = req.body
  

    try {
        const signinUser = await User.findOne({email, password})
        console.log(signinUser)
        if(!signinUser){
            res.status(404).json({success:false, msg:"User not found please registred first"})
        }
         if(signinUser.password !== password){
            res.status(400).send({success:false, msg:'password incorrect'})
        } 
        const userPayLoad = {email}
        //Generate the token
        const token = jwt.sign(userPayLoad, SECREAT_KEY, {algorithm:'HS256', expiresIn:'1d'}  )
        res.cookie('jwt', token)
        res.send({status:'success', msg:'User login successfully'})


    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getUser,
    addUser,
    signinUser
}