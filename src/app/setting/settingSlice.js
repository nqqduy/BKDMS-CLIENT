import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import settingApi from '../../api/settingClient';

export const createUnit = createAsyncThunk(
    'setting/createUnit',
    async (currentUnit, thunkAPI) => {
        const dataUnit = await settingApi.createUnit(currentUnit);
        return dataUnit;
    }
);

export const getAllUnit = createAsyncThunk('setting/getAllUnit', async () => {
    const listUnit = await settingApi.getAllUnit();
    return listUnit;
});

export const updateUnit = createAsyncThunk(
    'setting/updateUnit',
    async (currentUnit, thunkAPI) => {
        const dataUnit = await settingApi.updateUnit(currentUnit);
        return dataUnit;
    }
);

const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        //   isLoading: false,
        isEditingUnit: false,
        listUnit: [],
        useListUnit: [],
        currentUnit: null,
    },

    reducers: {
        editingUnit: (state, action) => {
            state.isEditingUnit = true;
            state.currentUnit = action.payload;
        },
    },
    extraReducers: {
        [createUnit.pending]: state => {
            state.isEditingUnit = false;
        },
        [createUnit.fulfilled]: (state, action) => {
            state.isEditingUnit = false;
        },
        [createUnit.rejected]: (state, action) => {
            state.isEditingUnit = false;
        },
        [getAllUnit.fulfilled]: (state, action) => {
            state.listUnit = action.payload.listUnit.reverse();
            state.useListUnit = action.payload.listUnit.map(unit => ({
                value: unit.name,
                label: unit.name,
            }));
        },
        [updateUnit.fulfilled]: (state, action) => {
            state.isEditingUnit = false;
            state.currentUnit = null;
        },
    },
});

export const { editingUnit } = settingSlice.actions;
export default settingSlice.reducer;
