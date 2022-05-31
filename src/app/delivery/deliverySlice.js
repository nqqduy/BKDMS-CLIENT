import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import warehouseApi from '../../api/warehouseClient';
import orderApi from '../../api/orderClient';
import userApi from '../../api/userClient';

export const getOrderByOrderCode = createAsyncThunk('delivery/getOrderByOrderCode', async (orderCode, thunkAPI) => {
    const data = await orderApi.getOrderByOrderCode(orderCode);
    return data;
});

export const getShipper = createAsyncThunk('delivery/getShipper', async (params, thunkAPI) => {
    const data = await userApi.getAllEmployee(params);
    return data;
});

export const createAddGoodsIssueOrder = createAsyncThunk('delivery/createAddGoodsIssueOrder', async (params, thunkAPI) => {
    const data = await warehouseApi.createAddGoodsIssueOrder(params);
    return data;
});

export const checkQuantityStockOrder = createAsyncThunk('delivery/checkQuantityStockOrder', async (params, thunkAPI) => {
    const data = await warehouseApi.checkQuantityStockOrder(params);
    return data;
});
const deliverySlice = createSlice({
    name: 'delivery',
    initialState: {
        isRender: false,
        isLoading: false,
        isLoadingCheck: false,
        shipperList: [],
        currentOrder: null,
        isEditing: false,
    },
    reducers: {},
    extraReducers: {
        [getOrderByOrderCode.pending]: (state) => {
            state.isRender = true;
        },
        [getOrderByOrderCode.rejected]: (state) => {
            state.isRender = false;
            state.currentOrder = null;
        },
        [getOrderByOrderCode.fulfilled]: (state, action) => {
            state.isRender = false;
            state.currentOrder = action.payload.order;
        },

        [getShipper.fulfilled]: (state, action) => {
            if (action.payload.listEmployee) {
                let newList = action.payload.listEmployee.map((emp) => ({ value: emp.id, label: emp.fullName }));
                state.shipperList = newList;
            } else {
                state.shipperList = [];
            }
        },

        [createAddGoodsIssueOrder.pending]: (state) => {
            state.isLoading = true;
        },
        [createAddGoodsIssueOrder.rejected]: (state) => {
            state.isLoading = false;
        },
        [createAddGoodsIssueOrder.fulfilled]: (state, action) => {
            state.isLoading = false;
        },

        [checkQuantityStockOrder.pending]: (state) => {
            state.isLoadingCheck = true;
        },
        [checkQuantityStockOrder.rejected]: (state) => {
            state.isLoadingCheck = false;
        },
        [checkQuantityStockOrder.fulfilled]: (state, action) => {
            state.isLoadingCheck = false;
        },
    },
});

export default deliverySlice.reducer;
