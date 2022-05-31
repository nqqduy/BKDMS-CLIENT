import { unwrapResult } from '@reduxjs/toolkit';
import { FastField, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllProduct } from '../../app/product/productSlice';
import { getAllEmployee } from '../../app/user/userSlice';
import { createAddGoodsCheck, getAllWarehouse, updateGoodsCheck } from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardAddGoodsReceipt';
import { Button, FormRow, FormRowSelect, FormRowTextArea, Loading, SelectNotFormik } from '../../components';
import { ACTIVE, RENDER_STATUS_GOODS_CHECK } from '../../constants/warehouse';
import { TableCheckGoods } from './components';
const AddWarehouseCheck = () => {
    const isEditingCheckGoods = useSelector((state) => state.warehouse.isEditingCheckGoods);
    const currentGoodsCheck = useSelector((state) => state.warehouse.currentGoodsCheck);

    const isLoading = useSelector((state) => state.warehouse.isLoading);
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
    const [warehouseId, setWarehouseId] = useState(isEditingCheckGoods ? currentGoodsCheck.warehouseId : '');
    const [rowList, setRowList] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchWarehouse = async () => {
            try {
                //const action = await dispatch(getAllWarehouse());
                //const data = unwrapResult(action);
                const result = await Promise.all([
                    // dispatch(getAllWarehouse()),
                    dispatch(getAllEmployee()),
                    dispatch(getAllProduct({ type: 'BUSINESS' })),
                    dispatch(getAllWarehouse({ status: ACTIVE })),
                ]);
                unwrapResult(result[0]);
                unwrapResult(result[1]);
                unwrapResult(result[2]);

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
                console.log(error);
            }
        };

        fetchWarehouse();
    }, [dispatch]);
    useEffect(() => {
        if (currentGoodsCheck && isEditingCheckGoods) {
            let newList = currentGoodsCheck?.detailGoodsChecks?.map((item) => {
                let unitList = [];
                if (item?.unit?.product?.units?.length !== 0) {
                    unitList = item?.unit?.product?.units?.map((item) => ({ value: item.id, label: item.name }));
                }
                return {
                    ...item,
                    productId: item.unit.product.id,
                    unitList: unitList,
                    barcode: item?.unit?.barcode,
                    deviationQuantity: Math.abs(+item.quantityReality - +item.quantityStock),
                };
            });
            setRowList(newList);
        }
    }, [currentGoodsCheck, isEditingCheckGoods]);
    // useEffect(() => {
    //     const fetchAllEmployee = async () => {
    //         try {
    //             const action = await dispatch(getAllEmployee(''));
    //             const data = unwrapResult(action);
    //             if (data.listEmployee) {
    //                 let listEmployee = data.listEmployee.map((emp) => ({
    //                     value: emp.id,
    //                     label: emp.fullName,
    //                 }));
    //                 setListEmployee(listEmployee);
    //             }
    //         } catch (error) {
    //             Swal.fire({
    //                 icon: 'warning',
    //                 title: error.message,
    //                 showConfirmButton: true,
    //             });
    //         }
    //     };
    //     fetchAllEmployee();
    // }, [dispatch]);

    // useEffect(() => {
    //     const fetchAllProduct = async () => {
    //         try {
    //             const action = await dispatch(getAllProduct());
    //             const data = unwrapResult(action);
    //             if (data.listProduct) {
    //                 let listProduct = data.listProduct.map((product) => ({
    //                     value: product.id,
    //                     label: product.name,
    //                 }));
    //                 setListProduct(listProduct);
    //             }
    //         } catch (error) {
    //             Swal.fire({
    //                 icon: 'warning',
    //                 title: error.message,
    //                 showConfirmButton: true,
    //             });
    //         }
    //     };
    //     fetchAllProduct();
    // }, [dispatch]);

    const handleSubmit = async (data, { resetForm }) => {
        try {
            let submitProduct = rowList.map((row) => ({
                unitId: row.unitId,
                quantityStock: row.quantityStock,
                quantityReality: row.quantityReality,
                price: row.price,
                deviationPrice: row.deviationPrice,
                isImport: row.isImport,
            }));
            const dataSubmit = {
                ...data,
                listProduct: submitProduct,
                totalDeviationPrice: TOTAL_DEVIATION_PRICE,
                totalDeviationPriceIncrease: TOTAL_DEVIATION_PRICE_INCREASE,
                totalDeviationPriceDecrease: TOTAL_DEVIATION_DECREASE,
                warehouseId,
            };

            if (rowList.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: `Vui lòng thêm sản phẩm`,
                    showConfirmButton: true,
                });
                return;
            }

            // for (let item of rowList) {
            //     if (!item.quantityReality || +item.quantityReality <= 0) {
            //         Swal.fire({
            //             icon: 'warning',
            //             title: `Số lượng ${item.productName} ${item.unitName} Phải lớn hơn 0`,
            //             showConfirmButton: true,
            //         });
            //         return;
            //     }
            // }

            if (isEditingCheckGoods) {
                const action = await dispatch(updateGoodsCheck(dataSubmit));
                unwrapResult(action);
            } else {
                const action = await dispatch(createAddGoodsCheck(dataSubmit));
                unwrapResult(action);
                resetForm();
            }
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
    const initialValues = isEditingCheckGoods
        ? {
              ...currentGoodsCheck,
              date:
                  new Date(`${currentGoodsCheck.createTime}`).getFullYear() +
                  '-' +
                  (new Date(`${currentGoodsCheck.createTime}`).getMonth() + 1).toString().padStart(2, 0) +
                  '-' +
                  new Date(`${currentGoodsCheck.createTime}`).getDate().toString().padStart(2, 0),
              time:
                  new Date(`${currentGoodsCheck.createTime}`).getHours().toString().padStart(2, 0) +
                  ':' +
                  new Date(`${currentGoodsCheck.createTime}`).getMinutes().toString().padStart(2, 0),
              note: currentGoodsCheck.note ? currentGoodsCheck.note : '',
              voucherCode: currentGoodsCheck.voucherCode ? currentGoodsCheck.voucherCode : '',
          }
        : {
              voucherCode: '',
              employeeId: '',
              date: '',
              time: '',
              note: '',
          };

    let TOTAL_DEVIATION_PRICE_INCREASE = 0,
        TOTAL_DEVIATION_DECREASE = 0;
    for (let row of rowList) {
        if (+row.deviationPrice > 0) TOTAL_DEVIATION_PRICE_INCREASE += +row.deviationPrice;
        else TOTAL_DEVIATION_DECREASE += +row.deviationPrice;
    }

    const TOTAL_DEVIATION_PRICE = rowList.reduce(
        (previousValue, currentValue) => previousValue + +currentValue.deviationPrice,
        0
    );
    return (
        <Wrapper>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                //enableReinitialize={true}
            >
                {(formikProps) => {
                    const { values } = formikProps;
                    return (
                        <Form className="form">
                            <h5>
                                {isEditingCheckGoods
                                    ? `chi tiết phiếu kiểm kho #${currentGoodsCheck.receiptCode}`
                                    : 'Thêm phiếu kiểm kho'}{' '}
                            </h5>
                            <hr />
                            {isEditingCheckGoods && (
                                <p className="title-table">
                                    Tình trạng:{' '}
                                    {
                                        RENDER_STATUS_GOODS_CHECK.find((status) => status.value === currentGoodsCheck.status)
                                            ?.label
                                    }
                                </p>
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
                                        placeholder="Chọn nhân viên phụ trách "
                                        options={listEmployee}
                                    />
                                    <FastField name="date" component={FormRow} type="date" labelText="ngày kiểm" />
                                    {values.date && (
                                        <FastField name="time" component={FormRow} type="time" labelText="Giờ kiểm" />
                                    )}

                                    {/* <Field
                                        name="warehouseId"
                                        component={FormRowSelect}
                                        labelText="Kho kiểm"
                                        placeholder="Chọn Kho Nhập"
                                        options={listWarehouse}
                                    /> */}
                                    <SelectNotFormik
                                        name="warehouseId"
                                        labelText="Kho kiểm"
                                        placeholder="Chọn Kho kiểm"
                                        valueState={warehouseId}
                                        options={listWarehouse}
                                        handleChange={(e) => {
                                            setWarehouseId(e.value);
                                            setRowList([]);
                                        }}
                                        isDisabled={isEditingCheckGoods ? true : false}
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
                            <TableCheckGoods
                                warehouseId={warehouseId}
                                values={values}
                                rowList={rowList}
                                setRowList={setRowList}
                                listProduct={listProduct}
                            />
                            <div className="total">
                                <p>
                                    Tổng Giá Trị Lệch Tăng:&nbsp;
                                    <span>
                                        {TOTAL_DEVIATION_PRICE_INCREASE
                                            ? TOTAL_DEVIATION_PRICE_INCREASE.toLocaleString('en-US')
                                            : '0'}{' '}
                                        VNĐ{' '}
                                    </span>
                                </p>
                                <p>
                                    Tổng Giá Trị Lệch Giảm:&nbsp;
                                    <span>
                                        {TOTAL_DEVIATION_DECREASE ? TOTAL_DEVIATION_DECREASE.toLocaleString('en-US') : '0'}{' '}
                                        VNĐ{' '}
                                    </span>
                                </p>
                                <p>
                                    Tổng Giá Trị Lệch:&nbsp;
                                    <span>
                                        {TOTAL_DEVIATION_PRICE ? TOTAL_DEVIATION_PRICE.toLocaleString('en-US') : '0'} VNĐ{' '}
                                    </span>
                                </p>
                            </div>
                            <div className="button-one">
                                {isLoading ? (
                                    <Loading center />
                                ) : (
                                    <Button
                                        type="submit"
                                        classname="btn-custom btn-icon"
                                        text={isEditingCheckGoods ? 'Cập Nhật' : `Kiểm kho`}
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

export default AddWarehouseCheck;
