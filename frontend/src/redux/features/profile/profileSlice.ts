import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Course,
  CourseQuery,
  ProfileState,
  Program,
  StudentInput,
} from "../../../types";

const initialState: ProfileState = {
  phase: 1,
  student: {
    first_name: "",
    last_name: "",
    other_name: "",
    email: "",
    phone_no: "",
    gender: "",
    level: "",
    semester: 0,
    index_number: 0,
    reference_no: 0,
    program_id: 0,
    image: "",
    course_ids: [],
  },
  courses: [],
  programs: [],
  courseQuery: {
    level: "",
    program_id: 0,
    semester: 0,
  },
  loading: false
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setPhase: (state, action: PayloadAction<number>) => {
      state.phase = action.payload;
    },
    fillStudent: (state, action: PayloadAction<StudentInput>) => {
      state.student = action.payload;
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    setPrograms: (state, action: PayloadAction<Program[]>) => {
      state.programs = action.payload;
    },
    setCourseQuery: (
      state,
      action: PayloadAction<{ name: keyof CourseQuery; value: string | number }>
    ) => {
      const { name, value } = action.payload;
      if (name === "level" && typeof value === "string") {
        state.courseQuery[name] = value;
      } else if (name === "semester" && typeof value === "number") {
        state.courseQuery[name] = value;
      } else if (name === "program_id" && typeof value === "number") {
        state.courseQuery[name] = value;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearProfile: (state) => {
      state.phase = 1;
      state.student = {
        first_name: "",
        last_name: "",
        other_name: "",
        email: "",
        phone_no: "",
        gender: "",
        level: "",
        semester: 0,
        index_number: 0,
        reference_no: 0,
        program_id: 0,
        course_ids: [],
        image: ""
      };
      state.courses = [];
      state.programs = [];
      state.courseQuery = {
        level: "",
        semester: 0,
        program_id: 0,
      };
      state.loading = false;
    },
  },
});

export const {
  setPhase,
  setCourses,
  setPrograms,
  fillStudent,
  setCourseQuery,
  setLoading,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
