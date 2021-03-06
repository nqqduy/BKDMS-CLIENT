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
                title: isEditing ? 'S???a th??nh c??ng' : 'Th??m th??nh c??ng',
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
                title: `S??? kh??ng h???p l???, th??? l???i`,
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
                            {isEditing ? <h5>Chi ti???t ?????i l??</h5> : <h5>Th??m ?????i l??</h5>}
                            <hr />
                            {isEditing && <LevelDebt />}
                            <div className="form-center-agency form-center">
                                <FastField
                                    name="name"
                                    component={FormRow}
                                    type="text"
                                    labelText="T??n ?????i l??"
                                    placeholder="VD: Cocacola Ho??ng L??n"
                                />
                                <FastField
                                    name="nameOwn"
                                    component={FormRow}
                                    type="text"
                                    labelText="Ng?????i ?????i di???n"
                                    placeholder="VD: V??n A "
                                />
                                <FastField
                                    name="phone"
                                    component={FormRow}
                                    type="text"
                                    labelText="s??? ??i???n tho???i"
                                    placeholder="VD: 0987456123 "
                                />
                                <FastField name="dateJoin" component={FormRow} type="date" labelText="ng??y gia nh???p" />

                                <FormRowNotFormik
                                    name="maxDebt"
                                    type="text"
                                    labelText="n??? t???i ??a"
                                    placeholder="Nh???p s??? ti???n cho ph??p n???"
                                    unit="VN??"
                                    valueState={(+debt.maxDebt).toLocaleString('en-US')}
                                    handleChange={handleChangeDebt}
                                />

                                <FormRowNotFormik
                                    name="maxDebtPeriod"
                                    type="text"
                                    labelText="S??? ng??y cho n???"
                                    placeholder="Nh???p s??? ng??y cho ph??p n???"
                                    unit="Ng??y"
                                    valueState={(+debt.maxDebtPeriod).toLocaleString('en-US')}
                                    handleChange={handleChangeDebt}
                                />
                                {/* <p>
                                        <i>L??u ??: S??? ng??y cho n??? t??nh t??? ng??y ra ????n giao h??ng</i>
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
                                    labelText="T???nh/Th??nh Ph???"
                                    placeholder="Ch???n t???nh/th??nh ph???"
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
                                    labelText="Qu???n/Huy???n"
                                    placeholder="Ch???n qu???n/huy???n"
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
                                    labelText="Ph?????ng/X??"
                                    placeholder="Ch???n ph?????ng/x??"
                                    options={address.wardList}
                                />

                                <FastField
                                    name="extraInfoOfAddress"
                                    component={FormRow}
                                    type="text"
                                    labelText="S??? nh?? t??n ???????ng/th??n"
                                    placeholder="VD: 13 L?? Th?????ng Ki???t "
                                />
                            </div>
                            <div>
                                <label className="form-label">Ch???nh s???a v??? tr?? ch??nh x??c tr??n b???n ?????</label>
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
                                    <span className="select-agency-map">Vui l??ng ch???n th??ng tin ?????a ch??? ??? tr??n</span>
                                )}
                            </div>
                            <div className="button-one">
                                {isLoading ? (
                                    <Loading center />
                                ) : (
                                    <Button
                                        type="submit"
                                        classname="btn-custom btn-icon"
                                        text={isEditing ? 'C???p nh???t' : 'Th??m'}
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
