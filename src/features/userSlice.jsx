import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/axios";

const initialState = {
    info: [],
    error: null,
};

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async () => {
        try {
            const res = await api.get('/api/users',
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

export const fetchUser = createAsyncThunk(
    "users/fetchUser",
    async (id) => {
        try {
            const res = await api.get(`/api/users/${id}`,
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

export const createUser = createAsyncThunk(
    "users/createUser",
    async (user) => {
        try {
            const res = await api.post('/api/users',  
                JSON.stringify(user),
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

const getUsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUsers: (state,action) => {
            state.info = action;
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.info = {};
          state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.info = action.payload;
          state.error = null;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.info = {};
          state.error = action.error.message;
        });
    },
});

const getUserSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.info = {};
          state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.info = action.payload;
          state.error = null;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.info = {};
          state.error = action.error.message;
        });
    },
});

const createUserSlice = createSlice({
    name: "createUser",
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(createUser.pending, (state) => {
          state.info = {};
          state.error = null;
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.info = action.payload;
          state.error = null;
        })
        .addCase(createUser.rejected, (state, action) => {
          state.info = {};
          state.error = action.error.message;
        });
    },
});

export const selectUsers = (state) => state.users.info;
export const selectUsersError = (state) => state.users.error;
export const selectUser = (state) => state.user.info;
export const selectUserError = (state) => state.user.error;
export const { updateUsers } = getUsersSlice.actions;

const getUsersReducer = getUsersSlice.reducer;
const getUserReducer = getUserSlice.reducer;
const createUserReducer = createUserSlice.reducer;

export {
    getUsersReducer,
    getUserReducer,
    createUserReducer
};
