import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    try {
      const res = await api.get("/api/clients", {
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

export const fetchClient = createAsyncThunk(
  "clients/fetchClient",
  async (id) => {
    try {
      const res = await api.get(`/api/clients/${id}`, {
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

export const createClient = createAsyncThunk(
  "clients/createClient",
  async (client) => {
    try {
      const res = await api.post("/api/clients", JSON.stringify(client), {
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