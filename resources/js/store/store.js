import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import supplierReducer from "./slices/supplierSlice";

export const store = configureStore({
    reducer: {
        customers: customerReducer,
        suppliers: supplierReducer,
    },
});
