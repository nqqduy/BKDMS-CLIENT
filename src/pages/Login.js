import { unwrapResult } from '@reduxjs/toolkit';
import { FastField, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BiCopyright } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginUser } from '../app/user/userSlice';
import Wrapper from '../assets/wrappers/Login';
import { FormRow, Loading, Logo } from '../components';
import { validationLogin } from '../schema';

function Login() {
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.user.isLoading);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const onSubmit = async (currentUser) => {
        try {
            const actionResult = await dispatch(loginUser(currentUser));
            unwrapResult(actionResult);
            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công',
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
        password: '',
    };
    return (
        <Wrapper className="full-page">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationLogin}>
                {(formikProps) => {
                    return (
                        <Form className="form">
                            <Logo />
                            <h3>đăng nhập</h3>
                            <p>Chào mừng đến BK DMS</p>
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
                                labelText="Tên tổ chức"
                                placeholder="Nhập tên tổ chức"
                                icon={<BiCopyright className="icon" size={20} />}
                            />
                            <FastField
                                name="password"
                                component={FormRow}
                                type="password"
                                labelText="mật khẩu"
                                placeholder="Nhập mật khẩu"
                                icon={<RiLockPasswordLine className="icon" size={20} />}
                            />
                            <Link to="/forgotPassword">Bạn quên mật khẩu?</Link>
                            {isLoading ? (
                                <Loading center />
                            ) : (
                                <button type="submit" className="btn-custom" disabled={isLoading}>
                                    Đăng nhập
                                </button>
                            )}

                            <br />
                            <p className="p--register">
                                Bạn chưa có tài khoản?
                                <Link to="/register" className="a--register">
                                    Đăng ký dùng thử
                                </Link>
                            </p>
                        </Form>
                    );
                }}
            </Formik>
        </Wrapper>
    );
}

export default Login;
