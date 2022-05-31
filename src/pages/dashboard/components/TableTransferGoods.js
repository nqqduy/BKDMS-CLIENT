import { BiPlusCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Button, SelectNotFormik } from '../../../components';
// import PopupScanner from './PopupScanner';

const TableTransferGoods = ({ warehouseTransferId, warehouseReceiveId, rowList, setRowList, listProduct }) => {
    const listProductRedux = useSelector((state) => state.product.listProduct);
    const isEditingTransferGoods = useSelector((state) => state.warehouse.isEditingTransferGoods);

    // const [resultScanner, setResultScanner] = useState([]);
    // const [showCamera, setShowCamera] = useState('');

    const handleRowDelete = (idx) => {
        const newRowList = [...rowList];
        newRowList.splice(idx, 1);
        setRowList(newRowList);
    };

    const handleRowAdd = () => {
        if (warehouseTransferId !== warehouseReceiveId && warehouseTransferId) {
            setRowList([
                ...rowList,
                {
                    productId: '', // render product id
                    productName: '', // render product name
                    unitId: '', // render unit id
                    unitName: '', // render unit name
                    unitList: [], // render unit list
                    quantityStock: '', // render số lượng tồn kho
                    quantityTransfer: '', // số lượng chuyển
                    barcode: '',
                },
            ]);
        } else {
            if (!warehouseTransferId) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Vui lòng chọn kho chuyển',
                    showConfirmButton: true,
                });
            } else
                Swal.fire({
                    icon: 'warning',
                    title: 'Vui lòng chọn kho kiểm khác nhau',
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
                quantityTransfer: '', // số lượng chuyển
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

            // handle Quantity Unit in warehouse
            let quantityStock = 0;
            if (selectUnit.warehouseContainUnits.length !== 0) {
                for (let warehouse of selectUnit.warehouseContainUnits) {
                    if (warehouseTransferId === warehouse.warehouseId) {
                        quantityStock = warehouse.quantity;
                    }
                }
            }
            if (+quantityStock === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số lượng  ${e.label} ${newRowList[idx].productName} tại kho chuyển đã bằng 0`,
                    showConfirmButton: true,
                });
            } else
                newRowList[idx] = {
                    ...newRowList[idx],
                    unitId: e.value,
                    barcode: selectUnit.barcode,
                    unitName: e.label,

                    quantityStock: quantityStock, // render số lượng tồn kho
                    quantityTransfer: '', // số lượng chuyển
                };
        } else if (type === 'ENTER_QUANTITY_TRANSFER') {
            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số không hợp lệ, thử lại`,
                    showConfirmButton: true,
                });
                return;
            }
            //e.target.value = +e.target.value > 0 ? e.target.value : '1';
            if (+e.target.value > +newRowList[idx].quantityStock) e.target.value = newRowList[idx].quantityStock;
            newRowList[idx] = {
                ...newRowList[idx],
                quantityTransfer: e.target.value,
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
                            <th width="10%">STT</th>
                            <th width="20%">Tên sản phẩm</th>
                            <th width="20%">ĐVT</th>
                            <th width="15%">Tồn Kho</th>
                            <th width="15%">SL chuyển</th>
                            <th width="20%">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowList.map((row, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td className="product-barcode">
                                    <SelectNotFormik
                                        placeholder="Chọn sản phẩm"
                                        options={listProduct ? listProduct : []}
                                        handleChange={(e) => handleChangeProduct(e, idx, 'SELECT_PRODUCT')}
                                        valueState={row.productId}
                                        isDisabled={isEditingTransferGoods ? true : false}
                                    />
                                    <p className="barcode">Mã vạch: {row.barcode}</p>
                                </td>
                                <td>
                                    <SelectNotFormik
                                        placeholder="đơn vị"
                                        options={row.unitList ? row.unitList : []}
                                        handleChange={(e) => handleChangeProduct(e, idx, 'SELECT_UNIT')}
                                        valueState={row.unitId}
                                        isDisabled={isEditingTransferGoods ? true : false}
                                    />
                                </td>

                                <td>{row.unitId && (+row.quantityStock).toLocaleString('en-US')}</td>
                                <td>
                                    {row.unitId && (
                                        <input
                                            type="text"
                                            className="form-input"
                                            onChange={(e) => handleChangeProduct(e, idx, 'ENTER_QUANTITY_TRANSFER')}
                                            value={(+row.quantityTransfer).toLocaleString('en-US')}
                                            disabled={isEditingTransferGoods ? true : false}
                                        />
                                    )}
                                </td>

                                <td>
                                    {!isEditingTransferGoods && (
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
            {!isEditingTransferGoods && (
                <div className="two-button-barcode">
                    <Button
                        type="button"
                        classname="btn-custom btn-icon btn-action"
                        text="Thêm hàng"
                        icon={<BiPlusCircle className="front-icon" />}
                        handleFunction={handleRowAdd}
                    />

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
            )}
        </>
    );
};

export default TableTransferGoods;
