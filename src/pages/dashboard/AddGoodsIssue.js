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
    createAddGoodsIssue,
    exportGoods,
    getAddGoodsIssue,
    getAllWarehouse,
    updateAddGoodsIssue,
} from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardAddGoodsReceipt';
import { Button, FormRow, FormRowSelect, FormRowTextArea, Loading } from '../../components';
import { BUSINESS } from '../../constants/constants';
import { ACTIVE, RENDER_STATUS_GOODS_ISSUE, TYPE_GOODS_ISSUE } from '../../constants/warehouse';
import { TableExportGoods } from './components';

const AddGoodsIssue = () => {
    const listEmployee = useSelector((state) =>
        state.user.listEmployee.map((item) => ({
            value: item.id,
            label: item.fullName,
        }))
    );
    const listAgency = useSelector((state) =>
        state.agency.listAgencies.map((item) => ({
            value: item.id,
            label: item.name,
        }))
    );
    const listWarehouse = useSelector((state) =>
        state.warehouse.listWarehouse.map((item) => ({
            value: item.id,
            label: item.name,
        }))
    );
    const isEditingExportGoods = useSelector((state) => state.warehouse.isEditingExportGoods);
    const currentGoodsIssue = useSelector((state) => state.warehouse.currentGoodsIssue);
    const isLoading = useSelector((state) => state.warehouse.isLoading);

    const [rowList, setRowList] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [type, setType] = useState('');

    const dispatch = useDispatch();

    // if (type !== 'EXPORT_WITH_ORDER') {
    for (let item of TYPE_GOODS_ISSUE) {
        if (item.value === 'EXPORT_WITH_ORDER') {
            item.isDisabled = true;
        } else if (item.value === 'WAREHOUSE_ADJUSTMENT') {
            item.isDisabled = true;
        }
    }
    //}

    useEffect(() => {
        const fetchAgency = async () => {
            try {
                const result = await Promise.all([
                    dispatch(getAgenciesInMap()),
                    dispatch(getAllEmployee()),
                    dispatch(getAllProduct({ type: BUSINESS })),
                    dispatch(getAllWarehouse({ status: ACTIVE })),
                ]);
                unwrapResult(result[0]);
                unwrapResult(result[1]);
                const resultProduct = unwrapResult(result[2]);
                unwrapResult(result[3]);

                // setListProduct(data.listProduct);
                let listProduct = resultProduct?.listProduct?.map((product) => ({
                    value: product.id,
                    label: product.name,
                }));

                setListProduct(listProduct);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchAgency();
    }, [dispatch]);

    useEffect(() => {
        if (currentGoodsIssue && isEditingExportGoods) {
            let newList = currentGoodsIssue?.detailGoodsIssues?.map((item) => {
                let unitList = [];
                if (item?.unit?.product?.units?.length !== 0) {
                    unitList = item?.unit?.product?.units?.map((item) => ({ value: item.id, label: item.name }));
                }
                return {
                    ...item,
                    productId: item.unit.product.id,
                    listUnit: unitList,
                    barcode: item?.unit?.barcode,
                    quantityCheck: item.quantity,
                };
            });
            setRowList(newList);
        }
    }, [currentGoodsIssue, isEditingExportGoods]);

    const initialValues = isEditingExportGoods
        ? {
              ...currentGoodsIssue,
              date:
                  new Date(`${currentGoodsIssue.createTime}`).getFullYear() +
                  '-' +
                  (new Date(`${currentGoodsIssue.createTime}`).getMonth() + 1).toString().padStart(2, 0) +
                  '-' +
                  new Date(`${currentGoodsIssue.createTime}`).getDate().toString().padStart(2, 0),
              time:
                  new Date(`${currentGoodsIssue.createTime}`).getHours().toString().padStart(2, 0) +
                  ':' +
                  new Date(`${currentGoodsIssue.createTime}`).getMinutes().toString().padStart(2, 0),
              note: currentGoodsIssue.note ? currentGoodsIssue.note : '',
              voucherCode: currentGoodsIssue.voucherCode ? currentGoodsIssue.voucherCode : '',
              warehouseIdCheck: currentGoodsIssue.warehouseId,
          }
        : {
              voucherCode: '',
              employeeId: '',
              date: '',
              time: '',
              // type: '',
              // agencyId: '',
              warehouseId: '',
              note: '',
          };

    const TOTAL_PRICE = rowList.reduce((previousValue, currentValue) => previousValue + +currentValue.totalPrice, 0);

    const handleSubmit = async (data, { resetForm }) => {
        try {
            const submitData = {
                ...data,
                totalPrice: TOTAL_PRICE,
                listProduct: rowList,
            };

            if (submitData.listProduct.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: `Vui lòng thêm sản phẩm`,
                    showConfirmButton: true,
                });
                return;
            }

            for (let item of submitData.listProduct) {
                if (+item.quantity === 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: `Số lượng ${item.productName} ${item.unitName} phải lớn hơn 0`,
                        showConfirmButton: true,
                    });
                    return;
                }
            }
            if (!data.warehouseId) {
                Swal.fire({
                    icon: 'warning',
                    title: `Vui lòng chọn kho hàng`,
                    showConfirmButton: true,
                });
                return;
            }
            // if (type === 'EXPORT_FOR_AGENCY') {
            //     // validate chung
            //     if (!data.agencyId) {
            //         Swal.fire({
            //             icon: 'warning',
            //             title: `Vui lòng chọn đại lý`,
            //             showConfirmButton: true,
            //         });
            //         return;
            //     }
            // }

            if (isEditingExportGoods) {
                const action = await dispatch(updateAddGoodsIssue(submitData));
                unwrapResult(action);
                const action1 = await dispatch(getAddGoodsIssue({ goodsIssueId: currentGoodsIssue.id }));
                unwrapResult(action1);
            } else {
                const action = await dispatch(createAddGoodsIssue(submitData));
                unwrapResult(action);
                resetForm();
            }
            Swal.fire({
                icon: 'success',
                title: 'Thành Công',
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
    const handleExport = async (data) => {
        try {
            const submitData = {
                ...data,
                totalPrice: TOTAL_PRICE,
                listProduct: rowList,
            };

            if (submitData.listProduct.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: `Vui lòng thêm sản phẩm`,
                    showConfirmButton: true,
                });
                return;
            }

            for (let item of submitData.listProduct) {
                if (+item.quantity === 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: `Số lượng ${item.productName} ${item.unitName} phải lớn hơn 0`,
                        showConfirmButton: true,
                    });
                    return;
                }
            }

            // if (submitData.type === 'ANOTHER_PURPOSE') {
            if (submitData.warehouseIdCheck !== submitData.warehouseId) {
                Swal.fire({
                    icon: 'warning',
                    title: `Phải cập nhật phiếu trước khi nhập kho`,
                    showConfirmButton: true,
                });
                return;
            }
            // }

            for (let item of submitData.listProduct) {
                if (item.id === undefined || item.quantity !== item.quantityCheck) {
                    Swal.fire({
                        icon: 'warning',
                        title: `Phải cập nhật phiếu trước khi nhập kho`,
                        showConfirmButton: true,
                    });
                    return;
                }
            }

            const actionExport = await dispatch(exportGoods(submitData));
            unwrapResult(actionExport);
            const action1 = await dispatch(getAddGoodsIssue({ goodsIssueId: submitData.id }));
            unwrapResult(action1);
            Swal.fire({
                icon: 'success',
                title: 'Xuất Thành Công',
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
    // console.log(currentGoodsIssue);
    return (
        <Wrapper>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
                {(formikProps) => {
                    const { values } = formikProps;
                    return (
                        <Form className="form">
                            <h5>
                                {isEditingExportGoods
                                    ? `chi tiết phiếu xuất kho  #${currentGoodsIssue.receiptCode}`
                                    : 'Thêm phiếu xuất kho'}{' '}
                            </h5>
                            <hr />
                            {isEditingExportGoods && (
                                <p className="title-table">
                                    Tình trạng:{' '}
                                    {
                                        RENDER_STATUS_GOODS_ISSUE.find((status) => status.value === currentGoodsIssue.status)
                                            ?.label
                                    }
                                </p>
                            )}

                            {currentGoodsIssue?.order && (
                                <>
                                    <p className="title-table">Mã đơn hàng: {currentGoodsIssue?.order?.orderCode}</p>
                                    <p className="title-table">Đại lý: {currentGoodsIssue?.order?.agency?.name}</p>
                                </>
                            )}
                            <div className="form-center">
                                <div className="form-center-warehouse">
                                    <Field
                                        name="voucherCode"
                                        component={FormRow}
                                        labelText="Mã Chứng Từ"
                                        placeholder="Nhập mã chứng từ"
                                    />
                                    <Field
                                        name="employeeId"
                                        component={FormRowSelect}
                                        labelText="Nhân viên phụ trách"
                                        placeholder="Chọn nhân viên"
                                        options={listEmployee}
                                    />
                                    <FastField name="date" component={FormRow} type="date" labelText="ngày tạo" />
                                    {values.date && (
                                        <FastField name="time" component={FormRow} type="time" labelText="Giờ tạo" />
                                    )}
                                    <Field
                                        name="type"
                                        component={FormRowSelect}
                                        valueState={type}
                                        handleChange={(e) => setType(e.target.value)}
                                        labelText="Loại phiếu"
                                        placeholder="Chọn loại phiếu"
                                        options={TYPE_GOODS_ISSUE}
                                        isDisabled={isEditingExportGoods ? true : false}
                                    />

                                    <Field
                                        name="warehouseId"
                                        component={FormRowSelect}
                                        labelText="Kho xuất"
                                        placeholder="Chọn Kho xuất"
                                        options={listWarehouse}
                                        isDisabled={
                                            currentGoodsIssue?.status === 'GOT_GOODS' ||
                                            currentGoodsIssue?.type === 'EXPORT_WITH_ORDER'
                                                ? true
                                                : false
                                        }
                                    />
                                </div>
                                <br />
                                <FastField
                                    name="note"
                                    component={FormRowTextArea}
                                    labelText="Ghi Chú"
                                    placeholder="Nhập ghi chú"
                                />
                            </div>
                            <br />
                            <TableExportGoods
                                values={{ warehouseId: values.warehouseId }}
                                rowList={rowList}
                                setRowList={setRowList}
                                listProduct={listProduct}
                                currentGoodsIssue={currentGoodsIssue}
                            />
                            <div className="total">
                                <p>
                                    Tổng tiền: <span>{TOTAL_PRICE ? (+TOTAL_PRICE).toLocaleString('en-US') : '0'} VNĐ </span>
                                </p>
                            </div>
                            <div className="button-one">
                                {isLoading ? (
                                    <Loading center />
                                ) : (
                                    <>
                                        <Button
                                            type="submit"
                                            classname="btn-custom btn-icon"
                                            text={isEditingExportGoods ? `Cập Nhật` : 'Thêm'}
                                            icon={<BiCheck className="front-icon" />}
                                            //disable={isLoading}
                                        />
                                        {currentGoodsIssue?.status === 'WAITING_GET_GOODS' && (
                                            <Button
                                                type="button"
                                                classname="btn-custom btn-icon"
                                                text="xuất kho"
                                                icon={<BiCheck className="front-icon" />}
                                                disable={isLoading}
                                                handleFunction={() => handleExport(values)}
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

export default AddGoodsIssue;
