const express = require('express');
const router = express.Router();
const userServices = require('../services/user-services')
const db = require('../utilities/databaseConnection');
const jwt = require('jsonwebtoken')

const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

//login route
router.post("/login",async (req, res)=>{
    const { email, password} = req.body;
    try {
        const userModel = await db.getUserCollection();
        const user = await userModel.login(email, password);

        // create token
        const token = createToken(user._id)

        // the JWT token must be sent in the following response
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }  
})

//sign-up route
router.post("/signup", async (req, res)=>{
    const {email, password} = req.body;
    try{
        const userModel = await db.getUserCollection()
        const user = await userModel.signup(email, password)

        // create token
        const token = createToken(user._id)

        // the JWT token must be sent in the following response
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

module.exports = router;