import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productLineApi from '../../api/productLineClient';

export const createProductLine = createAsyncThunk('productLine/createProductLine', async (currentProductLine, thunkAPI) => {
    const data = await productLineApi.createProductLine(currentProductLine);
    return data;
});

export const getAllProductLine = createAsyncThunk('productLine/getAllProductLine', async (params, thunkAPI) => {
    const data = await productLineApi.getAllProductLine(params);
    return data;
});

export const updateProductLine = createAsyncThunk('productLine/updateProductLine', async (current, thunkAPI) => {
    const data = await productLineApi.updateProductLine(current);
    return data;
});

export const deleteProductLine = createAsyncThunk('productLine/deleteProductLine', async (current, thunkAPI) => {
    const data = await productLineApi.deleteProductLine(current);
    return data;
});

const productLineSlice = createSlice({
    name: 'productLine',
    initialState: {
        isLoading: false,
        currentProductLine: null,
        listProductLine: [],
        isEditing: false,
    },
    reducers: {
        addProductLine: (state) => {
            state.isEditing = false;
            state.currentProductLine = null;
        },
        editingProductLine: (state, action) => {
            state.isEditing = true;
            state.currentProductLine = action.payload;
        },
    },
    extraReducers: {
        [createProductLine.pending]: (state) => {
            state.isLoading = true;
        },
        [createProductLine.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [createProductLine.rejected]: (state, action) => {
            state.isLoading = false;
        },
        [updateProductLine.pending]: (state) => {
            state.isLoading = true;
        },
        [updateProductLine.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [updateProductLine.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [getAllProductLine.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllProductLine.fulfilled]: (state, action) => {
            state.listProductLine = action.payload.listProductLine.reverse();
            state.isLoading = false;
        },
        [getAllProductLine.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
});
export const { addProductLine, editingProductLine } = productLineSlice.actions;

export default productLineSlice.reducer;
