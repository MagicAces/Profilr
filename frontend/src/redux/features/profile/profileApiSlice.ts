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
    addCourse: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Course"],
    }),
    getPrograms: builder.query({
      query: () => ({
        url: `${PROGRAMS_URL}/`,
      }),
      providesTags: (result: any) =>
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
    addProgram: builder.mutation({
      query: (data) => ({
        url: `${PROGRAMS_URL}`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Program"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetProgramsQuery,
  useAddCourseMutation,
  useAddProgramMutation,
} = profileApiSlice;
