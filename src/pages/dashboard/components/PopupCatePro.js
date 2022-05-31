import { FastField, Form, Formik } from 'formik';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiPlusCircle } from 'react-icons/bi';
import Wrapper from '../../../assets/wrappers/PopupCategory';
import { Button, FormRow, FormRowTextArea, Loading } from '../../../components';
import { validationCategory } from '../../../schema';

export const PopupCategory = ({ isEditing, initialValues, setShowPopup, handleSubmit, title, isLoading }) => {
    return (
        <Wrapper>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationCategory}>
                {(formikProps) => {
                    return (
                        <Form className="form-category">
                            {isEditing ? <h5>sửa {title}</h5> : <h5>Thêm {title}</h5>}
                            <hr />
                            <div className="form-center-category">
                                <FastField
                                    name="name"
                                    component={FormRow}
                                    type="text"
                                    labelText={`Tên ` + title}
                                    placeholder="Nhập tên danh mục..."
                                />
                                <FastField
                                    name="description"
                                    component={FormRowTextArea}
                                    type="text"
                                    labelText="Mô tả"
                                    placeholder="Nhập mô tả"
                                />
                                <div className="btn-container-category">
                                    {isLoading ? (
                                        <Loading center />
                                    ) : (
                                        <>
                                            <Button
                                                type="submit"
                                                classname="btn-custom  btn-icon"
                                                text={isEditing ? 'Cập Nhật' : 'Thêm'}
                                                icon={<BiPlusCircle className="front-icon" />}
                                            />
                                            <Button
                                                type="button"
                                                classname="btn-custom  btn-icon btn-delete"
                                                text="Hủy"
                                                icon={<AiOutlineDelete className="front-icon" />}
                                                handleFunction={setShowPopup}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Wrapper>
    );
};
