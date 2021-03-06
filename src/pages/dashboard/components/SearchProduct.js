import { unwrapResult } from '@reduxjs/toolkit';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllCategory } from '../../../app/category/categorySlice';
import { getAllProduct } from '../../../app/product/productSlice';
import { getAllProductLine } from '../../../app/productLine/productLineSlice';
import Wrapper from '../../../assets/wrappers/DashboardSearch';
import { FormRowNotFormik, SelectNotFormik } from '../../../components';
import { TYPE_PRODUCT } from '../../../constants/constants';

const SearchProduct = ({ state, setState }) => {
    const listCategory = useSelector((state) =>
        state.category.listCategory.map((item) => ({
            value: item.id,
            label: item.name,
        }))
    );
    const listProductLine = useSelector((state) =>
        state.productLine.listProductLine.map((item) => ({
            value: item.id,
            label: item.name,
        }))
    );

    // const [state, setState] = useState({ name: '', categoryId: '', productLineId: '', type: '' });
    const dispatch = useDispatch();

    const handleChangeSearch = async (e, type) => {
        if (type === 'SELECT_CATEGORY') {
            setState((prev) => ({ ...prev, categoryId: e.value }));
        } else if (type === 'SELECT_PRODUCT_LINE') {
            setState((prev) => ({ ...prev, productLineId: e.value }));
        } else if (type === 'ENTER') {
            setState((prev) => ({ ...prev, name: e.target.value }));
        } else if (type === 'SELECT_TYPE') {
            setState((prev) => ({ ...prev, type: e.value }));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Promise.all([
                    dispatch(getAllProductLine()),
                    // dispatch(getAllProduct()),
                    dispatch(getAllCategory()),
                ]);

                unwrapResult(result[0]);
                unwrapResult(result[1]);
                //unwrapResult(result[2]);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchData();
    }, [dispatch]);

    const handleSearch = async (type) => {
        try {
            if (type === 'SEARCH') {
                const actionResult = await dispatch(getAllProduct(state));
                unwrapResult(actionResult);
            } else if (type === 'DELETE') {
                const actionResult = await dispatch(getAllProduct());
                unwrapResult(actionResult);

                setState({ name: '', categoryId: '', productLineId: '' });
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
                    labelText="T??n s???n ph???m"
                    placeholder="Nh???p t??n s???n ph???m"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e, 'ENTER')}
                    valueState={state.name}
                />
                <SelectNotFormik
                    labelText="Danh m???c"
                    placeholder="Ch???n danh m???c"
                    handleChange={(e) => handleChangeSearch(e, 'SELECT_CATEGORY')}
                    valueState={state.categoryId}
                    options={listCategory}
                />
                <SelectNotFormik
                    labelText="D??ng s???n ph???m"
                    placeholder="Ch???n d??ng s???n ph???m"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e, 'SELECT_PRODUCT_LINE')}
                    valueState={state.productLineId}
                    options={listProductLine}
                />
                <SelectNotFormik
                    labelText="Tr???ng th??i"
                    placeholder="Ch???n Tr???ng Th??i"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e, 'SELECT_TYPE')}
                    valueState={state.type}
                    options={TYPE_PRODUCT}
                />
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

export default memo(SearchProduct);
