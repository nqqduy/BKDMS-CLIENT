import * as Yup from 'yup';

// Yup.string().required('Không được bỏ trống').min(3, 'Tối thiểu 3 ký tự').max(20, 'Tối đa 20 ký tự'),

// Register
export const validationRegister = Yup.object().shape({
    fullName: Yup.string().required('Không được bỏ trống').min(3, 'Tối thiểu 3 ký tự').max(20, 'Tối đa 20 ký tự'),
    email: Yup.string().required('Không được bỏ trống').email('Email không hợp lệ'),
    companyName: Yup.string().required('Không được bỏ trống').min(3, 'Tối thiểu 3 ký tự').max(20, 'Tối đa 20 ký tự'),
    phone: Yup.string()
        .required('Không được bỏ trống')
        .matches(/^[0-9]+$/, 'Phải là số')
        .length(10, 'Phải 10 ký tự'),
    workspace: Yup.string()
        .required('Không được bỏ trống')
        .matches(/^[a-z][a-z0-9]+$/, 'Ký tự không hợp lệ')
        .min(3, 'Tối thiểu 3 ký tự')
        .max(20, 'Tối đa 20 ký tự'),
});

// Login
export const validationLogin = Yup.object().shape({
    password: Yup.string().required('Không được bỏ trống'),
    email: Yup.string().required('Không được bỏ trống').email('Email không hợp lệ'),
    workspace: Yup.string()
        .required('Không được bỏ trống')
        .matches(/^[a-z][a-z0-9]+$/, 'Ký tự không hợp lệ')
        .min(3, 'Tối thiểu 3 ký tự')
        .max(20, 'Tối đa 20 ký tự'),
});

// forgot password
export const validationForgotPassword = Yup.object().shape({
    email: Yup.string().required('Không được bỏ trống').email('Email không hợp lệ'),
    workspace: Yup.string()
        .required('Không được bỏ trống')
        .matches(/^[a-z][a-z0-9]+$/, 'Ký tự không hợp lệ')
        .min(3, 'Tối thiểu 3 ký tự')
        .max(20, 'Tối đa 20 ký tự'),
});

// reset password
export const validationResetPassword = Yup.object().shape({
    password: Yup.string().required('Không được bỏ trống'),
    rePassword: Yup.string().required('Không được bỏ trống'),
});

// add agency
export const validationAddAgency = Yup.object().shape({
    name: Yup.string().required('Không được bỏ trống').min(3, 'Tối thiểu 3 ký tự').max(20, 'Tối đa 20 ký tự'),
    nameOwn: Yup.string().required('Không được bỏ trống').min(3, 'Tối thiểu 3 ký tự').max(20, 'Tối đa 20 ký tự'),
    phone: Yup.string().required('Không được bỏ trống').length(10, 'Phải 10 ký tự'),
    dateJoin: Yup.string().required('Không được bỏ trống'),
    //  paymentType: '',
    extraInfoOfAddress: Yup.string().required('Không được bỏ trống'),
});

// category and product line
export const validationCategory = Yup.object().shape({
    name: Yup.string().required('Không được bỏ trống').min(3, 'Tối thiểu 3 ký tự').max(20, 'Tối đa 20 ký tự'),
    description: Yup.string().required('Không được bỏ trống').min(3, 'Tối thiểu 3 ký tự').max(255, 'Tối đa 255 ký tự'),
});

// product
export const validationProduct = Yup.object().shape({
    name: Yup.string().required('Không được bỏ trống').min(3, 'Tối thiểu 3 ký tự').max(255, 'Tối đa 255 ký tự'),
});

// add warehouse
export const validationWarehouse = Yup.object().shape({
    name: Yup.string().required('Không được bỏ trống').min(3, 'Tối thiểu 3 ký tự').max(50, 'Tối đa 50 ký tự'),
    status: Yup.string().required('Không được bỏ trống'),
    type: Yup.string().required('Không được bỏ trống'),
    extraInfoOfAddress: Yup.string().required('Không được bỏ trống'),
});
