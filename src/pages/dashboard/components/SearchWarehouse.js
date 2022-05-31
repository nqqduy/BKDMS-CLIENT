import { unwrapResult } from '@reduxjs/toolkit';
import { memo, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllWarehouse } from '../../../app/warehouse/warehouseSlice';
import Wrapper from '../../../assets/wrappers/DashboardSearch';
import { Button, FormRowNotFormik } from '../../../components';

const SearchWarehouse = ({ state, setState }) => {
    // /const [state, setState] = useState({ name: '', address: '' });
    const dispatch = useDispatch();

    const handleChangeSearch = async (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // useEffect(() => {
    //     const fetchCategory = async () => {
    //         try {
    //             const actionResult = await dispatch(getAllWarehouse());
    //             unwrapResult(actionResult);
    //         } catch (error) {
    //             Swal.fire({
    //                 icon: 'warning',
    //                 title: error.message,
    //                 showConfirmButton: true,
    //             });
    //         }
    //     };

    //     fetchCategory();
    // }, [dispatch]);

    const handleSearch = async (type) => {
        try {
            if (type === 'SEARCH') {
                const actionResult = await dispatch(getAllWarehouse(state));
                unwrapResult(actionResult);
            } else if (type === 'DELETE') {
                const actionResult = await dispatch(getAllWarehouse());
                unwrapResult(actionResult);

                setState({ name: '', address: '' });
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
                    name="name"
                    labelText="Tên kho"
                    placeholder="nhập tên kho"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e)}
                    valueState={state.name}
                />
                <FormRowNotFormik
                    name="address"
                    labelText="địa chỉ"
                    placeholder="nhập địa chỉ"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e)}
                    valueState={state.address}
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

export default memo(SearchWarehouse);
