import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { BiDownload, BiPlusCircle } from 'react-icons/bi';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    addGoodsIssue,
    deleteGoodsIssue,
    exportGoods,
    getAllAddGoodsIssue,
    getCurrentGoodsIssue,
} from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, Loading } from '../../components';
import { RENDER_STATUS_GOODS_ISSUE, RENDER_TYPE_GOODS_ISSUE } from '../../constants/warehouse';
import { SearchGoodsReceipt } from './components';

function GoodsIssue() {
    const isLoading = useSelector((state) => state.warehouse.isLoading);
    const listAddGoodsIssue = useSelector((state) => state.warehouse.listAddGoodsIssue);
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
        const fetchAddGoodsIssue = async () => {
            try {
                const action = await dispatch(getAllAddGoodsIssue({ ...state }));
                unwrapResult(action);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchAddGoodsIssue();
    }, [dispatch, state]);
    // const handleGoodsIssue = async (data) => {
    //     try {
    //         let submitData = {
    //             goodsIssueId: data.id,
    //             warehouseId: data.warehouseId,
    //             orderId: data.orderId,
    //             listProduct: [],
    //             type: data.type,
    //         };
    //         data.detailGoodsIssues?.map((item) => {
    //             submitData = {
    //                 ...submitData,
    //                 listProduct: submitData.listProduct.concat([
    //                     {
    //                         quantity: item.quantity,
    //                         unitId: item.unitId,
    //                     },
    //                 ]),
    //             };
    //             return true;
    //         });

    //         const actionExport = await dispatch(exportGoods(submitData));
    //         unwrapResult(actionExport);
    //         const actionGetAll = await dispatch(getAllAddGoodsIssue());
    //         unwrapResult(actionGetAll);
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Xu???t Th??nh C??ng',
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
            const action = await dispatch(deleteGoodsIssue(data));
            unwrapResult(action);
            const actionGetAll = await dispatch(getAllAddGoodsIssue());
            unwrapResult(actionGetAll);
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };
    const handleAdd = () => {
        dispatch(addGoodsIssue());
        navigate('/goods-issue/add-goods-issue');
    };
    const handleEdit = async (data) => {
        dispatch(getCurrentGoodsIssue(data));
        navigate('/goods-issue/add-goods-issue');
    };
    // console.log(handleEdit);
    return (
        <Wrapper>
            <h5>xu???t kho</h5>
            <hr />
            <SearchGoodsReceipt code="GOODS_ISSUE" state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Th??m phi???u xu???t kho"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={handleAdd}
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
                                    <th width="15%">Ng??y Xu???t</th>
                                    <th width="15%">Lo???i Phi???u</th>
                                    <th width="10%">Tr???ng th??i</th>
                                    <th width="10%">Kho</th>
                                    <th width="10%">Thao T??c</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listAddGoodsIssue.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.voucherCode}</td>
                                        <td>{item.receiptCode}</td>
                                        <td>{new Date(`${item.createTime}`).toLocaleString()}</td>
                                        <td>
                                            {item.exportTime ? new Date(`${item.exportTime}`).toLocaleString() : 'Ch??a Xu???t'}
                                        </td>
                                        <td>{RENDER_TYPE_GOODS_ISSUE.find((type) => type.value === item.type)?.label}</td>
                                        <td>
                                            {RENDER_STATUS_GOODS_ISSUE.find((type) => type.value === item.status)?.label}
                                        </td>
                                        <td>{item.warehouse?.name}</td>
                                        <td>
                                            <div className=" btn-action-container btn-container-table">
                                                {/* {item.status === 'WAITING_GET_GOODS' && (
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="Xu???t Kho"
                                                    handleFunction={() => handleGoodsIssue(item)}
                                                    disable={isLoading}
                                                />
                                            )} */}
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="chi ti???t"
                                                    handleFunction={() => handleEdit(item)}
                                                />
                                                {item.status === 'WAITING_GET_GOODS' && (
                                                    <Button
                                                        type="button"
                                                        classname="btn-custom btn-icon btn-action delete"
                                                        text="x??a"
                                                        disable={isLoading}
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

export default GoodsIssue;
