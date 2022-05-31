import { BiPlusCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Button, SelectNotFormik } from '../../../components';
import { IMPORT_GOODS_FOR_SALE } from '../../../constants/warehouse';

const TableAddGoods = ({ values, rowList, setRowList, listProduct, currentGoodsReceipt }) => {
    const listProductRedux = useSelector((state) => state.product.listProduct);

    const handleRowDelete = (idx) => {
        const newRowList = [...rowList];
        newRowList.splice(idx, 1);
        setRowList(newRowList);
    };

    const handleRowAdd = () => {
        setRowList([
            ...rowList,
            {
                productId: '', // render product id
                productName: '', // render product name
                unitId: '', // render unit id
                unitName: '', // render unit name
                unitList: [], // render unit list
                quantity: '',
                discount: '',
                price: '',
                totalPrice: '',
                barcode: '',
            },
        ]);
    };
    const handleChangeProduct = (e, idx, type) => {
        let newRowList = [...rowList];
        let totalPrice;
        if (type === 'SELECT_PRODUCT') {
            const product = listProductRedux.find((product) => product.id === e.value);
            // handle unit list
            let newUnitList = product?.units?.map((unit) => ({ value: unit.id, label: unit.name }));

            newRowList[idx] = {
                ...newRowList[idx],
                productId: product.id,
                productName: product.name, // render product name
                unitList: newUnitList, // render unit list
                unitId: '', // render unit id
                unitName: '', // render unit name

                quantity: '',
                discount: '',
                price: '',
                totalPrice: '',
                barcode: '',
            };
        } else if (type === 'SELECT_UNIT') {
            for (let i = 0; i < newRowList.length; i++) {
                if (i === idx) continue; // trùng vs cái hiện tại không so sánh
                if (newRowList[i].unitId === e.value) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Sản phẩm theo đơn vị đã tồn tại trong bảng',
                        showConfirmButton: true,
                    });
                    return;
                }
            }
            let product = listProductRedux.find((product) => product.id === newRowList[idx].productId);
            let selectUnit = product?.units?.find((item) => item.id === e.value);
            newRowList[idx] = {
                ...newRowList[idx],
                unitId: e.value,
                unitName: e.label,
                price: selectUnit.productPrice,
                barcode: selectUnit.barcode,

                quantity: '1',
                discount: '',
                totalPrice: +selectUnit.productPrice,
            };
        } else if (type === 'ENTER_PRICE') {
            // thay đổi giá thì thay đổi luôn tổng giá đã trừ

            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số không hợp lệ, thử lại`,
                    showConfirmButton: true,
                });
                return;
            }
            totalPrice = +newRowList[idx].quantity * +e.target.value - +newRowList[idx].discount * +newRowList[idx].quantity;
            newRowList[idx] = {
                ...newRowList[idx],
                price: e.target.value,
                totalPrice: totalPrice > 0 ? totalPrice : 0,
            };
        } else if (type === 'ENTER_QUANTITY') {
            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số không hợp lệ, thử lại`,
                    showConfirmButton: true,
                });
                return;
            }
            if (+e.target.value < 0) {
                e.target.value = '0';
            }
            totalPrice = +newRowList[idx].price * +e.target.value - +newRowList[idx].discount * +e.target.value;
            newRowList[idx] = {
                ...newRowList[idx],
                quantity: e.target.value,
                totalPrice: totalPrice > 0 ? totalPrice : 0,
            };
        } else if (type === 'ENTER_DISCOUNT') {
            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số không hợp lệ, thử lại`,
                    showConfirmButton: true,
                });
                return;
            }
            totalPrice = +newRowList[idx].price * +newRowList[idx].quantity - +newRowList[idx].quantity * +e.target.value;
            newRowList[idx] = {
                ...newRowList[idx],
                discount: e.target.value,
                totalPrice: totalPrice > 0 ? totalPrice : 0,
            };
        }
        setRowList(newRowList);
    };
    return (
        <>
            <div className="table table-warehouse">
                <table>
                    <thead>
                        <tr>
                            <th width="3%">STT</th>
                            <th width="20%">Tên sản phẩm</th>
                            <th width="15%">ĐVT</th>
                            <th width="10%">Số Lượng</th>
                            <th width="10%">Đơn Giá</th>
                            <th width="10%">Tiền Giảm</th>
                            <th width="15%">Tổng Tiền</th>
                            <th width="7%">Thao tác</th>
                        </tr>
                    </thead>
                    {/* (values.type === IMPORT_GOODS_FOR_SALE || values.type === 'DELIVERY_PROBLEM') && */}
                    <tbody>
                        {rowList.map((row, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td className="product-barcode">
                                    <SelectNotFormik
                                        placeholder="Chọn sản phẩm"
                                        options={listProduct}
                                        handleChange={(e) => handleChangeProduct(e, idx, 'SELECT_PRODUCT')}
                                        valueState={row.productId}
                                        isDisabled={
                                            currentGoodsReceipt?.status === 'IMPORTED_GOODS' ||
                                            currentGoodsReceipt?.type === 'RETURN_GOODS_FROM_AGENCY'
                                                ? true
                                                : false
                                        }
                                    />
                                    {/* <Select
                                            placeholder="Chọn sản phẩm"
                                            options={listProduct}
                                            onChange={(e) => handleChangeProduct(e, idx, 'SELECT_PRODUCT')}
                                            value={
                                                row.productName && {
                                                    value: row.productId,
                                                    label: row.productName,
                                                }
                                            }
                                        /> */}
                                    <p className="barcode">Mã vạch: {row.barcode}</p>
                                </td>
                                <td>
                                    <SelectNotFormik
                                        placeholder="đơn vị"
                                        options={row.unitList}
                                        handleChange={(e) => handleChangeProduct(e, idx, 'SELECT_UNIT')}
                                        valueState={row.unitId}
                                        isDisabled={
                                            currentGoodsReceipt?.status === 'IMPORTED_GOODS' ||
                                            currentGoodsReceipt?.type === 'RETURN_GOODS_FROM_AGENCY'
                                                ? true
                                                : false
                                        }
                                    />
                                </td>
                                <td>
                                    {row.unitId && (
                                        <input
                                            type="text"
                                            className="form-input"
                                            onChange={(e) => handleChangeProduct(e, idx, 'ENTER_QUANTITY')}
                                            value={(+row.quantity).toLocaleString('en-US')}
                                            disabled={
                                                currentGoodsReceipt?.status === 'IMPORTED_GOODS' ||
                                                currentGoodsReceipt?.type === 'RETURN_GOODS_FROM_AGENCY'
                                                    ? true
                                                    : false
                                            }
                                        />
                                    )}
                                </td>

                                <td>
                                    {row.unitId && (
                                        <input
                                            type="text"
                                            className="form-input"
                                            onChange={(e) => handleChangeProduct(e, idx, 'ENTER_PRICE')}
                                            value={(+row.price).toLocaleString('en-US')}
                                            disabled={
                                                currentGoodsReceipt?.status === 'IMPORTED_GOODS' ||
                                                currentGoodsReceipt?.type === 'RETURN_GOODS_FROM_AGENCY'
                                                    ? true
                                                    : false
                                            }
                                        />
                                    )}
                                </td>
                                <td>
                                    {row.unitId && (
                                        <input
                                            type="text"
                                            className="form-input"
                                            onChange={(e) => handleChangeProduct(e, idx, 'ENTER_DISCOUNT')}
                                            value={(+row.discount).toLocaleString('en-US')}
                                            disabled={
                                                currentGoodsReceipt?.status === 'IMPORTED_GOODS' ||
                                                values.type === 'DELIVERY_PROBLEM' ||
                                                currentGoodsReceipt?.type === 'RETURN_GOODS_FROM_AGENCY'
                                                    ? true
                                                    : false
                                            }
                                        />
                                    )}
                                </td>
                                <td>{row.totalPrice ? (+row.totalPrice).toLocaleString('en-US') : '0'} VNĐ</td>
                                <td>
                                    {currentGoodsReceipt?.status !== 'IMPORTED_GOODS' &&
                                    currentGoodsReceipt?.type !== 'RETURN_GOODS_FROM_AGENCY' ? (
                                        <Button
                                            type="button"
                                            classname="btn-outline-delete"
                                            text="xóa"
                                            handleFunction={() => handleRowDelete(idx)}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            {(values.type === IMPORT_GOODS_FOR_SALE || values.type === 'DELIVERY_PROBLEM') &&
                currentGoodsReceipt?.status !== 'IMPORTED_GOODS' && (
                    <Button
                        type="button"
                        classname="btn-custom btn-icon btn-action detail"
                        text="Thêm hàng"
                        icon={<BiPlusCircle className="front-icon" />}
                        handleFunction={handleRowAdd}
                    />
                )}
        </>
    );
};

export default TableAddGoods;
