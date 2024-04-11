import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getOrders:builder.query({
            query:()=>({
                url:"get-all-orders",
                method:"GET",
                credentials:"include",
                
            })
        }),
        getStripePublishableKey:builder.query({
            query:()=>({
                url:"payment/strippublishablekey",
                method:"GET",
                credentials:"include",
                
            })
        }),
        createPaymentIntent:builder.mutation({
            query:(amount)=>({
                url:"payment",
                method:"POST",
                body:{amount},
                credentials:"include",
                
            })
        }),
        createOrder: builder.mutation({
            query:({courseId,payment_info})=>({
                url:"create-order",
                method:"POST",
                body:{courseId,payment_info},
                credentials:"include",
            })
        })
    })
})

export const {useGetOrdersQuery,useCreateOrderMutation,useCreatePaymentIntentMutation,useGetStripePublishableKeyQuery}=ordersApi