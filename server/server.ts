import {app} from './app'
import connectDB from './utils/db';
import {v2 as cloudinary} from 'cloudinary';
require('dotenv').config()

//cloudinary config

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    
})



//create server
app.listen(process.env.PORT,()=>{
    console.log(`server is listening to port ${process.env.PORT}`);
    connectDB()
})
