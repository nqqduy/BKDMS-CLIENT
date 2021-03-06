import { unwrapResult } from '@reduxjs/toolkit';
import { memo, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAgenciesInMap } from '../../../app/agency/agencySlice';
import { getAllOrder } from '../../../app/order/orderSlice';
import Wrapper from '../../../assets/wrappers/DashboardSearch';
import { Button, FormRowNotFormik, SelectNotFormik } from '../../../components';
import { DELIVERY_STATUS, ORDER_STATUS } from '../../../constants/order';

const SearchOrder = ({ state, setState }) => {
    const listAgencies = useSelector((state) =>
        state.agency.listAgencies.map((agency) => ({
            value: agency.id,
            label: agency.name,
        }))
    );
    // const [state, setState] = useState({ orderCode: '', date: '', agencyId: '', orderStatus: '', deliveryStatus: '' });
    const dispatch = useDispatch();

    const handleChangeSearch = async (e, type) => {
        if (type === 'ORDER_CODE') {
            setState((prev) => ({ ...prev, orderCode: e.target.value }));
        } else if (type === 'AGENCY') {
            setState((prev) => ({ ...prev, agencyId: e.value }));
        } else if (type === 'ORDER_STATUS') {
            setState((prev) => ({ ...prev, orderStatus: e.value }));
        } else if (type === 'DELIVERY_STATUS') {
            setState((prev) => ({ ...prev, deliveryStatus: e.value }));
        } else if (type === 'DATE') {
            setState((prev) => ({ ...prev, date: e.target.value }));
        }
    };
    useEffect(() => {
        const fetchAllOrder = async () => {
            try {
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

        fetchAllOrder();
    }, [dispatch]);

    const handleSearch = async (type) => {
        try {
            if (type === 'SEARCH') {
                const actionResult = await dispatch(getAllOrder(state));
                unwrapResult(actionResult);
            } else if (type === 'DELETE') {
                const actionResult = await dispatch(getAllOrder());
                unwrapResult(actionResult);
                setState({ orderCode: '', date: '', agencyId: '', orderStatus: '', deliveryStatus: '' });
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
            <h5>T??m ki???m</h5>
            <div className="search-container">
                <FormRowNotFormik
                    labelText="M?? ????n h??ng"
                    placeholder="Nh???p M?? ????n"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e, 'ORDER_CODE')}
                    valueState={state.orderCode}
                />
                <SelectNotFormik
                    labelText="?????i l??"
                    placeholder="Ch???n ?????i l??"
                    options={listAgencies}
                    handleChange={(e) => handleChangeSearch(e, 'AGENCY')}
                    valueState={state.agencyId}
                />
                <FormRowNotFormik
                    labelText="Ng??y ?????t"
                    placeholder="Ch???n ng??y ?????t"
                    type="date"
                    handleChange={(e) => handleChangeSearch(e, 'DATE')}
                    valueState={state.date}
                />
                <SelectNotFormik
                    labelText="T??nh tr???ng ????n"
                    placeholder="Ch???n t??nh tr???ng ????n"
                    options={ORDER_STATUS}
                    handleChange={(e) => handleChangeSearch(e, 'ORDER_STATUS')}
                    valueState={state.orderStatus}
                />
                {/* <SelectNotFormik
                    labelText="Tr???ng th??i giao"
                    placeholder="Ch???n tr???ng th??i giao"
                    options={DELIVERY_STATUS}
                    handleChange={(e) => handleChangeSearch(e, 'DELIVERY_STATUS')}
                    valueState={state.deliveryStatus}
                /> */}
            </div>
            {/* <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="T??m ki???m"
                    icon={<BiSearch className="front-icon" />}
                    handleFunction={() => handleSearch('SEARCH')}
                />

                <Button
                    classname="btn-custom btn-icon btn-delete"
                    text="X??a"
                    icon={<AiOutlineDelete className="front-icon" />}
                    handleFunction={() => handleSearch('DELETE')}
                />
            </div> */}
        </Wrapper>
    );
};

export default memo(SearchOrder);
