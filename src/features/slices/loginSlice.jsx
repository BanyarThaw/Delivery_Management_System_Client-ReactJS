import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "../thunks/login";

const initialState = {
  info: localStorage.getItem("login")
    ? JSON.parse(localStorage.getItem("login"))
    : {},
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    removeLogin: (state) => {
      state.info = {};
      localStorage.removeItem("login");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.info = {};
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.info = action.payload;
        state.error = null;
        localStorage.setItem("login", JSON.stringify(action.payload));
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.info = {};
        state.error = action.error.message;
      });
  },
});

export const selectInfos = (state) => state.login.info;
export const selectError = (state) => state.login.error;
export const { removeLogin } = loginSlice.actions;

export default loginSlice.reducer;
