const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
}, {timestamps: true});

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }, 
    password:{
        type: String,
        required: true
    }
}, {timestamps: true});

// static signup method
userSchema.statics.signup = async function (email, password) {
    
    //validation
    if(!email || !password){
        throw Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }

    const exists = await this.findOne({ email })
    
    if(exists){
        throw Error('Email already in use');
    }

    // salt is random chars addes to password
    const salt = await bcrypt.genSalt(10);
    
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash})
    return user;
}

// static login method
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error("All fields must be filled")
    }

    // const user = await this.findOne({ email })
    const user = await this.findOne({email})
    console.log(user);
    
    if(!user){
        throw Error('Incorrect email or User not registered');
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error("Incorrect Password")
    }

    return user;
}

let db = {};

//connect to db
db.getItemCollection = ()=>{
    return mongoose.connect(process.env.MONGO_URI)
    .then((databaseObj)=>{
        return databaseObj.model('Item',itemSchema);
    })
    .catch((error)=>{
        console.log(error);
    })
}

db.getUserCollection = ()=>{
    return mongoose.connect(process.env.MONGO_URI)
        .then((databaseObj)=>{
            return databaseObj.model('User',userSchema);
        })
        .catch((error)=>{
            console.log(error);
        })
}

module.exports = db;