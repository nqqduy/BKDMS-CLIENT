import { Image } from 'cloudinary-react';
import React, { useEffect } from 'react';
import { MdPayment } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/DashboardDelivery';
import { ORDER_TYPE, PAYMENT_TYPE } from '../../constants/order';
import { STATUS_WAY_BILL } from '../../constants/warehouse';

const ConfigDelivery = () => {
    let currentWayBill = useSelector((state) => state.warehouse.currentWayBill);
    let isLoading = useSelector((state) => state.warehouse.isLoading);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentWayBill) {
            navigate('/delivery-order');
        }
    }, [currentWayBill, navigate]);
    let totalPayment = 0;
    return (
        <Wrapper>
            {currentWayBill && (
                <div className="container-delivery">
                    <div className="config-delivery">
                        <h5 className="title-delivery">Chi tiết vận đơn #{currentWayBill?.receiptCode}</h5>
                        <hr />
                        <p className="title-table">
                            Tình trạng: {STATUS_WAY_BILL.find((item) => item.value === currentWayBill.status)?.label}
                        </p>
                        <div className="list-product-container">
                            <br />
                            {currentWayBill?.goodsIssue?.detailGoodsIssues?.map((item, index) => {
                                let price = currentWayBill.order.orderDetails.find((i) => i.unitId === item.unitId).price;
                                totalPayment += +item.quantity * +price;
                                // console.log(totalPayment, item.quantity, price);
                                return (
                                    <div className="product" key={index}>
                                        <Image
                                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                                            crop="scale"
                                            publicId={item?.unit?.product?.linkImg}
                                            width="100"
                                            alt="ảnh sản phẩm"
                                        />
                                        <div className="product-info">
                                            <p className="title-order-hightLine">{item?.unit?.product?.name}</p>

                                            <p className="title-order">
                                                Số lượng:{' '}
                                                <span className="hightLine">{`${(+item?.quantity).toLocaleString('en-US')} ${
                                                    item?.unit?.name
                                                }`}</span>
                                            </p>
                                            <p className="title-order">
                                                Đơn giá:{' '}
                                                <span className="hightLine">{`${(+price).toLocaleString(
                                                    'en-US'
                                                )} VNĐ`}</span>
                                            </p>
                                            <p className="title-order">
                                                Mã vạch: <span className="hightLine ">{item?.unit?.barcode} </span>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="total">
                            <p>
                                Tổng tiền: <span>{totalPayment.toLocaleString('en-US')} VNĐ </span>
                            </p>
                        </div>
                        <p className=" payment-delivery">
                            <MdPayment className="front-icon payment-icon" />
                            {currentWayBill?.order &&
                                PAYMENT_TYPE.find((status) => status.value === currentWayBill?.order?.paymentType)?.label}
                        </p>
                    </div>
                    <div className="config-delivery-info">
                        <div className="order-info">
                            <h5 className="title-delivery-info">Thông tin gởi hàng</h5>
                            <p className="title-order">
                                Mã Đơn hàng: <span className="hightLine">{currentWayBill?.order?.orderCode}</span>
                            </p>
                            <p className="title-order">
                                Loại Đơn:{' '}
                                <span className="hightLine">
                                    {currentWayBill?.order?.type &&
                                        ORDER_TYPE.find((status) => status.value === currentWayBill?.order?.type)?.label}
                                </span>
                            </p>

                            <p className="title-order">
                                Doanh Nghiệp: <span className="hightLine">{currentWayBill?.sendName}</span>
                            </p>
                            <p className="title-order">
                                Số Điện Thoại: <span className="hightLine">{currentWayBill?.sendPhone}</span>
                            </p>
                            <p className="title-order">
                                Kho hàng: <span className="hightLine">{currentWayBill?.goodsIssue?.warehouse?.name}</span>
                            </p>
                            <p className="title-order">
                                Địa Chỉ: <span className="hightLine">{currentWayBill?.goodsIssue?.warehouse?.address}</span>
                            </p>
                        </div>
                        <hr />
                        <div className="receive-info">
                            <h5 className="title-delivery-info">Thông tin nhận hàng</h5>
                            <p className="title-order">
                                Đại lý: <span className="hightLine">{currentWayBill?.receiptName}</span>
                            </p>
                            <p className="title-order">
                                Số điện thoại: <span className="hightLine">{currentWayBill?.receiptPhone}</span>
                            </p>
                            <p className="title-order">
                                Địa chỉ: <span className="hightLine">{currentWayBill?.receiptAddress}</span>
                            </p>
                            {/* <p className="title-order">
                            Lý do trả: <span className="hightLine">{currentWayBill}</span>
                        </p> */}
                        </div>
                    </div>
                </div>
            )}
            {/* <div className="container-button">
                {isLoading ? (
                    <Loading center />
                ) : (
                    
                    <Button
                        type="submit"
                        classname="btn-custom btn-icon"
                        text="Tạo phiếu"
                        icon={<BiCheck className="front-icon" />}
                        // handleFunction={handleCreateAddGoodsIssue}
                    />
                )}
            </div> */}
        </Wrapper>
    );
};

export default ConfigDelivery;
