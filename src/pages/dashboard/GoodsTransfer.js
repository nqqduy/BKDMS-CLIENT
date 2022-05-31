import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { BiDownload, BiPlusCircle } from 'react-icons/bi';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    addGoodsCheck,
    addGoodsTransfer,
    deleteGoodsTransfer,
    getAllAddGoodsCheck,
    getAllAddGoodsTransfer,
    getCurrentGoodsTransfer,
} from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, Loading } from '../../components';
import { SearchCheck } from './components';

function GoodsTransfer() {
    const isLoading = useSelector((state) => state.warehouse.isLoading);
    const listAddGoodsTransfer = useSelector((state) => state.warehouse.listAddGoodsTransfer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({
        receiptCode: '',
        voucherCode: '',
        createTime: '',
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
        const fetchGoodsCheck = async () => {
            try {
                const action = await dispatch(getAllAddGoodsTransfer({ ...state }));
                unwrapResult(action);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchGoodsCheck();
    }, [dispatch, state]);
    const handleDelete = async (id) => {
        try {
            const action = await dispatch(deleteGoodsTransfer(id));
            unwrapResult(action);
            const action1 = await dispatch(getAllAddGoodsTransfer());
            unwrapResult(action1);
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
            <h5>Chuyển kho</h5>
            <hr />
            <SearchCheck state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Thêm phiếu chuyển kho"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={() => {
                        dispatch(addGoodsTransfer());
                        navigate('/goods-transfer/add-goods-transfer');
                    }}
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
                                    <th width="15%">Ngày tạo</th>
                                    <th width="20%">Loại Phiếu</th>
                                    <th width="15%">Tình Trạng</th>
                                    <th width="10%">Kho</th>
                                    <th width="10%">Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listAddGoodsTransfer.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.voucherCode}</td>
                                        <td>{item.receiptCode}</td>
                                        <td> {item.createTime && new Date(`${item.createTime}`).toLocaleString()}</td>
                                        <td>Điều phối hàng hóa</td>
                                        <td>Đã Chuyển Kho</td>
                                        <td>{item.warehouse?.name}</td>
                                        <td>
                                            <div className="btn-container btn-action-container">
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="chi tiết"
                                                    handleFunction={() => {
                                                        dispatch(getCurrentGoodsTransfer(item));
                                                        navigate('/goods-transfer/add-goods-transfer');
                                                    }}
                                                />
                                                {/* <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action delete"
                                                    text="xóa"
                                                    handleFunction={() => {
                                                        Swal.fire({
                                                            title: `Bạn có chắc xóa phiếu chuyển kho này không`,
                                                            showCancelButton: true,
                                                            confirmButtonText: 'Có',
                                                            cancelButtonText: 'Thoát',
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                handleDelete(item.id);
                                                            }
                                                        });
                                                    }}
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
}

export default GoodsTransfer;
