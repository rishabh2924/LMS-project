import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include",
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name, email }) => ({
        url: "update-user-info",
        method: "PUT",
        body: { name, email },
        credentials: "include",
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ newPassword, oldPassword }) => ({
        url: "update-password",
        method: "PUT",
        body: { newPassword, oldPassword },
        credentials: "include",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "get-all-user",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user-role",
        method: "PUT",
        body: { email, role },
        credentials: "include",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",

        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;
