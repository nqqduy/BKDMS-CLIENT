import { unwrapResult } from '@reduxjs/toolkit';
import { FastField, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAgenciesInMap } from '../../app/agency/agencySlice';
import { getAllProduct } from '../../app/product/productSlice';
import { getAllEmployee } from '../../app/user/userSlice';
import {
    createAddGoodsReceipt,
    getAddGoodsReceipt,
    getAllWarehouse,
    importGoods,
    updateAddGoodsReceipt,
} from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardAddGoodsReceipt';
import { Button, FormRow, FormRowSelect, FormRowTextArea, Loading } from '../../components';
import {
    ACTIVE,
    IMPORT_GOODS_FOR_SALE,
    RENDER_STATUS_GOODS_RECEIPT,
    RETURN_GOODS_FROM_AGENCY,
    TYPE_RECEIPT,
} from '../../constants/warehouse';
import { TableAddGoods } from './components';

const AddGoodsReceipt = () => {
    const isLoading = useSelector((state) => state.warehouse.isLoading);
    const isEditingAddGoods = useSelector((state) => state.warehouse.isEditingAddGoods);
    const currentGoodsReceipt = useSelector((state) => state.warehouse.currentGoodsReceipt);
    const listEmployee = useSelector((state) =>
        state.user.listEmployee.map((item) => ({ value: item.id, label: item.fullName }))
    );
    const listWarehouse = useSelector((state) =>
        state.warehouse.listWarehouse.map((item) => ({ value: item.id, label: item.name }))
    );

    const [type, setType] = useState(isEditingAddGoods ? currentGoodsReceipt.type : '');
    // const [listEmployee, setListEmployee] = useState([]);
    // const [listWarehouseActive, setListWarehouseActive] = useState([]);
    // const [listAgency, setListAgency] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [rowList, setRowList] = useState([]);
    const dispatch = useDispatch();

    for (let item of TYPE_RECEIPT) {
        if (item.value === 'WAREHOUSE_ADJUSTMENT') {
            item.isDisabled = true;
        } else if (item.value === 'RETURN_GOODS_FROM_AGENCY') {
            item.isDisabled = true;
        }
    }

    //fetch API
    useEffect(() => {
        const fetchWarehouse = async () => {
            try {
                const result = await Promise.all([
                    dispatch(getAllWarehouse({ status: ACTIVE })),
                    dispatch(getAllEmployee()),
                    dispatch(getAllProduct({ type: 'BUSINESS' })),
                ]);

                unwrapResult(result[0]);
                unwrapResult(result[1]);
                const dataProduct = unwrapResult(result[2]);
                if (dataProduct.listProduct) {
                    let listProduct = dataProduct.listProduct.map((product) => ({
                        value: product.id,
                        label: product.name,
                    }));
                    setListProduct(listProduct);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchWarehouse();
    }, [dispatch]);

    useEffect(() => {
        if (currentGoodsReceipt && isEditingAddGoods) {
            let newList = currentGoodsReceipt?.detailGoodsReceipts?.map((item) => {
                let unitList = [];
                if (item?.unit?.product?.units?.length !== 0) {
                    unitList = item?.unit?.product?.units?.map((item) => ({ value: item.id, label: item.name }));
                }
                return {
                    ...item,
                    productId: item.unit.product.id,
                    unitList: unitList,
                    barcode: item?.unit?.barcode,
                    quantityCheck: item.quantity,
                    priceCheck: item.price,
                    discountCheck: item.discount,
                };
            });

            setRowList(newList);
        }
    }, [currentGoodsReceipt, isEditingAddGoods]);

    const initialValues = isEditingAddGoods
        ? {
              ...currentGoodsReceipt,
              date:
                  new Date(`${currentGoodsReceipt.createTime}`).getFullYear() +
                  '-' +
                  (new Date(`${currentGoodsReceipt.createTime}`).getMonth() + 1).toString().padStart(2, 0) +
                  '-' +
                  new Date(`${currentGoodsReceipt.createTime}`).getDate().toString().padStart(2, 0),
              time:
                  new Date(`${currentGoodsReceipt.createTime}`).getHours().toString().padStart(2, 0) +
                  ':' +
                  new Date(`${currentGoodsReceipt.createTime}`).getMinutes().toString().padStart(2, 0),
              note: currentGoodsReceipt.note ? currentGoodsReceipt.note : '',
              voucherCode: currentGoodsReceipt.voucherCode ? currentGoodsReceipt.voucherCode : '',
              warehouseIdCheck: currentGoodsReceipt.warehouseId,
          }
        : { voucherCode: '', employeeId: '', date: '', time: '', agencyId: '', type: '', warehouseId: '', note: '' };

    const TOTAL_AMOUNT = rowList.reduce((previousValue, currentValue) => previousValue + +currentValue.totalPrice, 0);
    const TOTAL_DISCOUNT = rowList.reduce(
        (previousValue, currentValue) => previousValue + +currentValue.discount * +currentValue.quantity,
        0
    );
    const handleImport = async (data) => {
        try {
            for (let item of rowList) {
                if (
                    item.id === undefined ||
                    item.quantityCheck !== item.quantity ||
                    item.priceCheck !== item.price ||
                    item.discountCheck !== item.discount
                ) {
                    Swal.fire({
                        icon: 'warning',
                        title: `Ph???i c???p nh???t phi???u tr?????c khi nh???p kho`,
                        showConfirmButton: true,
                    });
                    return;
                }
            }

            if (data.warehouseId !== data.warehouseIdCheck) {
                Swal.fire({
                    icon: 'warning',
                    title: `Ph???i c???p nh???t phi???u tr?????c khi nh???p kho`,
                    showConfirmButton: true,
                });
                return;
            }
            let submitData = {
                warehouseId: data.warehouseId,
                goodReceiptId: data.id,
                listProduct: [],
                orderId: data.orderId,
                type: data.type,
            };

            rowList.map((item) => {
                submitData = {
                    ...submitData,
                    listProduct: submitData.listProduct.concat([
                        {
                            unitId: item.unitId,
                            price: item.price,
                            quantity: item.quantity,
                        },
                    ]),
                };
                return true;
            });

            const actionResult = await dispatch(importGoods(submitData));
            unwrapResult(actionResult);
            const actionResult1 = await dispatch(getAddGoodsReceipt({ goodsReceiptId: submitData.goodReceiptId }));
            unwrapResult(actionResult1);
            Swal.fire({
                icon: 'success',
                title: 'Th??nh c??ng',
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
    const handleSubmit = async (data, { resetForm }) => {
        try {
            // handle product
            let submitProduct = rowList.map((row) => ({
                ...row,
                unitId: row.unitId,
                quantity: row.quantity,
                price: row.price,
                discount: row.discount,
                totalPrice: row.totalPrice,
            }));
            const submitData = {
                ...data,
                totalPrice: TOTAL_AMOUNT,
                totalDiscount: TOTAL_DISCOUNT,
                productList: submitProduct,
            };

            if (submitData.productList.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: `Vui l??ng th??m s???n ph???m`,
                    showConfirmButton: true,
                });
                return;
            }
            for (let item of rowList) {
                if (+item.quantity === 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: `S??? l?????ng ${item.productName} ${item.unitName} ph???i l???n h??n 0`,
                        showConfirmButton: true,
                    });
                    return;
                }
            }
            if (isEditingAddGoods) {
                const actionResult = await dispatch(updateAddGoodsReceipt(submitData));
                unwrapResult(actionResult);
                const actionResult1 = await dispatch(getAddGoodsReceipt({ goodsReceiptId: submitData.id }));
                unwrapResult(actionResult1);
            } else {
                const actionResult = await dispatch(createAddGoodsReceipt(submitData));
                unwrapResult(actionResult);
                resetForm();
                setRowList([]);
            }
            Swal.fire({
                icon: 'success',
                title: isEditingAddGoods ? 'S???a th??nh c??ng' : 'Th??m th??nh c??ng',
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
    // console.log(currentGoodsReceipt);
    return (
        <Wrapper>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
                {(formikProps) => {
                    const { values } = formikProps;
                    return (
                        <Form className="form">
                            <h5>
                                {isEditingAddGoods
                                    ? `Chi ti???t phi???u nh???p kho #${currentGoodsReceipt.receiptCode}`
                                    : 'Th??m phi???u nh???p kho'}{' '}
                            </h5>
                            <hr />
                            {isEditingAddGoods && (
                                <p className="title-table">
                                    T??nh tr???ng:{' '}
                                    {
                                        RENDER_STATUS_GOODS_RECEIPT.find(
                                            (status) => status.value === currentGoodsReceipt.status
                                        )?.label
                                    }
                                </p>
                            )}

                            {currentGoodsReceipt?.order && (
                                <>
                                    <p className="title-table">M?? ????n h??ng: {currentGoodsReceipt?.order?.orderCode}</p>
                                    <p className="title-table">?????i l??: {currentGoodsReceipt?.order?.agency?.name}</p>
                                </>
                            )}
                            <div className="form-center">
                                <div className="form-center-warehouse">
                                    <Field
                                        name="voucherCode"
                                        component={FormRow}
                                        labelText="M?? Ch???ng T???"
                                        placeholder="Nh???p m?? ch???ng t???"
                                    />
                                    <Field
                                        name="employeeId"
                                        component={FormRowSelect}
                                        labelText="Nh??n vi??n ph??? tr??ch"
                                        placeholder="Ch???n nh??n vi??n ph??? tr??ch "
                                        options={listEmployee}
                                    />
                                    <FastField name="date" component={FormRow} type="date" labelText="ng??y t???o" />
                                    {values.date && (
                                        <FastField name="time" component={FormRow} type="time" labelText="Gi??? t???o" />
                                    )}
                                    <Field
                                        name="type"
                                        component={FormRowSelect}
                                        valueState={type}
                                        handleChange={(e) => setType(e.target.value)}
                                        labelText="Lo???i phi???u"
                                        placeholder="Ch???n lo???i phi???u"
                                        options={TYPE_RECEIPT}
                                        isDisabled={isEditingAddGoods ? true : false}
                                    />
                                    {/* {values.type === RETURN_GOODS_FROM_AGENCY && (
                                        <Field
                                            name="agencyId"
                                            component={FormRowSelect}
                                            labelText="?????i l??"
                                            placeholder="Ch???n ?????i L??"
                                            options={listAgency}
                                        />
                                    )} */}
                                    <Field
                                        name="warehouseId"
                                        component={FormRowSelect}
                                        labelText="Kho Nh???p"
                                        placeholder="Ch???n Kho Nh???p"
                                        options={listWarehouse}
                                        isDisabled={
                                            currentGoodsReceipt?.status === 'IMPORTED_GOODS' ||
                                            currentGoodsReceipt?.type === 'RETURN_GOODS_FROM_AGENCY'
                                                ? true
                                                : false
                                        }
                                    />
                                </div>
                                <br />
                                <FastField
                                    name="note"
                                    component={FormRowTextArea}
                                    labelText="Ghi Ch??"
                                    placeholder="Nh???p ghi ch??"
                                />
                            </div>
                            <br />
                            <TableAddGoods
                                values={values}
                                rowList={rowList}
                                setRowList={setRowList}
                                listProduct={listProduct}
                                currentGoodsReceipt={currentGoodsReceipt}
                            />
                            {/* 
(values.type === IMPORT_GOODS_FOR_SALE || values.type === 'DELIVERY_PROBLEM') && ( */}
                            {
                                <div className="total">
                                    <p>
                                        T???ng ti???n:{' '}
                                        <span>
                                            {TOTAL_AMOUNT ? (TOTAL_AMOUNT + TOTAL_DISCOUNT).toLocaleString('en-US') : '0'}{' '}
                                            VN??{' '}
                                        </span>
                                    </p>
                                    {/* values.type === IMPORT_GOODS_FOR_SALE && */}

                                    <>
                                        <p>
                                            T???ng ti???n gi???m:{' '}
                                            <span>{TOTAL_DISCOUNT ? TOTAL_DISCOUNT.toLocaleString('en-US') : '0'} VN?? </span>
                                        </p>

                                        <p>
                                            T???ng ti???n ???? gi???m:{' '}
                                            <span> {TOTAL_AMOUNT ? TOTAL_AMOUNT.toLocaleString('en-US') : '0'} VN??</span>
                                        </p>
                                    </>
                                </div>
                            }

                            <div className="button-one">
                                {isLoading ? (
                                    <Loading center />
                                ) : (
                                    <>
                                        <Button
                                            type="submit"
                                            classname="btn-custom btn-icon"
                                            text={isEditingAddGoods ? 'C???p nh???t' : 'Th??m'}
                                            icon={<BiCheck className="front-icon" />}
                                            disable={isLoading}
                                        />
                                        {currentGoodsReceipt?.status === 'WAITING_IMPORT_GOODS' && (
                                            <Button
                                                type="button"
                                                classname="btn-custom btn-icon"
                                                text="Nh???p kho"
                                                icon={<BiCheck className="front-icon" />}
                                                disable={isLoading}
                                                handleFunction={() => handleImport(values)}
                                            />
                                        )}
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

export default AddGoodsReceipt;
