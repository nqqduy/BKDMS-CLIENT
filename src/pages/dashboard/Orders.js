import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { BiDownload, BiPlusCircle } from 'react-icons/bi';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getAgenciesInMap } from '../../app/agency/agencySlice';
import {
    approveOrder,
    cancelOrder,
    deleteOrder,
    getAllOrder,
    paymentOrder,
    setCurrentOrderToEmpty,
} from '../../app/order/orderSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, Loading } from '../../components';
import { COD_PAYMENT_STATUS, ORDER_STATUS, ORDER_TYPE, WAITING_FOR_APPROVED } from '../../constants/order';
import { SearchOrder } from './components';

const Orders = () => {
    const isLoading = useSelector((state) => state.order.isLoading);
    const listOrder = useSelector((state) => state.order.listOrder);

    // const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = useState({ orderCode: '', date: '', agencyId: '', orderStatus: '', deliveryStatus: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

    const prevPage = async () => {
        const pg = page === 1 ? 1 : page - 1;
        setPage(pg);
    };

    const nextPage = async () => {
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
        setPage(pg);
    };

    const allPage = () => {
        setPage(null);
        setPageSize(null);
    };

    useEffect(() => {
        const fetchAllOrder = async () => {
            try {
                const actionResult = await dispatch(getAllOrder({ ...state }));
                const data = unwrapResult(actionResult);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchAllOrder();
    }, [state]);

    useEffect(() => {
        const fetchListAgency = async () => {
            try {
                const action = await dispatch(getAgenciesInMap());
                unwrapResult(action);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };
        fetchListAgency();
    }, []);

    const handleAdd = () => {
        dispatch(setCurrentOrderToEmpty());
        navigate('/order/add-order');
    };

    const handleDelivery = (currentOrder) => {
        navigate(`/order/delivery/${currentOrder.orderCode}`);
    };

    const handleApprove = async (orderId) => {
        try {
            const actionResult = await dispatch(approveOrder({ orderId }));
            unwrapResult(actionResult);
            await dispatch(getAllOrder());

            Swal.fire({
                icon: 'success',
                title: 'X??c nh???n th??nh c??ng',
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

    const handleCancel = async (orderId) => {
        try {
            const actionResult = await dispatch(cancelOrder({ orderId }));
            unwrapResult(actionResult);
            await dispatch(getAllOrder());

            Swal.fire({
                icon: 'success',
                title: 'H???y th??nh c??ng',
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

    const handlePayment = async (data) => {
        try {
            const actionResult = await dispatch(paymentOrder(data));
            unwrapResult(actionResult);
            await dispatch(getAllOrder());
            Swal.fire({
                icon: 'success',
                title: 'Th??nh c??ng',
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

    const handleDeleteOrder = async (orderId) => {
        try {
            const actionResult = await dispatch(deleteOrder({ orderId }));
            unwrapResult(actionResult);
            await dispatch(getAllOrder());
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };

    //console.log(listOrder);
    return (
        <Wrapper>
            <h5>Qu???n l?? ????n h??ng</h5>
            <hr />
            <SearchOrder state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Th??m ????n h??ng"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={handleAdd}
                />
                {/* <Button classname="btn-custom btn-icon" text="T???i EXCEL" icon={<BiDownload className="front-icon" />} /> */}
            </div>
            {isLoading ? (
                <Loading center />
            ) : (
                <>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th width="5%">STT</th>
                                    <th width="10%">M?? ????n</th>
                                    <th width="15%">?????i l??</th>
                                    <th width="15%">Thanh To??n</th>
                                    <th width="15%">????n H??ng</th>
                                    <th width="10%">Lo???i ????n</th>
                                    <th width="20%">Thao t??c</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listOrder?.map((order, idx) => {
                                    let updateGoodsIssue = false;
                                    for (let item of order?.orderDetails) {
                                        if (item.isGoodsIssue) {
                                            updateGoodsIssue = true;
                                            break;
                                        }
                                    }
                                    return (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{order?.orderCode}</td>
                                            <td>{order?.agency?.name}</td>
                                            <td>
                                                {order?.paymentStatus &&
                                                    COD_PAYMENT_STATUS.find((status) => status.value === order.paymentStatus)
                                                        ?.label}
                                            </td>
                                            <td>
                                                {order?.orderStatus &&
                                                    ORDER_STATUS.find((status) => status.value === order.orderStatus)?.label}
                                            </td>

                                            <td>{ORDER_TYPE.find((type) => type.value === order.type)?.label}</td>
                                            <td>
                                                <div className="btn-container-table btn-action-container">
                                                    {order.deliveredTime &&
                                                        order.paymentType === 'COD_PAYMENT' &&
                                                        order.paymentStatus !== 'ALREADY_PAYMENT' &&
                                                        order.paymentStatus !== 'MOVE_DEBT' && (
                                                            <Button
                                                                type="button"
                                                                classname="btn-custom btn-icon btn-action detail "
                                                                text="Thanh To??n"
                                                                handleFunction={() => {
                                                                    Swal.fire({
                                                                        title: `C?? ch???c l?? thanh to??n ${(+order.totalPayment).toLocaleString(
                                                                            'en-US'
                                                                        )} VN??`,
                                                                        showCancelButton: true,
                                                                        confirmButtonText: 'C??',
                                                                        cancelButtonText: 'Tho??t',
                                                                        denyButtonText: `Chuy???n v??o n???`,
                                                                        showDenyButton: true,
                                                                    }).then((result) => {
                                                                        if (result.isConfirmed) {
                                                                            handlePayment({
                                                                                orderId: order.id,
                                                                                type: 'PAYMENT_DEBT',
                                                                                agencyId: order.agencyId,
                                                                            });
                                                                        } else if (result.isDenied) {
                                                                            handlePayment({
                                                                                orderId: order.id,
                                                                                type: 'MOVE_DEBT',
                                                                                agencyId: order.agencyId,
                                                                            });
                                                                        }
                                                                    });
                                                                }}
                                                                disable={isLoading}
                                                            />
                                                        )}
                                                    <Button
                                                        type="button"
                                                        classname="btn-custom btn-icon btn-action detail"
                                                        text="chi ti???t"
                                                        handleFunction={() => handleDelivery(order)}
                                                    />
                                                    {((order.type === 'PURCHASE_ORDER' &&
                                                        !order.cancelledTimeByAgency &&
                                                        !order.cancelledTimeBySupplier &&
                                                        !order.deliveredTime) ||
                                                        (order.type === 'RETURN_ORDER' && !order.importTime)) && (
                                                        <Button
                                                            type="button"
                                                            classname="btn-custom btn-icon btn-action delete"
                                                            text="h???y"
                                                            handleFunction={() => {
                                                                Swal.fire({
                                                                    title: `B???n c?? ch???c h???y ????n kh??ng`,
                                                                    showCancelButton: true,
                                                                    confirmButtonText: 'C??',
                                                                    cancelButtonText: 'Tho??t',
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        handleCancel(order.id);
                                                                    }
                                                                });
                                                            }}
                                                        />
                                                    )}
                                                    {/* <Button
                                                        type="button"
                                                        classname="btn-custom btn-icon btn-action delete"
                                                        text="x??a"
                                                        handleFunction={() => {
                                                            Swal.fire({
                                                                title: `B???n c?? ch???c x??a ????n n??y kh??ng`,
                                                                showCancelButton: true,
                                                                confirmButtonText: 'C??',
                                                                cancelButtonText: 'Tho??t',
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    handleDeleteOrder(order.id);
                                                                }
                                                            });
                                                        }}
                                                    /> */}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div className="btn-container-page">
                        <Button
                            classname="btn-custom btn-icon btn-action page"
                            // text="Ti???p"
                            handleFunction={nextPage}
                            icon={<GrCaretNext className="prev-next-icon" />}
                        />
                        <Button
                            classname="btn-custom btn-icon btn-action page"
                            // text="Tr??? L???i"
                            handleFunction={prevPage}
                            icon={<GrCaretPrevious className="prev-next-icon" />}
                        />
                        {/* <Button classname="btn-custom btn-icon btn-action page" text="to??n b???" handleFunction={allPage} /> */}
                    </div>
                </>
            )}
            {/* {showPopup && <Payment setShowPopup={setShowPopup} totalPayment={totalPayment} />} */}
        </Wrapper>
    );
};

export default Orders;
