const mongoose = require('mongoose');


const mongoURL = 'mongodb+srv://Pranav:Pranav%402004@cluster0.mcsvd0w.mongodb.net/hotels';

mongoose.connect(mongoURL,{
    useNewUrlParser: true,       // New URL parser
  useUnifiedTopology: true, //avoids warnings 



})


// default connection 
const db = mongoose.connection;

//event listner 

db.on('conncted', ()=>{
    console.log("connected to mongoDB server");
})

db.on('error', ()=>{
    console.log("error to mongoDB server");
})

db.on('disconncted', ()=>{
    console.log("disconnected to mongoDB server");
});


//export 

module.exports = db;