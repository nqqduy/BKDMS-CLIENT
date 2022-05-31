import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderApi from '../../api/orderClient';

export const createOrder = createAsyncThunk('order/createOrder', async (current, thunkAPI) => {
    const data = await orderApi.createOrder(current);
    return data;
});

export const getAllOrder = createAsyncThunk('order/getAllOrder', async (params, thunkAPI) => {
    const data = await orderApi.getAllOrder(params);
    return data;
});

export const getOrderToExport = createAsyncThunk('order/geOrderToExport', async (params, thunkAPI) => {
    const data = await orderApi.getOrderToExport(params);
    return data;
});

export const approveOrder = createAsyncThunk('order/approveOrder', async (params, thunkAPI) => {
    const data = await orderApi.approveOrder(params);
    return data;
});

export const cancelOrder = createAsyncThunk('order/cancelOrder', async (params, thunkAPI) => {
    const data = await orderApi.cancelOrder(params);
    return data;
});

export const paymentOrder = createAsyncThunk('order/paymentOrder', async (params, thunkAPI) => {
    const data = await orderApi.paymentOrder(params);
    return data;
});

export const getOrderWithChart = createAsyncThunk('order/getOrderWithChart', async (params, thunkAPI) => {
    const data = await orderApi.getOrderWithChart(params);
    return data;
});

export const deleteOrder = createAsyncThunk('order/deleteOrder', async (params, thunkAPI) => {
    const data = await orderApi.deleteOrder(params);
    return data;
});

export const reportDebt = createAsyncThunk('order/reportDebt', async (params, thunkAPI) => {
    const data = await orderApi.reportDebt(params);
    return data;
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        isLoading: false,
        currentOrder: {},
        isEditing: false,
        listOrder: [],

        listOrderToExport: [],

        reportDebt: null,
    },
    reducers: {
        setCurrentOrderToEmpty: (state, action) => {
            state.currentOrder = {};
        },
        getOrder: (state, action) => {
            state.currentOrder = action.payload;
        },
    },
    extraReducers: {
        [reportDebt.fulfilled]: (state, action) => {
            state.reportDebt = action.payload;
        },
        [reportDebt.rejected]: (state) => {
            state.reportDebt = null;
        },

        [createOrder.pending]: (state) => {
            state.isLoading = true;
            state.isEditing = false;
        },
        [createOrder.fulfilled]: (state) => {
            state.isEditing = false;
            state.isLoading = false;
        },
        [createOrder.rejected]: (state) => {
            state.isEditing = false;
            state.isLoading = false;
        },

        [getAllOrder.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllOrder.fulfilled]: (state, action) => {
            state.isLoading = false;
            // console.log(action.payload);
            state.listOrder = action.payload.listOrder;
        },
        [getAllOrder.rejected]: (state) => {
            state.isLoading = false;
        },

        [getOrderToExport.fulfilled]: (state, action) => {
            state.listOrderToExport = action.payload.listOrder;
        },

        [paymentOrder.pending]: (state) => {
            state.isLoading = true;
        },
        [paymentOrder.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [paymentOrder.rejected]: (state) => {
            state.isLoading = false;
        },

        [approveOrder.pending]: (state) => {
            state.isLoading = true;
        },
        [approveOrder.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [approveOrder.rejected]: (state) => {
            state.isLoading = false;
        },

        [getOrderWithChart.pending]: (state) => {
            state.isLoading = true;
        },
        [getOrderWithChart.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [getOrderWithChart.rejected]: (state) => {
            state.isLoading = false;
        },

        //deleteOrder

        [deleteOrder.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteOrder.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [deleteOrder.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});
export const { setCurrentOrderToEmpty, getOrder } = orderSlice.actions;

export default orderSlice.reducer;
