import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { BiDownload, BiPlusCircle } from 'react-icons/bi';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    addGoodsCheck,
    deleteGoodsCheck,
    getAllAddGoodsCheck,
    getCurrentGoodsCheck,
} from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, Loading } from '../../components';
import { RENDER_STATUS_GOODS_CHECK } from '../../constants/warehouse';
import { SearchCheck } from './components';

function WarehouseCheck() {
    const isLoading = useSelector((state) => state.warehouse.isLoading);
    const listAddGoodsCheck = useSelector((state) => state.warehouse.listAddGoodsCheck);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [state, setState] = useState({
        receiptCode: '',
        voucherCode: '',
        createTime: '',
    });
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
        const fetchGoodsCheck = async () => {
            try {
                const action = await dispatch(getAllAddGoodsCheck({ ...state }));
                unwrapResult(action);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchGoodsCheck();
    }, [dispatch, state]);

    const handleDelete = async (id) => {
        try {
            const action = await dispatch(deleteGoodsCheck(id));
            unwrapResult(action);
            const action1 = await dispatch(getAllAddGoodsCheck());
            unwrapResult(action1);
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
            <h5>Ki???m kho</h5>
            <hr />
            <SearchCheck state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Th??m phi???u ki???m kho"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={() => {
                        dispatch(addGoodsCheck());
                        navigate('/warehouse-check/add-warehouse-check');
                    }}
                />
                {/* <Button classname="btn-custom btn-icon" text="T???i PDF" icon={<BiDownload className="front-icon" />} /> */}
            </div>
            {isLoading ? (
                <Loading center />
            ) : (
                <>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th width="5%">STT</th>
                                    <th width="10%">M?? Ch???ng T???</th>
                                    <th width="10%">M?? Phi???u</th>
                                    <th width="15%">Ng??y T???o</th>
                                    <th width="15%">T??nh Tr???ng</th>
                                    <th width="10%">Kho</th>
                                    <th width="10%">Thao T??c</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listAddGoodsCheck.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.voucherCode}</td>
                                        <td>{item.receiptCode}</td>
                                        <td> {item.createTime && new Date(`${item.createTime}`).toLocaleString()}</td>
                                        <td>
                                            {RENDER_STATUS_GOODS_CHECK.find((status) => status.value === item.status)?.label}
                                        </td>
                                        <td>{item.warehouse?.name}</td>
                                        <td>
                                            <div className="btn-container btn-action-container">
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="chi ti???t"
                                                    handleFunction={() => {
                                                        dispatch(getCurrentGoodsCheck(item));
                                                        navigate('/warehouse-check/add-warehouse-check');
                                                    }}
                                                />
                                                {/* <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action delete"
                                                    text="x??a"
                                                    handleFunction={() => {
                                                        Swal.fire({
                                                            title: `B???n c?? ch???c x??a phi???u ki???m kho n??y kh??ng`,
                                                            showCancelButton: true,
                                                            confirmButtonText: 'C??',
                                                            cancelButtonText: 'Tho??t',
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                handleDelete(item.id);
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
                        <Button classname="btn-custom btn-icon btn-action page" text="to??n b???" handleFunction={allPage} />
                    </div>
                </>
            )}
        </Wrapper>
    );
}

export default WarehouseCheck;
