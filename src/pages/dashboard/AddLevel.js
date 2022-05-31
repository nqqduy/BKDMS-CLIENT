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
                    title: 'Vui lòng nhập tên hạn mức',
                    showConfirmButton: true,
                });
                return;
            }
            if (!levelData.month && !levelData.day && !levelData.year) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Vui lòng chọn thời gian duy trì',
                    showConfirmButton: true,
                });
                return;
            }
            if (!isFinite(+levelData.month) || !isFinite(+levelData.year) || !isFinite(+levelData.day)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Thời gian duy trì phải là con số',
                    showConfirmButton: true,
                });
                return;
            }
            // if (isFinite(+levelData.month)) {
            //     if()
            //     Swal.fire({
            //         icon: 'warning',
            //         title: 'Thời gian duy trì phải là con sss',
            //         showConfirmButton: true,
            //     });
            //     return;
            // }
            if (+levelData.month === 0 && +levelData.day === 0 && +levelData.year === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Thời gian duy trì phải lớn hơn 0',
                    showConfirmButton: true,
                });
                return;
            }
            if (listConditionReg.length === 0 || listConditionReward.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Hãy thiết lập các điều kiện',
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
                            title: 'Giá trị trong hàng trong bảng điều kiện đăng ký không nhỏ hơn bằng 0',
                            showConfirmButton: true,
                        });
                        return;
                    }
                    Swal.fire({
                        icon: 'warning',
                        title: 'Hàng trong bảng điều kiện đăng ký không được để trống',
                        showConfirmButton: true,
                    });
                    return;
                }
            }

            for (let item of listGift) {
                if (!item.unitId) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Hàng trong bảng hàng tặng không được để trống',
                        showConfirmButton: true,
                    });
                    return;
                } else if (+item.quantity <= 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Số lượng trong bảng hàng tặng không nhỏ hơn bằng 0',
                        showConfirmButton: true,
                    });
                    return;
                }
            }

            for (let item of listConditionReward) {
                if (!item.unitId && item.name !== 'REVENUE') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Hàng trong bảng điều kiện đạt hạn mức không được để trống',
                        showConfirmButton: true,
                    });
                    return;
                } else if (+item.value <= 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Số lượng trong bảng điều kiện đạt hạn mức không nhỏ hơn bằng 0',
                        showConfirmButton: true,
                    });
                    return;
                } else if (!item.typeDiscount && item.name !== 'REVENUE') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Không được bỏ trống trong bảng chiết khấu',
                        showConfirmButton: true,
                    });
                    return;
                } else if (+item.discountValue <= 0 && item.name !== 'REVENUE') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Giá trị chiết khấu phải lớn hơn 0',
                        showConfirmButton: true,
                    });
                    return;
                } else if (item.typeDiscount === '%' && item.name !== 'REVENUE') {
                    if (+item.maxAmount <= 0) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Giá trị chiết khấu tối đa phải lớn hơn 0',
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
                title: isEditing ? 'Thành công' : 'Thành công',
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
                            {isEditing ? <h5>Chi tiết hạn mức</h5> : <h5>Thêm hạn mức</h5>}
                            <hr />
                            <p className="title-form">Thông tin hạn mức</p>
                            <div className="form-center-level form-center">
                                <div>
                                    <FastField
                                        name="name"
                                        component={FormRow}
                                        type="text"
                                        labelText="Tên hạng mức"
                                        placeholder="Nhập tên hạng mức"
                                    />
                                    <Gift listProduct={listProduct} listGift={listGift} setListGift={setListGift} />
                                </div>
                                <div>
                                    <FastField
                                        name="year"
                                        component={FormRow}
                                        type="text"
                                        labelText="Thời gian duy trì hạng mức"
                                        placeholder="Nhập số năm"
                                        unit="Năm"
                                    />
                                    <FastField
                                        name="month"
                                        component={FormRow}
                                        type="text"
                                        labelText=""
                                        placeholder="Nhập số tháng"
                                        unit="Tháng"
                                        notLabel
                                    />
                                    <FastField
                                        name="day"
                                        component={FormRow}
                                        type="text"
                                        labelText=""
                                        placeholder="Nhập số ngày"
                                        unit="Ngày"
                                        notLabel
                                    />
                                    {/* <FastField
                                        name="discountRange"
                                        component={FormRowSelect}
                                        labelText="Phạm vi chiết khấu"
                                        placeholder="Chọn phạm vi chiết khấu"
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
                                                    labelText="Chiết khấu toàn bộ sản phẩm"
                                                    placeholder="Nhập giá trị"
                                                />
                                                <FastField
                                                    name="typeDiscount"
                                                    component={FormRowSelect}
                                                    placeholder="Chọn loại"
                                                    options={TYPE_VALUE}
                                                    notLabel
                                                />
                                            </div>
                                            {values.typeDiscount === '%' && (
                                                <FastField
                                                    name="maxAmount"
                                                    component={FormRow}
                                                    type="text"
                                                    labelText="Số tiền tối đa"
                                                    placeholder="Nhập giá trị"
                                                    unit="VNĐ"
                                                />
                                            )}
                                        </>
                                    )} */}

                                    {/* {values.discountRange === EACH_PRODUCT && ( */}
                                    <Button
                                        type="button"
                                        classname="btn-custom btn-icon"
                                        text="Thiết lập chiết khấu"
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
                                        text={isEditing ? `Cập nhật` : 'Thêm'}
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
