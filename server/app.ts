import express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/userRoute";
import courseRouter from "./routes/courseRoute";
import orderRouter from "./routes/orderRoute";
import notificationRouter from "./routes/notificationRoute";

require('dotenv').config();

export const app=express();

//body parser
app.use(express.json({limit:"50mb"}));

//cookie parser
app.use(cookieParser()) 

//cors
app.use(cors({
    origin: process.env.ORIGIN
}))

//routes
app.use('/api/v1',userRouter);
app.use('/api/v1',courseRouter);
app.use('/api/v1',orderRouter);
app.use('/api/v1',notificationRouter);

//testing api
app.get('/test',(req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json({
        success:true,
        message:'API is working'
    })
})
app.all("*",(req:Request,res:Response,next:NextFunction)=>{
    const err= new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode=404;
    next(err);
})

//error handler middleware
app.use(ErrorMiddleware)