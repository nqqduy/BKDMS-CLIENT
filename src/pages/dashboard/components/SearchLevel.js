import { unwrapResult } from '@reduxjs/toolkit';
import { memo, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllLevel } from '../../../app/level/levelSlice';
import { getAllWarehouse } from '../../../app/warehouse/warehouseSlice';
import Wrapper from '../../../assets/wrappers/DashboardSearch';
import { Button, FormRowNotFormik } from '../../../components';

const SearchLevel = ({ state, setState }) => {
    const dispatch = useDispatch();

    const handleChangeSearch = async (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // const handleSearch = async (type) => {
    //     try {
    //         if (type === 'SEARCH') {
    //             const actionResult = await dispatch(getAllLevel(state));
    //             unwrapResult(actionResult);
    //         } else if (type === 'DELETE') {
    //             const actionResult = await dispatch(getAllLevel());
    //             unwrapResult(actionResult);

    //             setState({ name: '', address: '' });
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
            <div className="search-container">
                <FormRowNotFormik
                    name="name"
                    labelText="Tên hạn mức"
                    placeholder="nhập hạn mức"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e)}
                    valueState={state.name}
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

export default memo(SearchLevel);
