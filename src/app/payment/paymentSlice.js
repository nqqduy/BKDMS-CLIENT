import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import paymentApi from '../../api/paymentClient';

export const getAllPaymentByAgency = createAsyncThunk('payment/getAllPaymentByAgency', async (data, thunkAPI) => {
    const result = await paymentApi.getAllPaymentByAgency(data);
    return result;
});

export const codPayment = createAsyncThunk('payment/codPayment', async (data, thunkAPI) => {
    const result = await paymentApi.codPayment(data);
    return result;
});

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        isLoading: false,
        listPayment: [],
    },
    reducers: {
        addLevel: (state) => {
            state.isEditing = false;
            state.currentAgency = null;
        },
    },
    extraReducers: {
        [codPayment.pending]: (state) => {
            state.isLoading = true;
        },
        [codPayment.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [codPayment.rejected]: (state) => {
            state.isLoading = false;
        },

        [getAllPaymentByAgency.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllPaymentByAgency.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listPayment = action.payload.listPayment;
        },
        [getAllPaymentByAgency.rejected]: (state) => {
            state.isLoading = false;
        },
        //getAllPayment
    },
});
export const { addLevel } = paymentSlice.actions;

export default paymentSlice.reducer;
