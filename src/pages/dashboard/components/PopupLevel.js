import { BiCheck } from 'react-icons/bi';
import Wrapper from '../../../assets/wrappers/PopupCategory';
import { Button, SelectNotFormik } from '../../../components';
import { memo } from 'react';
import Select from 'react-select';
import { TYPE_VALUE, QUANTITY } from '../../../constants/constants';
import Swal from 'sweetalert2';

const PopupLevel = ({ isEditing, setShowPopupDiscount, listConditionReward, setListConditionReward }) => {
    let i = 0;
    const changeValueDiscount = (e, idx, type) => {
        const newList = [...listConditionReward];
        if (type === 'selectTypeValueDiscount') {
            newList[idx] = {
                ...newList[idx],
                typeDiscount: e.value,
            };
        }
        if (type === 'enterValueDiscount') {
            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số không hợp lệ, thử lại`,
                    showConfirmButton: true,
                });
                return;
            }
            newList[idx] = {
                ...newList[idx],

                discountValue: e.target.value,
            };
        }
        if (type === 'enterMaxAmountDiscount') {
            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số không hợp lệ, thử lại`,
                    showConfirmButton: true,
                });
                return;
            }
            newList[idx] = {
                ...newList[idx],

                maxAmount: e.target.value,
            };
        }
        setListConditionReward(newList);
    };
    return (
        <Wrapper>
            <div className="form-discount">
                <h5>{isEditing ? 'Sửa bảng chiết khấu' : 'Thiết lập bảng chiết khấu'}</h5>
                <hr />
                <div className="form-center-discount">
                    <div className="container-each-product">
                        <div className="discount-products">
                            {listConditionReward.length !== 0 ? (
                                listConditionReward.map((item, idx) => {
                                    if (item.name === QUANTITY) {
                                        i++;

                                        return (
                                            <div className="discount-each-product" key={idx}>
                                                <span>{i}</span>
                                                <input className="form-input" value={item?.productName} disabled />
                                                <input className="form-input" value={item?.unitName} disabled />
                                                <input
                                                    name="valueDiscount"
                                                    className="form-input"
                                                    placeholder="Nhập giá trị chiết khấu"
                                                    value={(+item.discountValue).toLocaleString('en-US')}
                                                    onChange={(e) => changeValueDiscount(e, idx, 'enterValueDiscount')}
                                                />
                                                <div className="select-popup-discount">
                                                    <SelectNotFormik
                                                        options={TYPE_VALUE}
                                                        placeholder="Loại"
                                                        valueState={item.typeDiscount}
                                                        handleChange={(e) =>
                                                            changeValueDiscount(e, idx, 'selectTypeValueDiscount')
                                                        }
                                                    />
                                                </div>

                                                {item?.typeDiscount === '%' && (
                                                    <div className="form-unit">
                                                        <input
                                                            placeholder="Tối Đa"
                                                            className="form-unit-input"
                                                            value={(+item?.maxAmount).toLocaleString('en-US')}
                                                            onChange={(e) =>
                                                                changeValueDiscount(e, idx, 'enterMaxAmountDiscount')
                                                            }
                                                        />
                                                        <span className="prefix-type-discount">VNĐ</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }
                                })
                            ) : (
                                <p className="color-red">Vui lòng cài đặt số lượng sản phẩm ở điều kiện đạt hạn mức</p>
                            )}
                        </div>
                    </div>
                    <div className="btn-container-category">
                        <Button
                            type="button"
                            classname="btn-custom  btn-icon"
                            text="Xong"
                            icon={<BiCheck className="front-icon" />}
                            handleFunction={setShowPopupDiscount}
                        />
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default memo(PopupLevel);
