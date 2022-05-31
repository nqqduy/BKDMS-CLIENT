import { Image } from 'cloudinary-react';
import React, { memo } from 'react';
import { MdPayment } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { SelectNotFormik } from '../../../components';
import { ORDER_STATUS, PAYMENT_TYPE } from '../../../constants/order';

const DeliveryDetail = ({ handleSubmit, dataSubmit }) => {
    const currentOrder = useSelector((state) => state.delivery.currentOrder);
    const listWarehouse = useSelector((state) =>
        state.warehouse.listWarehouse.map((item) => ({
            value: item.id,
            label: item.name,
        }))
    );

    return (
        <div className="delivery-detail">
            <h5 className="title-delivery">Chi tiết đơn hàng #{currentOrder?.orderCode}</h5>
            <hr />
            <p className="title-table">
                Tình trạng:{' '}
                {currentOrder?.orderStatus &&
                    ORDER_STATUS.find((status) => status.value === currentOrder.orderStatus)?.label}
            </p>
            <div className="list-product-container">
                {currentOrder?.orderDetails &&
                    currentOrder?.orderDetails?.map((order, idx) => {
                        let unitId = order?.unitId;
                        let warehouseAddress = '';
                        let quantity = order?.quantity;

                        return (
                            <div className="product" key={idx}>
                                <Image
                                    cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                                    crop="scale"
                                    publicId={order?.unit?.product?.linkImg}
                                    width="100"
                                    alt="ảnh sản phẩm"
                                />
                                <div className="product-info">
                                    <p className="title-order-hightLine">{order?.unit?.product?.name}</p>
                                    <p className="title-order">
                                        Giá: <span className="hightLine">{(+order?.price).toLocaleString('en-US')} VNĐ</span>
                                    </p>
                                    <p className="title-order">
                                        Số lượng:{' '}
                                        <span className="hightLine">{`${(+order?.quantity).toLocaleString('en-US')} ${
                                            order?.unit?.name
                                        }`}</span>
                                    </p>

                                    <p className="title-order">
                                        Tổng tiền:{' '}
                                        <span className="hightLine ">
                                            {(+order?.totalPrice).toLocaleString('en-US')} VNĐ
                                        </span>
                                    </p>
                                </div>
                                {((currentOrder.type === 'PURCHASE_ORDER' &&
                                    (!order.isWaitingExport || order.isDeliveryFailed)) ||
                                    (currentOrder.type === 'RETURN_ORDER' && !order.isWaitingImport)) && (
                                    //isWaitingImport

                                    <div className="warehouse-info">
                                        <>
                                            <SelectNotFormik
                                                options={listWarehouse}
                                                placeholder="Chọn kho"
                                                notLabel
                                                handleChange={(e) =>
                                                    handleSubmit(
                                                        e,
                                                        idx,
                                                        { unitId, warehouseAddress, quantity, price: order?.price },
                                                        'SELECT_WAREHOUSE'
                                                    )
                                                }
                                                valueState={dataSubmit?.listWarehouse[idx]?.warehouseId}
                                            />

                                            <p className="title-order ">
                                                Trạng thái:{' '}
                                                <span
                                                    className={
                                                        dataSubmit.listWarehouse[idx]?.status === 'NOT_OK'
                                                            ? 'color-red'
                                                            : ' color-green'
                                                    }
                                                >
                                                    {dataSubmit.listWarehouse[idx]?.status === 'NOT_OK' &&
                                                        `Không hợp lệ, ${dataSubmit.listWarehouse[idx]?.warehouseName} có thể còn số lượng là ${dataSubmit.listWarehouse[idx]?.quantityStock}`}

                                                    {dataSubmit.listWarehouse[idx]?.status === 'OK' &&
                                                        `Hợp lệ, ${dataSubmit.listWarehouse[idx]?.warehouseName} có thể còn số lượng là ${dataSubmit.listWarehouse[idx]?.quantityStock}`}
                                                </span>
                                            </p>
                                        </>
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>
            <div className="total">
                <p>
                    Tổng tiền:{' '}
                    <span>
                        {currentOrder?.totalPayment ? (+currentOrder?.totalPayment).toLocaleString('en-US') : '0'} VNĐ{' '}
                    </span>
                </p>
            </div>

            <div className="payment">
                <p>
                    <MdPayment className="front-icon payment-icon" />
                    {currentOrder?.paymentType &&
                        PAYMENT_TYPE.find((status) => status.value === currentOrder?.paymentType)?.label}
                </p>
            </div>
        </div>
    );
};

export default memo(DeliveryDetail);
