import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import invoiceSlice from "./invoiceSlice";

const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
        invoices: invoiceSlice.reducer 
    }
});

export default store;