import { unwrapResult } from '@reduxjs/toolkit';
import { FastField, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BiCopyright } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { registerTenant } from '../app/user/userSlice';
import Wrapper from '../assets/wrappers/Login';
import { FormRow, Loading, Logo } from '../components';

import { validationRegister } from '../schema';

function Register() {
    const navigate = useNavigate();
    // const [values, setValues] = useState(initialState);
    const isLoading = useSelector((state) => state.user.isLoading);
    const currentUser = useSelector((state) => state.user.currentUser);

    const dispatch = useDispatch();

    // const handleChange = (e) => {
    //     setValues({ ...values, [e.target.name]: e.target.value });
    // };

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const onSubmit = async (data) => {
        //e.preventDefault();
        try {
            const { fullName, email, companyName, phone, workspace } = data;
            const currentTenant = {
                fullName,
                email,
                companyName,
                phone,
                workspace,
            };
            const actionResult = await dispatch(registerTenant(currentTenant));
            const currentUser = unwrapResult(actionResult);
            Swal.fire({
                icon: 'success',
                title: 'Bạn đã đăng ký thành công, kiểm tra email để nhận tài khoản.',
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
    const initialValues = {
        fullName: '',
        email: '',
        companyName: '',
        phone: '',
        workspace: '',
    };

    return (
        <Wrapper className="full-page">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationRegister}>
                {(formikProps) => {
                    return (
                        <Form className="form">
                            <Logo />
                            <h3>đăng ký dùng thử</h3>
                            <p>Trải nghiệm miễn phí BK DMS trong vòng 7 ngày</p>
                            <FastField
                                name="fullName"
                                component={FormRow}
                                type="text"
                                labelText="Họ Tên"
                                placeholder="Nhập họ tên"
                                icon={<FiUser className="icon" size={20} />}
                            />
                            <FastField
                                name="email"
                                component={FormRow}
                                type="text"
                                labelText="email"
                                placeholder="Nhập email"
                                icon={<AiOutlineMail className="icon" size={20} />}
                            />
                            <FastField
                                name="companyName"
                                component={FormRow}
                                type="text"
                                labelText="Tên Doanh Nghiệp"
                                placeholder="Nhập Tên Doanh Nghiệp"
                                icon={<BiCopyright className="icon" size={20} />}
                            />
                            <div className="form-row-two">
                                <FastField
                                    name="phone"
                                    component={FormRow}
                                    type="text"
                                    labelText="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    icon={<AiOutlinePhone className="icon" size={20} />}
                                />
                                <FastField
                                    name="workspace"
                                    component={FormRow}
                                    type="text"
                                    labelText="Tên tổ chức"
                                    placeholder="Nhập tên tổ chức"
                                    icon={<BiCopyright className="icon" size={20} />}
                                />
                            </div>

                            {isLoading ? (
                                <Loading center />
                            ) : (
                                <button className="btn-custom" disabled={isLoading}>
                                    Đăng ký
                                </button>
                            )}

                            <p className="p--register">
                                Bạn đã có tài khoản?
                                <Link to="/login" className="a--register">
                                    Đăng nhập
                                </Link>
                            </p>
                        </Form>
                    );
                }}
            </Formik>
        </Wrapper>
    );
}

export default Register;
