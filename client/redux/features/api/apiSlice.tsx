import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_SERVER_URI,
    }),
    endpoints:(builder)=>({
        refreshToken: builder.query({
            query:(data)=>({
                url:"refresh",
                method:"GET",
                credentials:"include" 
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const {data}=await queryFulfilled
                    
                    
                    dispatch(
                        userLoggedIn({
                            token:data.newAccessToken,
                            
                        })
                    )
                }catch(err){
                    console.log(err)
                }
            }
        })
        ,
        loadUser: builder.query({
            query:(data)=>({
                url:"info",
                method:"GET",
                credentials:"include" 
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const {data}=await queryFulfilled
                    
                    
                    dispatch(
                        userLoggedIn({
                            token:data.token,
                            user:data.user
                        })
                    )
                }catch(err){
                    console.log(err)
                }
            }
        })
    })
})

export const {useRefreshTokenQuery,useLoadUserQuery}=apiSlice