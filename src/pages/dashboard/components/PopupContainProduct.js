import { useSelector } from 'react-redux';
import { Button, Loading } from '../../../components';
import Wrapper from '../../../assets/wrappers/PopupCategory';
import { AiOutlineDelete } from 'react-icons/ai';

const PopupContainProduct = ({ setShowPopup }) => {
    const infoOfUnitInWarehouse = useSelector((state) => state.warehouse.infoOfUnitInWarehouse);
    const isLoadingUnitWarehouse = useSelector((state) => state.warehouse.isLoadingUnitWarehouse);
    //console.log(infoOfUnitInWarehouse);
    return (
        <Wrapper>
            <div className="form-contain-product">
                {isLoadingUnitWarehouse ? (
                    <Loading center />
                ) : (
                    <>
                        {' '}
                        {infoOfUnitInWarehouse && (
                            <>
                                <h5>
                                    {'Chi tiết sản phẩm ' +
                                        `${infoOfUnitInWarehouse?.infoUnit?.product?.name}` +
                                        ' ' +
                                        `${infoOfUnitInWarehouse?.infoUnit?.name}`}
                                </h5>
                                <hr />
                                <div className="contain-product-container">
                                    <div className="card-contain-product">
                                        {/* đã nhập kho */}
                                        <p className="title">Lịch sử nhập</p>
                                        <div className="history"></div>
                                        <p>Tổng Lượng Nhập: {(+100000).toLocaleString('en-US')}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
                <div className="btn-container-category">
                    <Button
                        type="button"
                        classname="btn-custom  btn-icon btn-delete"
                        text="Thoát"
                        icon={<AiOutlineDelete className="front-icon" />}
                        handleFunction={() => setShowPopup((prev) => !prev)}
                    />
                </div>
            </div>
        </Wrapper>
    );
};

export default PopupContainProduct;
