import { createSlice } from "@reduxjs/toolkit";
import { createStatus, fetchStatus, fetchStatuses } from "../thunks/status";

const initialState = {
  items: [],
  error: null,
};

const getStatusesSlice = createSlice({
  name: "statuses",
  initialState,
  reducers: {
    updateStatuses: (state, action) => {
      state.items = action;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatuses.pending, (state) => {
        state.items = [];
        state.error = null;
      })
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.items = [];
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
        state.items = [];
        state.error = null;
      })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchStatus.rejected, (state, action) => {
        state.items = [];
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
        state.items = [];
        state.error = null;
      })
      .addCase(createStatus.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(createStatus.rejected, (state, action) => {
        state.items = [];
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

export { getStatusesReducer, getStatusReducer, createStatusReducer };
