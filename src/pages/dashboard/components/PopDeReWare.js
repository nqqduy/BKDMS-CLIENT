import { AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Wrapper from '../../../assets/wrappers/PopupCategory';
import { Button } from '../../../components';
import { RENDER_TYPE_GOODS_ISSUE, RENDER_TYPE_GOODS_RECEIPT } from '../../../constants/warehouse';

const PopDeReWare = ({ setShowPopup, showPopup }) => {
    //console.log(showPopup);
    const warehouseContainUnit = useSelector((state) => state.warehouse.warehouseContainUnit);

    let totalQuantity = 0;
    for (let item of showPopup.data) {
        totalQuantity += +item.quantity;
    }
    return (
        <Wrapper>
            <div className="form-agency">
                <h5>Hàng đang giao dịch - {warehouseContainUnit ? `${warehouseContainUnit?.listInstance?.name}` : '-'}</h5>
                <hr />
                <div className="table table-product">
                    <table>
                        <thead>
                            <tr>
                                <th width="5%">STT</th>
                                <th width="30%">Mã Phiếu</th>
                                <th width="30%">Loại</th>
                                <th width="30%">Số Lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="title-black">Tổng</td>
                                <td></td>
                                <td></td>
                                <td className="title-black">{totalQuantity.toLocaleString('en-US')}</td>
                            </tr>
                            {showPopup?.data?.map((item, idx) => {
                                // console.log(item);
                                if (showPopup.type === 'EXPORT')
                                    return (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{item?.goodsIssue?.receiptCode}</td>
                                            <td>
                                                {
                                                    RENDER_TYPE_GOODS_ISSUE.find(
                                                        (type) => type.value === item?.goodsIssue?.type
                                                    )?.label
                                                }
                                            </td>
                                            <td>{(+item.quantity).toLocaleString('en-US')}</td>
                                        </tr>
                                    );
                                if (showPopup.type === 'IMPORT') {
                                    // console.log(item);
                                    return (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{item?.goodsReceipt?.receiptCode}</td>
                                            <td>
                                                {
                                                    RENDER_TYPE_GOODS_RECEIPT.find(
                                                        (type) => type.value === item?.goodsReceipt?.type
                                                    )?.label
                                                }
                                            </td>
                                            <td>{(+item.quantity).toLocaleString('en-US')}</td>
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
                                data: [],
                                show: false,
                            })
                        }
                    />
                </div>
            </div>
        </Wrapper>
    );
};

export default PopDeReWare;
