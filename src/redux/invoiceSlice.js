import { createSlice } from "@reduxjs/toolkit";
import data from '../data.json';

const initialState = {
    invoices: []
}

const invoiceSlice = createSlice({
    name: "invoices",
    initialState,
    reducers: {
        addInvoice: (state, action) => {
            state.invoices.push(action.payload);
        }, 

        editInvoice: (state, action) => {
            const { id, newInvoice } = action.payload;
            const index = state.invoices.findIndex((invoice) => invoice.id === id);
            if(index !== -1){
                const updatedInvoice = {
                    ...state.invoices[index],
                    ...newInvoice,
                    transactionDetails: [...newInvoice.transactionDetails], // Deep copy if necessary
                    items: [...newInvoice.items], // Deep copy if necessary
                };
                state.invoices[index] = updatedInvoice;
            }
        },

        deleteInvoice: (state, action) => {
            const { id } = action.payload;
            const updatedInvoices = state.invoices.filter((invoice) => invoice.id !== id);
            state.invoices = updatedInvoices;
        },

        setInvoicePaidStatus: (state, action) => {
            const { id } = action.payload;
            const index = state.invoices.findIndex((invoice) => invoice.id === id);
            console.log('ind', index);
            if(index !== -1){
                const updatedInvoice = {
                    ...state.invoices[index],
                    isPaid: true
                };
                state.invoices[index] = updatedInvoice;
            }
        },

        // addItem: (state, action) => {
        //     const { id, items } = action.payload;
        //     const invoice = state.invoices.find((invoice) => invoice.id === id);
        //     if(invoice){
        //         invoice.items = items;
        //     }
        // },

        deleteItem: (state, action) => {
            const { id, itemId } = action.payload;
            const invoice = state.invoices.find((invoice) => invoice.id === id);
            const updatedItems = invoice?.items.filter((item, ind) => item.id !== itemId);
            if(invoice){
                invoice.items = updatedItems;
            }
        }   
    }
});

export default invoiceSlice;