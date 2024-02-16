import {Request,Response,NextFunction} from 'express'
import ErrorHandler from '../utils/ErrorHandler'
import { CatchAsyncError } from '../middleware/catchAsyncError'
import { generateLast12MonthsData } from '../utils/analytics.generator'
import userModel from '../models/userModal'
import CourseModel from '../models/courseModel'
import OrderModel from '../models/orderModel'


//get user analytics -- admin
export const getUserAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users= await generateLast12MonthsData(userModel);

            res.status(201).json({
                success: true,
                users
            })

        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
            
        }
    }
)
//get course analytics -- admin
export const getCourseAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const courses= await generateLast12MonthsData(CourseModel);

            res.status(201).json({
                success: true,
                courses
            })

        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
            
        }
    }
)
//get order analytics -- admin
export const getOrderAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders= await generateLast12MonthsData(OrderModel);

            res.status(201).json({
                success: true,
                orders
            })

        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
            
        }
    }
)
