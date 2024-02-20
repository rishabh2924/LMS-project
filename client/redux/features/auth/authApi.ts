import { apiSlice} from "../api/apiSlice";
import { userLoggedIn, userRegistration} from "./authSlice";

type RegistrationResponse={
    message:string;
    activationToken:string;
}
type RegistrationData={}

export const authApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        userRegistration:(builder.mutation<RegistrationResponse,RegistrationData>({
            query:(data)=>({
                url:"registration",
                method:"POST",
                body:data,
                credentials:"include" as const,
            }),
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try{
                    const {data}=await queryFulfilled
                    dispatch(userRegistration({
                        token:data.activationToken
                    }))
                }catch(err){
                    console.log(err)
                }
            }
        })),
        activation:(builder.mutation({
            query:({activation_token,activation_code})=>({
                url:"activate-user",
                method:"POST",
                body:{
                    activation_token,
                    activation_code
                }
            })
        })),
        login:builder.mutation({
            query:({email,password})=>({
                url:"login",
                method:"POST",
                body:{
                    email,
                    password
                },
                credentials:"include" as const
            }),
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try{
                    const {data}=await queryFulfilled
                    dispatch(userLoggedIn({
                        token:data.activationToken,
                        user:data.user
                    }))
                }catch(err){
                    console.log(err)
                }
            }
        }),
        socialAuth:builder.mutation({
            query:({email,name,avatar})=>({
                url:"social-auth",
                method:"POST",
                body:{
                    email,
                    name,
                    avatar
                },
                credentials:"include" as const
            }),
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try{
                    const {data}=await queryFulfilled
                    dispatch(userLoggedIn({
                        token:data.accessToken,
                        user:data.user
                    }))
                }catch(err){
                    console.log(err)
                }
            }
        }),
    })
})
export const {useUserRegistrationMutation, useActivationMutation, useLoginMutation,useSocialAuthMutation}=authApi