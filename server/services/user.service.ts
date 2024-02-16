import { Response } from "express";
import userModel from "../models/userModal";
import { redis } from "../utils/redis";

//get user by id
export const getUserById = async (id: string, res: Response) => {
  const user = await redis.get(id);
  if (user) {
    const userJson = JSON.parse(user as any);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

//GEt All users
export const getAllUsersService = async (res: Response) => {
  const users= await userModel.find().sort({createdAt:-1});

  res.status(201).json({
    success: true,
    users
  })
}

export const updateUserRoleService = async(res:Response,id:string,role:string)=>{
  const user = await userModel.findByIdAndUpdate(id,{role},{new:true});

  res.status(201).json({
    success: true,
    user
  })
}
  
