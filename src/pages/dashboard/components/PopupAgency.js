import { unwrapResult } from '@reduxjs/toolkit';
import { memo, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdPayment } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAgency } from '../../../app/agency/agencySlice';
import { codPayment, getAllPaymentByAgency } from '../../../app/payment/paymentSlice';
import Wrapper from '../../../assets/wrappers/PopupCategory';
import { Button, FormRowNotFormik, Loading, SelectNotFormik } from '../../../components';
import { TYPE_PAYMENT_DEBT, STATUS_PAYMENT_DEBT } from '../../../constants/order';
const PopupAgency = ({ setShowPopup, showPopup }) => {
    const isLoading = useSelector((state) => state.payment.isLoading);
    const listPayment = useSelector((state) => state.payment.listPayment);
    const currentAgency = useSelector((state) => state.agency.currentAgency);

    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllPaymentByAgency = async () => {
            try {
                const actionResult = await dispatch(getAllPaymentByAgency({ agencyId: currentAgency.id }));
                unwrapResult(actionResult);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };
        if (currentAgency) fetchAllPaymentByAgency();
    }, []);

    const handlePayment = async () => {
        try {
            if (!date) {
                Swal.fire({
                    icon: 'warning',
                    title: `Vui lòng chọn ngày`,
                    showConfirmButton: true,
                });
                return;
            }
            if (!paymentType) {
                Swal.fire({
                    icon: 'warning',
                    title: `Vui lòng chọn loại thanh toán`,
                    showConfirmButton: true,
                });
                return;
            }
            if (+amount <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số tiền phải lớn hơn 0`,
                    showConfirmButton: true,
                });
                return;
            }
            // console.log(currentAgency);
            // if (new Date(`${currentAgency.debtStartTime}` > new Date(`${date}`))) {
            //     Swal.fire({
            //         icon: 'warning',
            //         title: `Số tiền phải lớn hơn 0`,
            //         showConfirmButton: true,
            //     });
            //     return;
            // }
            // return;

            const action = await dispatch(
                codPayment({ amount: amount, agencyId: currentAgency.id, type: paymentType, date: date })
            );
            unwrapResult(action);
            setAmount('');
            setDate('');
            setPaymentType('');
            const result = await Promise.all([
                dispatch(getAllPaymentByAgency({ agencyId: currentAgency.id })),
                dispatch(getAgency({ agencyId: currentAgency.id })),
            ]);

            unwrapResult(result[0]);
            unwrapResult(result[1]);
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };

    const handleChangeAmount = async (e) => {
        e.target.value = e.target.value.split(',').join('');

        if (!isFinite(+e.target.value)) {
            Swal.fire({
                icon: 'warning',
                title: `Số không hợp lệ, thử lại`,
                showConfirmButton: true,
            });
            return;
        }
        if (+e.target.value > +currentAgency.currentTotalDebt) {
            e.target.value = currentAgency.currentTotalDebt;
        }
        setAmount(e.target.value);
    };

    return (
        <Wrapper>
            <div className="form-agency">
                <h5>Chi tiết thanh toán</h5>
                <hr />
                <div className="debt-container">
                    <p>
                        Tổng nợ:{' '}
                        <span className="color-red">{(+currentAgency.currentTotalDebt).toLocaleString('en-US')} VNĐ</span>
                    </p>
                    <div className="payment-debt">
                        <FormRowNotFormik
                            type="text"
                            placeholder="Nhập số tiền"
                            labelText="Số tiền trả"
                            valueState={(+amount).toLocaleString('en-US')}
                            handleChange={handleChangeAmount}
                        />
                        <FormRowNotFormik
                            type="date"
                            labelText="Ngày trả"
                            valueState={date}
                            handleChange={(e) => setDate(e.target.value)}
                            min={currentAgency.debtStartTime}
                        />
                        <SelectNotFormik
                            labelText="Loại thanh toán"
                            placeholder="Chọn loại thanh toán"
                            options={TYPE_PAYMENT_DEBT.map((item) => {
                                if (item.value === 'ONLINE_PAYMENT' || item.value === 'ORDER_PAYMENT')
                                    return { ...item, isDisabled: true };
                                return item;
                            })}
                            handleChange={(e) => setPaymentType(e.value)}
                            valueState={paymentType}
                        />

                        <Button
                            type="button"
                            classname="btn-custom  btn-icon detail height-3word"
                            text="Thanh Toán"
                            icon={<MdPayment className="front-icon" />}
                            handleFunction={handlePayment}
                            disable={isLoading}
                        />
                    </div>
                    {isLoading ? (
                        <Loading center />
                    ) : (
                        <div className="table">
                            <table>
                                <thead>
                                    <tr>
                                        <th width="5%">STT</th>
                                        <th width="20%">Số Tiền Trả</th>
                                        <th width="20%">Ngày Trả</th>
                                        <th width="15%">Loại Thanh Toán</th>
                                        <th width="15%">Trạng Thái</th>
                                        <th width="25%">Tổng Nợ Còn Lại</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listPayment.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{(+item.amount).toLocaleString('en-US')} VNĐ</td>
                                            <td>{new Date(`${item.time}`).toLocaleString()}</td>
                                            <td>{TYPE_PAYMENT_DEBT.find((i) => i.value === item.type)?.label}</td>
                                            <td>{STATUS_PAYMENT_DEBT.find((i) => i.value === item.status)?.label}</td>
                                            <td>{(+item.currentTotalDebt).toLocaleString('en-US')} VNĐ</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="btn-container-agency">
                    {/* <Button
                                type="submit"
                                classname="btn-custom  btn-icon"
                                text='Thanh Toán'
                                icon={<BiPlusCircle className="front-icon" />}
                            /> */}
                    <Button
                        type="button"
                        classname="btn-custom  btn-icon btn-delete"
                        text="Thoát"
                        icon={<AiOutlineDelete className="front-icon" />}
                        handleFunction={() => setShowPopup(!showPopup)}
                    />
                </div>
            </div>
        </Wrapper>
    );
};

export default memo(PopupAgency);
