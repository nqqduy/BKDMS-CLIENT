import { BiPlusCircle } from 'react-icons/bi';
import Select from 'react-select';
import { Button, SelectNotFormik } from '../../../components';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const Gift = ({ listProduct, listGift, setListGift }) => {
    const listProductRedux = useSelector((state) => state.product.listProduct);

    const addGift = () => {
        setListGift([
            ...listGift,
            {
                productName: '',
                productId: '',
                quantity: '',
                // selectUnit: '',
                unitId: '',
                unitName: '', // render unit name
                unitList: [], // render unit list
            },
        ]);
    };

    const changeValueGift = (e, idx, type) => {
        const newList = [...listGift];
        if (type === 'quantityGift') {
            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số không hợp lệ, thử lại`,
                    showConfirmButton: true,
                });
                return;
            }
            newList[idx] = { ...newList[idx], quantity: e.target.value };
        } else if (type === 'selectProduct') {
            // let listUnit = e.value.listUnit.map((unit) => ({ value: unit.id, label: unit.name }));
            const product = listProductRedux.find((product) => product.id === e.value);
            // handle unit list
            let newUnitList = product?.units?.map((unit) => ({ value: unit.id, label: unit.name }));

            newList[idx] = {
                ...newList[idx],
                productName: e.label,
                productId: e.value,
                quantity: '',
                // selectUnit: '',
                unitId: '',
                unitName: '', // render unit name
                unitList: newUnitList, // render unit list
            };
        } else if (type === 'selectUnit') {
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
                unitId: e.value,
                unitName: e.label,
            };
        }
        setListGift(newList);
    };

    const deleteGift = (idx) => {
        const newList = [...listGift];
        newList.splice(idx, 1);
        setListGift(newList);
    };
    return (
        <div className="level-gift">
            <label className="form-label">Quà Tặng</label>
            {listGift &&
                listGift.map((gift, idx) => (
                    <div className="form-row-gift" key={idx}>
                        <SelectNotFormik
                            placeholder="Chọn sản phẩm"
                            options={listProduct ? listProduct : []}
                            handleChange={(e) => changeValueGift(e, idx, 'selectProduct')}
                            valueState={gift.productId}
                        />
                        <input
                            name="quantityGift"
                            placeholder="số lượng"
                            className="form-input"
                            onChange={(e) => changeValueGift(e, idx, 'quantityGift')}
                            value={(+gift.quantity).toLocaleString('en-US')}
                        />
                        <SelectNotFormik
                            placeholder="đơn vị"
                            options={gift.unitList ? gift.unitList : []}
                            handleChange={(e) => changeValueGift(e, idx, 'selectUnit')}
                            valueState={gift.unitId}
                        />
                        <Button
                            type="button"
                            classname="btn-outline-delete w-auto"
                            text="Xóa"
                            handleFunction={() => deleteGift(idx)}
                        />
                    </div>
                ))}
            <Button
                type="button"
                text="Thêm hàng"
                classname="btn-custom btn-icon w-auto"
                icon={<BiPlusCircle className="front-icon" />}
                handleFunction={addGift}
            />
        </div>
    );
};

export default memo(Gift);
