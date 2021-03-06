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
            // check xem ch???n c?? h???p l??? hay kh??ng
            for (let i = 0; i < newRowProduct.length; i++) {
                if (i === idx) continue; // tr??ng vs c??i hi???n t???i kh??ng so s??nh
                if (newRowProduct[i].unitId === e.value) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'S???n ph???m theo ????n v??? ???? t???n t???i trong b???ng',
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
                    title: `S??? kh??ng h???p l???, th??? l???i`,
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
                        title: `Vui l??ng th??m s???n ph???m`,
                        showConfirmButton: true,
                    });
                    return;
                }
                for (let item of rowProductOrder) {
                    if (+item.quantity === 0) {
                        Swal.fire({
                            icon: 'warning',
                            title: `S??? l?????ng ${item.productName} ${item.unitName} ph???i l???n h??n 0`,
                            showConfirmButton: true,
                        });
                        return;
                    }
                }
                if (!currentAgency) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Ch??a ch???n ?????i l??',
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
                title: isEditing ? 'S???a th??nh c??ng' : 'Th??m th??nh c??ng',
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
                            <h5>{isEditing ? 'S???a ????n H??ng' : 'Th??m ????n H??ng'} </h5>
                            <hr />

                            <div className="form-center">
                                <div className="form-center-order">
                                    <SelectNotFormik
                                        name="recipientName"
                                        labelText="?????i l?? nh???n h??ng"
                                        placeholder="Ch???n ?????i l??"
                                        valueState={currentAgency?.id}
                                        options={listAgency}
                                        handleChange={(e) => {
                                            dispatch(getCurrentAgency(e.value));
                                        }}
                                    />
                                    <Field
                                        name="paymentType"
                                        labelText="Ph????ng th???c thanh to??n"
                                        placeholder="Ch???n ph????ng th???c"
                                        //valueState={currentAgency.paymentType}
                                        options={PAYMENT_TYPE}
                                        component={FormRowSelect}
                                        //handleChange={(e) => {}}
                                    />
                                    <FastField
                                        name="phone"
                                        component={FormRow}
                                        type="text"
                                        labelText="S??? ??i???n tho???i nh???n h??ng"
                                        placeholder="Nh???p s??? ??i???n tho???i"
                                    />

                                    <FastField name="date" component={FormRow} type="date" labelText="ng??y t???o" />
                                    {values.date && (
                                        <FastField
                                            name="time"
                                            component={FormRow}
                                            type="time"
                                            labelText="Gi???"
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
                                        labelText="T???nh/Th??nh ph???"
                                        placeholder="Ch???n t???nh/th??nh ph???"
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
                                        labelText="Qu???n/Huy???n"
                                        placeholder="Ch???n qu???n/huy???n"
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
                                        labelText="Ph?????ng/X??"
                                        placeholder="Ch???n ph?????ng/x??"
                                        options={address.wardList}
                                    />
                                    <FastField
                                        name="extraInfoOfAddress"
                                        component={FormRow}
                                        labelText="S??? nh?? t??n ???????ng/th??n"
                                        placeholder="Nh???p S??? nh?? t??n ???????ng/th??n"
                                    />
                                </div>
                                <FastField
                                    name="note"
                                    component={FormRowTextArea}
                                    labelText="Ghi Ch??"
                                    placeholder="Nh???p ghi ch??"
                                />
                            </div>

                            <div className="table table-order">
                                <p className="title-table">S???n Ph???m</p>
                                <div className="container-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th width="5%">STT</th>
                                                <th width="25%">T??n s???n ph???m</th>
                                                <th width="20%">????n v???</th>
                                                <th width="10%">S??? L?????ng</th>
                                                <th width="10%">Gi??</th>
                                                <th width="20%">T???ng Ti???n</th>
                                                <th width="10%">Thao t??c</th>
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
                                                                    placeholder="Ch???n s???n ph???m"
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
                                                                    placeholder="Ch???n ????n v???"
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
                                                                {row.price ? (+row.price).toLocaleString('en-US') : '0'} VN??
                                                            </td>
                                                            <td>
                                                                {row.totalPrice
                                                                    ? row.totalPrice.toLocaleString('en-US')
                                                                    : '0'}{' '}
                                                                VN??
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    type="button"
                                                                    classname="btn-outline-delete"
                                                                    text="X??a"
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
                                    T???ng ti???n: <span className="color-red">{totalPayment.toLocaleString('en-US')} VN??</span>
                                </p>
                            </div>
                            <Button
                                type="button"
                                classname="btn-custom btn-icon btn-action detail"
                                text="Th??m h??ng"
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
                                        text="Th??m"
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
