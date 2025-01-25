import { createSlice } from "@reduxjs/toolkit";
import { createClient, fetchClient, fetchClients } from "../thunks/clients";

const initialState = {
  info: [],
  error: null,
};

const getClientsSlice = createSlice({
  name: "clients",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.info = [];
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.info = action.payload;
        state.error = null;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.info = [];
        state.error = action.error.message;
      });
  },
});

const getClientSlice = createSlice({
  name: "client",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchClient.pending, (state) => {
        state.info = [];
        state.error = null;
      })
      .addCase(fetchClient.fulfilled, (state, action) => {
        state.info = action.payload;
        state.error = null;
      })
      .addCase(fetchClient.rejected, (state, action) => {
        state.info = [];
        state.error = action.error.message;
      });
  },
});

const createClientSlice = createSlice({
  name: "createClient",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state) => {
        state.info = [];
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.info = action.payload;
        state.error = null;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.info = [];
        state.error = action.error.message;
      });
  },
});

export const selectClients = (state) => state.clients.info;
export const selectClientsError = (state) => state.clients.error;
export const selectClient = (state) => state.client.info;
export const selectClientError = (state) => state.client.error;

const getClientsReducer = getClientsSlice.reducer;
const getClientReducer = getClientSlice.reducer;
const createClientReducer = createClientSlice.reducer;

export { getClientsReducer, getClientReducer, createClientReducer };
