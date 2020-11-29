const express = require('express');
const connectDB = require('./config/db');
const app = express();
const connectDb = require('./config/db');

const PORT = process.env.PORT || 5000;

// ConnectDB 
connectDB();

// Define Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/post',require('./routes/api/post'));



app.listen(PORT,()=>{
    console.log('Server Started at 5000')
})