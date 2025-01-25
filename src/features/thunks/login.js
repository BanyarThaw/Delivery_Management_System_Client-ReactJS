import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchLogin = createAsyncThunk("login/fetchLogin", async (user) => {
  try {
    const res = await api.post("/api/login", JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
});
