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
                title: 'Vui l??ng ??i???n m?? v???ch',
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
                    title: `S??? kh??ng h???p l???, th??? l???i`,
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
                    title: `S??? kh??ng h???p l???, th??? l???i`,
                    showConfirmButton: true,
                });
                return;
            }
        }
        if (type === 'BARCODE') {
            if (!isFinite(+e.target.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `S??? kh??ng h???p l???, th??? l???i`,
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
                    title: `M?? v???ch ${checkDuplicate} ???? tr??ng`,
                    showConfirmButton: true,
                });
                return;
            }

            for (let item of newListUnit) {
                let message = '';
                if (!item.name) {
                    message = 'T??n ????n v??? kh??ng ???????c b??? tr???ng';
                    Swal.fire({
                        icon: 'warning',
                        title: `${message}`,
                        showConfirmButton: true,
                    });
                    return;
                } else if (+item.agencyPrice <= 0) {
                    message = 'Gi?? ?????i l??';
                } else if (+item.productPrice <= 0) {
                    message = 'Gi?? s???n ph???m';
                } else if (+item.retailPrice <= 0) {
                    message = 'Gi?? b??n l???';
                } else if (+item.switchRate <= 0 && !item.isBaseUnit) {
                    message = 'S??? l?????ng quy ?????i';
                }
                if (message) {
                    Swal.fire({
                        icon: 'warning',
                        title: `${message} ${item.name} kh??ng ???????c nh??? h??n b???ng 0`,
                        showConfirmButton: true,
                    });
                    return;
                }
            }
            if (!data.type) {
                Swal.fire({
                    icon: 'warning',
                    title: `Vui l??ng ch???n tr???ng th??i s???n ph???m`,
                    showConfirmButton: true,
                });
                return;
            }

            if (data.dateManufacture && data.expirationDate) {
                if (new Date(`${data.dateManufacture}`).getTime() > new Date(`${data.expirationDate}`).getTime()) {
                    Swal.fire({
                        icon: 'warning',
                        title: `Ng??y s???n xu???t kh??ng th??? l???n h??n ng??y h???t h???n`,
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
                title: isEditing ? 'S???a th??nh c??ng' : 'Th??m th??nh c??ng',
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
                            <h5>{isEditing ? 'Chi ti???t s???n ph???m' : 'Th??m s???n ph???m'}</h5>
                            <hr />
                            <p className="title-note-form">Th??ng tin s???n ph???m</p>
                            <div className="form-center-product form-center">
                                <div>
                                    <FastField
                                        name="name"
                                        component={FormRow}
                                        type="text"
                                        labelText="T??n s???n ph???m"
                                        placeholder="Nh???p t??n s???n ph???m ..."
                                    />
                                    <FastField
                                        name="dateManufacture"
                                        component={FormRow}
                                        type="date"
                                        labelText="ng??y s???n xu???t"
                                    />
                                    <FastField
                                        name="expirationDate"
                                        component={FormRow}
                                        type="date"
                                        labelText="ng??y h???t h???n"
                                    />
                                </div>
                                <div>
                                    {/* <p>Th??ng tin li??n quan</p> */}
                                    <Field
                                        name="countryProduce"
                                        component={FormRowSelect}
                                        labelText="N?????c s???n xu???t"
                                        options={listCountry}
                                        placeholder="Ch???n n?????c s???n xu???t ... "
                                    />
                                    <Field
                                        name="categoryId"
                                        component={FormRowSelect}
                                        labelText="Danh m???c"
                                        placeholder="Ch???n danh m???c ..."
                                        options={listCategory}
                                    />
                                    <Field
                                        name="productLineId"
                                        component={FormRowSelect}
                                        labelText="D??ng s???n ph???m"
                                        placeholder="Ch???n d??ng s???n ph???m ..."
                                        options={listProductLine}
                                    />
                                </div>
                                <div>
                                    <FastField
                                        name="type"
                                        component={FormRowSelect}
                                        labelText="Tr???ng th??i s???n ph???m"
                                        placeholder="Ch???n tr???ng th??i s???n ph???m ..."
                                        options={TYPE_PRODUCT}
                                    />
                                    <Field
                                        name="image"
                                        component={FormRow}
                                        type="file"
                                        labelText="???nh s???n ph???m"
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
                                                <img src={imgProduct.prevImg} alt="???nh s???n ph???m" />
                                            )}
                                            <Button
                                                type="button"
                                                classname="btn-custom btn-icon"
                                                text="X??a ???nh"
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
                                text="T???o ???nh m?? v???ch"
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
                                <p className="title-note-form">????n v??? c?? b???n</p>
                                <div className="switch-unit-input">
                                    <div>
                                        <FormRowNotFormik
                                            name="name"
                                            labelText="????n v???"
                                            type="text"
                                            placeholder="Nh???p ????n v???"
                                            handleChange={(e) => handleChangeBaseUnit(e, 'UNIT')}
                                            valueState={baseUnit?.name}
                                        />
                                    </div>
                                    <div>
                                        <FormRowNotFormik
                                            name="productPrice"
                                            labelText="Gi?? s???n ph???m (VAT)"
                                            type="text"
                                            placeholder="Nh???p gi??"
                                            handleChange={(e) => handleChangeBaseUnit(e, 'PRICE')}
                                            valueState={(+baseUnit?.productPrice).toLocaleString('en-US')}
                                            unit="VN??"
                                        />
                                    </div>
                                    <div>
                                        <FormRowNotFormik
                                            name="agencyPrice"
                                            labelText="Gi?? b??n ?????i l?? (VAT)"
                                            type="text"
                                            placeholder="Nh???p gi??"
                                            handleChange={(e) => handleChangeBaseUnit(e, 'PRICE')}
                                            valueState={(+baseUnit?.agencyPrice).toLocaleString('en-US')}
                                            unit="VN??"
                                        />
                                    </div>
                                    <div>
                                        <FormRowNotFormik
                                            name="retailPrice"
                                            labelText="Gi?? b??n l??? (VAT)"
                                            type="text"
                                            placeholder="Nh???p gi??"
                                            handleChange={(e) => handleChangeBaseUnit(e, 'PRICE')}
                                            valueState={(+baseUnit?.retailPrice).toLocaleString('en-US')}
                                            unit="VN??"
                                        />
                                    </div>
                                    <div>
                                        <FormRowNotFormik
                                            name="barcode"
                                            labelText="M?? v???ch"
                                            type="text"
                                            placeholder="Nh???p M?? v???ch"
                                            handleChange={(e) => handleChangeBaseUnit(e, 'BARCODE')}
                                            valueState={baseUnit?.barcode}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="switch-unit">
                                <p className="title-note-form">Chuy???n ?????i ????n v???</p>
                                {listUnit.map((row, idx) => (
                                    <div className="switch-unit-input" key={idx}>
                                        <div>
                                            <FormRowNotFormik
                                                name="name"
                                                labelText="????n v???"
                                                type="text"
                                                placeholder="Nh???p ????n v???"
                                                handleChange={(e) => handleChangeUnit(e, idx, 'UNIT')}
                                                valueState={row.name}
                                            />
                                        </div>
                                        <div>
                                            <FormRowNotFormik
                                                name="switchRate"
                                                labelText="quy ?????i"
                                                type="text"
                                                placeholder="Nh???p quy ?????i"
                                                handleChange={(e) => handleChangeUnit(e, idx, 'PRICE')}
                                                valueState={(+row.switchRate).toLocaleString('en-US')}
                                            />
                                        </div>
                                        <div>
                                            <FormRowNotFormik
                                                name="productPrice"
                                                labelText="Gi?? s???n ph???m (VAT)"
                                                type="text"
                                                placeholder="Nh???p gi??"
                                                handleChange={(e) => handleChangeUnit(e, idx, 'PRICE')}
                                                unit="VN??"
                                                valueState={(+row.productPrice).toLocaleString('en-US')}
                                            />
                                        </div>
                                        <div>
                                            <FormRowNotFormik
                                                name="agencyPrice"
                                                labelText="Gi?? b??n ?????i l?? (VAT)"
                                                type="text"
                                                placeholder="Nh???p gi??"
                                                handleChange={(e) => handleChangeUnit(e, idx, 'PRICE')}
                                                unit="VN??"
                                                valueState={(+row.agencyPrice).toLocaleString('en-US')}
                                            />
                                        </div>
                                        <div>
                                            <FormRowNotFormik
                                                name="retailPrice"
                                                labelText="Gi?? b??n l??? (VAT)"
                                                type="text"
                                                placeholder="Nh???p gi??"
                                                handleChange={(e) => handleChangeUnit(e, idx, 'PRICE')}
                                                unit="VN??"
                                                valueState={(+row.retailPrice).toLocaleString('en-US')}
                                            />
                                        </div>
                                        <div>
                                            <FormRowNotFormik
                                                name="barcode"
                                                labelText="M?? v???ch"
                                                type="text"
                                                placeholder="Nh???p M?? v???ch"
                                                handleChange={(e) => handleChangeUnit(e, idx, 'BARCODE')}
                                                valueState={row.barcode}
                                            />
                                        </div>
                                        <div>
                                            <Button
                                                type="button"
                                                text="x??a"
                                                classname="btn-custom btn-icon"
                                                handleFunction={() => handleDeleteUnit(idx)}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    text="Th??m ????n v??? quy ?????i"
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
                                        text={isEditing ? 'C???p nh???t' : 'Th??m'}
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
