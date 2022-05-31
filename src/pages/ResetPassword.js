import { unwrapResult } from '@reduxjs/toolkit';
import { FastField, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { resetPassword } from '../app/user/userSlice';
import Wrapper from '../assets/wrappers/Login';
import { FormRow, Loading, Logo } from '../components';
import { validationResetPassword } from '../schema';

function ResetPassword() {
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.user.isLoading);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const workspace = searchParams.get('workspace');

    if (!token || !email || !workspace) {
        navigate('/login');
    }

    const onSubmit = async (currentUser) => {
        try {
            currentUser = {
                ...currentUser,
                token,
                email,
                workspace,
            };

            const actionResult = await dispatch(resetPassword(currentUser));
            unwrapResult(actionResult);
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                showConfirmButton: true,
            });
            navigate('/login');
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
        password: '',
        rePassword: '',
    };
    return (
        <Wrapper className="full-page">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationResetPassword}>
                {(formikProps) => {
                    return (
                        <Form className="form">
                            <Logo />
                            <h3>Lấy Lại Mật Khẩu</h3>
                            {/* <p>Chào mừng đến BK DMS</p> */}
                            <FastField
                                name="password"
                                component={FormRow}
                                type="password"
                                labelText="Mật Khẩu"
                                placeholder="Nhập mật khẩu"
                                icon={<RiLockPasswordLine className="icon" size={20} />}
                            />
                            <FastField
                                name="rePassword"
                                component={FormRow}
                                type="password"
                                labelText="nhập lại Mật Khẩu"
                                placeholder="Nhập lại mật khẩu"
                                icon={<RiLockPasswordLine className="icon" size={20} />}
                            />

                            {isLoading ? (
                                <Loading center />
                            ) : (
                                <button type="submit" className="btn-custom" disabled={isLoading}>
                                    Lấy lại mật khẩu
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

export default ResetPassword;
