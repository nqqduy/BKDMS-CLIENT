import { memo } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { FaGreaterThanEqual, FaLessThanEqual } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { Button, SelectNotFormik } from '../../../components';
import {
    CONDITION_REGISTER,
    CURRENT_DEBT,
    CURRENT_POINT,
    GET_DISCOUNT,
    MIN_DAY_JOIN,
    QUANTITY,
    REVENUE,
} from '../../../constants/constants';

const ConditionLevel = ({
    listConditionReg,
    setListConditionReg,
    listConditionReward,
    setListConditionReward,
    listProduct,
}) => {
    const listProductRedux = useSelector((state) => state.product.listProduct);

    // condition reward
    const addConditionReward = () => {
        setListConditionReward([
            ...listConditionReward,
            {
                name: '',
                value: '',
                productId: '',
                productName: '',
                unitName: '',
                unitId: '',
                discountValue: '',
                typeDiscount: '',
                maxAmount: '',
                unitList: [], // render
            },
        ]);
    };

    const changeValueConditionReward = (e, idx, type) => {
        const newList = [...listConditionReward];
        if (type === 'enterValue') {
            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số không hợp lệ, thử lại`,
                    showConfirmButton: true,
                });
                return;
            }
            newList[idx] = { ...newList[idx], value: e.target.value };
        } else {
            if (type === 'selectName') {
                if (e.value === REVENUE) {
                    for (let i = 0; i < newList.length; i++) {
                        if (i === idx) continue; // trùng vs cái hiện tại không so sánh
                        if (newList[i].name === e.value) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Doanh thu đã tồn tại trong bảng',
                                showConfirmButton: true,
                            });
                            return;
                        }
                    }
                    newList[idx] = {
                        ...newList[idx],
                        name: e.value,
                        value: newList[idx].value,
                        maxAmount: '',
                        typeDiscount: '',
                        discountValue: '',
                        unitId: '',
                    };
                } else {
                    // số lượng
                    newList[idx] = {
                        ...newList[idx],
                        name: e.value,
                        value: '',
                        productId: '',
                        productName: '',
                        unitName: '',
                        unitId: '',
                        discountValue: '',
                        typeDiscount: '',
                        maxAmount: '',
                        unitList: [], // render
                    };
                }
            }
            if (type === 'selectProduct') {
                // handle list unit of product
                const product = listProductRedux.find((product) => product.id === e.value);
                let newUnitList = product?.units?.map((unit) => ({ value: unit.id, label: unit.name }));

                newList[idx] = {
                    ...newList[idx],

                    value: '',
                    productId: e.value,
                    productName: e.label,
                    unitName: '',
                    unitId: '',
                    discountValue: '',
                    typeDiscount: '',
                    maxAmount: '',
                    unitList: newUnitList, // render
                };
            }
            if (type === 'selectUnit') {
                for (let i = 0; i < newList.length; i++) {
                    if (i === idx) continue; // trùng vs cái hiện tại không so sánh
                    if (newList[i].unitId === e.value) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Sản phẩm theo đơn vị đã tồn tại trong bảng',
                            showConfirmButton: true,
                        });
                        return;
                    }
                }
                newList[idx] = {
                    ...newList[idx],
                    unitName: e.label,
                    unitId: e.value,
                };
            }
        }
        setListConditionReward(newList);
    };
    const deleteConditionReward = (idx) => {
        const newList = [...listConditionReward];
        newList.splice(idx, 1);
        setListConditionReward(newList);
    };

    // condition register
    const addConditionReg = () => {
        setListConditionReg([
            ...listConditionReg,
            {
                name: '',
                value: '',
            },
        ]);
    };

    const changeValueConditionReg = (e, idx, type) => {
        const newList = [...listConditionReg];
        if (type === 'SELECT_VALUE') {
            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số không hợp lệ, thử lại`,
                    showConfirmButton: true,
                });
                return;
            }
            newList[idx] = { ...newList[idx], value: e.target.value };
        } else if (type === 'SELECT_NAME') {
            for (let i = 0; i < newList.length; i++) {
                if (i === idx) continue; // trùng vs cái hiện tại không so sánh
                if (newList[i].name === e.value) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Tên điều kiện đã có trong bảng',
                        showConfirmButton: true,
                    });
                    return;
                }
            }
            newList[idx] = { ...newList[idx], name: e.value };
        }
        setListConditionReg(newList);
    };

    const deleteConditionReg = (idx) => {
        const newList = [...listConditionReg];
        newList.splice(idx, 1);
        setListConditionReg(newList);
    };
    return (
        <div className="condition-level">
            <div className="flex-1-level">
                <p className="title-form">Điều kiện đạt hạn mức</p>
                {listConditionReward.map((item, idx) => (
                    <div className="condition-reward" key={idx}>
                        <div className="type-condition-get-discount">
                            <SelectNotFormik
                                menuPlacement="top"
                                placeholder="Chọn Điều Kiện"
                                options={GET_DISCOUNT}
                                valueState={item.name}
                                handleChange={(e) => changeValueConditionReward(e, idx, 'selectName')}
                            />
                        </div>
                        {item.name === QUANTITY ? (
                            <div className="form-row-two-input-notComponent">
                                <SelectNotFormik
                                    placeholder="Chọn sản phẩm"
                                    options={listProduct ? listProduct : []}
                                    valueState={item.productId}
                                    handleChange={(e) => changeValueConditionReward(e, idx, 'selectProduct')}
                                />
                                <SelectNotFormik
                                    placeholder="đơn vị"
                                    valueState={item.unitId}
                                    options={item.unitList ? item.unitList : []}
                                    handleChange={(e) => changeValueConditionReward(e, idx, 'selectUnit')}
                                />
                            </div>
                        ) : (
                            <>
                                <span></span>
                            </>
                        )}
                        <span>
                            <FaGreaterThanEqual color="#438ffe" />
                        </span>
                        <div className="form-unit">
                            <input
                                placeholder="Nhập Giá Trị"
                                name="quantityConditionReward"
                                className="form-unit-input"
                                value={(+item.value).toLocaleString('en-US')}
                                onChange={(e) => changeValueConditionReward(e, idx, 'enterValue')}
                            />
                            <span>{(item.name === REVENUE && 'VNĐ') || (item.unitName && item.unitName)}</span>
                        </div>

                        <Button
                            type="button"
                            text="Xóa"
                            classname="btn-outline-delete"
                            handleFunction={() => deleteConditionReward(idx)}
                        />
                    </div>
                ))}
                <Button
                    type="button"
                    text="Thêm hàng"
                    classname="btn-custom btn-icon"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={addConditionReward}
                />
            </div>
            <div className="flex-1-level">
                <p className="title-form">Điều kiện đăng ký</p>
                {listConditionReg.map((item, idx) => (
                    <div className="condition-register" key={idx}>
                        <div className="css-react-select">
                            <SelectNotFormik
                                menuPlacement="top"
                                placeholder="Chọn Điều Kiện"
                                options={CONDITION_REGISTER}
                                valueState={item.name}
                                handleChange={(e) => changeValueConditionReg(e, idx, 'SELECT_NAME')}
                            />
                        </div>
                        <span>
                            {item.name !== CURRENT_DEBT ? (
                                <FaGreaterThanEqual color="#438ffe" />
                            ) : (
                                <FaLessThanEqual color="#438ffe" />
                            )}
                        </span>
                        <div className="form-unit">
                            <input
                                name="valueConditionReg"
                                placeholder=" Nhập Giá Trị"
                                className="form-unit-input"
                                value={item.value && (+item.value).toLocaleString('en-US')}
                                onChange={(e) => changeValueConditionReg(e, idx, 'SELECT_VALUE')}
                            />
                            <span>
                                {((item.name === REVENUE || item.name === CURRENT_DEBT) && 'VNĐ') ||
                                    // (item.name === CURRENT_POINT && 'Điểm') ||
                                    (item.name === MIN_DAY_JOIN && 'Ngày')}
                            </span>
                        </div>

                        <Button
                            type="button"
                            text="Xóa"
                            classname="btn-outline-delete"
                            handleFunction={() => deleteConditionReg(idx)}
                        />
                    </div>
                ))}

                <Button
                    type="button"
                    text="Thêm hàng"
                    classname="btn-custom btn-icon"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={addConditionReg}
                />
            </div>
        </div>
    );
};

export default memo(ConditionLevel);
