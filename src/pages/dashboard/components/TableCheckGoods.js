import { useSelector } from 'react-redux';
import Select from 'react-select';
import { Button, SelectNotFormik } from '../../../components';
import { BiPlusCircle, BiScan } from 'react-icons/bi';
import Swal from 'sweetalert2';
import { useState } from 'react';
// import PopupScanner from './PopupScanner';

const TableCheckGoods = ({ warehouseId, rowList, setRowList, listProduct }) => {
    const listProductRedux = useSelector((state) => state.product.listProduct);
    const isEditingCheckGoods = useSelector((state) => state.warehouse.isEditingCheckGoods);
    // const [resultScanner, setResultScanner] = useState([]);
    // const [showCamera, setShowCamera] = useState('');

    const handleRowDelete = (idx) => {
        const newRowList = [...rowList];
        newRowList.splice(idx, 1);
        setRowList(newRowList);
    };

    const handleRowAdd = () => {
        if (warehouseId) {
            setRowList([
                ...rowList,
                {
                    productId: '', // render product id
                    productName: '', // render product name
                    unitId: '', // render unit id
                    unitName: '', // render unit name
                    unitList: [], // render unit list
                    quantityStock: '', // render số lượng tồn kho
                    quantityReality: '', // số lượng thực tế
                    deviationPrice: '',
                    deviationQuantity: '',
                    price: '',
                    barcode: '',
                    isImport: null,
                },
            ]);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Vui lòng chọn kho kiểm',
                showConfirmButton: true,
            });
        }
    };

    const handleChangeProduct = (e, idx, type) => {
        let newRowList = [...rowList];
        if (type === 'SELECT_PRODUCT') {
            const product = listProductRedux.find((product) => product.id === e.value);
            let newUnitList = product.units?.map((unit) => ({
                value: unit.id,
                label: unit.name,
            }));

            newRowList[idx] = {
                productId: product.id,
                productName: product.name, // render product name
                unitList: newUnitList, // render unit list
                unitId: '', // render unit id
                unitName: '', // render unit name

                quantityStock: '', // render số lượng tồn kho
                quantityReality: '', // số lượng thực tế
                deviationPrice: '',
                deviationQuantity: '',
                price: '',
                barcode: '',
                isImport: null,
            };
        } else if (type === 'SELECT_UNIT') {
            let product = listProductRedux.find((product) => product.id === newRowList[idx].productId);
            let selectUnit = product?.units?.find((item) => item.id === e.value);
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
            // handle Quantity Unit in warehouse
            let quantityStock = 0;
            if (selectUnit.warehouseContainUnits.length !== 0) {
                for (let warehouse of selectUnit.warehouseContainUnits) {
                    if (warehouseId === warehouse.warehouseId) {
                        quantityStock = warehouse.quantity;
                    }
                }
            }
            newRowList[idx] = {
                ...newRowList[idx],
                unitId: e.value,
                barcode: selectUnit.barcode,
                unitName: e.label,
                price: selectUnit.productPrice,
                quantityStock,
                quantityReality: '',
                deviationPrice: '',
                deviationQuantity: '',
            };
        } else if (type === 'ENTER_QUANTITY_REALITY') {
            // e.target.value = +e.target.value >= 0 ? e.target.value : '0';
            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số không hợp lệ, thử lại`,
                    showConfirmButton: true,
                });
                return;
            }
            let deviationPrice = Math.abs((+e.target.value - +newRowList[idx].quantityStock) * +newRowList[idx].price);

            deviationPrice = +e.target.value >= +newRowList[idx].quantityStock ? deviationPrice : deviationPrice * -1;

            let isImport;
            if (deviationPrice === 0) isImport = 0;
            else if (deviationPrice > 0) isImport = true;
            else if (deviationPrice < 0) isImport = false;

            newRowList[idx] = {
                ...newRowList[idx],
                quantityReality: e.target.value,
                deviationPrice: deviationPrice,
                deviationQuantity: +e.target.value - +newRowList[idx].quantityStock,
                isImport,
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
                            <th width="15%">Tên sản phẩm</th>
                            <th width="15%">ĐVT</th>
                            <th width="10%">Đơn Giá</th>
                            <th width="10%">Tồn Kho</th>
                            <th width="10%">Thực Tế</th>
                            <th width="10%">SL lệch</th>
                            <th width="15%">Giá trị lệch</th>
                            <th width="7%">Thao tác</th>
                        </tr>
                    </thead>
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
                                        isDisabled={isEditingCheckGoods ? true : false}
                                    />
                                    <p className="barcode">Mã vạch: {row.barcode}</p>
                                </td>
                                <td>
                                    <SelectNotFormik
                                        placeholder="đơn vị"
                                        options={row.unitList}
                                        handleChange={(e) => handleChangeProduct(e, idx, 'SELECT_UNIT')}
                                        valueState={row.unitId}
                                        isDisabled={isEditingCheckGoods ? true : false}
                                    />
                                </td>
                                <td>
                                    {row.unitId && (
                                        <input
                                            type="text"
                                            className="form-input"
                                            onChange={(e) => handleChangeProduct(e, idx, 'ENTER_PRICE')}
                                            value={(+row.price).toLocaleString('en-US')}
                                            disabled
                                        />
                                    )}
                                </td>

                                <td>{row.unitId && (+row.quantityStock).toLocaleString('en-US')}</td>
                                <td>
                                    {row.unitId && (
                                        <input
                                            type="text"
                                            className="form-input"
                                            onChange={(e) => handleChangeProduct(e, idx, 'ENTER_QUANTITY_REALITY')}
                                            value={(+row.quantityReality).toLocaleString('en-US')}
                                            disabled={isEditingCheckGoods ? true : false}
                                        />
                                    )}
                                </td>
                                <td>{row.deviationQuantity ? (+row.deviationQuantity).toLocaleString('en-US') : '0'}</td>
                                <td>{row.deviationPrice ? (+row.deviationPrice).toLocaleString('en-US') : '0'} VNĐ</td>
                                <td>
                                    {!isEditingCheckGoods && (
                                        <Button
                                            type="button"
                                            classname="btn-outline-delete"
                                            text="xóa"
                                            handleFunction={() => handleRowDelete(idx)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            {/* {showCamera && (
                <PopupScanner
                    setResultScanner={setResultScanner}
                    resultScanner={resultScanner}
                    setShowCamera={setShowCamera}
                    showCamera={showCamera}
                />
            )} */}
            <div className="two-button-barcode">
                {!isEditingCheckGoods && (
                    <Button
                        type="button"
                        classname="btn-custom btn-icon btn-action"
                        text="Thêm hàng"
                        icon={<BiPlusCircle className="front-icon" />}
                        handleFunction={handleRowAdd}
                    />
                )}

                {/* <Button
                    type="button"
                    classname="btn-custom btn-icon btn-action"
                    text="Quét mã vạch"
                    icon={<BiScan className="front-icon" />}
                    handleFunction={() => {
                        setResultScanner('');
                        setShowCamera(!showCamera);
                    }}
                /> */}
            </div>
        </>
    );
};

export default TableCheckGoods;
