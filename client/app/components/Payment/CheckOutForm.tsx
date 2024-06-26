import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/style';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
    setOpen: any;
    data:any;
    user:any;
}

const CheckOutForm = ({setOpen,data,user}: Props) => {
    const stripe= useStripe()
    const elements= useElements();
    const [message,setMessage]= useState<any>("");
    const [createOrder,{data:orderData,error}]= useCreateOrderMutation()
    const  [loadUser,setLoadUser]= useState(false)
    const {}= useLoadUserQuery({skip:loadUser? false :true})
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit= async (e:any)=>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        setIsLoading(true);
        const {error,paymentIntent}= await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        })
        if(error){
            setMessage(error.message)
            setIsLoading(false)
        }
        else if(paymentIntent && paymentIntent?.status==="succeeded"){
            createOrder({courseId:data._id,payment_info:paymentIntent})
            setIsLoading(false)
            setOpen(false)
        }
    }
    useEffect(()=>{
        if(orderData){
            setLoadUser(true)
            socketId.emit("notification",{
                title:"New Order",
                message:`You have a new order from ${data.course.name}`,
                userId:user._id
            })
            redirect( `/course-access/${data._id}`);
        }
        if(error){
            if("data" in error){
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    },[orderData,error])

  return (
    <form id="payment-form" onSubmit={handleSubmit} >
        <LinkAuthenticationElement id= 'link-authentication-element'/>
        <PaymentElement id="payment-element"/>
        <button disabled={isLoading} id="submit" className={`${styles.button} mt-5 `}>
            <span id="button-text" >
                {isLoading ? "Paying...." : "Pay now"}
            </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message" className='text-red-500 font-Poppins pt-2'>{message}</div>}
    </form>
  )
}

export default CheckOutForm