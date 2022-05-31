import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getInfoOfUnitInWarehouse, getWarehouseContainUnit } from '../../app/warehouse/warehouseSlice';
import { Button, Loading } from '../../components';

import Wrapper from '../../assets/wrappers/DashboardCommon';
import { LIST_STATUS } from '../../constants/warehouse';
import { Image } from 'cloudinary-react';
import { PopupContainProduct } from './components/';

const ContainProduct = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const warehouseContainUnit = useSelector((state) => state.warehouse.warehouseContainUnit);
    const isLoading = useSelector((state) => state.warehouse.isLoading);
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        const fetchContainProduct = async () => {
            try {
                const action = await dispatch(getWarehouseContainUnit({ warehouseId: params.warehouseId }));
                unwrapResult(action);
            } catch (error) {
                Swal.fire({
                    //icon: 'warning',
                    title: `Không hợp lệ`,
                    showConfirmButton: true,
                });
                navigate('/warehouse');
            }
        };

        fetchContainProduct();
    }, [dispatch, params.warehouseId, navigate]);

    if (isLoading) {
        return <Loading center />;
    }

    const handleEdit = async (unitId) => {
        setShowPopup(true);
        await dispatch(getInfoOfUnitInWarehouse({ unitId }));
    };
    return (
        <>
            {warehouseContainUnit && (
                <Wrapper>
                    <h5>{`Danh sách sản phẩm kho hàng ${warehouseContainUnit?.listInstance?.name}`}</h5>
                    <hr />
                    <p>
                        <span className="title-table">Tình trạng:</span>{' '}
                        <span
                            className={
                                warehouseContainUnit?.listInstance?.status === 'ACTIVE' ? `effect-green` : 'effect-red'
                            }
                        >
                            {LIST_STATUS.find((item) => item.value === warehouseContainUnit?.listInstance?.status)?.label}
                        </span>
                    </p>
                    <p>
                        <span className="title-table">Địa Chỉ:</span> {warehouseContainUnit?.listInstance?.address}
                    </p>

                    <div className="table table-product">
                        <table>
                            <thead>
                                <tr>
                                    <th width="5%">STT</th>
                                    <th width="25%">Tên</th>
                                    <th width="15%">Ảnh</th>
                                    <th width="15%">Đơn Vị</th>
                                    <th width="25%">Số Lượng</th>
                                    <th width="15%">Mã Vạch</th>
                                    {/* <th width="10%">Thao tác</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {warehouseContainUnit?.listInstance?.warehouseContainUnits?.map((item, idx) => {
                                    let quantityUnitWillExport = warehouseContainUnit.objectUnitWillExport[`${item.unitId}`];
                                    //console.log(quantityUnitWillExport);
                                    return (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{item?.unit?.product?.name}</td>
                                            <td>
                                                <Image
                                                    cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                                                    crop="scale"
                                                    publicId={item?.unit?.product?.linkImg}
                                                    width="100"
                                                />
                                            </td>
                                            <td>{item?.unit?.name}</td>
                                            <td>{(+item.quantity).toLocaleString('en-US')}</td>
                                            <td>{item?.unit?.barcode}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {showPopup && <PopupContainProduct setShowPopup={setShowPopup} />}
                </Wrapper>
            )}
        </>
    );
};

export default ContainProduct;
