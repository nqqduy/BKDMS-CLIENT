import { useBarcode } from 'react-barcodes';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiDownload } from 'react-icons/bi';
import Wrapper from '../../../assets/wrappers/PopupCategory';
import { Button, FormRowNotFormik } from '../../../components';

export const PopupBarcode = ({ showCreateBarcode, setShowCreateBarcode, newBarcode, setNewBarcode, downloadBarcode }) => {
    let { inputRef } = useBarcode({
        value: newBarcode ? newBarcode : 'null',
        options: {
            height: '40px',
            fontSize: '18px',
        },
    });
    return (
        <Wrapper>
            <div className="barcode">
                <FormRowNotFormik
                    type="text"
                    labelText="Tạo mã vạch"
                    placeholder="Nhập mã vạch"
                    handleChange={(e) => setNewBarcode(e.target.value)}
                    valueState={newBarcode}
                />
                <canvas id="mybarcode" ref={inputRef} />
                <div className="btn-container-category">
                    <Button
                        type="button"
                        classname="btn-custom btn-icon"
                        text="Tải mã vạch"
                        icon={<BiDownload className="front-icon" />}
                        handleFunction={downloadBarcode}
                    />
                    <Button
                        type="button"
                        classname="btn-custom  btn-icon btn-delete"
                        text="Hủy"
                        icon={<AiOutlineDelete className="front-icon" />}
                        handleFunction={() => setShowCreateBarcode(!showCreateBarcode)}
                    />
                </div>
            </div>
        </Wrapper>
    );
};
