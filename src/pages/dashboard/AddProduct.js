import { unwrapResult } from '@reduxjs/toolkit';
import { Image } from 'cloudinary-react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { FastField, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BiCheck, BiPlusCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllCategory } from '../../app/category/categorySlice';
import { createProduct, updateProduct } from '../../app/product/productSlice';
import { getAllProductLine } from '../../app/productLine/productLineSlice';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { Button, FormRow, FormRowNotFormik, FormRowSelect, Loading } from '../../components';
import { TYPE_PRODUCT } from '../../constants/constants';
import countries from '../../utils/countries.json';
import getBase64 from '../../utils/getBase64';
import { PopupBarcode } from './components/PopupBarcode';
import hasDuplicates from '../../utils/hasDuplicates';
import { stateFromHTML } from 'draft-js-import-html';
import { validationProduct } from '../../schema';

const AddProduct = () => {
    const isLoading = useSelector((state) => state.product.isLoading);
    const isEditing = useSelector((state) => state.product.isEditing);
    const listCategory = useSelector((state) =>
        state.category.listCategory.map((item) => ({
            value: item.id,
            label: item.name,
        }))
    );
    const listProductLine = useSelector((state) =>
        state.productLine.listProductLine.map((item) => ({
            value: item.id,
            label: item.name,
        }))
    );
    const currentProduct = useSelector((state) => state.product.currentProduct);
    // const currentBaseUnitRedux = useSelector((state) => state.product.currentBaseUnit);
    const [newBarcode, setNewBarcode] = useState('');
    const [showCreateBarcode, setShowCreateBarcode] = useState(false);

    const [listCountry, setListCountry] = useState([]);
    const [imgProduct, setImgProduct] = useState(
        isEditing
            ? { prevImg: currentProduct.linkImg, img: currentProduct.linkImg }
            : {
                  prevImg: '',
                  img: null,
              }
    );
    const [listUnit, setListUnit] = useState(isEditing ? currentProduct.units.filter((unit) => !unit.isBaseUnit) : []);

    const [baseUnit, setBaseUnit] = useState(
        isEditing
            ? currentProduct?.units?.find((item) => item.isBaseUnit === true)
            : {
                  name: '',
                  productPrice: '',
                  agencyPrice: '',
                  retailPrice: '',
                  barcode: '',
                  isBaseUnit: true,
              }
    );

    const dispatch = useDispatch();

    let editorState = isEditing
        ? EditorState.createWithContent(stateFromHTML(currentProduct.description))
        : EditorState.createEmpty();
    const [description, setDescription] = useState(editorState);

    useEffect(() => {
        let listCountry = countries.map((country) => ({
            value: country.name,
            label: country.name,
        }));

        setListCountry(listCountry);
    }, []);

    useEffect(() => {
        const fetchProductLineAndCategory = async () => {
            try {
                const action = await Promise.all([dispatch(getAllProductLine()), dispatch(getAllCategory())]);
                unwrapResult(action[0]);
                unwrapResult(action[1]);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchProductLineAndCategory();
    }, [dispatch]);

    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    };

    const downloadBarcode = () => {
        if (newBarcode) {
            const canvas = document.getElementById('mybarcode');
            const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
            let downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'mybarcode.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Vui lòng điền mã vạch',
                showConfirmButton: true,
            });
        }
    };

    const handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];

        if (file) {
            let base64 = await getBase64(file);
            let objectURL = URL.createObjectURL(file);

            setImgProduct((prev) => ({
                ...prev,
                prevImg: objectURL,
                img: base64,
            }));
        }
    };

    const handleAddUnit = () => {
        setListUnit([
            ...listUnit,
            {
                name: '',
                productPrice: '',
                agencyPrice: '',
                retailPrice: '',
                // quantity: '',
                switchRate: '',
                barcode: '',
                isBaseUnit: false,
            },
        ]);
    };

    const handleDeleteUnit = (idx) => {
        const newListSwitchUnit = [...listUnit];
        newListSwitchUnit.splice(idx, 1);
        setListUnit(newListSwitchUnit);
    };

    const handleDeleteImage = () => {
        setImgProduct({ prevImg: '', img: null });
    };

    const handleChangeUnit = (e, idx, type) => {
        if (type === 'PRICE') {
            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số không hợp lệ, thử lại`,
                    showConfirmButton: true,
                });
                return;
            }
        }
        let newListSwitchUnit = [...listUnit];

        newListSwitchUnit[idx] = {
            ...listUnit[idx],
            [e.target.name]: e.target.value,
        };
        setListUnit(newListSwitchUnit);
    };

    const handleChangeBaseUnit = (e, type) => {
        if (type === 'PRICE') {
            e.target.value = e.target.value.split(',').join('');
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số không hợp lệ, thử lại`,
                    showConfirmButton: true,
                });
                return;
            }
        }
        if (type === 'BARCODE') {
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `Số không hợp lệ, thử lại`,
                    showConfirmButton: true,
                });
                return;
            }
        }
        setBaseUnit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (data) => {
        try {
            let newListUnit = [...listUnit];
            newListUnit.push({
                ...baseUnit,
            });

            let checkBarcode = [];
            for (let item of newListUnit) {
                if (item.barcode) checkBarcode.push(item.barcode);
            }
            const checkDuplicate = hasDuplicates(checkBarcode);

            if (checkDuplicate) {
                Swal.fire({
                    icon: 'warning',
                    title: `Mã vạch ${checkDuplicate} đã trùng`,
                    showConfirmButton: true,
                });
                return;
            }

            for (let item of newListUnit) {
                let message = '';
                if (!item.name) {
                    message = 'Tên đơn vị không được bỏ trống';
                    Swal.fire({
                        icon: 'warning',
                        title: `${message}`,
                        showConfirmButton: true,
                    });
                    return;
                } else if (+item.agencyPrice <= 0) {
                    message = 'Giá đại lý';
                } else if (+item.productPrice <= 0) {
                    message = 'Giá sản phẩm';
                } else if (+item.retailPrice <= 0) {
                    message = 'Giá bán lẻ';
                } else if (+item.switchRate <= 0 && !item.isBaseUnit) {
                    message = 'Số lượng quy đổi';
                }
                if (message) {
                    Swal.fire({
                        icon: 'warning',
                        title: `${message} ${item.name} không được nhỏ hơn bằng 0`,
                        showConfirmButton: true,
                    });
                    return;
                }
            }
            if (!data.type) {
                Swal.fire({
                    icon: 'warning',
                    title: `Vui lòng chọn trạng thái sản phẩm`,
                    showConfirmButton: true,
                });
                return;
            }

            if (data.dateManufacture && data.expirationDate) {
                if (new Date(`${data.dateManufacture}`).getTime() > new Date(`${data.expirationDate}`).getTime()) {
                    Swal.fire({
                        icon: 'warning',
                        title: `Ngày sản xuất không thể lớn hơn ngày hết hạn`,
                        showConfirmButton: true,
                    });
                    return;
                }
            }

            const currentProduct = {
                ...data,
                description: draftToHtml(convertToRaw(description.getCurrentContent())),
                linkImg: imgProduct.img,
                listUnit: newListUnit,
            };

            if (isEditing) {
                const actionResult = await dispatch(updateProduct(currentProduct));
                unwrapResult(actionResult);
            } else {
                const actionResult = await dispatch(createProduct(currentProduct));
                unwrapResult(actionResult);
            }
            Swal.fire({
                icon: 'success',
                title: isEditing ? 'Sửa thành công' : 'Thêm thành công',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };

    const initialValues = isEditing
        ? {
              ...currentProduct,
          }
        : {
              name: '',
              countryProduce: '',
              dateManufacture: '',
              expirationDate: '',
              categoryId: '',
              productLineId: '',
              type: '',
          };
    return (
        <Wrapper>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                enableReinitialize={true}
                validationSchema={validationProduct}
            >
                {(formikProps) => {
                    return (
                        <Form className="form">
                            <h5>{isEditing ? 'Chi tiết sản phẩm' : 'Thêm sản phẩm'}</h5>
                            <hr />
                            <p className="title-note-form">Thông tin sản phẩm</p>
                            <div className="form-center-product form-center">
                                <div>
                                    <FastField
                                        name="name"
                                        component={FormRow}
                                        type="text"
                                        labelText="Tên sản phẩm"
                                        placeholder="Nhập tên sản phẩm ..."
                                    />
                                    <FastField
                                        name="dateManufacture"
                                        component={FormRow}
                                        type="date"
                                        labelText="ngày sản xuất"
                                    />
                                    <FastField
                                        name="expirationDate"
                                        component={FormRow}
                                        type="date"
                                        labelText="ngày hết hạn"
                                    />
                                </div>
                                <div>
                                    {/* <p>Thông tin liên quan</p> */}
                                    <Field
                                        name="countryProduce"
                                        component={FormRowSelect}
                                        labelText="Nước sản xuất"
                                        options={listCountry}
                                        placeholder="Chọn nước sản xuất ... "
                                    />
                                    <Field
                                        name="categoryId"
                                        component={FormRowSelect}
                                        labelText="Danh mục"
                                        placeholder="Chọn danh mục ..."
                                        options={listCategory}
                                    />
                                    <Field
                                        name="productLineId"
                                        component={FormRowSelect}
                                        labelText="Dòng sản phẩm"
                                        placeholder="Chọn dòng sản phẩm ..."
                                        options={listProductLine}
                                    />
                                </div>
                                <div>
                                    <FastField
                                        name="type"
                                        component={FormRowSelect}
                                        labelText="Trạng thái sản phẩm"
                                        placeholder="Chọn trạng thái sản phẩm ..."
                                        options={TYPE_PRODUCT}
                                    />
                                    <Field
                                        name="image"
                                        component={FormRow}
                                        type="file"
                                        labelText="Ảnh sản phẩm"
                                        handleChange={handleOnChangeImage}
                                    />

                                    {imgProduct.prevImg !== '' && (
                                        <div className="contain-img">
                                            {isEditing && imgProduct.prevImg === currentProduct.linkImg ? (
                                                <Image
                                                    cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                                                    crop="scale"
                                                    publicId={imgProduct.prevImg}
                                                />
                                            ) : (
                                                <img src={imgProduct.prevImg} alt="Ảnh sản phẩm" />
                                            )}
                                            <Button
                                                type="button"
                                                classname="btn-custom btn-icon"
                                                text="Xóa ảnh"
                                                handleFunction={handleDeleteImage}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                            <Button
                                type="button"
                                classname="btn-custom btn-icon"
                                text="Tạo ảnh mã vạch"
                                icon={<BiPlusCircle className="front-icon" />}
                                handleFunction={() => setShowCreateBarcode(!showCreateBarcode)}
                            />
                            {showCreateBarcode && (
                                <PopupBarcode
                                    showCreateBarcode={showCreateBarcode}
                                    setShowCreateBarcode={setShowCreateBarcode}
                                    newBarcode={newBarcode}
                                    setNewBarcode={setNewBarcode}
                                    downloadBarcode={downloadBarcode}
                                />
                            )}
                            <br />
                            <div className="base-unit">
                                <p className="title-note-form">Đơn vị cơ bản</p>
                                <div className="switch-unit-input">
                                    <div>
                                        <FormRowNotFormik
                                            name="name"
                                            labelText="Đơn vị"
                                            type="text"
                                            placeholder="Nhập đơn vị"
                                            handleChange={(e) => handleChangeBaseUnit(e, 'UNIT')}
                                            valueState={baseUnit?.name}
                                        />
                                    </div>
                                    <div>
                                        <FormRowNotFormik
                                            name="productPrice"
                                            labelText="Giá sản phẩm (VAT)"
                                            type="text"
                                            placeholder="Nhập giá"
                                            handleChange={(e) => handleChangeBaseUnit(e, 'PRICE')}
                                            valueState={(+baseUnit?.productPrice).toLocaleString('en-US')}
                                            unit="VNĐ"
                                        />
                                    </div>
                                    <div>
                                        <FormRowNotFormik
                                            name="agencyPrice"
                                            labelText="Giá bán đại lý (VAT)"
                                            type="text"
                                            placeholder="Nhập giá"
                                            handleChange={(e) => handleChangeBaseUnit(e, 'PRICE')}
                                            valueState={(+baseUnit?.agencyPrice).toLocaleString('en-US')}
                                            unit="VNĐ"
                                        />
                                    </div>
                                    <div>
                                        <FormRowNotFormik
                                            name="retailPrice"
                                            labelText="Giá bán lẻ (VAT)"
                                            type="text"
                                            placeholder="Nhập giá"
                                            handleChange={(e) => handleChangeBaseUnit(e, 'PRICE')}
                                            valueState={(+baseUnit?.retailPrice).toLocaleString('en-US')}
                                            unit="VNĐ"
                                        />
                                    </div>
                                    <div>
                                        <FormRowNotFormik
                                            name="barcode"
                                            labelText="Mã vạch"
                                            type="text"
                                            placeholder="Nhập Mã vạch"
                                            handleChange={(e) => handleChangeBaseUnit(e, 'BARCODE')}
                                            valueState={baseUnit?.barcode}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="switch-unit">
                                <p className="title-note-form">Chuyển đổi đơn vị</p>
                                {listUnit.map((row, idx) => (
                                    <div className="switch-unit-input" key={idx}>
                                        <div>
                                            <FormRowNotFormik
                                                name="name"
                                                labelText="Đơn vị"
                                                type="text"
                                                placeholder="Nhập đơn vị"
                                                handleChange={(e) => handleChangeUnit(e, idx, 'UNIT')}
                                                valueState={row.name}
                                            />
                                        </div>
                                        <div>
                                            <FormRowNotFormik
                                                name="switchRate"
                                                labelText="quy đổi"
                                                type="text"
                                                placeholder="Nhập quy đổi"
                                                handleChange={(e) => handleChangeUnit(e, idx, 'PRICE')}
                                                valueState={(+row.switchRate).toLocaleString('en-US')}
                                            />
                                        </div>
                                        <div>
                                            <FormRowNotFormik
                                                name="productPrice"
                                                labelText="Giá sản phẩm (VAT)"
                                                type="text"
                                                placeholder="Nhập giá"
                                                handleChange={(e) => handleChangeUnit(e, idx, 'PRICE')}
                                                unit="VNĐ"
                                                valueState={(+row.productPrice).toLocaleString('en-US')}
                                            />
                                        </div>
                                        <div>
                                            <FormRowNotFormik
                                                name="agencyPrice"
                                                labelText="Giá bán đại lý (VAT)"
                                                type="text"
                                                placeholder="Nhập giá"
                                                handleChange={(e) => handleChangeUnit(e, idx, 'PRICE')}
                                                unit="VNĐ"
                                                valueState={(+row.agencyPrice).toLocaleString('en-US')}
                                            />
                                        </div>
                                        <div>
                                            <FormRowNotFormik
                                                name="retailPrice"
                                                labelText="Giá bán lẻ (VAT)"
                                                type="text"
                                                placeholder="Nhập giá"
                                                handleChange={(e) => handleChangeUnit(e, idx, 'PRICE')}
                                                unit="VNĐ"
                                                valueState={(+row.retailPrice).toLocaleString('en-US')}
                                            />
                                        </div>
                                        <div>
                                            <FormRowNotFormik
                                                name="barcode"
                                                labelText="Mã vạch"
                                                type="text"
                                                placeholder="Nhập Mã vạch"
                                                handleChange={(e) => handleChangeUnit(e, idx, 'BARCODE')}
                                                valueState={row.barcode}
                                            />
                                        </div>
                                        <div>
                                            <Button
                                                type="button"
                                                text="xóa"
                                                classname="btn-custom btn-icon"
                                                handleFunction={() => handleDeleteUnit(idx)}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    text="Thêm đơn vị quy đổi"
                                    classname="btn-custom btn-icon"
                                    icon={<BiPlusCircle className="front-icon" />}
                                    handleFunction={handleAddUnit}
                                />
                            </div>
                            <div className="editor">
                                <Editor
                                    editorState={description}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={onEditorStateChange}
                                />
                                {/* <textarea
                                    disabled
                                    ref={val => val}
                                    value={draftToHtml(
                                        convertToRaw(
                                            description.getCurrentContent()
                                        )
                                    )}
                                /> */}
                            </div>
                            <div className="button-one">
                                {isLoading ? (
                                    <Loading center />
                                ) : (
                                    <Button
                                        type="submit"
                                        classname="btn-custom btn-icon"
                                        text={isEditing ? 'Cập nhật' : 'Thêm'}
                                        icon={<BiCheck className="front-icon" />}
                                    />
                                )}
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Wrapper>
    );
};

export default AddProduct;
