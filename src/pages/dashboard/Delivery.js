import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getAllWayBill, getCurrentWayBill, handleShip } from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, Loading } from '../../components';
import { STATUS_WAY_BILL } from '../../constants/warehouse';
import { SearchDelivery } from './components';

const Delivery = () => {
    const isLoading = useSelector((state) => state.warehouse.isLoading);
    const listWayBill = useSelector((state) => state.warehouse.listWayBill);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({ orderCode: '', createTime: '', agencyId: '', status: '' });
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
    const handleDelivery = async (data, type) => {
        try {
            const action = await dispatch(handleShip(data));
            unwrapResult(action);

            const actionGetAll = await dispatch(getAllWayBill());
            unwrapResult(actionGetAll);
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

    const configDelivery = async (data) => {
        dispatch(getCurrentWayBill(data));
        navigate('/delivery-order/config-delivery');
    };
    // console.log(state);
    useEffect(() => {
        const fetchAllWayBill = async () => {
            try {
                // const data = await Promise.all([dispatch(getAllWayBill()), dispatch(getAgenciesInMap())]);
                const actionResult = await dispatch(getAllWayBill({ ...state }));
                unwrapResult(actionResult);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };
        fetchAllWayBill();
    }, [dispatch, state]);
    return (
        <Wrapper>
            <h5>Thông tin giao hàng</h5>
            <hr />
            <SearchDelivery state={state} setState={setState} />
            {isLoading ? (
                <Loading center />
            ) : (
                <>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th width="5%">STT</th>
                                    <th width="15%">Mã Đơn Hàng</th>
                                    <th width="20%">Mã Vận Đơn</th>
                                    <th width="15%">Kho Gởi</th>
                                    <th width="15%">Đại Lý Nhận</th>
                                    <th width="15%">Trạng Thái</th>
                                    <th width="15%">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listWayBill.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.order?.orderCode}</td>
                                        <td>{item.receiptCode}</td>
                                        <td>{item.goodsIssue?.warehouse?.name}</td>
                                        <td>{item.receiptName}</td>
                                        <td>{STATUS_WAY_BILL.find((i) => i.value === item.status)?.label}</td>
                                        <td>
                                            <div className="btn-container-table btn-action-container">
                                                {item?.status === 'GOT_GOODS' && (
                                                    <Button
                                                        type="button"
                                                        classname="btn-custom btn-icon btn-action detail"
                                                        text="Vận chuyển"
                                                        handleFunction={() => {
                                                            Swal.fire({
                                                                title: 'Có chắc là bắt đầu vận chuyển',
                                                                showCancelButton: true,
                                                                confirmButtonText: 'Có',
                                                                cancelButtonText: 'Thoát',
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    handleDelivery({
                                                                        orderId: item.orderId,
                                                                        wayBillId: item.id,
                                                                        type: 'START_SHIP',
                                                                    });
                                                                }
                                                            });
                                                        }}
                                                        disable={isLoading}
                                                    />
                                                )}
                                                {item?.status === 'SHIPPING' && (
                                                    <Button
                                                        type="button"
                                                        classname="btn-custom btn-icon btn-action detail height-3word"
                                                        text="Giao Thành Công"
                                                        handleFunction={() => {
                                                            Swal.fire({
                                                                title: 'Có chắc là giao thành công',
                                                                showCancelButton: true,
                                                                confirmButtonText: 'Có',
                                                                cancelButtonText: 'Thoát',
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    handleDelivery({
                                                                        orderId: item.orderId,
                                                                        wayBillId: item.id,
                                                                        type: 'SUCCESS_SHIP',
                                                                    });
                                                                }
                                                            });
                                                        }}
                                                        disable={isLoading}
                                                    />
                                                )}
                                                {item?.status === 'SHIPPING' && (
                                                    <Button
                                                        type="button"
                                                        classname="btn-custom btn-icon btn-action delete height-3word"
                                                        text="Giao thất bại"
                                                        handleFunction={() => {
                                                            Swal.fire({
                                                                title: 'Nhập lý do',
                                                                input: 'text',
                                                                inputAttributes: {
                                                                    autocapitalize: 'off',
                                                                },
                                                                showCancelButton: true,
                                                                confirmButtonText: 'Xác Nhận',
                                                                cancelButtonText: 'Thoát',
                                                                preConfirm: (reason) => {
                                                                    return reason;
                                                                },
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    handleDelivery({
                                                                        orderId: item.orderId,
                                                                        wayBillId: item.id,
                                                                        reason: result.value,
                                                                        type: 'ERROR_SHIP',
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
                                                    text="chi tiết"
                                                    handleFunction={() => configDelivery(item)}
                                                />
                                                {/* <Button
                                                type="button"
                                                classname="btn-custom btn-icon btn-action delete"
                                                text="hủy"
                                                // handleFunction={() =>
                                                //     handleDelete(category)
                                                // }
                                            /> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div className="btn-container-page">
                        <Button
                            classname="btn-custom btn-icon btn-action page"
                            // text="Tiếp"
                            handleFunction={nextPage}
                            icon={<GrCaretNext className="prev-next-icon" />}
                        />
                        <Button
                            classname="btn-custom btn-icon btn-action page"
                            // text="Trở Lại"
                            handleFunction={prevPage}
                            icon={<GrCaretPrevious className="prev-next-icon" />}
                        />
                        {/* <Button classname="btn-custom btn-icon btn-action page" text="toàn bộ" handleFunction={allPage} /> */}
                    </div>
                </>
            )}
        </Wrapper>
    );
};

export default Delivery;
