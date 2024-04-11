import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import OrderModel, { IOrder } from "../models/orderModel";
import userModel from "../models/userModal";
import CourseModel from "../models/courseModel";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificationModel";
import { getAllOrdersService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
require("dotenv").config();
const stripe= require("stripe")(process.env.STRIPE_SECRET_KEY)

//create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      if(payment_info){
        if('id' in payment_info){
          const paymentIntentId=payment_info.id;
          const paymentIntent= await stripe.paymentIntents.retrieve(paymentIntentId);
          if(paymentIntent.status !=="succeeded"){
            return next(new ErrorHandler("Payment not authorized", 200));
          }
        }
      }

      const user = await userModel.findById(req.user?._id);
      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId.toString()
      );
      if (courseExistInUser) {
        return next(new ErrorHandler("Already purchased", 404));
      }
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      const data: any = {
        courseId,
        userId: req.user?._id,
        payment_info,
      };
      
      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );
      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
      user?.courses.push(course?._id);
      await redis.set(req.user?._id, JSON.stringify(user))
      await user?.save();
      await NotificationModel.create({
        userId: user?._id,
        title: "New order",
        message: `New order has been placed from ${course?.name}`,
      });
      if(course.purchased){
        course.purchased+=1;
      }
      await course.save();
      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get all orders --- admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
      
    }
  }
)

//sent stripe publishable key
export const sendStripePublishableKey = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    })
  }
)
//new payment
export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        metadata: {
          company: "Ecademy",
        },
        automatic_payment_methods: {
          enabled: true,
        }
      })
      res.status(201).json({
        success: true,
        clientSecret: myPayment.client_secret
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
      
    }
  }
)
