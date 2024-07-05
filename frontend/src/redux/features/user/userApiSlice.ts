// import { apiSlice } from "../apiSlice";
// import { USERS_URL } from "../../constants";

// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProfile: builder.query({
//       query: () => ({
//         url: `${USERS_URL}/profile`,
//       }),
//       providesTags: ["User"],
//     }),
//     getProfiles: builder.query({
//       query: (secret) => ({
//         url: `${USERS_URL}/student?secret=${secret}`,
//       }),
//       providesTags: (result: any) =>
//         result?.students
//           ? [
//               ...result?.students?.map(({ id }: { id: number }) => ({
//                 type: "Student" as const,
//                 id,
//               })),
//               "Student",
//             ]
//           : ["Student"],
//     }),
//     // getStudent: builder.query({
//     //   query: (id) => ({
//     //     url: `${USERS_URL}/student/${id}`,
//     //   }),
//     //   providesTags: (result: any) => [{type: 'Student', id: result?.student?.id}]
//     // }),
//     approveProfile: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/student/approve`,
//         body: data,
//         method: "POST",
//       }),
//       invalidatesTags: ["Student"],
//     }),
//     fetchProfile: builder.mutation({
//       query: () => ({
//         url: `${USERS_URL}/fetch`,
//         method: "POST",
//       }),
//       invalidatesTags: ["User"],
//     }),
//     createProfile: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/profile`,
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["User"],
//     }),
//     updateProfile: builder.mutation({
//       query: ({ data, id }) => ({
//         url: `${USERS_URL}/profile/${id}`,
//         method: "PUT",
//         body: data,
//       }),
//       invalidatesTags: ["User"],
//     }),
//     logout: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/logout`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetProfileQuery,
//   useGetProfilesQuery,
//   // useGetStudentQuery,
//   useFetchProfileMutation,
//   useCreateProfileMutation,
//   useApproveProfileMutation,
//   useLogoutMutation,
//   useUpdateProfileMutation,
// } = userApiSlice;
