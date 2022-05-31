import { FastField, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiPlusCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../../assets/wrappers/PopupWarehouse';
import { Button, FormRow, FormRowSelect, Loading, SelectNotFormik } from '../../../components';
import city from '../../../utils/data.json';
import { LIST_STATUS, TYPE_WAREHOUSE } from '../../../constants/warehouse';
import { createWarehouse, getAllWarehouse, updateWarehouse } from '../../../app/warehouse/warehouseSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { validationWarehouse } from '../../../schema';

const PopupWarehouse = ({ setShowPopup /* isEditing, initialValues, handleSubmit, address, setAddress */ }) => {
    const isLoading = useSelector((state) => state.warehouse.isLoading);
    const isEditing = useSelector((state) => state.warehouse.isEditing);
    const currentWarehouse = useSelector((state) => state.warehouse.currentWarehouse);
    const dispatch = useDispatch();
    const [address, setAddress] = useState(
        isEditing
            ? {
                  provinceList: [],
                  districtList: [],
                  wardList: [],
                  province: currentWarehouse.province,
                  district: currentWarehouse.district,
                  ward: currentWarehouse.ward,
              }
            : {
                  provinceList: [],
                  districtList: [],
                  wardList: [],
                  province: '',
                  district: '',
                  ward: '',
              }
    );
    useEffect(() => {
        let province = [];
        for (let i of city) {
            province.push({ value: i.Name, label: i.Name });
        }

        setAddress((prev) => ({ ...prev, provinceList: province }));
    }, []);
    useEffect(() => {
        if (address.province !== '') {
            let listDistrict = city
                .find((province) => province.Name === address.province)
                .Districts.map((district) => ({
                    value: district.Name,
                    label: district.Name,
                }));
            if (isEditing) {
                setAddress((prev) => ({
                    ...prev,
                    districtList: listDistrict,
                    wardList: [],
                }));
            } else
                setAddress((prev) => ({
                    ...prev,
                    districtList: listDistrict,
                    district: '',
                    ward: '',
                }));
        }
    }, [address.province, isEditing]);
    useEffect(() => {
        if (address.district !== '') {
            let ward = city
                .find((province) => province.Name === address.province)
                ?.Districts?.find((district) => district.Name === address.district)
                ?.Wards.map((ward) => ({ value: ward.Name, label: ward.Name }));
            if (isEditing) {
                setAddress((prev) => ({
                    ...prev,
                    wardList: ward,
                }));
            } else
                setAddress((prev) => ({
                    ...prev,
                    wardList: ward,
                    ward: '',
                }));
        }
    }, [address.district, isEditing]);

    const handleSubmit = async (currentWarehouse, { resetForm }) => {
        try {
            currentWarehouse = {
                ...currentWarehouse,
                province: address.province,
                district: address.district,
                ward: address.ward,
            };

            if (isEditing) {
                const actionResult = await dispatch(updateWarehouse(currentWarehouse));
                unwrapResult(actionResult);
                setShowPopup((prev) => !prev);
                await dispatch(getAllWarehouse());
            } else {
                const actionResult = await dispatch(createWarehouse(currentWarehouse));
                unwrapResult(actionResult);
                setShowPopup((prev) => !prev);
                await dispatch(getAllWarehouse());
            }
            resetForm();
            Swal.fire({
                icon: 'success',
                title: isEditing ? 'Sửa thành công' : 'Thêm thành công',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };

    const initialValues = isEditing
        ? currentWarehouse
        : {
              name: '',
              status: '',
              type: '',
              extraInfoOfAddress: '',
          };
    return (
        <Wrapper>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationWarehouse}>
                {(formikProps) => {
                    return (
                        <Form className="form-warehouse">
                            {isEditing ? <h5>sửa kho</h5> : <h5>Thêm kho</h5>}
                            <hr />
                            <div className="form-center-warehouse">
                                <div>
                                    <FastField
                                        name="name"
                                        component={FormRow}
                                        type="text"
                                        labelText="Tên kho"
                                        placeholder="Nhập tên kho"
                                    />
                                    <FastField
                                        name="status"
                                        component={FormRowSelect}
                                        labelText="Tình trạng"
                                        placeholder="Chọn tình trạng"
                                        options={LIST_STATUS}
                                    />
                                    <FastField
                                        name="type"
                                        component={FormRowSelect}
                                        labelText="Loại Kho"
                                        placeholder="Chọn loại kho"
                                        options={TYPE_WAREHOUSE}
                                    />
                                </div>
                                <div>
                                    <SelectNotFormik
                                        name="province"
                                        valueState={address.province}
                                        handleChange={(e) =>
                                            setAddress({
                                                ...address,
                                                province: e.value,
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
                                                district: e.value,
                                            })
                                        }
                                        valueState={address.district}
                                        labelText="Quận/Huyện"
                                        placeholder="Chọn quận/huyện"
                                        options={address.districtList}
                                    />
                                    <SelectNotFormik
                                        handleChange={(e) =>
                                            setAddress({
                                                ...address,
                                                ward: e.value,
                                            })
                                        }
                                        valueState={address.ward}
                                        labelText="Phường/Xã"
                                        placeholder="Chọn phường/xã"
                                        options={address.wardList}
                                    />
                                    <Field
                                        name="extraInfoOfAddress"
                                        component={FormRow}
                                        labelText="Số nhà tên đường/thôn"
                                        placeholder="Nhập Số nhà tên đường/thôn"
                                    />
                                </div>
                            </div>
                            <div className="btn-container-warehouse">
                                {isLoading ? (
                                    <Loading center />
                                ) : (
                                    <>
                                        <Button
                                            type="submit"
                                            classname="btn-custom  btn-icon"
                                            text={isEditing ? 'Sửa' : 'Thêm'}
                                            icon={<BiPlusCircle className="front-icon" />}
                                        />
                                        <Button
                                            type="button"
                                            classname="btn-custom  btn-icon btn-delete"
                                            text="Hủy"
                                            icon={<AiOutlineDelete className="front-icon" />}
                                            handleFunction={setShowPopup}
                                        />
                                    </>
                                )}
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Wrapper>
    );
};

export default PopupWarehouse;
