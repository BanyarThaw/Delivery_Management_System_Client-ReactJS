import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/axios";

const initialState = {
    items: [],
    error: null,
};

export const fetchShipments = createAsyncThunk(
    "shipments/fetchShipments",
    async () => {
        try {
            const res = await api.get('/api/shipments',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
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
            const res = await api.get(`/api/shipments/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            return res.data;
        } catch (err) {
            throw new Error(err.message);
        }
    }
);

export const createShipment = createAsyncThunk(
    "shipments/createShipment",
    async ( shipment ) => {
      try {
        const res = await api.post('/api/login',
            JSON.stringify(shipment),
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

const getShipmentsSlice = createSlice({
    name: "shipments",
    initialState,
    reducers: {
        updateShipments: (state,action) => {
            state.items = action;
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchShipments.pending, (state) => {
          state.items = {};
          state.error = null;
        })
        .addCase(fetchShipments.fulfilled, (state, action) => {
          state.items = action.payload;
          state.error = null;
        })
        .addCase(fetchShipments.rejected, (state, action) => {
          state.items = {};
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
          state.items = {};
          state.error = null;
        })
        .addCase(fetchShipment.fulfilled, (state, action) => {
          state.items = action.payload;
          state.error = null;
        })
        .addCase(fetchShipment.rejected, (state, action) => {
          state.items = {};
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
          state.items = {};
          state.error = null;
        })
        .addCase(createShipment.fulfilled, (state, action) => {
          state.items = action.payload;
          state.error = null;
        })
        .addCase(createShipment.rejected, (state, action) => {
          state.items = {};
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

export {
    getShipmentsReducer,
    getShipmentReducer,
    createShipmentReducer
};
