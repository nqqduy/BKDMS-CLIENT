import { unwrapResult } from '@reduxjs/toolkit';
import { FastField, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createLevel, updateLevel } from '../../app/level/levelSlice';
import { getAllProduct } from '../../app/product/productSlice';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { Button, FormRow, Loading } from '../../components';
import { ConditionLevel, Gift, PopupLevel } from './components';

const AddLevel = () => {
    const isLoading = useSelector((state) => state.level.isLoading);
    const isEditing = useSelector((state) => state.level.isEditing);
    const currentLevel = useSelector((state) => state.level.currentLevel);

    const [showPopupDiscount, setShowPopupDiscount] = useState(false);
    // list row two condition
    const [listConditionReg, setListConditionReg] = useState([]);
    const [listConditionReward, setListConditionReward] = useState([]);
    const [listGift, setListGift] = useState([]);
    // render data
    const [listProduct, setListProduct] = useState([]);

    const dispatch = useDispatch();
    // product api
    useEffect(() => {
        const fetchProduct = async () => {
            const actionResult = await dispatch(getAllProduct());
            const dataProduct = unwrapResult(actionResult);
            const newList = dataProduct.listProduct?.map((product) => ({
                value: product.id,
                label: product.name,
            }));
            setListProduct(newList);
        };

        fetchProduct();
    }, [dispatch]);
    const handleShowPopDiscount = () => {
        setShowPopupDiscount(!showPopupDiscount);
    };

    const handleSubmit = async (data) => {
        try {
            //handle gift
            // const listFilterGifts = listGift.map((item) => ({
            //     quantity: item.quantity,
            //     unitId: item.unitId,
            // }));

            let levelData = {
                ...data,
                listGift,
                listConditionReward,
                listConditionReg,
            };

            if (!levelData.name) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Vui l??ng nh???p t??n h???n m???c',
                    showConfirmButton: true,
                });
                return;
            }
            if (!levelData.month && !levelData.day && !levelData.year) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Vui l??ng ch???n th???i gian duy tr??',
                    showConfirmButton: true,
                });
                return;
            }
            if (!isFinite(+levelData.month) || !isFinite(+levelData.year) || !isFinite(+levelData.day)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Th???i gian duy tr?? ph???i l?? con s???',
                    showConfirmButton: true,
                });
                return;
            }
            // if (isFinite(+levelData.month)) {
            //     if()
            //     Swal.fire({
            //         icon: 'warning',
            //         title: 'Th???i gian duy tr?? ph???i l?? con sss',
            //         showConfirmButton: true,
            //     });
            //     return;
            // }
            if (+levelData.month === 0 && +levelData.day === 0 && +levelData.year === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Th???i gian duy tr?? ph???i l???n h??n 0',
                    showConfirmButton: true,
                });
                return;
            }
            if (listConditionReg.length === 0 || listConditionReward.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'H??y thi???t l???p c??c ??i???u ki???n',
                    showConfirmButton: true,
                });
                return;
            }

            // check list condition reg
            for (let item of listConditionReg) {
                if (!item.name || !item.value || +item.value <= 0) {
                    console.log(+item.value);
                    if (+item.value <= 0 && isFinite(item.value)) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Gi?? tr??? trong h??ng trong b???ng ??i???u ki???n ????ng k?? kh??ng nh??? h??n b???ng 0',
                            showConfirmButton: true,
                        });
                        return;
                    }
                    Swal.fire({
                        icon: 'warning',
                        title: 'H??ng trong b???ng ??i???u ki???n ????ng k?? kh??ng ???????c ????? tr???ng',
                        showConfirmButton: true,
                    });
                    return;
                }
            }

            for (let item of listGift) {
                if (!item.unitId) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'H??ng trong b???ng h??ng t???ng kh??ng ???????c ????? tr???ng',
                        showConfirmButton: true,
                    });
                    return;
                } else if (+item.quantity <= 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'S??? l?????ng trong b???ng h??ng t???ng kh??ng nh??? h??n b???ng 0',
                        showConfirmButton: true,
                    });
                    return;
                }
            }

            for (let item of listConditionReward) {
                if (!item.unitId && item.name !== 'REVENUE') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'H??ng trong b???ng ??i???u ki???n ?????t h???n m???c kh??ng ???????c ????? tr???ng',
                        showConfirmButton: true,
                    });
                    return;
                } else if (+item.value <= 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'S??? l?????ng trong b???ng ??i???u ki???n ?????t h???n m???c kh??ng nh??? h??n b???ng 0',
                        showConfirmButton: true,
                    });
                    return;
                } else if (!item.typeDiscount && item.name !== 'REVENUE') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Kh??ng ???????c b??? tr???ng trong b???ng chi???t kh???u',
                        showConfirmButton: true,
                    });
                    return;
                } else if (+item.discountValue <= 0 && item.name !== 'REVENUE') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Gi?? tr??? chi???t kh???u ph???i l???n h??n 0',
                        showConfirmButton: true,
                    });
                    return;
                } else if (item.typeDiscount === '%' && item.name !== 'REVENUE') {
                    if (+item.maxAmount <= 0) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Gi?? tr??? chi???t kh???u t???i ??a ph???i l???n h??n 0',
                            showConfirmButton: true,
                        });
                        return;
                    }
                }
            }

            if (isEditing) {
                const actionResult = await dispatch(updateLevel(levelData));
                unwrapResult(actionResult);
            } else {
                const actionResult = await dispatch(createLevel(levelData));
                unwrapResult(actionResult);
            }

            Swal.fire({
                icon: 'success',
                title: isEditing ? 'Th??nh c??ng' : 'Th??nh c??ng',
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

    useEffect(() => {
        if (currentLevel && isEditing) {
            let listRewardConditions = currentLevel?.rewardConditions?.map((item) => {
                if (item.name === 'REVENUE') {
                    return item;
                } else {
                    let unitList = [];
                    if (item?.unit?.product?.units?.length !== 0) {
                        unitList = item?.unit?.product?.units?.map((item) => ({ value: item.id, label: item.name }));
                        let unitName = unitList.find((i) => i.value === item.unitId)?.label;

                        return {
                            ...item,
                            productId: item?.unit?.product?.id,
                            unitList: unitList,
                            unitName,
                            productName: item?.unit?.product?.name,
                        };
                    }
                }
            });
            let listGift = currentLevel?.gifts?.map((item) => {
                let unitList = item?.unit?.product?.units?.map((item) => ({ value: item.id, label: item.name }));
                return {
                    ...item,
                    productId: item?.unit?.product?.id,
                    unitList: unitList,
                    // unitId:
                };
            });
            setListGift(listGift);
            setListConditionReward(listRewardConditions);
            setListConditionReg(currentLevel.registrationConditions);
        }
    }, [currentLevel, isEditing]);
    const initialValues = isEditing
        ? {
              ...currentLevel,
              year: currentLevel?.time?.year,
              month: currentLevel?.time?.month,
              day: currentLevel?.time?.day,
              name: currentLevel.name,
          }
        : {
              name: '',
              year: '',
              month: '',
              day: '',
              // discountRange: 'EACH_PRODUCT',
              // discountAllProduct: '',
              // typeDiscount: '',
              // maxAmount: '',
          };

    return (
        <Wrapper>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
                {(formikProps) => {
                    const { values /*errors, touched, isSubmitting, setFieldValue, handleChange */ } = formikProps;

                    return (
                        <Form className="form">
                            {isEditing ? <h5>Chi ti???t h???n m???c</h5> : <h5>Th??m h???n m???c</h5>}
                            <hr />
                            <p className="title-form">Th??ng tin h???n m???c</p>
                            <div className="form-center-level form-center">
                                <div>
                                    <FastField
                                        name="name"
                                        component={FormRow}
                                        type="text"
                                        labelText="T??n h???ng m???c"
                                        placeholder="Nh???p t??n h???ng m???c"
                                    />
                                    <Gift listProduct={listProduct} listGift={listGift} setListGift={setListGift} />
                                </div>
                                <div>
                                    <FastField
                                        name="year"
                                        component={FormRow}
                                        type="text"
                                        labelText="Th???i gian duy tr?? h???ng m???c"
                                        placeholder="Nh???p s??? n??m"
                                        unit="N??m"
                                    />
                                    <FastField
                                        name="month"
                                        component={FormRow}
                                        type="text"
                                        labelText=""
                                        placeholder="Nh???p s??? th??ng"
                                        unit="Th??ng"
                                        notLabel
                                    />
                                    <FastField
                                        name="day"
                                        component={FormRow}
                                        type="text"
                                        labelText=""
                                        placeholder="Nh???p s??? ng??y"
                                        unit="Ng??y"
                                        notLabel
                                    />
                                    {/* <FastField
                                        name="discountRange"
                                        component={FormRowSelect}
                                        labelText="Ph???m vi chi???t kh???u"
                                        placeholder="Ch???n ph???m vi chi???t kh???u"
                                        options={DISCOUNT_RANGE}
                                        isDisabled={true}
                                    /> */}
                                    {/* {values.discountRange === ALL_PRODUCT && (
                                        <>
                                            <div className="form-row-two-input">
                                                <FastField
                                                    name="discountAllProduct"
                                                    component={FormRow}
                                                    type="text"
                                                    labelText="Chi???t kh???u to??n b??? s???n ph???m"
                                                    placeholder="Nh???p gi?? tr???"
                                                />
                                                <FastField
                                                    name="typeDiscount"
                                                    component={FormRowSelect}
                                                    placeholder="Ch???n lo???i"
                                                    options={TYPE_VALUE}
                                                    notLabel
                                                />
                                            </div>
                                            {values.typeDiscount === '%' && (
                                                <FastField
                                                    name="maxAmount"
                                                    component={FormRow}
                                                    type="text"
                                                    labelText="S??? ti???n t???i ??a"
                                                    placeholder="Nh???p gi?? tr???"
                                                    unit="VN??"
                                                />
                                            )}
                                        </>
                                    )} */}

                                    {/* {values.discountRange === EACH_PRODUCT && ( */}
                                    <Button
                                        type="button"
                                        classname="btn-custom btn-icon"
                                        text="Thi???t l???p chi???t kh???u"
                                        handleFunction={() => setShowPopupDiscount(!showPopupDiscount)}
                                    />
                                    {/* )} */}
                                </div>
                            </div>
                            <ConditionLevel
                                listConditionReg={listConditionReg}
                                setListConditionReg={setListConditionReg}
                                listConditionReward={listConditionReward}
                                setListConditionReward={setListConditionReward}
                                listProduct={listProduct}
                            />
                            {showPopupDiscount && (
                                <PopupLevel
                                    setShowPopupDiscount={handleShowPopDiscount}
                                    listConditionReward={listConditionReward}
                                    setListConditionReward={setListConditionReward}
                                />
                            )}
                            <div className="button-one">
                                {isLoading ? (
                                    <Loading center />
                                ) : (
                                    <Button
                                        type="submit"
                                        classname="btn-custom btn-icon"
                                        text={isEditing ? `C???p nh???t` : 'Th??m'}
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

export default AddLevel;
