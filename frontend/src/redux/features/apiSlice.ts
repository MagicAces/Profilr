import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  // credentials: "include",
  prepareHeaders: (headers) => {
    const token = import.meta.env.VITE_ADMIN_SECRET;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Student", "Course", "Program"],
  endpoints: () => ({}),
});
