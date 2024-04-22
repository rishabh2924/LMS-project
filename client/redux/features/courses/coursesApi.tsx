import { idID } from "@mui/material/locale";
import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getUsersAllCourses: builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include",
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}` ,
        method: "GET",
        credentials: "include",
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-course-content/${id}` ,
        method: "GET",
        credentials: "include",
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({question,courseId, contentId}) => ({
        url: "add-question",
        method: "PUT",
        body: {
          question,
          courseId,
          contentId
        },
        credentials: "include",
      }),
    }),
    addAnswerInQuestion: builder.mutation({
      query: ({questionId,courseId, contentId, answer}:any) => ({
        url: "add-answer",
        method: "PUT",
        body: {
          questionId,
          answer,courseId, contentId
        },
        credentials: "include",
      }),
    }),
    addReviewInCourse:builder.mutation({
      query:({review, rating,courseId}:any)=>({
        url:`add-review/${courseId}`,
        method:"PUT",
        body:{
          review, rating,
        },
        credentials:"include"
      })
    })
  }),
});
export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useGetUsersAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewInCourseMutation
} = coursesApi;
