const fs = require('fs');

let requestLogger = (req , res , next) => {
    fs.appendFile('requestLogger.txt',req.method+" - "+req.url+" - "+new Date()+"\n",(error)=>{
        if(error){
            console.log("Request Logging Failed");
        }
        next();
    })
}

module.exports = requestLogger;