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
