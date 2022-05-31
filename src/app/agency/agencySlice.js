import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import agencyApi from '../../api/agencyClient';

export const createAgency = createAsyncThunk('agency/createAgency', async (currentAgency, thunkAPI) => {
    const dataAgency = await agencyApi.createAgency(currentAgency);
    return dataAgency;
});

export const getAgenciesInMap = createAsyncThunk('agency/getAgenciesInMap', async (params, thunkAPI) => {
    const dataAgency = await agencyApi.getAgenciesInMap(params);
    return dataAgency;
});

export const updateAgency = createAsyncThunk('agency/updateAgency', async (params, thunkAPI) => {
    const dataAgency = await agencyApi.updateAgency(params);
    return dataAgency;
});

export const lockAccount = createAsyncThunk('agency/lockAccount', async (params, thunkAPI) => {
    const dataAgency = await agencyApi.lockAccount(params);
    return dataAgency;
});

export const unLockAccount = createAsyncThunk('agency/unLockAccount', async (params, thunkAPI) => {
    const dataAgency = await agencyApi.unLockAccount(params);
    return dataAgency;
});

export const getAgency = createAsyncThunk('agency/getAgency', async (params, thunkAPI) => {
    const dataAgency = await agencyApi.getAgency(params);
    return dataAgency;
});

export const getAllOrderDebtPayment = createAsyncThunk('agency/getAllOrderDebtPayment', async (params, thunkAPI) => {
    const dataAgency = await agencyApi.getAllOrderDebtPayment(params);
    return dataAgency;
});

// export const getAgencyOrderToExport = createAsyncThunk('agency/getAgencyOrderToExport', async (params, thunkAPI) => {
//     const dataAgency = await agencyApi.getAgencyOrderToExport();
//     return dataAgency;
// });

const agencySlice = createSlice({
    name: 'agency',
    initialState: {
        isLoading: false,
        isLoadingPopup: false,
        currentAgency: null,
        isEditing: false,

        listAgencies: [],
    },
    reducers: {
        editingAgency: (state, action) => {
            state.isEditing = true;
            state.currentAgency = action.payload;
        },
        addAgency: (state) => {
            state.isEditing = false;
            state.currentAgency = null;
        },
        getCurrentAgency: (state, action) => {
            state.currentAgency = state.listAgencies?.find((agency) => agency.id === action.payload);
        },
        setCurrentAgencyToEmpty: (state, action) => {
            state.currentAgency = null;
        },
    },
    extraReducers: {
        [createAgency.pending]: (state) => {
            state.isLoading = true;
            state.isEditing = false;
        },
        [createAgency.fulfilled]: (state) => {
            state.isEditing = false;
            state.isLoading = false;
        },
        [createAgency.rejected]: (state) => {
            state.isEditing = false;
            state.isLoading = false;
        },

        [updateAgency.pending]: (state) => {
            state.isLoading = true;
        },
        [updateAgency.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [updateAgency.rejected]: (state) => {
            state.isLoading = false;
        },

        [getAgenciesInMap.pending]: (state) => {
            state.isLoading = true;
        },
        [getAgenciesInMap.fulfilled]: (state, action) => {
            state.listAgencies = action.payload.listAgencies;
            state.isLoading = false;
        },
        [getAgenciesInMap.rejected]: (state) => {
            state.isLoading = false;
        },

        [getAllOrderDebtPayment.pending]: (state) => {
            state.isLoadingPopup = true;
        },
        [getAllOrderDebtPayment.fulfilled]: (state, action) => {
            state.isLoadingPopup = false;
        },
        [getAllOrderDebtPayment.rejected]: (state) => {
            state.isLoadingPopup = false;
        },

        [getAgency.fulfilled]: (state, action) => {
            state.currentAgency = action.payload.agency;
        },

        [unLockAccount.pending]: (state) => {
            state.isLoading = true;
        },
        [unLockAccount.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [unLockAccount.rejected]: (state) => {
            state.isLoading = false;
        },

        [lockAccount.pending]: (state) => {
            state.isLoading = true;
        },
        [lockAccount.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [lockAccount.rejected]: (state) => {
            state.isLoading = false;
        },
        //unLockAccount;lockAccount;
    },
});
export const { editingAgency, addAgency, getCurrentAgency, setCurrentAgencyToEmpty } = agencySlice.actions;

export default agencySlice.reducer;
