import { unwrapResult } from '@reduxjs/toolkit';
import { memo, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAgenciesInMap } from '../../../app/agency/agencySlice';
import { getAllWayBill } from '../../../app/warehouse/warehouseSlice';
import Wrapper from '../../../assets/wrappers/DashboardSearch';
import { Button, FormRowNotFormik, SelectNotFormik } from '../../../components';
import { STATUS_WAY_BILL } from '../../../constants/warehouse';

const SearchDelivery = ({ state, setState }) => {
    const listAgencies = useSelector((state) =>
        state.agency.listAgencies.map((agency) => ({
            value: agency.id,
            label: agency.name,
        }))
    );
    // const [state, setState] = useState({ orderCode: '', createTime: '', agencyId: '', status: '' });
    const dispatch = useDispatch();

    const handleChangeSearch = async (e, type) => {
        if (type === 'ORDER_CODE') {
            setState((prev) => ({ ...prev, orderCode: e.target.value }));
        } else if (type === 'AGENCY') {
            setState((prev) => ({ ...prev, agencyId: e.value }));
        } else if (type === 'STATUS') {
            setState((prev) => ({ ...prev, status: e.value }));
        } else if (type === 'CREATE_TIME') {
            setState((prev) => ({ ...prev, createTime: e.target.value }));
        }
    };
    useEffect(() => {
        const fetchAllWayBill = async () => {
            try {
                // const data = await Promise.all([dispatch(getAllWayBill()), dispatch(getAgenciesInMap())]);
                const actionResult = await dispatch(getAgenciesInMap());
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
    }, [dispatch]);

    const handleSearch = async (type) => {
        try {
            if (type === 'SEARCH') {
                const actionResult = await dispatch(getAllWayBill(state));
                unwrapResult(actionResult);
            } else if (type === 'DELETE') {
                const actionResult = await dispatch(getAllWayBill());
                unwrapResult(actionResult);
                setState({ orderCode: '', createTime: '', agencyId: '', status: '' });
            }
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
            <h5>Tìm kiếm</h5>
            <div className="search-container">
                <FormRowNotFormik
                    labelText="Mã đơn hàng"
                    placeholder="Nhập Mã đơn"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e, 'ORDER_CODE')}
                    valueState={state.orderCode}
                />
                <SelectNotFormik
                    labelText="Đại lý"
                    placeholder="Chọn đại lý"
                    options={listAgencies}
                    handleChange={(e) => handleChangeSearch(e, 'AGENCY')}
                    valueState={state.agencyId}
                />
                <FormRowNotFormik
                    labelText="Ngày tạo"
                    placeholder="Chọn ngày tạo"
                    type="date"
                    handleChange={(e) => handleChangeSearch(e, 'CREATE_TIME')}
                    valueState={state.createTime}
                />
                <SelectNotFormik
                    labelText="Trạng thái "
                    placeholder="Chọn trạng thái hiện tại"
                    options={STATUS_WAY_BILL}
                    handleChange={(e) => handleChangeSearch(e, 'STATUS')}
                    valueState={state.status}
                />
                {/* <SelectNotFormik
                    labelText="Trạng thái giao"
                    placeholder="Chọn trạng thái giao"
                    options={DELIVERY_STATUS}
                    handleChange={(e) => handleChangeSearch(e, 'DELIVERY_STATUS')}
                    valueState={state.deliveryStatus}
                /> */}
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
            </div>*/}
        </Wrapper>
    );
};

export default memo(SearchDelivery);
