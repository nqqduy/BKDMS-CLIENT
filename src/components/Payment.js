import { AiOutlineDelete } from 'react-icons/ai';
import { BiPlusCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/PopupCategory';
import Button from './Button';
import FormRowNotFormik from './FormRowNotFormik';
import Loading from './Loading';

const Payment = ({ setShowPopup }) => {
    const isLoading = useSelector((state) => state.order.isLoading);
    return (
        <Wrapper>
            <div className="form-category">
                <h5>Thanh Toán COD</h5>
                <hr />
                <div className="form-center-category">
                    <FormRowNotFormik
                        name="name"
                        type="text"
                        labelText="Tiền Thanh Toán"
                        //placeholder="Nhập tên danh mục..."
                    />
                    <div className="btn-container-category">
                        {isLoading ? (
                            <Loading center />
                        ) : (
                            <>
                                <Button
                                    type="submit"
                                    classname="btn-custom  btn-icon"
                                    text="Thanh Toán"
                                    icon={<BiPlusCircle className="front-icon" />}
                                />
                                <Button
                                    type="button"
                                    classname="btn-custom  btn-icon btn-delete"
                                    text="Hủy"
                                    icon={<AiOutlineDelete className="front-icon" />}
                                    handleFunction={() => setShowPopup(false)}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Payment;
