import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { BiDownload, BiPlusCircle } from 'react-icons/bi';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
    addCategory,
    createCategory,
    deleteCategory,
    editingCategory,
    getAllCategory,
    updateCategory,
} from '../../app/category/categorySlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, Loading } from '../../components';
import { PopupCategory, SearchProCate } from './components';

const AllCategory = () => {
    const listCategory = useSelector((state) => state.category.listCategory);
    const isEditing = useSelector((state) => state.category.isEditing);
    const isLoading = useSelector((state) => state.category.isLoading);

    const currentCategory = useSelector((state) => state.category.currentCategory);

    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();

    const [state, setState] = useState({ name: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

    const prevPage = async () => {
        const pg = page === 1 ? 1 : page - 1;
        setPage(pg);
    };

    const nextPage = async () => {
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
        setPage(pg);
    };

    const allPage = () => {
        setPage(null);
        setPageSize(null);
    };

    const handlePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleAdd = () => {
        dispatch(addCategory());
        setShowPopup(!showPopup);
    };

    const handleEdit = (currentCategory) => {
        dispatch(editingCategory(currentCategory));
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const actionResult = await dispatch(getAllCategory({ ...state }));
                unwrapResult(actionResult);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchCategory();
    }, [dispatch, state]);

    const handleSubmit = async (currentCategory) => {
        try {
            if (isEditing) {
                const actionResult = await dispatch(updateCategory(currentCategory));
                unwrapResult(actionResult);
            } else {
                const actionResult = await dispatch(createCategory(currentCategory));
                unwrapResult(actionResult);
            }
            const action2 = await dispatch(getAllCategory()); // khi th??m th?? update ngay t???i b???ng
            unwrapResult(action2);
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

    const handleDelete = async (id) => {
        try {
            const actionResult = await dispatch(deleteCategory(id));
            unwrapResult(actionResult);
            const action2 = await dispatch(getAllCategory()); // khi th??m th?? update ngay t???i b???ng
            unwrapResult(action2);
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };
    const initialValues = isEditing
        ? currentCategory
        : {
              name: '',
              description: '',
          };

    return (
        <Wrapper>
            <h5>Qu???n l?? danh m???c</h5>
            <hr />
            <SearchProCate name="doanh m???c" state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Th??m danh m???c"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={handleAdd}
                />
                {/* <Button classname="btn-custom btn-icon" text="T???i Excel" icon={<BiDownload className="front-icon" />} /> */}
            </div>
            {isLoading ? (
                <Loading center />
            ) : (
                <>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th width="20%">STT</th>
                                    <th width="20%">T??n danh m???c</th>
                                    <th width="30%">M?? t???</th>
                                    <th width="30%">Thao t??c</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listCategory.map((category, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            <div className="btn-container btn-action-container">
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="S???a"
                                                    handleFunction={() => handleEdit(category)}
                                                />
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action delete"
                                                    text="x??a"
                                                    handleFunction={() => {
                                                        Swal.fire({
                                                            title: `B???n c?? ch???c x??a danh m???c n??y kh??ng`,
                                                            showCancelButton: true,
                                                            confirmButtonText: 'C??',
                                                            cancelButtonText: 'Tho??t',
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                handleDelete(category.id);
                                                            }
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div className="btn-container-page">
                        <Button
                            classname="btn-custom btn-icon btn-action page"
                            // text="Ti???p"
                            handleFunction={nextPage}
                            icon={<GrCaretNext className="prev-next-icon" />}
                        />
                        <Button
                            classname="btn-custom btn-icon btn-action page"
                            // text="Tr??? L???i"
                            handleFunction={prevPage}
                            icon={<GrCaretPrevious className="prev-next-icon" />}
                        />
                        {/* <Button classname="btn-custom btn-icon btn-action page" text="to??n b???" handleFunction={allPage} /> */}
                    </div>
                </>
            )}
            {/* popup add and edit category */}
            {showPopup && (
                <PopupCategory
                    setShowPopup={handlePopup}
                    initialValues={initialValues}
                    handleSubmit={handleSubmit}
                    isEditing={isEditing}
                    title="Danh M???c"
                    isLoading={isLoading}
                />
            )}
        </Wrapper>
    );
};

export default AllCategory;
