import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchStatuses = createAsyncThunk(
  "statuses/fetchStatuses",
  async () => {
    try {
      const res = await api.get("/api/statuses", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

export const fetchStatus = createAsyncThunk(
  "statuses/fetchStatus",
  async (id) => {
    try {
      const res = await api.get(`/api/statuses/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

export const createStatus = createAsyncThunk(
  "statuses/createStatus",
  async (status) => {
    try {
      const res = await api.post("/api/statuses", JSON.stringify(status), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);
