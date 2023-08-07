import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/axios";

const initialState = {
    items: [],
    error: null,
};

export const fetchStatuses = createAsyncThunk(
    "statuses/fetchStatuses",
    async () => {
        try {
            const res = await api.get('/api/statuses',
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

export const fetchStatus = createAsyncThunk(
    "statuses/fetchStatus",
    async (id) => {
        try {
            const res = await api.get(`/api/statuses/${id}`,
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

export const createStatus = createAsyncThunk(
    "statuses/createStatus",
    async (status) => {
        try {
            const res = await api.post('/api/statuses',  
                JSON.stringify(status),
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

const getStatusesSlice = createSlice({
    name: "statuses",
    initialState,
    reducers: {
        updateStatuses: (state,action) => {
            state.items = action;
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchStatuses.pending, (state) => {
          state.items = {};
          state.error = null;
        })
        .addCase(fetchStatuses.fulfilled, (state, action) => {
          state.items = action.payload;
          state.error = null;
        })
        .addCase(fetchStatuses.rejected, (state, action) => {
          state.items = {};
          state.error = action.error.message;
        });
    },
});

const getStatusSlice = createSlice({
    name: "status",
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(fetchStatus.pending, (state) => {
          state.items = {};
          state.error = null;
        })
        .addCase(fetchStatus.fulfilled, (state, action) => {
          state.items = action.payload;
          state.error = null;
        })
        .addCase(fetchStatus.rejected, (state, action) => {
          state.items = {};
          state.error = action.error.message;
        });
    },
});

const createStatusSlice = createSlice({
    name: "createStatus",
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(createStatus.pending, (state) => {
          state.items = {};
          state.error = null;
        })
        .addCase(createStatus.fulfilled, (state, action) => {
          state.items = action.payload;
          state.error = null;
        })
        .addCase(createStatus.rejected, (state, action) => {
          state.items = {};
          state.error = action.error.message;
        });
    },
});

export const selectStatuses = (state) => state.statuses.items;
export const selectStatusesError = (state) => state.statuses.error;
export const selectStatus = (state) => state.status.items;
export const selectStatusError = (state) => state.status.error;
export const { updateStatuses } = getStatusesSlice.actions;

const getStatusesReducer = getStatusesSlice.reducer;
const getStatusReducer = getStatusSlice.reducer;
const createStatusReducer = createStatusSlice.reducer;

export {
    getStatusesReducer,
    getStatusReducer,
    createStatusReducer
};
