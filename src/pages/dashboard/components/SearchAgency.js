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
            <h5>T??m ki???m</h5>
            <div className="search-container-agency">
                <FormRowNotFormik
                    labelText="?????i l??"
                    placeholder="Nh???p t??n ?????i l??"
                    handleChange={(e) => handleChangeSearch(e, 'AGENCY')}
                    valueState={state.name}
                    type="text"
                />
                <FormRowNotFormik
                    labelText="Ng??y gia nh???p"
                    type="date"
                    handleChange={(e) => handleChangeSearch(e, 'DATE_JOIN')}
                    valueState={state.dateJoin}
                />
                <FormRowNotFormik
                    labelText="S??? ??i???n tho???i"
                    placeholder="Nh???p s??? ??i???n tho???i"
                    type="text"
                    handleChange={(e) => handleChangeSearch(e, 'PHONE')}
                    valueState={state.phone}
                />
                <SelectNotFormik
                    labelText="T???nh th??nh"
                    placeholder="Ch???n t???nh th??nh"
                    options={listProvince}
                    handleChange={(e) => handleChangeSearch(e, 'PROVINCE')}
                    valueState={state.province}
                />
            </div>
            {/* <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="T??m ki???m"
                    icon={<BiSearch className="front-icon" />}
                    //handleFunction={() => handleSearch('SEARCH')}
                />

                <Button
                    classname="btn-custom btn-icon btn-delete"
                    text="X??a"
                    icon={<AiOutlineDelete className="front-icon" />}
                    //handleFunction={() => handleSearch('DELETE')}
                />
            </div> */}
        </Wrapper>
    );
};

export default memo(SearchAgency);
