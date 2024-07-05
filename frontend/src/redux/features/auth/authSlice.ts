import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userInfo: any;
  isAdmin: boolean;
}

const initialState: AuthState = {
  userInfo:
    localStorage.getItem("userInfo") !== null
      ? JSON.parse(localStorage.getItem("userInfo") as string)
      : null,
  isAdmin:
    localStorage.getItem("isAdmin") !== null
      ? JSON.parse(localStorage.getItem("isAdmin") as string)
      : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime.toString());
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;

      localStorage.setItem("isAdmin", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes
      localStorage.setItem("expirationTime", expirationTime.toString());
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
      state.isAdmin = false;
    },
  },
});

export const { setCredentials, setIsAdmin, logout } = authSlice.actions;

export default authSlice.reducer;
