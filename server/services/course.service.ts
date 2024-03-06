import { Response } from "express";
import CourseModel from "../models/courseModel";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { log } from "console";
import ErrorHandler from "../utils/ErrorHandler";

//create course
export const createCourse= CatchAsyncError(async(data:any,res:Response)=>{

    console.log(data);
    
    const course= await CourseModel.create(data);
    if(!course){
      new ErrorHandler("Course not created",400)
    }
    res.status(201).json({
        success:true,
        course
    })
})

//Get all courses
export const getAllCoursesService = async (res: Response) => {
    const courses= await CourseModel.find().sort({createdAt:-1});
  
    res.status(201).json({
      success: true,
      courses
    })
  }