import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addEmployee, deleteEmployee, getAllEmployee, getCurrentEmployee } from '../../app/user/userSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';

import { Button, Loading } from '../../components';
import SearchEmployee from './components/SearchEmployee';

const Employee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.user.isLoading);
    const listEmployee = useSelector((state) => state.user.listEmployee);

    const [state, setState] = useState({ name: '', email: '', phone: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

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
        const fetchData = async () => {
            try {
                const action = await dispatch(getAllEmployee({ ...state }));
                unwrapResult(action);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };
        fetchData();
    }, [dispatch, state]);

    const handleDelete = async (employeeId) => {
        try {
            const action = await dispatch(deleteEmployee({ employeeId }));
            unwrapResult(action);
            const action1 = await dispatch(getAllEmployee());
            unwrapResult(action1);
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };

    const handleEdit = async (data) => {
        try {
            dispatch(getCurrentEmployee(data));
            navigate('/employee/add-employee');
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
            <h5>Qu???n l?? nh??n vi??n</h5>
            <hr />
            <SearchEmployee state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Th??m nh??n vi??n"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={() => {
                        dispatch(addEmployee());
                        navigate('/employee/add-employee');
                    }}
                />
                {/* <Button classname="btn-custom btn-icon" text="T???i Excel" icon={<BiDownload className="front-icon" />} /> */}
            </div>
            {isLoading ? (
                <Loading center />
            ) : (
                <>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th width="20%">STT</th>
                                    <th width="20%">T??n</th>
                                    <th width="20%">S??? ??i???n Tho???i</th>
                                    <th width="20%">Email</th>
                                    <th width="20%">Thao t??c</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listEmployee.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <div className="btn-container btn-action-container">
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="Chi ti???t"
                                                    handleFunction={() => handleEdit(item)}
                                                />
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action delete"
                                                    text="x??a"
                                                    handleFunction={() => {
                                                        Swal.fire({
                                                            title: `B???n c?? ch???c x??a nh??n vi??n n??y`,
                                                            showCancelButton: true,
                                                            confirmButtonText: 'C??',
                                                            cancelButtonText: 'Tho??t',
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                handleDelete(item.id);
                                                            }
                                                        });
                                                    }}
                                                />
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
                            // text="Ti???p"
                            handleFunction={nextPage}
                            icon={<GrCaretNext className="prev-next-icon" />}
                        />
                        <Button
                            classname="btn-custom btn-icon btn-action page"
                            // text="Tr??? L???i"
                            handleFunction={prevPage}
                            icon={<GrCaretPrevious className="prev-next-icon" />}
                        />
                        {/* <Button classname="btn-custom btn-icon btn-action page" text="to??n b???" handleFunction={allPage} /> */}
                    </div>
                </>
            )}
        </Wrapper>
    );
};

export default Employee;
