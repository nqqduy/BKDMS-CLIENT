import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../api/productClient';

export const createProduct = createAsyncThunk('product/createProduct', async (currentProduct, thunkAPI) => {
    const dataProduct = await productApi.createProduct(currentProduct);
    return dataProduct;
});

export const updateProduct = createAsyncThunk('product/updateProduct', async (currentProduct, thunkAPI) => {
    const dataProduct = await productApi.updateProduct(currentProduct);
    return dataProduct;
});

export const getAllProduct = createAsyncThunk('product/getAllProduct', async (params, thunkAPI) => {
    const dataProduct = await productApi.getAllProduct(params);
    return dataProduct;
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (params, thunkAPI) => {
    const dataProduct = await productApi.deleteProduct(params);
    return dataProduct;
});

export const getListProductToExport = createAsyncThunk('product/get-list-product-to-export', async (params, thunkAPI) => {
    const dataProduct = await productApi.getListProductToExport(params);
    return dataProduct;
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        isLoading: false,
        isEditing: false,
        // To editing
        listProduct: [],
        currentProduct: {},
        currentBaseUnit: {},
        currentListUnit: [],
        // To export
        listProductToExport: [],
    },

    reducers: {
        addProduct: (state, action) => {
            state.isEditing = false;
            state.currentProduct = {};
        },
        editingProduct: (state, action) => {
            state.isEditing = true;
            state.currentProduct = action.payload;
            state.currentBaseUnit = action.payload.units.find((unit) => unit.isBaseUnit);
        },

        getCurrentProduct: (state, action) => {
            state.currentProduct = state.listProduct.find((item) => item.id === action.payload);
            state.currentListUnit = action.currentProduct.units;
        },
    },
    extraReducers: {
        [createProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [createProduct.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [createProduct.rejected]: (state) => {
            state.isLoading = false;
        },

        [updateProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [updateProduct.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [updateProduct.rejected]: (state) => {
            state.isLoading = false;
        },

        [getAllProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listProduct = action.payload.listProduct;
        },
        [getAllProduct.rejected]: (state) => {
            state.isLoading = false;
            state.listProduct = [];
        },

        //getListProductToExport
        [getListProductToExport.pending]: (state) => {
            state.isLoading = true;
        },
        [getListProductToExport.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listProductToExport = action.payload;
        },
        [getListProductToExport.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export const { editingProduct, addProduct, getCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
