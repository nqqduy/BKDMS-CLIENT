import { memo } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Button, SelectNotFormik } from '../../../components';

const TableExportGoods = ({
    // values,
    rowList,
    setRowList,
    listProduct /*handleLoadProductToExport, listProductToExport */,
    currentGoodsIssue,
}) => {
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
                listUnit: [], // render unit list
                quantity: '',
                price: '',
                totalPrice: '',
                barcode: '',
            },
        ]);
    };
    const handleChangeProduct = (e, idx, type) => {
        let newRowList = [...rowList];
        if (type === 'SELECT_PRODUCT') {
            const product = listProductRedux.find((product) => product.id === e.value);
            // handle unit list
            let newUnitList = product?.units?.map((unit) => ({ value: unit.id, label: unit.name }));

            newRowList[idx] = {
                ...newRowList[idx],
                productId: product.id,
                productName: product.name, // render product name
                listUnit: newUnitList, // render unit list
                unitId: '', // render unit id
                unitName: '', // render unit name

                quantity: '',
                price: '',
                totalPrice: '',
                barcode: '',
            };
        } else if (type === 'SELECT_UNIT') {
            for (let i = 0; i < newRowList.length; i++) {
                if (i === idx) continue; // tr??ng vs c??i hi???n t???i kh??ng so s??nh
                if (newRowList[i].unitId === e.value) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'S???n ph???m theo ????n v??? ???? t???n t???i trong b???ng',
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
                totalPrice: +selectUnit.productPrice,
            };
        } else if (type === 'ENTER_PRICE') {
            // thay ?????i gi?? th?? thay ?????i lu??n t???ng gi?? ???? tr???
            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `S??? kh??ng h???p l???, th??? l???i`,
                    showConfirmButton: true,
                });
                return;
            }
            newRowList[idx] = {
                ...newRowList[idx],
                price: e.target.value,
                totalPrice: +newRowList[idx].price * +e.target.value,
            };
        } else if (type === 'ENTER_QUANTITY') {
            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `S??? kh??ng h???p l???, th??? l???i`,
                    showConfirmButton: true,
                });
                return;
            }
            if (+e.target.value < 0) {
                e.target.value = '0';
            }

            newRowList[idx] = {
                ...newRowList[idx],
                quantity: e.target.value,
                totalPrice: +newRowList[idx].price * +e.target.value,
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
                            <th width="20%">T??n s???n ph???m</th>
                            <th width="15%">??VT</th>
                            <th width="15%">S??? L?????ng</th>
                            <th width="10%">????n Gi??</th>
                            <th width="20%">T???ng Ti???n</th>
                            <th width="7%">Thao t??c</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowList.map((row, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td className="product-barcode">
                                    <SelectNotFormik
                                        placeholder="????n v???"
                                        options={listProduct}
                                        handleChange={(e) => handleChangeProduct(e, idx, 'SELECT_PRODUCT')}
                                        valueState={row.productId}
                                        notLabel
                                        isDisabled={
                                            currentGoodsIssue?.status === 'GOT_GOODS' ||
                                            currentGoodsIssue?.type === 'EXPORT_WITH_ORDER'
                                                ? true
                                                : false
                                        }
                                    />
                                    <p className="barcode">M?? v???ch: {row.barcode}</p>
                                </td>
                                <td>
                                    <SelectNotFormik
                                        placeholder="????n v???"
                                        options={row.listUnit}
                                        handleChange={(e) => handleChangeProduct(e, idx, 'SELECT_UNIT')}
                                        valueState={row.unitId}
                                        notLabel
                                        isDisabled={
                                            currentGoodsIssue?.status === 'GOT_GOODS' ||
                                            currentGoodsIssue?.type === 'EXPORT_WITH_ORDER'
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
                                                currentGoodsIssue?.status === 'GOT_GOODS' ||
                                                currentGoodsIssue?.type === 'EXPORT_WITH_ORDER'
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
                                            value={row.price ? (+row.price).toLocaleString('en-US') : '0'}
                                            disabled={
                                                currentGoodsIssue?.status === 'GOT_GOODS' ||
                                                currentGoodsIssue?.type === 'EXPORT_WITH_ORDER'
                                                    ? true
                                                    : false
                                            }
                                        />
                                    )}
                                </td>

                                <td>{row.totalPrice ? (+row.totalPrice).toLocaleString('en-US') : '0'} VN??</td>
                                <td>
                                    {/* //||
                                    //currentGoodsIssue?.type !== 'EXPORT_WITH_ORDER')  */}
                                    {currentGoodsIssue?.status !== 'GOT_GOODS' &&
                                        currentGoodsIssue?.type !== 'EXPORT_WITH_ORDER' && (
                                            <Button
                                                type="button"
                                                classname="btn-outline-delete"
                                                text="x??a"
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

            {currentGoodsIssue?.status !== 'GOT_GOODS' && (
                <Button
                    type="button"
                    classname="btn-custom btn-icon btn-action detail"
                    text="Th??m h??ng"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={handleRowAdd}
                />
            )}
            {/* )} */}
        </>
    );
};

export default memo(TableExportGoods);
