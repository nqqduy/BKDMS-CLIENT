import { FastField, Form, Formik } from 'formik';
import { BiCheck } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { Button, FormRow, Loading } from '../../components';
import { Image } from 'cloudinary-react';
import { useState } from 'react';
import getBase64 from '../../utils/getBase64';
import Swal from 'sweetalert2';
import { updateEmployee } from '../../app/user/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
//import { IoImageOutline } from 'react-icons/io5';

const MyAccount = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const isLoading = useSelector((state) => state.user.isLoading);

    const initialValues = {
        ...currentUser,
        password: '',
        rePassword: '',
    };
    const [img, setImg] = useState({ prevImg: '', img: null, isEditing: false });
    const dispatch = useDispatch();

    const handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];

        if (file) {
            let base64 = await getBase64(file);
            let objectURL = URL.createObjectURL(file);

            setImg((prev) => ({
                ...prev,
                prevImg: objectURL,
                img: base64,
                isEditing: true,
            }));
        }
    };
    const handleDeleteImage = () => {
        setImg({ prevImg: '', img: null, isEditing: false });
    };

    const handleSubmit = async (data) => {
        try {
            if (data.password || data.rePassword) {
                if (data.password !== data.rePassword) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Mật khẩu không trùng khớp',
                        showConfirmButton: true,
                    });
                    return;
                }
            }
            let dataSubmit = {
                ...data,
                img: img.img ? img.img : null,
            };
            const action = await dispatch(updateEmployee(dataSubmit));
            unwrapResult(action);
            setImg((prev) => ({ prevImg: '', img: null, isEditing: false }));
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
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
                            <h5>Thông tin tài khoản</h5>
                            <hr />
                            <div className="container-account">
                                <div className="avatar">
                                    {!img.isEditing ? (
                                        <Image
                                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                                            crop="scale"
                                            publicId={currentUser.avatar}
                                            width="200"
                                        />
                                    ) : (
                                        <img src={img.prevImg} alt="Ảnh sản phẩm" />
                                    )}
                                    <br />
                                    <div className="button-img">
                                        <label htmlFor="file-upload" className="custom-file-upload">
                                            Chọn ảnh
                                        </label>
                                        <input id="file-upload" type="file" onChange={handleOnChangeImage} />
                                        {img.isEditing && (
                                            <Button
                                                type="button"
                                                classname="btn-custom btn-icon img-delete"
                                                text="Xóa ảnh"
                                                handleFunction={handleDeleteImage}
                                                // icon={<IoImageOutline className="front-icon" />}
                                            />
                                        )}
                                    </div>
                                </div>
                                <p className="title-table">Thông tin</p>
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
                                        disabled
                                    />
                                </div>
                                <p className="title-table">Thay đổi mật khẩu</p>
                                <div>
                                    <FastField
                                        name="password"
                                        component={FormRow}
                                        type="password"
                                        labelText="Mật khẩu"
                                        placeholder="Nhập mật khẩu"
                                    />
                                    <FastField
                                        name="rePassword"
                                        component={FormRow}
                                        type="password"
                                        labelText="Nhập lại mật khẩu"
                                        placeholder="Nhập lại mật khẩu"
                                    />
                                </div>
                            </div>
                            <div className="button-one">
                                {isLoading ? (
                                    <Loading center />
                                ) : (
                                    <Button
                                        type="submit"
                                        classname="btn-custom btn-icon"
                                        text="Cập nhật"
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

export default MyAccount;
