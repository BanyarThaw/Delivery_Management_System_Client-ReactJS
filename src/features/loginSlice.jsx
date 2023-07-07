import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/axios";

const initialState = {
  info: {},
  error: null,
};

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async ( user ) => {
    try {
      console.log(user);
      const res = await api.post('/api/login',
      // JSON.stringify({ username: "name", password: "password" }),
      JSON.stringify(user),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    removeLogin: (state) => {
      state.info = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.info = {};
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        console.log(action);
        state.info = action.payload;
        state.error = null;
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
