import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import shipperApi from '../../api/shipperClient';

export const getListOrderToShipper = createAsyncThunk('shipper/getListOrderToShipper', async (currentUnit, thunkAPI) => {
    const dataUnit = await shipperApi.getListOrderToShipper(currentUnit);
    return dataUnit;
});

const shipperSlice = createSlice({
    name: 'shipper',
    initialState: {
        isLoading: false,
    },

    reducers: {},
    extraReducers: {},
});

export const { editingUnit } = shipperSlice.actions;
export default shipperSlice.reducer;
