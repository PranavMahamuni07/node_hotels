// const jsonString ='{"name": "jonh", "age":30 , "city":"Pune"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name);

const express = require('express')
const app = express();

const db = require('./db');


const bodyParser = require('body-parser');
app.use(bodyParser.json())

//import
const menuItemsRoutes = require('./Routes/menuItemRoutes');
const personRoutes = require('./Routes/personRoutes');


//use
app.use('/MenuItems',menuItemsRoutes);
app.use('/person',personRoutes);




app.listen(3000,()=>{
    console.log("server is running");
})     