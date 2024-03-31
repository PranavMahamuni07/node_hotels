const express = require('express');
const router = express.Router();
const MenuItems = require('../models/menuItems'); 



router.post('/',async(req,res)=>{

    try{
        const data = req.body
        const newMenu = new MenuItems(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});

    }

})


router.get('/',async(req,res)=>{

    try{
        const data = await MenuItems.find();
        console.log('Data is fetched');
        res.status(200).json(data);


    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }

}) 


router.get('/:tasteType',async(req,res)=>{
    {
        try{

            const tasteType = req.params.tasteType;
            if(tasteType == 'sweet' || tasteType == 'spicy'|| tasteType =='sour'){

                const responce = await MenuItems.find({taste:tasteType});
                console.log('tasted')
                res.status(200).json({responce});

            }


            else{
                res.status(404).json({error:'Invalid taste Type'});

            }

        }catch(err){
            console.log(err);
            res.status(500).json({error:'Internal Server Error'}); 
            
        }
    }
})


router.put('/:id',async (req,res)=>{
    try{

        const menuId = req.params.id;//extract the id from the URL parameter
        const updatedMenuData = req.body;// Update data for the person

        const responce = await MenuItems.findByIdAndUpdate(menuId,updatedMenuData,{
            new: true,// Return the updated Document
            runValidators : true,//run mongoose validator
        })

        if(!responce){
            return res.status(404).json({error:'menu not found'});
        }

        console.log('menu data updated');
        res.status(200).json(responce);

    }catch(err){
      console.log(err);
            res.status(500).json({error:'Internal Server Error'});
  
    }
})

router.delete('/:id',async (req,res)=>{
    try{

        const menuId = req.params.id;

        const responce = await MenuItems.findByIdAndDelete(menuId);

        if(!responce){
            return res.status(404).json({error:'menu not found'});
        }

        console.log("menu data deleted");
        res.status(200).json({message:"menu deleted succesfully"});

    }catch(err){

        console.log(err);
        res.status(500).json({error:"Internal server Error"});
    }
})


module.exports = router;