import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import levelApi from '../../api/levelClient';

export const createLevel = createAsyncThunk('level/createLevel', async (currentLevel, thunkAPI) => {
    const dataLevel = await levelApi.createLevel(currentLevel);
    return dataLevel;
});

export const getAllLevel = createAsyncThunk('level/getAllLevel', async (param, thunkAPI) => {
    const dataLevel = await levelApi.getAllLevel(param);
    return dataLevel;
});

export const getAllLevelOfAgency = createAsyncThunk('level/getAllLevelOfAgency', async (params, thunkAPI) => {
    const dataLevel = await levelApi.getAllLevelOfAgency(params);
    return dataLevel;
});

export const registerLevel = createAsyncThunk('level/registerLevel', async (params, thunkAPI) => {
    const dataLevel = await levelApi.registerLevel(params);
    return dataLevel;
});

export const cancelLevel = createAsyncThunk('level/cancelLevel', async (params, thunkAPI) => {
    const dataLevel = await levelApi.cancelLevel(params);
    return dataLevel;
});

export const updateLevel = createAsyncThunk('level/updateLevel', async (params, thunkAPI) => {
    const dataLevel = await levelApi.updateLevel(params);
    return dataLevel;
});

export const checkLevel = createAsyncThunk('level/checkLevel', async (params, thunkAPI) => {
    const dataLevel = await levelApi.checkLevel(params);
    return dataLevel;
});
const levelSlice = createSlice({
    name: 'level',
    initialState: {
        isLoading: false,
        currentLevel: null,
        isEditing: false,

        listLevel: [],

        listLevelOfAgency: [],
    },
    reducers: {
        addLevel: (state) => {
            state.isEditing = false;
            state.currentLevel = null;
        },
        getCurrentLevel: (state, action) => {
            state.currentLevel = action.payload;
            state.isEditing = true;
        },
    },
    extraReducers: {
        [createLevel.pending]: (state) => {
            state.isLoading = true;
            state.isEditing = false;
        },
        [createLevel.fulfilled]: (state) => {
            state.isEditing = false;
            state.isLoading = false;
        },
        [createLevel.rejected]: (state) => {
            state.isEditing = false;
            state.isLoading = false;
        },

        [getAllLevel.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllLevel.fulfilled]: (state, action) => {
            state.listLevel = action.payload.listLevel;
            state.isLoading = false;
        },
        [getAllLevel.rejected]: (state, action) => {
            state.isLoading = false;
            state.listLevel = action.payload;
        },

        [getAllLevelOfAgency.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllLevelOfAgency.fulfilled]: (state, action) => {
            state.listLevelOfAgency = action.payload.levelAgency;
            state.isLoading = false;
        },
        [getAllLevelOfAgency.rejected]: (state, action) => {
            state.isLoading = false;
            state.listLevelOfAgency = [];
        },

        [registerLevel.pending]: (state) => {
            state.isLoading = true;
        },
        [registerLevel.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [registerLevel.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [cancelLevel.pending]: (state) => {
            state.isLoading = true;
        },
        [cancelLevel.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [cancelLevel.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [updateLevel.pending]: (state) => {
            state.isLoading = true;
        },
        [updateLevel.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [updateLevel.rejected]: (state, action) => {
            state.isLoading = false;
        },
        //updateLevel checkLevel
        [checkLevel.pending]: (state) => {
            state.isLoading = true;
        },
        [checkLevel.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [checkLevel.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
});
export const { addLevel, getCurrentLevel } = levelSlice.actions;

export default levelSlice.reducer;
