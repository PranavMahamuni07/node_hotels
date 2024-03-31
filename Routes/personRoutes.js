const express = require('express');
const router = express.Router();
const Person = require('./../models/person');



router.post('/',async (req,res) =>{

    try{
        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }


    // const data = req.body

    // const newPerson = new Person()
    // newPerson.save((error , savedPerson)=>{
    //     if(error){
    //     console.log('Error saving person:',error);
    //     res.status(500).json({error:'Internal Server Error'})
    //     }else{
    //         console.log('data saved successfully');
    //         res.status(200).json(person)
    //     }
    // })
})

router.get('/', async(req,res)=>{
    try{

        const data =await Person.find();
        console.log('data fetched');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})



router.get('/:workType',async(req,res)=>{
    {
        try{
            const workType = req.params.workType;
            if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){

                const response = await Person.find({work:workType});
                console.log('Responce fetched')
                res.status(200).json({response});

            }else{
                res.status(404).json({error:'Invalid work Type'});

            }

        }catch(err){
            console.log(err);
            res.status(500).json({error:'Internal Server Error'}); 
            
        }
    }
})
 

router.put('/:id',async (req,res)=>{
    try{

        const personId = req.params.id;//extract the id from the URL parameter
        const updatedPersonData = req.body;// Update data for the person

        const responce = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true,// Return the updated Document
            runValidators : true,//run mongoose validator
        })

        if(!responce){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(responce);

    }catch(err){
      console.log(err);
            res.status(500).json({error:'Internal Server Error'});
  
    }
})

router.delete('/:id',async (req,res)=>{
    try{

        const personId = req.params.id;

        const responce = await Person.findByIdAndDelete(personId);

        if(!responce){
            return res.status(404).json({error:'Person not found'});
        }

        console.log("data deleted");
        res.status(200).json({message:"person deleted succesfully"});

    }catch(err){

        console.log(err);
        res.status(500).json({error:"Internal serverf Error"});
    }
})

module.exports = router;