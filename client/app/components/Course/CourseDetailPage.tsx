import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Route/Footer';
import CourseDetails from '../../components/Course/CourseDetails'
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/ordersApi';
import { loadStripe } from '@stripe/stripe-js';


type Props = {
    id:string;
}

const CourseDetailPage = ({id}: Props) => {
    const [route,setRoute]= useState("Login")
    const [open,setOpen] = useState(false)
    const {data,isLoading} = useGetCourseDetailsQuery(id);
    const {data:config}= useGetStripePublishableKeyQuery({})
    const [createPaymentIntent,{data:paymentIntentData}]= useCreatePaymentIntentMutation()
    const [stripePromise,setStripePromise] = useState<any>(null)
    const [clientSecret,setClientSecret] = useState("")

    useEffect(()=>{
   
      
        if(config){
            const publishablekey= config?.publishableKey;
            
            setStripePromise(loadStripe(publishablekey));
        }
        if(data){
          const amount= Math.round(data.course.price * 100);
          createPaymentIntent(amount)
        }
    },[config,data,createPaymentIntent])

    useEffect(()=>{
  
      
      if(paymentIntentData){
        
        setClientSecret(paymentIntentData?.clientSecret)
      }
    },[paymentIntentData])
    
  return (
    <>
    {isLoading ? <Loader/> : 
    <div className="">
        <Heading
        title={data?.course?.name + " -Ecademy "}
        description={"ECademy is a leading online learning platform"}
        keywords={data?.course?.tags}
        />
        <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
        />
        {
          stripePromise && (
            <CourseDetails
        data= {data?.course}
        stripePromise={stripePromise}
        clientSecret={clientSecret}
        />
          )
        }
        <Footer/>
    </div>
}
    </>
  )
}

export default CourseDetailPage