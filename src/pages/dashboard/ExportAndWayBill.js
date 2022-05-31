import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { checkQuantityStockOrder, createAddGoodsIssueOrder, getOrderByOrderCode } from '../../app/delivery/deliverySlice';
import { approveOrder, getAllOrder } from '../../app/order/orderSlice';
import { getAllEmployee } from '../../app/user/userSlice';
import { getAllWarehouse } from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardDelivery';
import { Button, Loading } from '../../components';
import { DeliveryDetail, DeliveryInfo } from './components';

const ExportAndWayBill = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const isRender = useSelector((state) => state.delivery.isRender);
    const isLoadingCheck = useSelector((state) => state.delivery.isLoadingCheck);
    const isLoading = useSelector((state) => state.delivery.isLoading);
    const isEditing = useSelector((state) => state.delivery.isEditing);
    const currentOrder = useSelector((state) => state.delivery.currentOrder);

    const [dataSubmit, setDataSubmit] = useState({
        orderId: '',
        agencyId: '',
        listWarehouse: '', // [{warehouseId, warehouseAddress, unitId, quantity, price}, {...}] // mỗi item là unique
        employeeId: '',
        type: '',
    });

    useEffect(() => {
        const getOrderByOrderId = async () => {
            try {
                let type = currentOrder?.type === 'RETURN_ORDER' ? null : 'PURPOSE_BUSINESS';
                const result = await Promise.all([
                    dispatch(getOrderByOrderCode(params.orderCode)),
                    dispatch(getAllEmployee()),
                    dispatch(getAllWarehouse({ type: type, status: 'ACTIVE' })),
                ]);
                const dataOrder = unwrapResult(result[0]);

                let newList = [];
                if (dataOrder?.order?.orderDetails?.length !== 0) {
                    if (dataOrder?.order?.type === 'PURCHASE_ORDER') {
                        for (let item of dataOrder?.order?.orderDetails) {
                            //console.log(item);
                            if (!item.isWaitingExport || item.isDeliveryFailed) {
                                // yet create goods issue
                                newList.push({
                                    warehouseId: '',
                                    unitId: '',
                                    warehouseAddress: '',
                                    price: '',
                                    status: '',
                                    quantityStock: '',
                                });
                            }
                        }
                    } else if (dataOrder?.order?.type === 'RETURN_ORDER') {
                        for (let item of dataOrder?.order?.orderDetails) {
                            //console.log(item);
                            if (!item.isWaitingImport) {
                                // yet create goods issue
                                newList.push({
                                    warehouseId: '',
                                    unitId: '',
                                    warehouseAddress: '',
                                    price: '',
                                    status: '',
                                    quantityStock: '',
                                });
                            }
                        }
                    }
                    console.log(newList);
                    setDataSubmit((prev) => ({ ...prev, listWarehouse: newList }));
                }
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        getOrderByOrderId();
    }, [dispatch, params.orderCode, currentOrder?.type]);

    if (isRender) {
        return <Loading center />;
    }

    const handleApprove = async (orderId) => {
        try {
            let data = { ...dataSubmit };
            if (currentOrder.type === 'PURCHASE_ORDER') {
                for (let item of data.listWarehouse) {
                    if (!item.warehouseId && !item.unitId) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Bạn chưa kiểm tra số lượng',
                            showConfirmButton: true,
                        });
                        return;
                    }
                }
            }
            const actionResult = await dispatch(approveOrder({ orderId }));
            unwrapResult(actionResult);
            const action = await dispatch(getOrderByOrderCode(params.orderCode));
            unwrapResult(action);

            Swal.fire({
                icon: 'success',
                title: 'Xác nhận thành công',
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

    const handleSubmit = async (e, idx, data, type) => {
        try {
            if (type === 'SELECT_WAREHOUSE') {
                let newList = [...dataSubmit.listWarehouse];

                if (currentOrder?.type === 'PURCHASE_ORDER') {
                    const action = await dispatch(
                        checkQuantityStockOrder({
                            orderId: currentOrder.id,
                            unitId: data.unitId,
                            quantity: data.quantity,
                            warehouseId: e.value,
                        })
                    );
                    const resultCheckQuantity = unwrapResult(action);
                    if (resultCheckQuantity.status === 'NOT_OK') {
                        newList[idx] = {
                            unitId: '',
                            quantity: '',
                            warehouseId: '',
                            price: '',
                            warehouseName: e.label,
                            status: resultCheckQuantity.status,
                            quantityStock: resultCheckQuantity.quantityStock,
                        };
                        setDataSubmit((prev) => ({ ...prev, listWarehouse: newList }));
                        return;
                    }
                    newList[idx] = {
                        unitId: data.unitId,
                        quantity: data.quantity,
                        warehouseId: e.value,
                        warehouseName: e.label,
                        price: data.price,
                        status: resultCheckQuantity.status,
                        quantityStock: resultCheckQuantity.quantityStock,
                    };
                } else {
                    newList[idx] = {
                        unitId: data.unitId,
                        quantity: data.quantity,
                        warehouseId: e.value,
                        warehouseName: e.label,
                        price: data.price,
                        status: '',
                        quantityStock: '',
                    };
                }
                setDataSubmit((prev) => ({ ...prev, listWarehouse: newList }));
            } else if (type === 'SELECT_EMPLOYEE') {
                setDataSubmit((prev) => ({ ...prev, employeeId: e.value }));
            }
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };

    const handleCreateAddGoodsIssue = async () => {
        try {
            let data = { ...dataSubmit };
            data.orderId = currentOrder.id;
            data.agencyId = currentOrder.agencyId;
            data.type = currentOrder.type;

            // check có chọn kho chưa
            // console.log(data);
            // return;
            let count = 0;
            for (let item of data.listWarehouse) {
                if (item?.warehouseId && item?.unitId) {
                    count++;
                }
            }

            if (count === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Bạn chưa chọn kho hoặc bạn đã tạo phiếu',
                    showConfirmButton: true,
                });
                return;
            } else {
                let arr = [];
                for (let item of data.listWarehouse) {
                    if (item.warehouseId && item.unitId) {
                        arr.push(item);
                    }
                }
                data.listWarehouse = arr;
            }

            if (isEditing) {
            } else {
                const actionResult = await dispatch(createAddGoodsIssueOrder(data));
                unwrapResult(actionResult);
                const actionOrderCode = await dispatch(getOrderByOrderCode(params.orderCode));
                unwrapResult(actionOrderCode);
            }
            Swal.fire({
                icon: 'success',
                title: isEditing ? 'Sửa thành công' : 'Cài đặt thành công',
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
    // console.log(currentOrder);

    // console.log(dataSubmit);
    return (
        <Wrapper>
            {currentOrder && (
                <>
                    <div className="container-delivery">
                        <>
                            {isLoadingCheck ? (
                                <Loading center />
                            ) : (
                                <DeliveryDetail handleSubmit={handleSubmit} dataSubmit={dataSubmit} />
                            )}
                            <DeliveryInfo handleSubmit={handleSubmit} employeeId={dataSubmit.employeeId} />
                        </>
                    </div>
                    <div className="container-button">
                        {isLoading ? (
                            <Loading center />
                        ) : (
                            <>
                                {' '}
                                {(!currentOrder?.cancelledTimeByAgency || !currentOrder?.cancelledTimeBySupplier) && (
                                    <Button
                                        type="submit"
                                        classname="btn-custom btn-icon"
                                        text="Tạo phiếu"
                                        icon={<BiCheck className="front-icon" />}
                                        handleFunction={handleCreateAddGoodsIssue}
                                    />
                                )}
                                {currentOrder.orderStatus === 'WAITING_FOR_APPROVED' && (
                                    <Button
                                        type="button"
                                        classname="btn-custom btn-icon"
                                        text="Xác nhận"
                                        icon={<BiCheck className="front-icon" />}
                                        handleFunction={() => {
                                            if (currentOrder.type !== 'RETURN_ORDER')
                                                Swal.fire({
                                                    title: `Có chắc là xác nhận, vui lòng kiểm tra số lượng có phù hợp tại kho không`,
                                                    showCancelButton: true,
                                                    confirmButtonText: 'Có',
                                                    cancelButtonText: 'Thoát',
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        handleApprove(currentOrder.id);
                                                    }
                                                });
                                            else {
                                                handleApprove(currentOrder.id);
                                            }
                                        }}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </>
            )}
        </Wrapper>
    );
};

export default ExportAndWayBill;
