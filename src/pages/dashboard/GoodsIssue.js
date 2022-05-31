import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { BiDownload, BiPlusCircle } from 'react-icons/bi';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    addGoodsIssue,
    deleteGoodsIssue,
    exportGoods,
    getAllAddGoodsIssue,
    getCurrentGoodsIssue,
} from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, Loading } from '../../components';
import { RENDER_STATUS_GOODS_ISSUE, RENDER_TYPE_GOODS_ISSUE } from '../../constants/warehouse';
import { SearchGoodsReceipt } from './components';

function GoodsIssue() {
    const isLoading = useSelector((state) => state.warehouse.isLoading);
    const listAddGoodsIssue = useSelector((state) => state.warehouse.listAddGoodsIssue);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        receiptCode: '',
        voucherCode: '',
        createTime: '',
        actionTime: '',
        status: '',
        type: '',
    });
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
        const fetchAddGoodsIssue = async () => {
            try {
                const action = await dispatch(getAllAddGoodsIssue({ ...state }));
                unwrapResult(action);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchAddGoodsIssue();
    }, [dispatch, state]);
    // const handleGoodsIssue = async (data) => {
    //     try {
    //         let submitData = {
    //             goodsIssueId: data.id,
    //             warehouseId: data.warehouseId,
    //             orderId: data.orderId,
    //             listProduct: [],
    //             type: data.type,
    //         };
    //         data.detailGoodsIssues?.map((item) => {
    //             submitData = {
    //                 ...submitData,
    //                 listProduct: submitData.listProduct.concat([
    //                     {
    //                         quantity: item.quantity,
    //                         unitId: item.unitId,
    //                     },
    //                 ]),
    //             };
    //             return true;
    //         });

    //         const actionExport = await dispatch(exportGoods(submitData));
    //         unwrapResult(actionExport);
    //         const actionGetAll = await dispatch(getAllAddGoodsIssue());
    //         unwrapResult(actionGetAll);
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Xuất Thành Công',
    //             showConfirmButton: false,
    //             timer: 1500,
    //         });
    //     } catch (error) {
    //         Swal.fire({
    //             icon: 'warning',
    //             title: error.message,
    //             showConfirmButton: true,
    //         });
    //     }
    // };
    const handleDelete = async (data) => {
        try {
            const action = await dispatch(deleteGoodsIssue(data));
            unwrapResult(action);
            const actionGetAll = await dispatch(getAllAddGoodsIssue());
            unwrapResult(actionGetAll);
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };
    const handleAdd = () => {
        dispatch(addGoodsIssue());
        navigate('/goods-issue/add-goods-issue');
    };
    const handleEdit = async (data) => {
        dispatch(getCurrentGoodsIssue(data));
        navigate('/goods-issue/add-goods-issue');
    };
    // console.log(handleEdit);
    return (
        <Wrapper>
            <h5>xuất kho</h5>
            <hr />
            <SearchGoodsReceipt code="GOODS_ISSUE" state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Thêm phiếu xuất kho"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={handleAdd}
                />
                {/* <Button classname="btn-custom btn-icon" text="Tải PDF" icon={<BiDownload className="front-icon" />} /> */}
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
                                    <th width="10%">Mã Chứng Từ</th>
                                    <th width="10%">Mã Phiếu</th>
                                    <th width="15%">Ngày Tạo</th>
                                    <th width="15%">Ngày Xuất</th>
                                    <th width="15%">Loại Phiếu</th>
                                    <th width="10%">Trạng thái</th>
                                    <th width="10%">Kho</th>
                                    <th width="10%">Thao Tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listAddGoodsIssue.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.voucherCode}</td>
                                        <td>{item.receiptCode}</td>
                                        <td>{new Date(`${item.createTime}`).toLocaleString()}</td>
                                        <td>
                                            {item.exportTime ? new Date(`${item.exportTime}`).toLocaleString() : 'Chưa Xuất'}
                                        </td>
                                        <td>{RENDER_TYPE_GOODS_ISSUE.find((type) => type.value === item.type)?.label}</td>
                                        <td>
                                            {RENDER_STATUS_GOODS_ISSUE.find((type) => type.value === item.status)?.label}
                                        </td>
                                        <td>{item.warehouse?.name}</td>
                                        <td>
                                            <div className=" btn-action-container btn-container-table">
                                                {/* {item.status === 'WAITING_GET_GOODS' && (
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="Xuất Kho"
                                                    handleFunction={() => handleGoodsIssue(item)}
                                                    disable={isLoading}
                                                />
                                            )} */}
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="chi tiết"
                                                    handleFunction={() => handleEdit(item)}
                                                />
                                                {item.status === 'WAITING_GET_GOODS' && (
                                                    <Button
                                                        type="button"
                                                        classname="btn-custom btn-icon btn-action delete"
                                                        text="xóa"
                                                        disable={isLoading}
                                                        handleFunction={() => {
                                                            Swal.fire({
                                                                title: 'Chắc chắn xóa ?',
                                                                showCancelButton: true,
                                                                confirmButtonText: 'Có',
                                                                cancelButtonText: 'Thoát',
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    handleDelete(item.id);
                                                                }
                                                            });
                                                        }}
                                                    />
                                                )}
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
}

export default GoodsIssue;
