import { apiSlice } from "../api/apiSlice";

export const userApi= apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        updateAvatar:builder.mutation({
            query:(avatar)=>({
                url:"update-user-avatar",
                method:"PUT",
                body:{avatar},
                credentials:"include"
            })
        }),
        editProfile:builder.mutation({
            query:({name,email})=>({
                url:"update-user-info",
                method:"PUT",
                body:{name,email},
                credentials:"include"
            })
        }),
        updatePassword:builder.mutation({
            query:({newPassword,oldPassword})=>({
                url:"update-password",
                method:"PUT",
                body:{newPassword,oldPassword},
                credentials:"include"
            })
        })
    })
})

export const {useUpdateAvatarMutation,useEditProfileMutation,useUpdatePasswordMutation}=userApi