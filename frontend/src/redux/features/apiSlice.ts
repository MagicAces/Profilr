import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Course", "Program"],
  endpoints: () => ({}),
});
