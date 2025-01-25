import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchShipments = createAsyncThunk(
  "shipments/fetchShipments",
  async () => {
    try {
      const res = await api.get("/api/shipments", {
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

export const fetchShipment = createAsyncThunk(
  "shipments/fetchShipment",
  async (id) => {
    try {
      const res = await api.get(`/api/shipments/${id}`, {
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

export const createShipment = createAsyncThunk(
  "shipments/createShipment",
  async (shipment) => {
    try {
      const res = await api.post("/api/login", JSON.stringify(shipment), {
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
