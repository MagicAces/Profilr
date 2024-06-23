import { apiSlice } from "../apiSlice";
import { USERS_URL } from "../../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
      providesTags: ["User"],
    }),
    fetchProfile: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/fetch`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    createProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: ({ data, id }) => ({
        url: `${USERS_URL}/profile/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useFetchProfileMutation,
  useCreateProfileMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
} = userApiSlice;
