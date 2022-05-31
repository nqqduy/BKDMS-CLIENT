import { AiOutlineDelete } from 'react-icons/ai';
import Wrapper from '../../../assets/wrappers/PopupCategory';
import { Button } from '../../../components';
import { ORDER_TYPE, TYPE_PAYMENT_DEBT } from '../../../constants/order';

const PopupReDebt = ({ setShowPopup, showPopup }) => {
    return (
        <Wrapper>
            <div className="form-agency">
                <h5>
                    Lý do phát sinh công nợ{' '}
                    {showPopup.type === 'DEBT_DECREASE' ? `giảm của ${showPopup.name} ` : `Tăng ${showPopup.name}`}
                </h5>
                <hr />
                <div className="table table-product">
                    <table>
                        <thead>
                            <tr>
                                <th width="5%">STT</th>
                                <th width="20%">Thời Gian</th>
                                <th width="25%">Mã Đơn</th>
                                <th width="25%">Loại</th>
                                <th width="25%">Tổng tiền</th>
                            </tr>

                            <tr>
                                <td className="title-black" colSpan={4}>
                                    Tổng
                                </td>
                                {/* <td></td>
                                <td></td> */}

                                <td className="title-black" colSpan="1">
                                    {showPopup?.total.toLocaleString('en-US')}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {showPopup?.data?.map((item, idx) => {
                                if (showPopup.type === 'DEBT_INCREASE')
                                    return (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{new Date(`${item.deliveredTime}`).toLocaleString()}</td>
                                            <td>{item.orderCode}</td>
                                            <td>{ORDER_TYPE.find((i) => i.value === item.type)?.label}</td>
                                            <td>{(+item.totalPayment).toLocaleString('en-US')}</td>
                                        </tr>
                                    );
                                else if (showPopup.type === 'DEBT_DECREASE') {
                                    return (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{new Date(`${item.time}`).toLocaleString()}</td>
                                            <td></td>
                                            <td>{TYPE_PAYMENT_DEBT.find((i) => i.value === item.type)?.label}</td>
                                            <td>{(+item.amount).toLocaleString('en-US')}</td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="btn-container-category">
                    <Button
                        type="button"
                        classname="btn-custom  btn-icon btn-delete"
                        text="Hủy"
                        icon={<AiOutlineDelete className="front-icon" />}
                        handleFunction={() =>
                            setShowPopup({
                                data: null,
                                show: false,
                                type: '',
                                name: null,
                            })
                        }
                    />
                </div>
            </div>
        </Wrapper>
    );
};

export default PopupReDebt;
