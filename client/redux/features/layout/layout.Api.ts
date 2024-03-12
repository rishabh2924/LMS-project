import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHeroData: builder.query({
            query: (type) => ({
                url:`get-layout/${type}`,
                method:"GET",
                credentials:"include"
            })
        }),
        editLayout: builder.mutation({
            query: ({type,image,title,subTitle,faq,categories}) => ({
                url:`edit-layout`,
                body:{
                    type,image,title,subTitle,faqData:faq,categories
                },
                method:"PUT",
                credentials:"include"
            })
        })
    }),
})
export const {useGetHeroDataQuery, useEditLayoutMutation} = layoutApi