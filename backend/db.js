const mongoose=require('mongoose')          //import mongoose
const mongoURI="mongodb://localhost:27017/inotebook"

const connectToMongo =()=>{                     //function for connecting to db
mongoose.connect(mongoURI, ()=>{                 //default call for connection , it takes argumenet and a funtion call back     
    console.log("connection success")})                       
    
} 
module.exports= connectToMongo;                     //connectToMongo function is exported and we can import in any componment we need                 