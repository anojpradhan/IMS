import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSuppliers = createAsyncThunk("suppliers/fetch", async () => {
    const res = await axios.get("/api/suppliers");
    return res.data;
});

const supplierSlice = createSlice({
    name: "suppliers",
    initialState: {
        data: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSuppliers.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default supplierSlice.reducer;
