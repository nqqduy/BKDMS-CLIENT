import { unwrapResult } from '@reduxjs/toolkit';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createEmployee, updateEmployee } from '../../app/user/userSlice';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { Button, FormRow, Loading } from '../../components';

const AddEmployee = () => {
    const isLoading = useSelector((state) => state.user.isLoading);
    const isEditing = useSelector((state) => state.user.isEditing);
    const currentEmployee = useSelector((state) => state.user.currentEmployee);
    const dispatch = useDispatch();

    const initialValues = isEditing
        ? currentEmployee
        : {
              fullName: '',
              phone: '',
              email: '',
          };
    const handleSubmit = async (data, { resetForm }) => {
        try {
            if (isEditing) {
                const action = await dispatch(updateEmployee(data));
                unwrapResult(action);
            } else {
                const action = await dispatch(createEmployee(data));
                unwrapResult(action);
                resetForm();
            }
            Swal.fire({
                icon: 'success',
                title: isEditing ? 'Thành công' : 'Thành công',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };
    return (
        <Wrapper>
            {' '}
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                //enableReinitialize={true}
            >
                {(formikProps) => {
                    const { values /*errors, touched, isSubmitting, setFieldValue, handleChange */ } = formikProps;

                    return (
                        <Form className="form">
                            {isEditing ? <h5>Chi tiết nhân viên</h5> : <h5>Thêm nhân viên</h5>}
                            <hr />

                            <div className="form-center-agency form-center">
                                <FastField
                                    name="fullName"
                                    component={FormRow}
                                    type="text"
                                    labelText="Tên nhân viên"
                                    placeholder="Nhập tên"
                                />
                                <FastField
                                    name="phone"
                                    component={FormRow}
                                    type="text"
                                    labelText="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                />
                                <FastField
                                    name="email"
                                    component={FormRow}
                                    type="text"
                                    labelText="Email"
                                    placeholder="Nhập Email"
                                    disabled={isEditing}
                                />
                            </div>
                            <div className="button-one">
                                {isLoading ? (
                                    <Loading center />
                                ) : (
                                    <Button
                                        type="submit"
                                        classname="btn-custom btn-icon"
                                        text={isEditing ? 'Cập nhật' : 'Thêm'}
                                        icon={<BiCheck className="front-icon" />}
                                        disable={isLoading}
                                    />
                                )}
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Wrapper>
    );
};

export default AddEmployee;
