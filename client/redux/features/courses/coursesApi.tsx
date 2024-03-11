import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url:"create-course",
                method:"POST",
                body:data,
                credentials:"include"
            })
        }),
        getAllCourses: builder.query({
            query: () => ({
                url:"get-courses",
                method:"GET",
                credentials:"include"
            })
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url:`delete-course/${id}`,
                method:"DELETE",
                credentials:"include"
            })
        })
    }),
})
export const {useCreateCourseMutation,useGetAllCoursesQuery,useDeleteCourseMutation} = coursesApi