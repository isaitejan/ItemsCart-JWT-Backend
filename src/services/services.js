const model = require('../model/model');
let services = {}

services.insertItemService = (itemPayLoad)=>{
    return model.insertItem(itemPayLoad).then((data)=>{
        return data;
    }).catch((err)=>{
        err.status = 500;
        throw err;
    })
}

// services.getAllItemsService = ()=>{
//     return model.getAllItems().then((data)=>{
//         return data;
//     })
// }

services.getAllItemsService = async (user_id)=>{
    data = await model.getAllItems(user_id);
    return data;
}

services.deleteSingleItemService = (id)=>{
    return model.deleteSingleItem(id).then((resp)=>{
        return resp;
    }).catch((err)=>{
        err.status = 500
        throw err;
    })
}

module.exports = services;