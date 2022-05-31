import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userClient';

export const registerTenant = createAsyncThunk('user/registerTenant', async (currentTenant, thunkAPI) => {
    // register tenant...
    const dataTenant = await userApi.registerTenant(currentTenant);
    return dataTenant;
});

export const loginUser = createAsyncThunk('user/loginUser', async (currentUser, thunkAPI) => {
    // login user ..
    const dataUser = await userApi.loginUser(currentUser);
    localStorage.setItem('user', JSON.stringify(dataUser.user));
    localStorage.setItem('token', dataUser.jwtToken);
    localStorage.setItem('workspace', dataUser.user.workspace);
    return dataUser;
});

export const forgotPassword = createAsyncThunk('user/forgotPassword', async (data, thunkAPI) => {
    // login user ..
    const dataUser = await userApi.forgotPassword(data);
    return dataUser;
});

export const resetPassword = createAsyncThunk('user/resetPassword', async (data, thunkAPI) => {
    // login user ..
    const dataUser = await userApi.resetPassword(data);
    return dataUser;
});

export const getAllEmployee = createAsyncThunk('employee/getAllEmployee', async (params, thunkAPI) => {
    const data = await userApi.getAllEmployee(params);
    return data;
});

export const createEmployee = createAsyncThunk('employee/createEmployee', async (params, thunkAPI) => {
    const data = await userApi.createEmployee(params);
    return data;
});

export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (params, thunkAPI) => {
    const data = await userApi.deleteEmployee(params);
    return data;
});

export const updateEmployee = createAsyncThunk('employee/updateEmployee', async (params, thunkAPI) => {
    const data = await userApi.updateEmployee(params);
    return data;
});

export const updateTenant = createAsyncThunk('employee/updateTenant', async (params, thunkAPI) => {
    const data = await userApi.updateTenant(params);
    return data;
});

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const workspace = localStorage.getItem('workspace');

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: user ? JSON.parse(user) : null,
        workspace: workspace ? workspace : '',
        isLoading: false,
        token: token ? token : '',
        errorMessage: '',
        successMessage: '',

        listEmployee: [],
        currentEmployee: null,
        isEditing: false,
    },
    reducers: {
        logoutUser: (state) => {
            state.currentUser = null;
            state.token = '';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },

        addEmployee: (state) => {
            state.isEditing = false;
            state.currentEmployee = null;
        },

        getCurrentEmployee: (state, action) => {
            state.isEditing = true;
            state.currentEmployee = action.payload;
        },
    },
    extraReducers: {
        [getAllEmployee.fulfilled]: (state, action) => {
            state.listEmployee = action.payload.listEmployee;
        },

        [registerTenant.pending]: (state, action) => {
            state.isLoading = true;
        },
        [registerTenant.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [registerTenant.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [loginUser.pending]: (state, action) => {
            state.isLoading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload.user;
            state.token = action.payload.jwtToken;
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [forgotPassword.pending]: (state, action) => {
            state.isLoading = true;
        },
        [forgotPassword.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [forgotPassword.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [resetPassword.pending]: (state, action) => {
            state.isLoading = true;
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [resetPassword.rejected]: (state, action) => {
            state.isLoading = false;
        },

        //createEmployee
        [createEmployee.pending]: (state, action) => {
            state.isLoading = true;
        },
        [createEmployee.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [createEmployee.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [deleteEmployee.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteEmployee.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [deleteEmployee.rejected]: (state, action) => {
            state.isLoading = false;
        },

        //updateEmployee
        [updateEmployee.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateEmployee.fulfilled]: (state, action) => {
            if (state.currentUser?.email === action.payload?.currentEmployee?.email) {
                state.currentUser = action.payload?.currentEmployee;
                localStorage.setItem('user', JSON.stringify(state.currentUser));
            }
            state.isLoading = false;
        },
        [updateEmployee.rejected]: (state, action) => {
            state.isLoading = false;
        },

        //updateTenant
        [updateTenant.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateTenant.fulfilled]: (state, action) => {
            if (state.currentUser?.email === action.payload?.currentEmployee?.email) {
                state.currentUser = action.payload?.currentEmployee;
                localStorage.setItem('user', JSON.stringify(state.currentUser));
            }
            state.isLoading = false;
        },
        [updateTenant.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
});

export const { logoutUser, getCurrentEmployee, addEmployee } = userSlice.actions;
export default userSlice.reducer;
