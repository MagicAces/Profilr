import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentState, StudentProfile } from "../../../types";

const initialState: StudentState = {
  students: [],
  loading: false,
  student: {},
  tab: 1,
  search: "",
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<StudentProfile[]>) => {
      state.students = action.payload;
    },
    setStudent: (state, action: PayloadAction<StudentProfile>) => {
      state.student = action.payload;
    },
    setTab: (state, action: PayloadAction<number>) => {
      state.tab = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    clearStudents: (state) => {
      state.students = [];
      state.loading = false;
      state.student = {};
      state.tab = 1;
      state.search = "";
    },
  },
});

export const { setStudents, setStudent, setLoading, setTab,  setSearch, clearStudents } =
  studentSlice.actions;

export default studentSlice.reducer;
