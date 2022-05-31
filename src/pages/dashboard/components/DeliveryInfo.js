import { memo } from 'react';
import { useSelector } from 'react-redux';
import { SelectNotFormik } from '../../../components';
import { ORDER_STATUS, ORDER_TYPE } from '../../../constants/order';

const DeliveryInfo = ({ handleSubmit, employeeId /* handleSubmit, dataSubmit */ }) => {
    const currentOrder = useSelector((state) => state.delivery.currentOrder);
    const listEmployee = useSelector((state) =>
        state.user.listEmployee.map((item) => ({
            value: item.id,
            label: item.fullName,
        }))
    );

    return (
        <div className="delivery-info">
            <SelectNotFormik
                labelText="Nhân viên phụ trách"
                placeholder="Chọn nhân viên"
                handleChange={(e) => handleSubmit(e, 1, {}, 'SELECT_EMPLOYEE')}
                options={listEmployee}
                valueState={employeeId}
            />
            <div className="order-info">
                <h5 className="title-delivery-info">Thông tin đơn hàng</h5>
                <p className="title-order">
                    Mã Đơn hàng: <span className="hightLine">{currentOrder?.orderCode}</span>
                </p>
                <p className="title-order">
                    Loại Đơn:{' '}
                    <span className="hightLine">
                        {currentOrder?.type && ORDER_TYPE.find((status) => status.value === currentOrder?.type)?.label}
                    </span>
                </p>
                <p className="title-order">
                    Tình trạng đơn:{' '}
                    <span className="hightLine">
                        {currentOrder?.orderStatus &&
                            ORDER_STATUS.find((status) => status.value === currentOrder?.orderStatus)?.label}
                    </span>
                </p>
                <p className="title-order">
                    Thời gian tạo:{' '}
                    <span className="hightLine-date">{new Date(`${currentOrder?.createTime}`).toLocaleString()}</span>
                </p>
                <p className="title-order">
                    Ghi chú: <span className="hightLine">{currentOrder?.note}</span>
                </p>
            </div>
            <hr />
            <div className="receive-info">
                <h5 className="title-delivery-info">
                    {currentOrder?.type === 'PURCHASE_ORDER' ? 'Thông tin nhận hàng' : 'Thông tin gởi hàng'}
                </h5>
                <p className="title-order">
                    Đại lý: <span className="hightLine">{currentOrder?.agency?.name}</span>
                </p>
                <p className="title-order">
                    Số điện thoại: <span className="hightLine">{currentOrder?.phone}</span>
                </p>
                <p className="title-order">
                    Địa chỉ: <span className="hightLine">{currentOrder?.address}</span>
                </p>
                {currentOrder?.type === 'RETURN_ORDER' && (
                    <p className="title-order">
                        Lý do trả: <span className="hightLine">{currentOrder?.returnReason}</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default memo(DeliveryInfo);
