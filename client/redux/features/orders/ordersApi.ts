import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getOrders:builder.query({
            query:()=>({
                url:"get-all-orders",
                method:"GET",
                credentials:"include",
                
            })
        })
    })
})

export const {useGetOrdersQuery}=ordersApi