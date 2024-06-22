import { apiSlice } from "../apiSlice";
import { COURSES_URL, PROGRAMS_URL } from "../../constants";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: ({ level, program_id, semester }) => ({
        url: `${COURSES_URL}?level=${level}&program_id=${program_id}&semester=${semester}`,
      }),
      providesTags: ["Course"],
    }),
    getPrograms: builder.query({
      query: () => ({
        url: `${PROGRAMS_URL}/`,
      }),
      providesTags: (result) =>
        result?.programs
          ? [
              ...result?.programs?.map(({ id }: { id: number }) => ({
                type: "Program" as const,
                id,
              })),
              "Program",
            ]
          : ["Program"],
    }),
  }),
});

export const { useGetCoursesQuery, useGetProgramsQuery } = profileApiSlice;
