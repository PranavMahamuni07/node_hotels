const mongoose = require('mongoose');


const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum : ['chef','waiter','manager'],
        require: true

    },
    mobile:{
        type:String,
        require:true,
        unique: true

    },
    email:{
        type: String,
        require:true,
        unique: true
    },
    address:{
        type:String,

    },
    salary:{
        type:Number,
        require:true
    }
})

const Person = mongoose.model('person',personSchema);
module.exports =Person;