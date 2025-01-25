import { createSlice } from "@reduxjs/toolkit";
import {
  createShipment,
  fetchShipment,
  fetchShipments,
} from "../thunks/shipments";

const initialState = {
  items: [],
  error: null,
};

const getShipmentsSlice = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    updateShipments: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.items = [];
        state.error = null;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.items = [];
        state.error = action.error.message;
      });
  },
});

const getShipmentSlice = createSlice({
  name: "shipment",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipment.pending, (state) => {
        state.items = [];
        state.error = null;
      })
      .addCase(fetchShipment.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchShipment.rejected, (state, action) => {
        state.items = [];
        state.error = action.error.message;
      });
  },
});

const createShipmentSlice = createSlice({
  name: "createShipment",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createShipment.pending, (state) => {
        state.items = [];
        state.error = null;
      })
      .addCase(createShipment.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(createShipment.rejected, (state, action) => {
        state.items = [];
        state.error = action.error.message;
      });
  },
});

export const selectShipments = (state) => state.shipments.items;
export const selectShipmentsError = (state) => state.shipments.error;
export const selectShipment = (state) => state.shipment.items;
export const selectShipmentError = (state) => state.shipment.error;
export const { updateShipments } = getShipmentsSlice.actions;

const getShipmentsReducer = getShipmentsSlice.reducer;
const getShipmentReducer = getShipmentSlice.reducer;
const createShipmentReducer = createShipmentSlice.reducer;

export { getShipmentsReducer, getShipmentReducer, createShipmentReducer };
