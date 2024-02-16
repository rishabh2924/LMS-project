import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/orderModel";


//create new order
export const newOrder= CatchAsyncError(async(data:any,res:Response)=>{
    const order= await OrderModel.create(data);
    res.status(200).json({
        success:true,
        order:order});
})


export const getAllOrdersService = async (res: Response) => {
    const users= await OrderModel.find().sort({createdAt:-1});
  
    res.status(201).json({
      success: true,
      users
    })
  }
  