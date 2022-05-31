import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../../api/categoryClient';

export const createCategory = createAsyncThunk('category/createCategory', async (currentCategory, thunkAPI) => {
    const dataCategory = await categoryApi.createCategory(currentCategory);
    return dataCategory;
});

export const getAllCategory = createAsyncThunk('category/getAllCategory', async (params, thunkAPI) => {
    const dataCategory = await categoryApi.getAllCategory(params);
    return dataCategory;
});

export const updateCategory = createAsyncThunk('category/updateCategory', async (currentCategory, thunkAPI) => {
    const dataCategory = await categoryApi.updateCategory(currentCategory);
    return dataCategory;
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (currentCategory, thunkAPI) => {
    const dataCategory = await categoryApi.deleteCategory(currentCategory);
    return dataCategory;
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        currentCategory: null,
        listCategory: [],
        isEditing: false,
        showPopup: false,
        isLoading: false,
    },
    reducers: {
        addCategory: (state) => {
            state.isEditing = false;
            state.currentCategory = null;
        },
        editingCategory: (state, action) => {
            state.isEditing = true;
            state.currentCategory = action.payload;
        },
    },
    extraReducers: {
        [createCategory.pending]: (state) => {
            state.isLoading = true;
        },
        [createCategory.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [createCategory.rejected]: (state, action) => {
            state.isLoading = false;
        },
        [updateCategory.pending]: (state) => {
            state.isLoading = true;
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [updateCategory.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [getAllCategory.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllCategory.fulfilled]: (state, action) => {
            state.listCategory = action.payload.category.reverse();
            state.isLoading = false;
        },
        [getAllCategory.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
});
export const { editingCategory, addCategory } = categorySlice.actions;

export default categorySlice.reducer;
