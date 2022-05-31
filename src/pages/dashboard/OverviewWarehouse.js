import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllWarehouse, overviewReportWarehouse } from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { FormRowNotFormik, SelectNotFormik } from '../../components';

const OverviewWarehouse = () => {
    const dispatch = useDispatch();
    const [warehouseId, setWarehouseId] = useState('');
    const [state, setState] = useState({
        productName: '',
        date:
            new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1).toString().padStart(2, 0) +
            '-' +
            new Date().getDate().toString().padStart(2, 0),
    });
    const listWarehouse = useSelector((state) =>
        state.warehouse.listWarehouse.map((item) => ({
            value: item.id,
            label: item.name,
        }))
    );
    const overviewReport = useSelector((state) => state.warehouse.overviewReportWarehouse);
    //overviewReportWarehouse
    useEffect(() => {
        const fetchData = async () => {
            try {
                const actionResult = await dispatch(getAllWarehouse());
                unwrapResult(actionResult);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log(123);
                const action = await dispatch(overviewReportWarehouse({ warehouseId, ...state }));
                unwrapResult(action);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        if (warehouseId) fetchData();
    }, [warehouseId, state]);

    //console.log(overviewReport);
    let totalQuantity = 0;
    let totalProduct = 0;
    let totalPrice = 0;
    return (
        <Wrapper>
            <h5>báo cáo tồn kho</h5>
            <hr />
            <div className="search-report-detail-warehouse">
                <FormRowNotFormik
                    type="date"
                    valueState={state.date}
                    handleChange={(e) =>
                        setState({
                            ...state,
                            date: e.target.value,
                        })
                    }
                />
                <SelectNotFormik
                    placeholder="Chọn kho"
                    options={listWarehouse}
                    valueState={warehouseId}
                    handleChange={(e) => setWarehouseId(e.value)}
                />
                <FormRowNotFormik
                    type="text"
                    valueState={state.productName}
                    placeholder="Nhập tên sản phẩm"
                    handleChange={(e) =>
                        setState({
                            ...state,
                            productName: e.target.value,
                        })
                    }
                />
            </div>
            <p>Báo cáo đang lọc theo: {overviewReport ? `${overviewReport?.instanceWarehouse?.name}` : '-'}</p>

            {overviewReport && (
                <div className="table table-product">
                    <table>
                        <thead>
                            <tr>
                                <th width="5%" rowSpan="2">
                                    STT
                                </th>
                                <th width="10%" rowSpan="2">
                                    Tên
                                </th>
                                <th width="10%" rowSpan="2">
                                    ĐV
                                </th>
                                <th width="10%" rowSpan="2">
                                    Mã Vạch
                                </th>
                                <th width="35%" colSpan="3">
                                    {overviewReport?.instanceWarehouse?.name}
                                </th>
                                {/* <th width="30%" colSpan="2">
                                    Hệ Thống
                                </th> */}
                            </tr>
                            <tr>
                                <th rowSpan="1" colSpan="1">
                                    Tồn Kho
                                </th>
                                <th rowSpan="1" colSpan="1">
                                    Giá trị Tồn Kho
                                </th>
                                <th rowSpan="1" colSpan="1">
                                    Giá vốn
                                </th>
                                {/* <th rowSpan="1" colSpan="1">
                                    Tồn Kho
                                </th>
                                <th rowSpan="1" colSpan="1">
                                    Giá trị Tồn Kho
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {overviewReport?.instanceWarehouse?.warehouseContainUnits?.map((item, idx) => {
                                // console.log(item.unitId);
                                if (item.unit) {
                                    // console.log(item);
                                    let totalQuantityExport = 0;
                                    let listQuantityExport = overviewReport.objectUnitExported[`${item.unitId}`];
                                    if (listQuantityExport.length === 0) {
                                        totalQuantityExport = 0;
                                    } else {
                                        for (let item of listQuantityExport) {
                                            totalQuantityExport += +item.quantity;
                                        }
                                    }

                                    let totalQuantityImport = 0;
                                    let listQuantityImport = overviewReport.objectUnitImported[`${item.unitId}`];

                                    for (let item of listQuantityImport) {
                                        totalQuantityImport += +item.quantity;
                                    }

                                    let totalQuantityReive = 0;
                                    let listQuantityReceive = overviewReport.objectUnitReceive[`${item.unitId}`];

                                    for (let item of listQuantityReceive) {
                                        totalQuantityReive += +item.quantityTransfer;
                                    }

                                    let totalQuantityTransfer = 0;
                                    let listQuantityTransfer = overviewReport.objectUnitTransfer[`${item.unitId}`];

                                    for (let item of listQuantityTransfer) {
                                        totalQuantityTransfer += +item.quantityTransfer;
                                    }

                                    totalProduct++;
                                    totalPrice +=
                                        (totalQuantityImport +
                                            totalQuantityReive -
                                            totalQuantityExport -
                                            totalQuantityTransfer) *
                                        +item?.unit?.productPrice;
                                    totalQuantity +=
                                        totalQuantityImport +
                                        totalQuantityReive -
                                        totalQuantityExport -
                                        totalQuantityTransfer;
                                    return (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{item?.unit?.product?.name}</td>
                                            <td>{item?.unit?.name}</td>
                                            <td>{item?.unit?.barcode}</td>
                                            <td>
                                                {(
                                                    totalQuantityImport +
                                                    totalQuantityReive -
                                                    totalQuantityExport -
                                                    totalQuantityTransfer
                                                ).toLocaleString('en-US')}
                                            </td>
                                            <td>
                                                {(
                                                    (totalQuantityImport +
                                                        totalQuantityReive -
                                                        totalQuantityExport -
                                                        totalQuantityTransfer) *
                                                    +item?.unit?.productPrice
                                                ).toLocaleString('en-US')}
                                            </td>
                                            <td>{(+item?.unit?.productPrice).toLocaleString('en-US')}</td>
                                            {/* <td>{item?.unit?.barcode}</td> */}

                                            {/* <td>{(+item.quantity).toLocaleString('en-US')}</td>
                                            <td>{(+item.quantity - +quantity).toLocaleString('en-US')}</td>
                                            <td>{+quantity === 0 ? '-' : (+quantity).toLocaleString('en-US')}</td>
                                            <td>
                                                {totalQuantityImport === 0
                                                    ? '-'
                                                    : totalQuantityImport.toLocaleString('en-US')}{' '}
                                            </td> */}
                                        </tr>
                                    );
                                } else return <tr key={idx}></tr>;
                            })}
                        </tbody>
                    </table>
                    <br />

                    <p className="title-black">Tổng sản phẩm: {totalProduct.toLocaleString('en-US')}</p>
                    <p className="title-black">Tổng số lượng tồn: {totalQuantity.toLocaleString('en-US')}</p>
                    <p className="title-black">Tổng giá trị: {totalPrice.toLocaleString('en-US')} VNĐ</p>
                </div>
            )}
        </Wrapper>
    );
};

export default OverviewWarehouse;
