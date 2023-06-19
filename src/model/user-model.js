const db = require('../utilities/databaseConnection');
let userModel = {}

//login user
 userModel.loginUser = async (req, res)=>{
    res.json({msg:'login success'});
    // return db.getUserCollection().then((userModel)=>{

    // })
}

//signup user
userModel.signupUser = async (req, res)=>{
    res.json({msg:'signup success'});
}

module.exports = userModel;