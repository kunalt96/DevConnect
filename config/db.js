const mongoose = require('mongoose');
// Global variables created to let/manage Nodejs applications 
const config = require('config');
// Calling mongoURI from database 
const db = config.get('mongoURI');
let connectingOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connectDB = async ()=>{
    try{
        await mongoose.connect(db,connectingOptions);
        console.log('MongoDB connected....')
    }catch(err){
        console.error(err.message);
        // Exit the process with failure 
        // To exit the nodejs application 
        process.exit(1)
    }
}

module.exports = connectDB;