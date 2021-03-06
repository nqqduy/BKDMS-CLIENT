import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { BiDownload, BiPlusCircle } from 'react-icons/bi';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addWarehouse, deleteWarehouse, editingWarehouse, getAllWarehouse } from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, Loading } from '../../components';
import { LIST_STATUS } from '../../constants/warehouse';
import { PopupWarehouse, SearchWarehouse } from './components';

function Warehouse() {
    const isLoading = useSelector((state) => state.warehouse.isLoading);
    const listWarehouse = useSelector((state) => state.warehouse.listWarehouse);

    const [state, setState] = useState({ name: '', address: '' });
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
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
    const dispatch = useDispatch();

    const handlePopup = () => {
        setShowPopup((prev) => !prev);
    };

    const handleAdd = () => {
        dispatch(addWarehouse());
        setShowPopup(!showPopup);
    };

    const handleEdit = (data) => {
        dispatch(editingWarehouse(data));
        setShowPopup(!showPopup);
    };
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const actionResult = await dispatch(getAllWarehouse({ ...state }));
                unwrapResult(actionResult);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchCategory();
    }, [dispatch, state]);
    const handleRenderProduct = async (id) => {
        navigate(`/warehouse/${id}`);
    };

    const handleDelete = async (warehouseId) => {
        try {
            const actionResult = await dispatch(deleteWarehouse({ warehouseId }));
            unwrapResult(actionResult);
            const actionResult1 = await dispatch(getAllWarehouse());
            unwrapResult(actionResult1);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };
    return (
        <Wrapper>
            <h5>Qu???n l?? kho</h5>
            <hr />
            <SearchWarehouse state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Th??m nh?? kho"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={handleAdd}
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
                                    <th width="10%">STT</th>
                                    <th width="20%">T??n</th>
                                    <th width="30%">?????a Ch???</th>
                                    <th width="20%">T??nh Tr???ng</th>
                                    <th width="20%">Thao T??c</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listWarehouse.map((warehouse, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{warehouse.name}</td>
                                        <td>{warehouse.address}</td>
                                        <td>
                                            {warehouse.status &&
                                                LIST_STATUS.find((status) => status.value === warehouse.status)?.label}
                                        </td>
                                        <td>
                                            <div className="btn-container-table btn-action-container">
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="S???a"
                                                    handleFunction={() => handleEdit(warehouse)}
                                                />
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail height-3word"
                                                    text="Danh S??ch"
                                                    handleFunction={() => handleRenderProduct(warehouse.id)}
                                                />
                                                {/* <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action delete"
                                                    text="x??a"
                                                    handleFunction={() => {
                                                        Swal.fire({
                                                            title: `B???n c?? ch???c kho h??ng n??y kh??ng`,
                                                            showCancelButton: true,
                                                            confirmButtonText: 'C??',
                                                            cancelButtonText: 'Tho??t',
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                handleDelete(warehouse.id);
                                                            }
                                                        });
                                                    }}
                                                /> */}
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
            {showPopup && (
                <PopupWarehouse
                    setShowPopup={handlePopup}
                    // initialValues={initialValues}
                    // handleSubmit={handleSubmit}
                    // address={address}
                    // setAddress={setAddress}
                    // isEditing={isEditing}
                />
            )}
        </Wrapper>
    );
}

export default Warehouse;
