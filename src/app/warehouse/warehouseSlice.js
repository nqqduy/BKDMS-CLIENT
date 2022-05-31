import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import warehouseApi from '../../api/warehouseClient';

export const createWarehouse = createAsyncThunk('warehouse/createWarehouse', async (currentWarehouse, thunkAPI) => {
    const dataWarehouse = await warehouseApi.createWarehouse(currentWarehouse);
    return dataWarehouse;
});

export const updateWarehouse = createAsyncThunk('warehouse/updateWarehouse', async (currentWarehouse, thunkAPI) => {
    const dataWarehouse = await warehouseApi.updateWarehouse(currentWarehouse);
    return dataWarehouse;
});

export const getAllWarehouse = createAsyncThunk('warehouse/getAllWarehouse', async (params, thunkAPI) => {
    const dataWarehouse = await warehouseApi.getAllWarehouse(params);
    return dataWarehouse;
});

export const createAddGoodsReceipt = createAsyncThunk('warehouse/createAddGoodsReceipt', async (params, thunkAPI) => {
    const data = await warehouseApi.createAddGoodsReceipt(params);
    return data;
});

export const updateAddGoodsReceipt = createAsyncThunk('warehouse/updateAddGoodsReceipt', async (params, thunkAPI) => {
    const data = await warehouseApi.updateAddGoodsReceipt(params);
    return data;
});

export const getAddGoodsReceipt = createAsyncThunk('warehouse/getAddGoodsReceipt', async (params, thunkAPI) => {
    const data = await warehouseApi.getAddGoodsReceipt(params);
    return data;
});

export const updateAddGoodsIssue = createAsyncThunk('warehouse/updateAddGoodsIssue', async (params, thunkAPI) => {
    const data = await warehouseApi.updateAddGoodsIssue(params);
    return data;
});

export const getAddGoodsIssue = createAsyncThunk('warehouse/getAddGoodsIssue', async (params, thunkAPI) => {
    const data = await warehouseApi.getAddGoodsIssue(params);
    return data;
});

export const createAddGoodsIssue = createAsyncThunk('warehouse/createAddGoodsIssue', async (params, thunkAPI) => {
    const data = await warehouseApi.createAddGoodsIssue(params);
    return data;
});

export const createAddGoodsCheck = createAsyncThunk('warehouse/createAddGoodsCheck', async (params, thunkAPI) => {
    const data = await warehouseApi.createAddGoodsCheck(params);
    return data;
});

export const createAddGoodsTransfer = createAsyncThunk('warehouse/createAddGoodsTransfer', async (params, thunkAPI) => {
    const data = await warehouseApi.createAddGoodsTransfer(params);
    return data;
});

export const getAllAddGoodsReceipt = createAsyncThunk('warehouse/getAllAddGoodsReceipt', async (params, thunkAPI) => {
    const data = await warehouseApi.getAllAddGoodsReceipt(params);
    return data;
});

export const getAllAddGoodsIssue = createAsyncThunk('warehouse/getAllAddGoodsIssue', async (params, thunkAPI) => {
    const data = await warehouseApi.getAllAddGoodsIssue(params);
    return data;
});

export const deleteGoodsIssue = createAsyncThunk('warehouse/deleteGoodsIssue', async (params, thunkAPI) => {
    const data = await warehouseApi.deleteGoodsIssue(params);
    return data;
});

export const deleteGoodsReceipt = createAsyncThunk('warehouse/deleteGoodsReceipt', async (params, thunkAPI) => {
    const data = await warehouseApi.deleteGoodsReceipt(params);
    return data;
});

export const getAllAddGoodsTransfer = createAsyncThunk('warehouse/getAllAddGoodsTransfer', async (params, thunkAPI) => {
    const data = await warehouseApi.getAllAddGoodsTransfer(params);
    return data;
});

export const getAllAddGoodsCheck = createAsyncThunk('warehouse/getAllAddGoodsCheck', async (params, thunkAPI) => {
    const data = await warehouseApi.getAllAddGoodsCheck(params);
    return data;
});

export const exportGoods = createAsyncThunk('warehouse/exportGoods', async (params, thunkAPI) => {
    const data = await warehouseApi.exportGoods(params);
    return data;
});

export const importGoods = createAsyncThunk('warehouse/importGoods', async (params, thunkAPI) => {
    const data = await warehouseApi.importGoods(params);
    return data;
});

export const getAllWayBill = createAsyncThunk('warehouse/getAllWayBill', async (params, thunkAPI) => {
    const data = await warehouseApi.getAllWayBill(params);
    return data;
});

export const handleShip = createAsyncThunk('warehouse/handleShip', async (params, thunkAPI) => {
    const data = await warehouseApi.handleShip(params);
    return data;
});

export const getWarehouseContainUnit = createAsyncThunk('warehouse/getWarehouseContainUnit', async (params, thunkAPI) => {
    const data = await warehouseApi.getWarehouseContainUnit(params);
    return data;
});

export const getInfoOfUnitInWarehouse = createAsyncThunk('warehouse/getInfoOfUnitInWarehouse', async (params, thunkAPI) => {
    const data = await warehouseApi.getInfoOfUnitInWarehouse(params);
    return data;
});

export const updateGoodsCheck = createAsyncThunk('warehouse/updateGoodsCheck', async (params, thunkAPI) => {
    const data = await warehouseApi.updateGoodsCheck(params);
    return data;
});

export const updateGoodsTransfer = createAsyncThunk('warehouse/updateGoodsTransfer', async (params, thunkAPI) => {
    const data = await warehouseApi.updateGoodsTransfer(params);
    return data;
});

export const deleteWarehouse = createAsyncThunk('warehouse/deleteWarehouse', async (params, thunkAPI) => {
    const data = await warehouseApi.deleteWarehouse(params);
    return data;
});

export const deleteGoodsTransfer = createAsyncThunk('warehouse/deleteGoodsTransfer', async (params, thunkAPI) => {
    const data = await warehouseApi.deleteGoodsTransfer(params);
    return data;
});

export const deleteGoodsCheck = createAsyncThunk('warehouse/deleteGoodsCheck', async (params, thunkAPI) => {
    const data = await warehouseApi.deleteGoodsCheck(params);
    return data;
});

export const overviewReportWarehouse = createAsyncThunk('warehouse/overviewReportWarehouse', async (params, thunkAPI) => {
    const data = await warehouseApi.overviewReportWarehouse(params);
    return data;
});

const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState: {
        isLoading: false,
        isEditing: false,
        currentWarehouse: null,
        listWarehouse: [],

        listAddGoodsReceipt: [],
        listAddGoodsIssue: [],
        listAddGoodsTransfer: [],
        listAddGoodsCheck: [],

        listWayBill: [],
        currentWayBill: null,

        isEditingAddGoods: false,
        isEditingExportGoods: false,
        isEditingCheckGoods: false,
        isEditingTransferGoods: false,

        currentGoodsReceipt: null,
        currentGoodsIssue: null,
        currentGoodsTransfer: null,
        currentGoodsCheck: null,

        warehouseContainUnit: null,
        overviewReportWarehouse: null,
        // warehouse contain unit
        infoOfUnitInWarehouse: null,
        isLoadingUnitWarehouse: false,
        // end warehouse contain unit
    },
    reducers: {
        addWarehouse: (state, action) => {
            state.isEditing = false;
            state.currentWarehouse = null;
        },
        editingWarehouse: (state, action) => {
            state.isEditing = true;
            state.currentWarehouse = action.payload;
        },

        getCurrentGoodsReceipt: (state, action) => {
            state.isEditingAddGoods = true;
            state.currentGoodsReceipt = action.payload;
        },
        addGoodsReceipt: (state, action) => {
            state.isEditingAddGoods = false;
            state.currentGoodsReceipt = null;
        },
        addGoodsIssue: (state, action) => {
            state.isEditingExportGoods = false;
            state.currentGoodsIssue = null;
        },
        addGoodsCheck: (state, action) => {
            state.isEditingCheckGoods = false;
            state.currentGoodsCheck = null;
        },
        addGoodsTransfer: (state, action) => {
            state.isEditingTransferGoods = false;
            state.currentGoodsTransfer = null;
        },

        getCurrentGoodsIssue: (state, action) => {
            state.isEditingExportGoods = true;
            state.currentGoodsIssue = action.payload;
        },
        getCurrentGoodsCheck: (state, action) => {
            state.isEditingCheckGoods = true;
            state.currentGoodsCheck = action.payload;
        },
        getCurrentGoodsTransfer: (state, action) => {
            state.isEditingTransferGoods = true;
            state.currentGoodsTransfer = action.payload;
        },

        // way bill
        getCurrentWayBill: (state, action) => {
            state.currentWayBill = action.payload;
        },
        // end way bill

        reportDetailWarehouse: (state, action) => {
            state.warehouseContainUnit = null;
        },

        reportOverviewWarehouse: (state) => {
            state.overviewReportWarehouse = null;
        },
    },
    extraReducers: {
        [createWarehouse.pending]: (state) => {
            state.isLoading = true;
            state.isEditing = false;
        },
        [createWarehouse.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [createWarehouse.rejected]: (state) => {
            state.isLoading = false;
        },

        [updateWarehouse.pending]: (state) => {
            state.isLoading = true;
        },
        [updateWarehouse.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [updateWarehouse.rejected]: (state) => {
            state.isLoading = false;
        },

        [getAddGoodsReceipt.pending]: (state) => {
            state.isLoading = true;
        },
        [getAddGoodsReceipt.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.currentGoodsReceipt = action.payload.addGoodsReceipt;
        },
        [getAddGoodsReceipt.rejected]: (state) => {
            state.isLoading = false;
        },

        [getAddGoodsIssue.pending]: (state) => {
            state.isLoading = true;
        },
        [getAddGoodsIssue.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.currentGoodsIssue = action.payload.addGoodsIssue;
        },
        [getAddGoodsIssue.rejected]: (state) => {
            state.isLoading = false;
        },

        [getAllWarehouse.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllWarehouse.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listWarehouse = action.payload.listWarehouse.reverse();
        },
        [getAllWarehouse.rejected]: (state) => {
            state.isLoading = false;
        },

        [createAddGoodsReceipt.pending]: (state) => {
            state.isLoading = true;
        },
        [createAddGoodsReceipt.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [createAddGoodsReceipt.rejected]: (state) => {
            state.isLoading = false;
        },

        [updateAddGoodsReceipt.pending]: (state) => {
            state.isLoading = true;
        },
        [updateAddGoodsReceipt.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [updateAddGoodsReceipt.rejected]: (state) => {
            state.isLoading = false;
        },

        [updateAddGoodsIssue.pending]: (state) => {
            state.isLoading = true;
        },
        [updateAddGoodsIssue.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [updateAddGoodsIssue.rejected]: (state) => {
            state.isLoading = false;
        },

        [createAddGoodsIssue.pending]: (state) => {
            state.isLoading = true;
        },
        [createAddGoodsIssue.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [createAddGoodsIssue.rejected]: (state) => {
            state.isLoading = false;
        },

        [createAddGoodsCheck.pending]: (state) => {
            state.isLoading = true;
        },
        [createAddGoodsCheck.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [createAddGoodsCheck.rejected]: (state) => {
            state.isLoading = false;
        },

        [createAddGoodsTransfer.pending]: (state) => {
            state.isLoading = true;
        },
        [createAddGoodsTransfer.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [createAddGoodsTransfer.rejected]: (state) => {
            state.isLoading = false;
        },

        [getAllAddGoodsReceipt.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllAddGoodsReceipt.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listAddGoodsReceipt = action.payload.listAddGoodsReceipt;
        },
        [getAllAddGoodsReceipt.rejected]: (state) => {
            state.isLoading = false;
        },

        [getAllAddGoodsIssue.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllAddGoodsIssue.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listAddGoodsIssue = action.payload.listAddGoodsIssue;
        },
        [getAllAddGoodsIssue.rejected]: (state) => {
            state.isLoading = false;
        },

        [getAllAddGoodsTransfer.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllAddGoodsTransfer.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listAddGoodsTransfer = action.payload.listAddGoodsTransfer;
        },
        [getAllAddGoodsTransfer.rejected]: (state) => {
            state.isLoading = false;
        },

        [getAllAddGoodsCheck.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllAddGoodsCheck.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listAddGoodsCheck = action.payload.listAddGoodsCheck;
        },
        [getAllAddGoodsCheck.rejected]: (state) => {
            state.isLoading = false;
        },

        [exportGoods.pending]: (state) => {
            state.isLoading = true;
        },
        [exportGoods.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [exportGoods.rejected]: (state) => {
            state.isLoading = false;
        },

        [importGoods.pending]: (state) => {
            state.isLoading = true;
        },
        [importGoods.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [importGoods.rejected]: (state) => {
            state.isLoading = false;
        },
        // Way bill
        [getAllWayBill.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllWayBill.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listWayBill = action.payload.listWayBill;
        },
        [getAllWayBill.rejected]: (state) => {
            state.isLoading = false;
        },
        // End way bill

        //approveShip

        [handleShip.pending]: (state) => {
            state.isLoading = true;
        },
        [handleShip.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [handleShip.rejected]: (state) => {
            state.isLoading = false;
        },

        [deleteGoodsIssue.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteGoodsIssue.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [deleteGoodsIssue.rejected]: (state) => {
            state.isLoading = false;
        },

        [deleteGoodsReceipt.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteGoodsReceipt.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [deleteGoodsReceipt.rejected]: (state) => {
            state.isLoading = false;
        },

        // warehouse contain unit

        [getWarehouseContainUnit.pending]: (state) => {
            state.isLoading = true;
        },
        [getWarehouseContainUnit.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.warehouseContainUnit = action.payload.warehouseContainUnit;
        },
        [getWarehouseContainUnit.rejected]: (state) => {
            state.isLoading = false;
            state.warehouseContainUnit = null;
        },

        [getWarehouseContainUnit.pending]: (state) => {
            state.isLoadingUnitWarehouse = true;
        },
        [getInfoOfUnitInWarehouse.fulfilled]: (state, action) => {
            state.isLoadingUnitWarehouse = false;
            state.infoOfUnitInWarehouse = action.payload.infoOfUnitInWarehouse;
        },
        [getWarehouseContainUnit.rejected]: (state) => {
            state.isLoadingUnitWarehouse = false;
            state.infoOfUnitInWarehouse = null;
        },

        // end warehouse contain unit

        [updateGoodsTransfer.pending]: (state) => {
            state.isLoading = true;
        },
        [updateGoodsTransfer.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [updateGoodsTransfer.rejected]: (state) => {
            state.isLoading = false;
        },

        [updateGoodsCheck.pending]: (state) => {
            state.isLoading = true;
        },
        [updateGoodsCheck.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [updateGoodsCheck.rejected]: (state) => {
            state.isLoading = false;
        },

        [deleteWarehouse.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteWarehouse.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [deleteWarehouse.rejected]: (state) => {
            state.isLoading = false;
        },

        [overviewReportWarehouse.fulfilled]: (state, action) => {
            state.overviewReportWarehouse = action.payload.overviewReportWarehouse;
        },
        [deleteWarehouse.rejected]: (state) => {
            state.overviewReportWarehouse = null;
        },

        //deleteWarehouse
    },
});

export const {
    editingWarehouse,
    addWarehouse,
    getCurrentGoodsReceipt,
    addGoodsReceipt,
    getCurrentGoodsIssue,
    addGoodsIssue,
    getCurrentWayBill,
    addGoodsCheck,
    addGoodsTransfer,
    getCurrentGoodsCheck,
    getCurrentGoodsTransfer,
    reportDetailWarehouse,
    reportOverviewWarehouse,
} = warehouseSlice.actions;
export default warehouseSlice.reducer;
