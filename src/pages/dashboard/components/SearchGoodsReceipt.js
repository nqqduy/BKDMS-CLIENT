import { unwrapResult } from '@reduxjs/toolkit';
import { memo, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllAddGoodsIssue, getAllAddGoodsReceipt } from '../../../app/warehouse/warehouseSlice';
import Wrapper from '../../../assets/wrappers/DashboardSearch';
import { Button, FormRowNotFormik, SelectNotFormik } from '../../../components';
import {
    RENDER_STATUS_GOODS_ISSUE,
    RENDER_STATUS_GOODS_RECEIPT,
    RENDER_TYPE_GOODS_ISSUE,
    RENDER_TYPE_GOODS_RECEIPT,
} from '../../../constants/warehouse';

const SearchGoodsReceipt = ({ code, state, setState }) => {
    // const [state, setState] = useState({
    //     receiptCode: '',
    //     voucherCode: '',
    //     createTime: '',
    //     actionTime: '',
    //     status: '',
    //     type: '',
    // });
    const dispatch = useDispatch();

    const handleChangeSearch = async (e, type = null) => {
        if (type === 'SELECT_TYPE') {
            setState((prev) => ({ ...prev, type: e.value }));
        } else if (type === 'SELECT_STATUS') {
            setState((prev) => ({ ...prev, status: e.value }));
        } else {
            setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    // const handleSearch = async (type) => {
    //     try {
    //         if (type === 'SEARCH') {
    //             if (code === 'GOODS_ISSUE') {
    //                 const action = await dispatch(getAllAddGoodsIssue(state));
    //                 unwrapResult(action);
    //             } else if (code === 'GOODS_RECEIPT') {
    //                 const action = await dispatch(getAllAddGoodsReceipt(state));
    //                 unwrapResult(action);
    //             }
    //         } else if (type === 'DELETE') {
    //             if (code === 'GOODS_ISSUE') {
    //                 const action = await dispatch(getAllAddGoodsIssue());
    //                 unwrapResult(action);
    //             } else if (code === 'GOODS_RECEIPT') {
    //                 const action = await dispatch(getAllAddGoodsReceipt());
    //                 unwrapResult(action);
    //             }
    //             setState({ receiptCode: '', voucherCode: '', createTime: '', actionTime: '', status: '', type: '' });
    //         }
    //     } catch (error) {
    //         Swal.fire({
    //             icon: 'warning',
    //             title: error.message,
    //             showConfirmButton: true,
    //         });
    //     }
    // };
    return (
        <Wrapper>
            <h5>Tìm kiếm</h5>
            <div className="search-container-goods-receipt">
                <FormRowNotFormik
                    name="voucherCode"
                    labelText="Mã chứng từ"
                    placeholder="Nhập mã chứng từ"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e)}
                    valueState={state.voucherCode}
                />
                <FormRowNotFormik
                    name="receiptCode"
                    labelText="Mã phiếu"
                    placeholder="Nhập Mã phiếu"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e)}
                    valueState={state.receiptCode}
                />
                <FormRowNotFormik
                    labelText="Ngày tạo"
                    placeholder="Chọn ngày tạo"
                    name="createTime"
                    type="date"
                    handleChange={(e) => handleChangeSearch(e)}
                    valueState={state.createTime}
                    createTime
                />
                <FormRowNotFormik
                    name="actionTime"
                    labelText={(code === 'GOODS_ISSUE' && `Ngày xuất`) || (code === 'GOODS_RECEIPT' && `Ngày nhập`)}
                    type="date"
                    handleChange={(e) => handleChangeSearch(e)}
                    valueState={state.actionTime}
                />
                <SelectNotFormik
                    labelText="Trạng thái "
                    placeholder="Chọn trạng thái hiện tại"
                    options={
                        (code === 'GOODS_RECEIPT' && RENDER_STATUS_GOODS_RECEIPT) ||
                        (code === 'GOODS_ISSUE' && RENDER_STATUS_GOODS_ISSUE)
                    }
                    handleChange={(e) => handleChangeSearch(e, 'SELECT_STATUS')}
                    valueState={state.status}
                />
                <SelectNotFormik
                    labelText="Loại phiếu"
                    placeholder="Chọn loại phiếu"
                    options={
                        (code === 'GOODS_RECEIPT' && RENDER_TYPE_GOODS_RECEIPT) ||
                        (code === 'GOODS_ISSUE' && RENDER_TYPE_GOODS_ISSUE)
                    }
                    handleChange={(e) => handleChangeSearch(e, 'SELECT_TYPE')}
                    valueState={state.type}
                />
            </div>
            {/* <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Tìm kiếm"
                    icon={<BiSearch className="front-icon" />}
                    handleFunction={() => handleSearch('SEARCH')}
                />

                <Button
                    classname="btn-custom btn-icon btn-delete"
                    text="Xóa"
                    icon={<AiOutlineDelete className="front-icon" />}
                    handleFunction={() => handleSearch('DELETE')}
                />
            </div> */}
        </Wrapper>
    );
};

export default memo(SearchGoodsReceipt);
