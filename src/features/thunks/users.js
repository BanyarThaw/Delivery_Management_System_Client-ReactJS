import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const res = await api.get("/api/users", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
});

export const fetchUser = createAsyncThunk("users/fetchUser", async (id) => {
  try {
    const res = await api.get(`/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
});

export const createUser = createAsyncThunk("users/createUser", async (user) => {
  try {
    const res = await api.post("/api/users", JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
});
