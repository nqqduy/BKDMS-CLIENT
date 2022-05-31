import { unwrapResult } from '@reduxjs/toolkit';
import { FastField, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllProduct } from '../../app/product/productSlice';
import { getAllEmployee } from '../../app/user/userSlice';
import { createAddGoodsTransfer, getAllWarehouse, updateGoodsTransfer } from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardAddGoodsReceipt';
import { Button, FormRow, FormRowSelect, FormRowTextArea, Loading, SelectNotFormik } from '../../components';
import { ACTIVE } from '../../constants/warehouse';
import { TableTransferGoods } from './components';

const AddGoodsTransfer = () => {
    const isEditingTransferGoods = useSelector((state) => state.warehouse.isEditingTransferGoods);
    const currentGoodsTransfer = useSelector((state) => state.warehouse.currentGoodsTransfer);

    const listEmployee = useSelector((state) =>
        state.user.listEmployee.map((item) => ({
            value: item.id,
            label: item.fullName,
        }))
    );
    const listProduct = useSelector((state) =>
        state.product.listProduct.map((item) => ({
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

    const isLoading = useSelector((state) => state.warehouse.isLoading);
    //const [listWarehouse, setListWarehouse] = useState([]);
    const [warehouseTransferId, setWarehouseTransferId] = useState(
        isEditingTransferGoods ? currentGoodsTransfer.warehouseTransferId : ''
    );
    const [warehouseReceiveId, setWarehouseReceiveId] = useState(
        isEditingTransferGoods ? currentGoodsTransfer.warehouseReceiveId : ''
    );
    // const [listEmployee, setListEmployee] = useState([]);
    // const [listProduct, setListProduct] = useState([]);
    const [rowList, setRowList] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchWarehouse = async () => {
            try {
                ///=  const action = await dispatch(getAllWarehouse());
                // const data = unwrapResult(action);
                const result = await Promise.all([
                    //dispatch(getAllWarehouse()),
                    dispatch(getAllEmployee()),
                    dispatch(getAllProduct({ type: 'BUSINESS' })),
                    dispatch(getAllWarehouse({ status: ACTIVE })),
                ]);
                unwrapResult(result[0]);
                unwrapResult(result[1]);
                unwrapResult(result[2]);
                //unwrapResult(result[3]);
                // if (data.listWarehouse) {
                //     let listWarehouseActive = data.listWarehouse
                //         .filter((warehouse) => warehouse.status === ACTIVE)
                //         .map((warehouse) => ({
                //             value: warehouse.id,
                //             label: warehouse.name,
                //         }));
                //     setListWarehouse(listWarehouseActive);
                // }
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
        if (currentGoodsTransfer && isEditingTransferGoods) {
            let newList = currentGoodsTransfer?.detailGoodsTransfers?.map((item) => {
                let unitList = [];
                if (item?.unit?.product?.units?.length !== 0) {
                    unitList = item?.unit?.product?.units?.map((item) => ({ value: item.id, label: item.name }));
                }
                return {
                    ...item,
                    productId: item.unit.product.id,
                    unitList: unitList,
                    barcode: item?.unit?.barcode,
                    //deviationQuantity: Math.abs(+item.quantityReality - +item.quantityStock),
                };
            });
            setRowList(newList);
        }
    }, [currentGoodsTransfer, isEditingTransferGoods]);

    const initialValues = isEditingTransferGoods
        ? {
              ...currentGoodsTransfer,
              date:
                  new Date(`${currentGoodsTransfer.createTime}`).getFullYear() +
                  '-' +
                  (new Date(`${currentGoodsTransfer.createTime}`).getMonth() + 1).toString().padStart(2, 0) +
                  '-' +
                  new Date(`${currentGoodsTransfer.createTime}`).getDate().toString().padStart(2, 0),
              time:
                  new Date(`${currentGoodsTransfer.createTime}`).getHours().toString().padStart(2, 0) +
                  ':' +
                  new Date(`${currentGoodsTransfer.createTime}`).getMinutes().toString().padStart(2, 0),
              note: currentGoodsTransfer.note ? currentGoodsTransfer.note : '',
              voucherCode: currentGoodsTransfer.voucherCode ? currentGoodsTransfer.voucherCode : '',
          }
        : {
              voucherCode: '',
              employeeId: '',
              date: '',
              time: '',
              note: '',
              // warehouseId là state
          };
    const handleSubmit = async (data, { resetForm }) => {
        try {
            let submitProduct = rowList.map((row) => ({
                unitId: row.unitId,
                quantityStock: row.quantityStock,
                quantityTransfer: row.quantityTransfer,
            }));
            const dataSubmit = {
                ...data,
                listProduct: submitProduct,
                warehouseTransferId,
                warehouseReceiveId,
            };

            if (rowList.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: `Vui lòng thêm sản phẩm`,
                    showConfirmButton: true,
                });
                return;
            }

            for (let item of rowList) {
                if (+item.quantityTransfer === 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: `Số lượng chuyển của ${item.productName} ${item.unitName} phải lớn hơn 0`,
                        showConfirmButton: true,
                    });
                    return;
                }
            }
            if (isEditingTransferGoods) {
                const action = await dispatch(updateGoodsTransfer(dataSubmit));
                const result = unwrapResult(action);
            } else {
                const action = await dispatch(createAddGoodsTransfer(dataSubmit));
                const result = unwrapResult(action);
                resetForm();
            }
            Swal.fire({
                icon: 'success',
                title: 'Thành Công',
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
    return (
        <Wrapper>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
                {(formikProps) => {
                    const { values } = formikProps;
                    return (
                        <Form className="form">
                            <h5>
                                {' '}
                                {isEditingTransferGoods
                                    ? `Chi tiết phiếu chuyển kho #${currentGoodsTransfer.receiptCode}`
                                    : 'Thêm phiếu chuyển kho'}{' '}
                            </h5>
                            <hr />
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
                                        placeholder="Chọn nhân viên phụ trách "
                                        options={listEmployee ? listEmployee : []}
                                    />
                                    <FastField name="date" component={FormRow} type="date" labelText="ngày kiểm" />
                                    {values.date && (
                                        <FastField name="time" component={FormRow} type="time" labelText="Giờ kiểm" />
                                    )}

                                    <SelectNotFormik
                                        labelText="Kho chuyển"
                                        placeholder="Chọn Kho chuyển"
                                        valueState={warehouseTransferId}
                                        options={listWarehouse ? listWarehouse : []}
                                        handleChange={(e) => {
                                            setRowList([]);
                                            setWarehouseTransferId(e.value);
                                            setWarehouseReceiveId('');
                                        }}
                                        isDisabled={isEditingTransferGoods ? true : false}
                                    />
                                    <SelectNotFormik
                                        labelText="Kho nhận"
                                        placeholder="Chọn Kho nhận"
                                        valueState={warehouseReceiveId}
                                        options={listWarehouse ? listWarehouse : []}
                                        handleChange={(e) => {
                                            if (e.value === warehouseTransferId) {
                                                Swal.fire({
                                                    icon: 'warning',
                                                    title: 'Phải chọn khác kho chuyển',
                                                    showConfirmButton: true,
                                                });
                                            } else setWarehouseReceiveId(e.value);
                                        }}
                                        isDisabled={isEditingTransferGoods ? true : false}
                                    />
                                </div>
                                <br />
                                <FastField
                                    name="note"
                                    component={FormRowTextArea}
                                    labelText="Ghi Chú"
                                    placeholder="Nhập ghi chú"
                                />
                                <br />
                            </div>
                            <TableTransferGoods
                                warehouseTransferId={warehouseTransferId}
                                warehouseReceiveId={warehouseReceiveId}
                                // values={values}
                                rowList={rowList}
                                setRowList={setRowList}
                                listProduct={listProduct}
                            />

                            <div className="button-one">
                                {isLoading ? (
                                    <Loading center />
                                ) : (
                                    <Button
                                        type="submit"
                                        classname="btn-custom btn-icon"
                                        text={isEditingTransferGoods ? 'Cập nhật' : 'Chuyển kho'}
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

export default AddGoodsTransfer;
