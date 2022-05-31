import { unwrapResult } from '@reduxjs/toolkit';
import { FastField, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createAgency, updateAgency } from '../../app/agency/agencySlice';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { Button, FormRow, FormRowNotFormik, GoogleMapAgency, Loading, SelectNotFormik } from '../../components';
import { validationAddAgency } from '../../schema';
import city from '../../utils/data.json';
import { LevelDebt } from './components';

function AddAgency() {
    const isLoading = useSelector((state) => state.agency.isLoading);
    const isEditing = useSelector((state) => state.agency.isEditing);
    const currentAgency = useSelector((state) => state.agency.currentAgency);

    const [address, setAddress] = useState(
        isEditing
            ? {
                  provinceList: [],
                  districtList: [],
                  wardList: [],
                  provinceAg: currentAgency.province,
                  districtAg: currentAgency.district,
                  wardAg: currentAgency.ward,
                  from: 'EDITING',
              }
            : {
                  provinceList: [],
                  districtList: [],
                  wardList: [],
                  provinceAg: '',
                  districtAg: '',
                  wardAg: '',
              }
    );
    const [debt, setDebt] = useState(
        isEditing
            ? {
                  maxDebt: currentAgency.maxDebt,
                  maxDebtPeriod: currentAgency.maxDebtPeriod,
              }
            : {
                  maxDebt: '',
                  maxDebtPeriod: '',
              }
    );

    const [geocoding, setGeocoding] = useState(
        isEditing ? { lat: currentAgency.latitude, lng: currentAgency.longitude } : { lat: '', lng: '' }
    );

    const initialValues = isEditing
        ? currentAgency
        : {
              name: '',
              nameOwn: '',
              phone: '',
              dateJoin: '',
              paymentType: '',
              extraInfoOfAddress: '',
          };

    const dispatch = useDispatch();

    useEffect(() => {
        let province = [];
        for (let i of city) {
            province.push({ value: i.Name, label: i.Name });
        }

        setAddress((prev) => ({ ...prev, provinceList: province }));
    }, []);

    useEffect(() => {
        if (address.provinceAg !== '') {
            let listDistrict = city
                .find((province) => province.Name === address.provinceAg)
                .Districts.map((district) => ({
                    value: district.Name,
                    label: district.Name,
                }));
            if (listDistrict === undefined) {
                listDistrict = [];
            }
            if (isEditing && address.from === 'EDITING') {
                setAddress((prev) => ({
                    ...prev,
                    districtList: listDistrict,
                    wardList: [],
                }));
            } else
                setAddress((prev) => ({
                    ...prev,
                    districtList: listDistrict,
                    districtAg: '',
                    wardAg: '',
                }));
        }
    }, [address.provinceAg]);

    useEffect(() => {
        if (address.districtAg !== '') {
            let ward = city
                .find((province) => province.Name === address.provinceAg)
                ?.Districts.find((district) => district.Name === address.districtAg)
                ?.Wards.map((ward) => ({ value: ward.Name, label: ward.Name }));
            if (ward === undefined) {
                ward = [];
            }
            if (isEditing && address.from === 'EDITING') {
                setAddress((prev) => ({
                    ...prev,
                    wardList: ward,
                }));
            } else
                setAddress((prev) => ({
                    ...prev,
                    wardList: ward,
                    wardAg: '',
                }));
        }
    }, [address.districtAg]);

    const handleSubmit = async (currentAgency, { resetForm }) => {
        // check value of state province, district, ward
        currentAgency = {
            ...currentAgency,
            longitude: String(geocoding.lng),
            latitude: String(geocoding.lat),
            maxDebt: debt.maxDebt,
            maxDebtPeriod: debt.maxDebtPeriod,
            province: address.provinceAg,
            district: address.districtAg,
            ward: address.wardAg,
        };
        try {
            if (isEditing) {
                const actionResult = await dispatch(updateAgency(currentAgency));
                unwrapResult(actionResult);
            } else {
                const actionResult = await dispatch(createAgency(currentAgency));
                unwrapResult(actionResult);
                resetForm();
            }

            Swal.fire({
                icon: 'success',
                title: isEditing ? 'Sửa thành công' : 'Thêm thành công',
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
    const handleChangeDebt = (e) => {
        e.target.value = e.target.value.split(',').join('');
        if (!isFinite(+e.target.value)) {
            Swal.fire({
                icon: 'warning',
                title: `Số không hợp lệ, thử lại`,
                showConfirmButton: true,
            });
            return;
        }
        if (+e.target.value <= 0) {
            e.target.value = '0';
        }
        setDebt((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    return (
        <Wrapper>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                //enableReinitialize={true}
                validationSchema={validationAddAgency}
            >
                {(formikProps) => {
                    const { values /*errors, touched, isSubmitting, setFieldValue, handleChange */ } = formikProps;

                    return (
                        <Form className="form">
                            {isEditing ? <h5>Chi tiết đại lý</h5> : <h5>Thêm đại lý</h5>}
                            <hr />
                            {isEditing && <LevelDebt />}
                            <div className="form-center-agency form-center">
                                <FastField
                                    name="name"
                                    component={FormRow}
                                    type="text"
                                    labelText="Tên đại lý"
                                    placeholder="VD: Cocacola Hoàng Lân"
                                />
                                <FastField
                                    name="nameOwn"
                                    component={FormRow}
                                    type="text"
                                    labelText="Người đại diện"
                                    placeholder="VD: Văn A "
                                />
                                <FastField
                                    name="phone"
                                    component={FormRow}
                                    type="text"
                                    labelText="số điện thoại"
                                    placeholder="VD: 0987456123 "
                                />
                                <FastField name="dateJoin" component={FormRow} type="date" labelText="ngày gia nhập" />

                                <FormRowNotFormik
                                    name="maxDebt"
                                    type="text"
                                    labelText="nợ tối đa"
                                    placeholder="Nhập số tiền cho phép nợ"
                                    unit="VNĐ"
                                    valueState={(+debt.maxDebt).toLocaleString('en-US')}
                                    handleChange={handleChangeDebt}
                                />

                                <FormRowNotFormik
                                    name="maxDebtPeriod"
                                    type="text"
                                    labelText="Số ngày cho nợ"
                                    placeholder="Nhập số ngày cho phép nợ"
                                    unit="Ngày"
                                    valueState={(+debt.maxDebtPeriod).toLocaleString('en-US')}
                                    handleChange={handleChangeDebt}
                                />
                                {/* <p>
                                        <i>Lưu ý: Số ngày cho nợ tính từ ngày ra đơn giao hàng</i>
                                    </p> */}

                                <SelectNotFormik
                                    name="province"
                                    valueState={address.provinceAg}
                                    handleChange={(e) =>
                                        setAddress({
                                            ...address,
                                            provinceAg: e.value,
                                            from: 'NOT_EDITING',
                                        })
                                    }
                                    labelText="Tỉnh/Thành Phố"
                                    placeholder="Chọn tỉnh/thành phố"
                                    options={address.provinceList}
                                />
                                <SelectNotFormik
                                    handleChange={(e) =>
                                        setAddress({
                                            ...address,
                                            districtAg: e.value,
                                            from: 'NOT_EDITING',
                                        })
                                    }
                                    valueState={address.districtAg}
                                    labelText="Quận/Huyện"
                                    placeholder="Chọn quận/huyện"
                                    options={address.districtList}
                                />
                                <SelectNotFormik
                                    handleChange={(e) =>
                                        setAddress({
                                            ...address,
                                            wardAg: e.value,
                                            from: 'NOT_EDITING',
                                        })
                                    }
                                    valueState={address.wardAg}
                                    labelText="Phường/Xã"
                                    placeholder="Chọn phường/xã"
                                    options={address.wardList}
                                />

                                <FastField
                                    name="extraInfoOfAddress"
                                    component={FormRow}
                                    type="text"
                                    labelText="Số nhà tên đường/thôn"
                                    placeholder="VD: 13 Lý Thường Kiệt "
                                />
                            </div>
                            <div>
                                <label className="form-label">Chỉnh sửa vị trí chính xác trên bản đồ</label>
                                {address.provinceAg !== '' &&
                                address.districtAg !== '' &&
                                address.wardAg !== '' &&
                                values.extraInfoOfAddress !== '' ? (
                                    <GoogleMapAgency
                                        setGeocoding={setGeocoding}
                                        geocoding={geocoding}
                                        address={address}
                                        extraInfoOfAddress={values.extraInfoOfAddress}
                                    />
                                ) : (
                                    <span className="select-agency-map">Vui lòng chọn thông tin địa chỉ ở trên</span>
                                )}
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
}

export default AddAgency;
