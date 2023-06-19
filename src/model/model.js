const db = require('../utilities/databaseConnection');



let db_Connections = {};

db_Connections.insertItem = (itemPayLoad)=>{
    return db.getItemCollection().then((itemModel)=>{
        return itemModel.create(itemPayLoad).then((success)=>{
            if(success){
                return success;
            }else{
                throw new Error("Can't Insert Data!");
            }
        })
        .catch((error)=>{
            error.status = 500;
            throw error;
        })
    })
}

// db_Connections.getAllItems = ()=>{
//     return db.getItemCollection().then((itemModel)=>{
//         return itemModel.find().then((successArray)=>{
//             return successArray;
//         })
//     })
// }

db_Connections.getAllItems = async (user_id)=>{
    itemModel = await db.getItemCollection();
    successArray = await itemModel.find({user_id}).sort({createdAt: -1});
    return successArray;
}

db_Connections.deleteSingleItem = (id)=>{
    return db.getItemCollection().then((itemModel)=>{
        return itemModel.findOneAndDelete({_id:id}).then((resp)=>{
            if(resp){
                return resp;
            }else{
                throw new Error('Item not found in the document!');
            }
        }).catch((err)=>{
            err.status = 500;
            throw err;
        })
    })
}

module.exports = db_Connections;