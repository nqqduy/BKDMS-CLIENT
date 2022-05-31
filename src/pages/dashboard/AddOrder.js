import { unwrapResult } from '@reduxjs/toolkit';
import { FastField, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { BiCheck, BiPlusCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAgenciesInMap, getCurrentAgency, setCurrentAgencyToEmpty } from '../../app/agency/agencySlice';
import { createOrder } from '../../app/order/orderSlice';
import { getAllProduct } from '../../app/product/productSlice';
import Wrapper from '../../assets/wrappers/DashboardAddGoodsReceipt';
import { Button, FormRow, FormRowSelect, FormRowTextArea, Loading, SelectNotFormik } from '../../components';
import { BUSINESS } from '../../constants/constants';
import { PAYMENT_TYPE } from '../../constants/order';
import city from '../../utils/data.json';

let dataProvince = [];
for (let i of city) {
    dataProvince.push({ value: i.Name, label: i.Name });
}

const AddOrder = () => {
    const listProductRedux = useSelector((state) => state.product.listProduct);
    const isLoading = useSelector((state) => state.order.isLoading);
    const isEditing = useSelector((state) => state.order.isEditing);
    const currentAgency = useSelector((state) => state.agency.currentAgency);

    //const listProduct= useSelector((state) => state.product.listProduct);
    const [listAgency, setListAgency] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [rowProductOrder, setRowProductOrder] = useState([]);
    const [address, setAddress] = useState({
        provinceList: dataProvince,
        districtList: [],
        wardList: [],
        province: '',
        district: '',
        ward: '',
        extraInfoOfAddress: '',
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAgencyAndProduct = async () => {
            try {
                const result = await Promise.all([
                    dispatch(getAllProduct({ type: BUSINESS })),
                    dispatch(getAgenciesInMap()),
                ]);
                dispatch(setCurrentAgencyToEmpty());
                const dataAgency = unwrapResult(result[1]);
                const dataProduct = unwrapResult(result[0]);

                const newList = dataAgency?.listAgencies?.map((agency) => ({
                    label: agency.name,
                    value: agency.id,
                }));
                let listProduct = dataProduct?.listProduct?.map((product) => ({
                    value: product.id,
                    label: product.name,
                }));

                setListProduct(listProduct);
                setListAgency(newList);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAgencyAndProduct();
    }, [dispatch]);

    // get data from current agency
    useEffect(() => {
        if (currentAgency) {
            let dataDistrict = city
                .find((province) => province.Name === currentAgency.province)
                .Districts.map((district) => ({
                    value: district.Name,
                    label: district.Name,
                }));
            let dataWard = city
                .find((province) => province.Name === currentAgency.province)
                .Districts.find((district) => district.Name === currentAgency.district)
                .Wards.map((ward) => ({ value: ward.Name, label: ward.Name }));
            setAddress((prev) => ({
                ...prev,
                districtList: dataDistrict,
                wardList: dataWard,
                province: currentAgency.province,
                district: currentAgency.district,
                ward: currentAgency.ward,
                from: 'GET_DATA_AGENCY_REDUX',
            }));
        }
    }, [currentAgency]);

    // change address
    useEffect(() => {
        if (address.from !== 'GET_DATA_AGENCY_REDUX') {
            // handle address from input select
            if (address.province !== '') {
                let listDistrict = city
                    .find((province) => province.Name === address.province)
                    .Districts.map((district) => ({
                        value: district.Name,
                        label: district.Name,
                    }));
                setAddress((prev) => ({
                    ...prev,
                    districtList: listDistrict,
                    district: '',
                    ward: '',
                }));
            }
        }
    }, [address.province]);
    useEffect(() => {
        if (address.from !== 'GET_DATA_AGENCY_REDUX') {
            if (address.province !== '' && address.district !== '') {
                let ward = city
                    .find((province) => province.Name === address.province)
                    .Districts.find((district) => district.Name === address.district)
                    .Wards.map((ward) => ({ value: ward.Name, label: ward.Name }));
                setAddress((prev) => ({
                    ...prev,
                    wardList: ward,
                    ward: '',
                }));
            }
        }
    }, [address.district]);

    const handleRowAdd = () => {
        setRowProductOrder([
            ...rowProductOrder,
            {
                productId: '',
                productName: '',
                listUnit: [], // [ {value, label}]
                quantity: '',
                unitId: '',
                unitName: '',
                price: '',
                totalPrice: 0,
            },
        ]);
    };
    const handleRowDelete = (idx) => {
        const newListRow = [...rowProductOrder];
        newListRow.splice(idx, 1);
        setRowProductOrder(newListRow);
    };
    const handleChangeOrder = (e, idx, type) => {
        const newRowProduct = [...rowProductOrder];
        if (type === 'SELECT_PRODUCT') {
            const product = listProductRedux.find((product) => product.id === e.value);
            // handle unit list
            let newUnitList = product?.units?.map((unit) => ({ value: unit.id, label: unit.name }));

            newRowProduct[idx] = {
                listUnit: newUnitList,
                productId: e.value,
                productName: e.label,
                quantity: '',
                unitId: '',
                price: '',
                totalPrice: 0,
            };
        } else if (type === 'SELECT_UNIT') {
            // check xem chọn có hợp lệ hay không
            for (let i = 0; i < newRowProduct.length; i++) {
                if (i === idx) continue; // trùng vs cái hiện tại không so sánh
                if (newRowProduct[i].unitId === e.value) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Sản phẩm theo đơn vị đã tồn tại trong bảng',
                        showConfirmButton: true,
                    });
                    return;
                }
            }
            let product = listProductRedux.find((product) => product.id === newRowProduct[idx].productId);
            let selectUnit = product?.units?.find((item) => item.id === e.value);
            newRowProduct[idx] = {
                ...newRowProduct[idx],
                unitId: e.value,
                unitName: e.label,
                price: selectUnit.agencyPrice,
                quantity: '',
                totalPrice: 0,
            };
        } else if (type === 'ENTER_QUANTITY') {
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
                e.target.value = '1';
            }
            newRowProduct[idx] = {
                ...newRowProduct[idx],
                quantity: e.target.value,
                totalPrice: +newRowProduct[idx].price * +e.target.value,
            };
        }
        setRowProductOrder(newRowProduct);
    };
    let totalPayment = rowProductOrder.reduce((previousValue, currentValue) => previousValue + +currentValue.totalPrice, 0);

    const initialValues = {
        // phone: Object.keys(currentAgency).length !== 0 ? currentAgency.phone : '',
        phone: currentAgency ? currentAgency.phone : '',
        // extraInfoOfAddress: Object.keys(currentAgency).length !== 0 ? currentAgency.extraInfoOfAddress : '',
        extraInfoOfAddress: currentAgency ? currentAgency.extraInfoOfAddress : '',
        date: '',
        time: '',
        note: '',
        paymentType: '',
        type: '',
    };

    const handleSubmit = async (data, { resetForm }) => {
        // check data
        // handle product

        try {
            if (isEditing) {
            } else {
                // check payment type

                const listProduct = rowProductOrder.map((product) => ({
                    quantity: product.quantity,
                    price: product.price,
                    unitId: product.unitId,
                    totalPrice: product.totalPrice,
                }));
                if (rowProductOrder.length === 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: `Vui lòng thêm sản phẩm`,
                        showConfirmButton: true,
                    });
                    return;
                }
                for (let item of rowProductOrder) {
                    if (+item.quantity === 0) {
                        Swal.fire({
                            icon: 'warning',
                            title: `Số lượng ${item.productName} ${item.unitName} phải lớn hơn 0`,
                            showConfirmButton: true,
                        });
                        return;
                    }
                }
                if (!currentAgency) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Chưa chọn đại lý',
                        showConfirmButton: true,
                    });
                    return;
                }
                const dataSubmit = {
                    ...data,
                    province: address.province,
                    district: address.district,
                    ward: address.ward,
                    totalPayment: totalPayment,
                    listProduct: listProduct,
                    agencyId: currentAgency.id,
                };

                const actionResult = await dispatch(createOrder(dataSubmit));
                unwrapResult(actionResult);
                resetForm();
                setRowProductOrder([]);
                setAddress({
                    provinceList: dataProvince,
                    districtList: [],
                    wardList: [],
                    province: '',
                    district: '',
                    ward: '',
                    extraInfoOfAddress: '',
                });
            }
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
    return (
        <Wrapper>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
                {(formikProps) => {
                    const { values } = formikProps;
                    return (
                        <Form className="form">
                            <h5>{isEditing ? 'Sửa Đơn Hàng' : 'Thêm Đơn Hàng'} </h5>
                            <hr />

                            <div className="form-center">
                                <div className="form-center-order">
                                    <SelectNotFormik
                                        name="recipientName"
                                        labelText="Đại lý nhận hàng"
                                        placeholder="Chọn đại lý"
                                        valueState={currentAgency?.id}
                                        options={listAgency}
                                        handleChange={(e) => {
                                            dispatch(getCurrentAgency(e.value));
                                        }}
                                    />
                                    <Field
                                        name="paymentType"
                                        labelText="Phương thức thanh toán"
                                        placeholder="Chọn phương thức"
                                        //valueState={currentAgency.paymentType}
                                        options={PAYMENT_TYPE}
                                        component={FormRowSelect}
                                        //handleChange={(e) => {}}
                                    />
                                    <FastField
                                        name="phone"
                                        component={FormRow}
                                        type="text"
                                        labelText="Số điện thoại nhận hàng"
                                        placeholder="Nhập số điện thoại"
                                    />

                                    <FastField name="date" component={FormRow} type="date" labelText="ngày tạo" />
                                    {values.date && (
                                        <FastField
                                            name="time"
                                            component={FormRow}
                                            type="time"
                                            labelText="Giờ"
                                            // value={Date().now}
                                        />
                                    )}

                                    <SelectNotFormik
                                        name="province"
                                        valueState={address.province}
                                        handleChange={(e) =>
                                            setAddress({
                                                ...address,
                                                province: e.value,
                                                from: 'NOT_GET_AGENCY',
                                            })
                                        }
                                        labelText="Tỉnh/Thành phố"
                                        placeholder="Chọn tỉnh/thành phố"
                                        options={address.provinceList}
                                    />
                                    <SelectNotFormik
                                        name="district"
                                        valueState={address.district}
                                        handleChange={(e) =>
                                            setAddress({
                                                ...address,
                                                district: e.value,
                                                from: 'NOT_GET_AGENCY',
                                            })
                                        }
                                        labelText="Quận/Huyện"
                                        placeholder="Chọn quận/huyện"
                                        options={address.districtList}
                                    />
                                    <SelectNotFormik
                                        name="ward"
                                        handleChange={(e) =>
                                            setAddress({
                                                ...address,
                                                ward: e.value,
                                                from: 'NOT_GET_AGENCY',
                                            })
                                        }
                                        valueState={address.ward}
                                        labelText="Phường/Xã"
                                        placeholder="Chọn phường/xã"
                                        options={address.wardList}
                                    />
                                    <FastField
                                        name="extraInfoOfAddress"
                                        component={FormRow}
                                        labelText="Số nhà tên đường/thôn"
                                        placeholder="Nhập Số nhà tên đường/thôn"
                                    />
                                </div>
                                <FastField
                                    name="note"
                                    component={FormRowTextArea}
                                    labelText="Ghi Chú"
                                    placeholder="Nhập ghi chú"
                                />
                            </div>

                            <div className="table table-order">
                                <p className="title-table">Sản Phẩm</p>
                                <div className="container-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th width="5%">STT</th>
                                                <th width="25%">Tên sản phẩm</th>
                                                <th width="20%">Đơn vị</th>
                                                <th width="10%">Số Lượng</th>
                                                <th width="10%">Giá</th>
                                                <th width="20%">Tổng Tiền</th>
                                                <th width="10%">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rowProductOrder &&
                                                rowProductOrder.map((row, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <td>{idx + 1}</td>
                                                            <td>
                                                                <SelectNotFormik
                                                                    placeholder="Chọn sản phẩm"
                                                                    options={listProduct}
                                                                    valueState={row.productId}
                                                                    handleChange={(e) =>
                                                                        handleChangeOrder(e, idx, 'SELECT_PRODUCT')
                                                                    }
                                                                    notLabel
                                                                    className="mb-0"
                                                                />
                                                            </td>
                                                            <td>
                                                                <SelectNotFormik
                                                                    placeholder="Chọn đơn vị"
                                                                    options={row.listUnit}
                                                                    valueState={row.unitId}
                                                                    handleChange={(e) =>
                                                                        handleChangeOrder(e, idx, 'SELECT_UNIT')
                                                                    }
                                                                    notLabel
                                                                    className="mb-0"
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    className="form-input"
                                                                    onChange={(e) =>
                                                                        handleChangeOrder(e, idx, 'ENTER_QUANTITY')
                                                                    }
                                                                    min="1"
                                                                    value={(+row.quantity).toLocaleString('en-US')}
                                                                    disabled={!row.unitId}
                                                                />
                                                            </td>

                                                            <td>
                                                                {row.price ? (+row.price).toLocaleString('en-US') : '0'} VNĐ
                                                            </td>
                                                            <td>
                                                                {row.totalPrice
                                                                    ? row.totalPrice.toLocaleString('en-US')
                                                                    : '0'}{' '}
                                                                VNĐ
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    type="button"
                                                                    classname="btn-outline-delete"
                                                                    text="Xóa"
                                                                    handleFunction={() => handleRowDelete(idx)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="total">
                                <p>
                                    Tổng tiền: <span className="color-red">{totalPayment.toLocaleString('en-US')} VNĐ</span>
                                </p>
                            </div>
                            <Button
                                type="button"
                                classname="btn-custom btn-icon btn-action detail"
                                text="Thêm hàng"
                                icon={<BiPlusCircle className="front-icon" />}
                                handleFunction={handleRowAdd}
                            />

                            <br />
                            <div className="button-one">
                                {isLoading ? (
                                    <Loading center />
                                ) : (
                                    <Button
                                        type="submit"
                                        classname="btn-custom btn-icon"
                                        text="Thêm"
                                        icon={<BiCheck className="front-icon" />}
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

export default AddOrder;
