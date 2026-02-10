import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCustomers = createAsyncThunk("customers/fetch", async () => {
    const res = await axios.get("/api/customers");
    return res.data;
});

const customerSlice = createSlice({
    name: "customers",
    initialState: {
        data: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            });
    },
});

export default customerSlice.reducer;
