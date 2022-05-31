import { unwrapResult } from '@reduxjs/toolkit';
import { FastField, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BiCopyright } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { forgotPassword } from '../app/user/userSlice';
import Wrapper from '../assets/wrappers/Login';
import { FormRow, Loading, Logo } from '../components';
import { validationForgotPassword } from '../schema';

function ForgotPassword() {
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.user.isLoading);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const onSubmit = async (currentUser) => {
        try {
            const actionResult = await dispatch(forgotPassword(currentUser));
            unwrapResult(actionResult);
            Swal.fire({
                icon: 'success',
                title: 'Hãy vào email để xác nhận',
                showConfirmButton: true,
            });
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const initialValues = {
        email: '',
        workspace: '',
    };
    return (
        <Wrapper className="full-page">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationForgotPassword}>
                {(formikProps) => {
                    return (
                        <Form className="form">
                            <Logo />
                            <h3>quên mật khẩu</h3>
                            {/* <p>Chào mừng đến BK DMS</p> */}
                            <FastField
                                name="email"
                                component={FormRow}
                                type="text"
                                labelText="email"
                                placeholder="Nhập email"
                                icon={<AiOutlineMail className="icon" size={20} />}
                            />
                            <FastField
                                name="workspace"
                                component={FormRow}
                                type="text"
                                labelText="workspace"
                                placeholder="Nhập workspace"
                                icon={<BiCopyright className="icon" size={20} />}
                            />

                            {isLoading ? (
                                <Loading center />
                            ) : (
                                <button type="submit" className="btn-custom" disabled={isLoading}>
                                    Quên mật khẩu
                                </button>
                            )}

                            <br />
                            <p className="p--register">
                                <Link to="/login" className="a--register">
                                    Trở Về
                                </Link>
                            </p>
                        </Form>
                    );
                }}
            </Formik>
            <p>© 2022 BK DMS</p>;
        </Wrapper>
    );
}

export default ForgotPassword;
