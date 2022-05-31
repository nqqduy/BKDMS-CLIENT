import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { BiDownload, BiPlusCircle } from 'react-icons/bi';
import { GrCaretPrevious, GrCaretNext } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addAgency, editingAgency, getAgenciesInMap, lockAccount, unLockAccount } from '../../app/agency/agencySlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, Loading } from '../../components';
import { SearchAgency } from './components';

function AllAgencies() {
    const isLoading = useSelector((state) => state.agency.isLoading);
    const listAgencies = useSelector((state) => state.agency.listAgencies);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [state, setState] = useState({ name: '', dateJoin: '', province: '', phone: '' });

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const prevPage = async () => {
        const pg = page === 1 ? 1 : page - 1;
        setPage(pg);
    };

    const nextPage = async () => {
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
        setPage(pg);
    };

    const allPage = () => {
        setPage(null);
        setPageSize(null);
    };
    useEffect(() => {
        const fetchAllWayBill = async () => {
            try {
                const data = await dispatch(getAgenciesInMap({ ...state, page: page, pageSize: pageSize }));
                const result = unwrapResult(data);
                setTotalCount(result.totalAgencies);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };
        fetchAllWayBill();
    }, [dispatch, page, pageSize, state]);
    const handleDelete = async (agencyId) => {
        try {
            const data = await dispatch(lockAccount({ agencyId }));
            unwrapResult(data);
            const data1 = await dispatch(getAgenciesInMap({ ...state }));
            const result1 = unwrapResult(data1);
            setTotalCount(result1.totalAgencies);
            Swal.fire({
                icon: 'success',
                title: 'Thành Công',
                showConfirmButton: true,
            });
            // lockAccount;
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };

    const handleUnLock = async (agencyId) => {
        try {
            const data = await dispatch(unLockAccount({ agencyId }));
            unwrapResult(data);
            const data1 = await dispatch(getAgenciesInMap({ ...state }));
            const result1 = unwrapResult(data1);
            setTotalCount(result1.totalAgencies);
            Swal.fire({
                icon: 'success',
                title: 'Thành Công',
                showConfirmButton: true,
            });
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
            <h5>Quản lý đại lý</h5>
            <hr />
            <SearchAgency state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Thêm đại lý"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={() => {
                        dispatch(addAgency());
                        navigate('/agency/add-agency');
                    }}
                />
                {/* <Button classname="btn-custom btn-icon" text="Tải Excel" icon={<BiDownload className="front-icon" />} /> */}
            </div>
            {isLoading ? (
                <Loading center />
            ) : (
                <>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th width="10%">STT</th>
                                    <th width="20%">Tên Đại Lý</th>
                                    <th width="20%">Người Đại Diện</th>
                                    <th width="30%">Địa chỉ</th>
                                    <th width="20%">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listAgencies &&
                                    listAgencies.map((agency, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{agency.name}</td>
                                            <td>{agency.nameOwn}</td>
                                            <td>{agency.address}</td>
                                            <td>
                                                <div className="btn-container btn-action-container">
                                                    <Button
                                                        classname="btn-custom btn-icon btn-action detail"
                                                        text="Chi tiết"
                                                        handleFunction={() => {
                                                            dispatch(editingAgency(agency));
                                                            navigate('/agency/add-agency');
                                                        }}
                                                    />
                                                    {!agency.isLock ? (
                                                        <Button
                                                            classname="btn-custom btn-icon btn-action delete "
                                                            text="Khóa"
                                                            handleFunction={() => {
                                                                Swal.fire({
                                                                    title: 'Chắc chắn khóa ?',
                                                                    showCancelButton: true,
                                                                    confirmButtonText: 'Có',
                                                                    cancelButtonText: 'Thoát',
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        handleDelete(agency.id);
                                                                    }
                                                                });
                                                            }}
                                                        />
                                                    ) : (
                                                        <Button
                                                            classname="btn-custom btn-icon btn-action delete "
                                                            text="Mở Khóa"
                                                            handleFunction={() => {
                                                                Swal.fire({
                                                                    title: 'Chắc chắn mở khóa ?',
                                                                    showCancelButton: true,
                                                                    confirmButtonText: 'Có',
                                                                    cancelButtonText: 'Thoát',
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        handleUnLock(agency.id);
                                                                    }
                                                                });
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div className="btn-container-page">
                        <Button
                            classname="btn-custom btn-icon btn-action page"
                            // text="Tiếp"
                            handleFunction={nextPage}
                            icon={<GrCaretNext className="prev-next-icon" />}
                        />
                        <Button
                            classname="btn-custom btn-icon btn-action page"
                            // text="Trở Lại"
                            handleFunction={prevPage}
                            icon={<GrCaretPrevious className="prev-next-icon" />}
                        />
                        {/* <Button classname="btn-custom btn-icon btn-action page" text="toàn bộ" handleFunction={allPage} /> */}
                    </div>
                </>
            )}
        </Wrapper>
    );
}

export default AllAgencies;
