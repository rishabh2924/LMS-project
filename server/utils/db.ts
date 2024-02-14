import mongoose from 'mongoose'
require('dotenv').config();

const dbUrl:string =process.env.DB_URI || '';

const connectDB=async ()=>{
    try {
        await mongoose.connect(dbUrl).then((data:any)=>{
            console.log(`Database connected with ${data.connection.host}`);
            
        })
    } catch (error) {
        console.log((error as any).message);
        setTimeout(connectDB,5000);
    }
}
export default connectDB