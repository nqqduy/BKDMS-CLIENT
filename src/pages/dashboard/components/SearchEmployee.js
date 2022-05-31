import { unwrapResult } from '@reduxjs/toolkit';
import { memo, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getAgenciesInMap } from '../../../app/agency/agencySlice';
import Wrapper from '../../../assets/wrappers/DashboardSearch';
import { Button, FormRowNotFormik, SelectNotFormik } from '../../../components';
import city from '../../../utils/data.json';

const SearchEmployee = ({ state, setState }) => {
    const dispatch = useDispatch();

    const handleChangeSearch = async (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <Wrapper>
            <h5>Tìm kiếm</h5>
            <div className="search-container-agency">
                <FormRowNotFormik
                    name="name"
                    labelText="Tên nhân viên"
                    placeholder="Nhập tên nhân viên"
                    handleChange={(e) => handleChangeSearch(e)}
                    valueState={state.name}
                    type="text"
                />
                <FormRowNotFormik
                    name="email"
                    labelText="email"
                    placeholder="Nhập email"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e)}
                    valueState={state.dateJoin}
                />
                <FormRowNotFormik
                    name="phone"
                    labelText="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e)}
                    valueState={state.phone}
                />
            </div>
            {/* <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Tìm kiếm"
                    icon={<BiSearch className="front-icon" />}
                    //handleFunction={() => handleSearch('SEARCH')}
                />

                <Button
                    classname="btn-custom btn-icon btn-delete"
                    text="Xóa"
                    icon={<AiOutlineDelete className="front-icon" />}
                    //handleFunction={() => handleSearch('DELETE')}
                />
            </div> */}
        </Wrapper>
    );
};

export default memo(SearchEmployee);
