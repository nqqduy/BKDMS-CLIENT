import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllWarehouse, getWarehouseContainUnit } from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { FormRowNotFormik, SelectNotFormik } from '../../components';
import { PopDeReWare } from './components';

const DetailWarehouse = () => {
    const dispatch = useDispatch();
    const [warehouseId, setWarehouseId] = useState('');
    const [state, setState] = useState({
        productName: '',
    });
    const listWarehouse = useSelector((state) =>
        state.warehouse.listWarehouse.map((item) => ({
            value: item.id,
            label: item.name,
        }))
    );
    const warehouseContainUnit = useSelector((state) => state.warehouse.warehouseContainUnit);
    const [showPopup, setShowPopup] = useState({
        data: [],
        show: false,
        type: '',
    });

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
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log(123);
                const action = await dispatch(getWarehouseContainUnit({ warehouseId, ...state }));
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

    //console.log(warehouseContainUnit);
    return (
        <Wrapper>
            <h5>B??o c??o t???n kho chi ti???t</h5>
            <hr />
            <div className="search-report-detail-warehouse">
                <SelectNotFormik
                    placeholder="Ch???n kho"
                    options={listWarehouse}
                    valueState={warehouseId}
                    handleChange={(e) => setWarehouseId(e.value)}
                />
                <FormRowNotFormik
                    valueState={state.productName}
                    placeholder="Nh???p t??n s???n ph???m"
                    handleChange={(e) =>
                        setState({
                            productName: e.target.value,
                        })
                    }
                />
            </div>
            <p>B??o c??o ??ang l???c theo: {warehouseContainUnit ? `${warehouseContainUnit?.listInstance?.name}` : '-'}</p>
            {warehouseContainUnit && (
                <div className="table table-product">
                    <table>
                        <thead>
                            <tr>
                                <th width="5%">STT</th>
                                <th width="20%">T??n</th>
                                <th width="10%">??V</th>
                                <th width="10%">M?? V???ch</th>
                                <th width="15%">T???n Kho</th>
                                <th width="15%">C?? Th??? B??n</th>
                                <th width="15%">??ang Giao D???ch</th>
                                <th width="15%">S??? Nh???p</th>
                            </tr>
                        </thead>
                        <tbody>
                            {warehouseContainUnit?.listInstance?.warehouseContainUnits?.map((item, idx) => {
                                // console.log(item.unitId);
                                if (item.unit) {
                                    let quantity = 0;
                                    let listQuantity = warehouseContainUnit.objectUnitWillExport[`${item.unitId}`];
                                    if (listQuantity.length === 0) {
                                        quantity = 0;
                                    } else {
                                        for (let item of listQuantity) {
                                            quantity += +item.quantity;
                                        }
                                    }

                                    let totalQuantityImport = 0;
                                    let listImport = [];
                                    for (let key in warehouseContainUnit.objectUnitWillImport) {
                                        if (key === item.unitId) {
                                            //console.log(warehouseContainUnit.objectUnitWillImport[key], idx);
                                            listImport = listImport.concat(warehouseContainUnit.objectUnitWillImport[key]);

                                            for (let item of warehouseContainUnit.objectUnitWillImport[key]) {
                                                totalQuantityImport += +item.quantity;
                                            }
                                        }
                                    }

                                    return (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{item?.unit?.product?.name}</td>
                                            <td>{item?.unit?.name}</td>
                                            <td>{item?.unit?.barcode}</td>
                                            <td>{(+item.quantity).toLocaleString('en-US')}</td>
                                            <td>{(+item.quantity - +quantity).toLocaleString('en-US')}</td>
                                            <td
                                                className={+quantity !== 0 ? 'title-report' : ''}
                                                onClick={() => {
                                                    if (listQuantity.length !== 0)
                                                        setShowPopup({
                                                            data: listQuantity,
                                                            show: true,
                                                            type: 'EXPORT',
                                                        });
                                                }}
                                            >
                                                {+quantity === 0 ? '-' : (+quantity).toLocaleString('en-US')}
                                            </td>
                                            <td
                                                className={+totalQuantityImport !== 0 ? 'title-report' : ''}
                                                onClick={() => {
                                                    if (listQuantity.length !== 0)
                                                        setShowPopup({
                                                            data: listImport,
                                                            show: true,
                                                            type: 'IMPORT',
                                                        });
                                                }}
                                            >
                                                {' '}
                                                {totalQuantityImport === 0
                                                    ? '-'
                                                    : totalQuantityImport.toLocaleString('en-US')}{' '}
                                            </td>
                                        </tr>
                                    );
                                } else return <tr key={idx}></tr>;
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {showPopup.show && <PopDeReWare showPopup={showPopup} setShowPopup={setShowPopup} />}
        </Wrapper>
    );
};

export default DetailWarehouse;
