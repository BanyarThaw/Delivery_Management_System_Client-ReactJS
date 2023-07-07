import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/axios";

const initialState = {
    info: [],
    error: null,
};

export const fetchClients = createAsyncThunk(
    "clients/fetchClients",
    async () => {
        try {
            const res = await api.get('/api/clients',
                {
                    headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('hello');
            console.log(res.data);
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
            const res = await api.get(`/api/clients/${id}`,
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

export const createClient = createAsyncThunk(
    "clients/createClient",
    async (client) => {
        try {
            const res = await api.post('/api/clients',  
                JSON.stringify(client),
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

const getClientsSlice = createSlice({
    name: "clients",
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(fetchClients.pending, (state) => {
          state.info = {};
          state.error = null;
        })
        .addCase(fetchClients.fulfilled, (state, action) => {
          state.info = action.payload;
          state.error = null;
        })
        .addCase(fetchClients.rejected, (state, action) => {
          state.info = {};
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
          state.info = {};
          state.error = null;
        })
        .addCase(fetchClient.fulfilled, (state, action) => {
          state.info = action.payload;
          state.error = null;
        })
        .addCase(fetchClient.rejected, (state, action) => {
          state.info = {};
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
          state.info = {};
          state.error = null;
        })
        .addCase(createClient.fulfilled, (state, action) => {
          state.info = action.payload;
          state.error = null;
        })
        .addCase(createClient.rejected, (state, action) => {
          state.info = {};
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

export {
    getClientsReducer,
    getClientReducer,
    createClientReducer
};
