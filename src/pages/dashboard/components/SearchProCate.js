import { unwrapResult } from '@reduxjs/toolkit';
import { memo, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllCategory } from '../../../app/category/categorySlice';
import { getAllProductLine } from '../../../app/productLine/productLineSlice';
import Wrapper from '../../../assets/wrappers/DashboardSearch';
import { Button, FormRowNotFormik } from '../../../components';

const SearchProCate = ({ name, state, setState }) => {
    // const [state, setState] = useState({ name: '' });
    const dispatch = useDispatch();

    const handleChangeSearch = async (e) => {
        setState((prev) => ({ name: e.target.value }));
    };

    // useEffect(() => {
    //     const fetchCategory = async () => {
    //         try {
    //             if (code === 'CATEGORY') {
    //                 const actionResult = await dispatch(getAllCategory());
    //                 unwrapResult(actionResult);
    //             }
    //             if (code === 'PRODUCT_LINE') {
    //                 const actionResult = await dispatch(getAllProductLine());
    //                 unwrapResult(actionResult);
    //             }
    //         } catch (error) {
    //             Swal.fire({
    //                 icon: 'warning',
    //                 title: error.message,
    //                 showConfirmButton: true,
    //             });
    //         }
    //     };

    //     fetchCategory();
    // }, [code, dispatch]);

    // const handleSearch = async (type) => {
    //     try {
    //         if (type === 'SEARCH') {
    //             if (code === 'CATEGORY') {
    //                 const actionResult = await dispatch(getAllCategory(state));
    //                 unwrapResult(actionResult);
    //             } else if (code === 'PRODUCT_LINE') {
    //                 const actionResult = await dispatch(getAllProductLine(state));
    //                 unwrapResult(actionResult);
    //             }
    //         } else if (type === 'DELETE') {
    //             if (code === 'CATEGORY') {
    //                 const actionResult = await dispatch(getAllCategory());
    //                 unwrapResult(actionResult);
    //             } else if (code === 'PRODUCT_LINE') {
    //                 const actionResult = await dispatch(getAllProductLine());
    //                 unwrapResult(actionResult);
    //             }
    //             setState({ name: '' });
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
                    labelText={`Tên ${name}`}
                    placeholder={`Chọn tên ${name}`}
                    type="text"
                    handleChange={(e) => handleChangeSearch(e)}
                    valueState={state.name}
                />
            </div>
            <div className="btn-container">
                {/* <Button
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
                /> */}
            </div>
        </Wrapper>
    );
};

export default memo(SearchProCate);
