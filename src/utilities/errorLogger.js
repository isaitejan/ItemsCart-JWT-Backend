const fs = require('fs');

let errorLogger = (err , req , res , next) => {
    fs.appendFile('errorLogger.txt',err.stack+"\n",(error)=>{
        if(error){
            console.log("Error logging failed");
        }
        if(err.status){
            res.status(err.status);
        }else{
            res.status(500);
        }
        res.json({"message":err.message});
    })
}

module.exports = errorLogger;