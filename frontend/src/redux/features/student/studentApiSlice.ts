import { apiSlice } from "../apiSlice";
import { STUDENTS_URL } from "../../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: `${STUDENTS_URL}`,
      }),
      providesTags: (result: any) =>
        result?.students
          ? [
              ...result?.students?.map(({ id }: { id: number }) => ({
                type: "Student" as const,
                id,
              })),
              "Student",
            ]
          : ["Student"],
    }),
    getStudent: builder.query({
      query: (id: any) => ({
        url: `/api/students/${id}`,
      }),
      providesTags: (result: any) => [
        { type: "Student", id: result?.student?.id },
      ],
    }),
    createStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),
    updateStudent: builder.mutation({
      query: ({ data, id }) => ({
        url: `${STUDENTS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
} = userApiSlice;
