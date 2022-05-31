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

let listProvince = [];
for (let i of city) {
    listProvince.push({ value: i.Name, label: i.Name });
}

const SearchAgency = ({ state, setState }) => {
    // const listAgencies = useSelector((state) =>
    //     state.agency.listAgencies.map((agency) => ({
    //         value: agency.id,
    //         label: agency.name,
    //     }))
    // );
    // const [state, setState] = useState({ name: '', dateJoin: '', province: '', phone: '' });
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const fetchAllWayBill = async () => {
    //         try {
    //             const data = await dispatch(getAgenciesInMap());
    //             unwrapResult(data);
    //         } catch (error) {
    //             Swal.fire({
    //                 icon: 'warning',
    //                 title: error.message,
    //                 showConfirmButton: true,
    //             });
    //         }
    //     };
    //     fetchAllWayBill();
    // }, [dispatch]);

    const handleChangeSearch = async (e, type) => {
        if (type === 'PROVINCE') {
            setState((prev) => ({ ...prev, province: e.value }));
        } else if (type === 'AGENCY') {
            setState((prev) => ({ ...prev, name: e.target.value }));
        } else if (type === 'PHONE') {
            setState((prev) => ({ ...prev, phone: e.target.value }));
        } else if (type === 'DATE_JOIN') {
            setState((prev) => ({ ...prev, dateJoin: e.target.value }));
        }
    };
    // const handleSearch = async (type) => {
    //     try {
    //         if (type === 'SEARCH') {
    //             const actionResult = await dispatch(getAgenciesInMap({ ...state, page: page, pageSize: pageSize }));
    //             unwrapResult(actionResult);
    //         } else if (type === 'DELETE') {
    //             const actionResult = await dispatch(getAgenciesInMap({ ...state, page: page, pageSize: pageSize }));
    //             unwrapResult(actionResult);
    //             setState({ name: '', dateJoin: '', province: '', phone: '' });
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
            <div className="search-container-agency">
                <FormRowNotFormik
                    labelText="Đại lý"
                    placeholder="Nhập tên đại lý"
                    handleChange={(e) => handleChangeSearch(e, 'AGENCY')}
                    valueState={state.name}
                    type="text"
                />
                <FormRowNotFormik
                    labelText="Ngày gia nhập"
                    type="date"
                    handleChange={(e) => handleChangeSearch(e, 'DATE_JOIN')}
                    valueState={state.dateJoin}
                />
                <FormRowNotFormik
                    labelText="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e, 'PHONE')}
                    valueState={state.phone}
                />
                <SelectNotFormik
                    labelText="Tỉnh thành"
                    placeholder="Chọn tỉnh thành"
                    options={listProvince}
                    handleChange={(e) => handleChangeSearch(e, 'PROVINCE')}
                    valueState={state.province}
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

export default memo(SearchAgency);
