const express = require('express');
const router = express.Router();
const services = require('../services/services');
const requireAuth = require('../middleware/requireAuth');

//Authorization
router.use(requireAuth);

//GET All Items
router.get('/getAll',async (req, res)=>{
    // services.getAllItemsService().then((dataArray)=>{
    //     res.json({message:dataArray});
    // })
    const user_id = req.user._id;
    dataArray = await services.getAllItemsService(user_id);
    // setTimeout(()=>{
        res.json({message:dataArray});
    // },10000)
    
})

//CREATE single item
router.post('/insertItem',(req, res)=>{
    const { itemName, quantity} = req.body
    const user_id = req.user._id;
    services.insertItemService({ itemName:itemName, quantity:quantity, user_id: user_id}).then((message)=>{
        if(message){
            res.json({message: message});
        }
    }).catch((err)=>{
        res.status(500).send({error:err.message});
    })
})

//DELETE single item
router.delete('/:id',(req, res)=>{
    id = req.params.id;
    services.deleteSingleItemService(id).then((resp)=>{
        if(resp){
            res.json({message: resp});
        }
    }).catch((err)=>{
        res.status(500).send({error:err.message});
    })
})

//--------------------------------------------------------------
//GET single item
router.get('/:id',(req, res)=>{
    res.json({msg: 'GET single item'})
})

//UPDATE single item
router.patch('/:id',(req, res)=>{
    res.json({msg: 'UPDATE single item'})
})

module.exports = router;