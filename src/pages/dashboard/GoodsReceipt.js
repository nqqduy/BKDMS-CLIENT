import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { BiDownload, BiPlusCircle } from 'react-icons/bi';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    addGoodsReceipt,
    deleteGoodsReceipt,
    getAllAddGoodsReceipt,
    getCurrentGoodsReceipt,
    importGoods,
} from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, Loading } from '../../components';
import { RENDER_TYPE_GOODS_RECEIPT, RENDER_STATUS_GOODS_RECEIPT, WAITING_IMPORT_GOODS } from '../../constants/warehouse';

import { SearchGoodsReceipt } from './components';

function GoodsReceipt() {
    const isLoading = useSelector((state) => state.warehouse.isLoading);
    const listAddGoodsReceipt = useSelector((state) => state.warehouse.listAddGoodsReceipt);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({
        receiptCode: '',
        voucherCode: '',
        createTime: '',
        actionTime: '',
        status: '',
        type: '',
    });
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
        const fetchGoodsReceipt = async () => {
            try {
                const action = await dispatch(getAllAddGoodsReceipt({ ...state }));
                unwrapResult(action);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchGoodsReceipt();
    }, [dispatch, state]);
    // const handleImport = async (data) => {
    //     try {
    //         let submitData = {
    //             warehouseId: data.warehouseId,
    //             goodReceiptId: data.id,
    //             listProduct: [],
    //             orderId: data.orderId,
    //             type: data.type,
    //         };

    //         data.detailGoodsReceipts.map((item) => {
    //             submitData = {
    //                 ...submitData,
    //                 listProduct: submitData.listProduct.concat([
    //                     {
    //                         unitId: item.unitId,
    //                         price: item.price,
    //                         quantity: item.quantity,
    //                     },
    //                 ]),
    //             };
    //             return true;
    //         });

    //         const actionResult = await dispatch(importGoods(submitData));
    //         unwrapResult(actionResult);
    //         const action = await dispatch(getAllAddGoodsReceipt());
    //         unwrapResult(action);

    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Th??nh c??ng',
    //             showConfirmButton: false,
    //             timer: 1500,
    //         });
    //     } catch (error) {
    //         Swal.fire({
    //             icon: 'warning',
    //             title: error.message,
    //             showConfirmButton: true,
    //         });
    //     }
    // };

    const handleDelete = async (data) => {
        try {
            const action = await dispatch(deleteGoodsReceipt(data));
            unwrapResult(action);
            const actionGetAll = await dispatch(getAllAddGoodsReceipt());
            unwrapResult(actionGetAll);
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };

    const handleEdit = (data) => {
        dispatch(getCurrentGoodsReceipt(data));
        navigate('/goods-receipt/add-goods-receipt');
    };

    const handleAdd = () => {
        dispatch(addGoodsReceipt());
        navigate('/goods-receipt/add-goods-receipt');
    };
    return (
        <Wrapper>
            <h5>nh???p kho</h5>
            <hr />
            <SearchGoodsReceipt code="GOODS_RECEIPT" state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Th??m phi???u nh???p kho"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={handleAdd}
                    type="button"
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
                                    <th width="5%">STT</th>
                                    <th width="10%">M?? Ch???ng T???</th>
                                    <th width="10%">M?? Phi???u</th>
                                    <th width="15%">Ng??y T???o</th>
                                    <th width="15%">Ng??y Nh???p</th>
                                    <th width="15%">Lo???i Phi???u</th>
                                    <th width="10%">T??nh Tr???ng</th>
                                    <th width="10%">Kho</th>
                                    <th width="10%">Thao T??c</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listAddGoodsReceipt?.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.voucherCode}</td>
                                        <td>{item.receiptCode}</td>
                                        <td>{item.createTime && new Date(`${item.createTime}`).toLocaleString()}</td>
                                        <td>
                                            {item.importTime ? new Date(`${item.importTime}`).toLocaleString() : 'Ch??a Nh???p'}
                                        </td>
                                        <td>{RENDER_TYPE_GOODS_RECEIPT.find((type) => type.value === item.type)?.label}</td>
                                        <td>
                                            {
                                                RENDER_STATUS_GOODS_RECEIPT.find((status) => status.value === item.status)
                                                    ?.label
                                            }
                                        </td>
                                        <td>{item.warehouse?.name}</td>
                                        <td>
                                            <div className="btn-container-table btn-action-container">
                                                {/* {item.status === WAITING_IMPORT_GOODS && (
                                                    <Button
                                                        type="button"
                                                        classname="btn-custom btn-icon btn-action detail"
                                                        text="Nh???p kho"
                                                        handleFunction={() => handleImport(item)}
                                                        disable={isLoading}
                                                    />
                                                )} */}
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="chi ti???t"
                                                    handleFunction={() => handleEdit(item)}
                                                />
                                                {item.status === 'WAITING_IMPORT_GOODS' && (
                                                    <Button
                                                        type="button"
                                                        classname="btn-custom btn-icon btn-action delete"
                                                        text="x??a"
                                                        handleFunction={() => {
                                                            Swal.fire({
                                                                title: 'Ch???c ch???n x??a ?',
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
}

export default GoodsReceipt;
