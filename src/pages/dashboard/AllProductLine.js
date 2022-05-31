import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { BiDownload, BiPlusCircle } from 'react-icons/bi';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
    addProductLine,
    createProductLine,
    deleteProductLine,
    editingProductLine,
    getAllProductLine,
    updateProductLine,
} from '../../app/productLine/productLineSlice';

import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, Loading } from '../../components';
import { PopupCategory, SearchProCate } from './components';

const AllProductLine = () => {
    const listProductLine = useSelector((state) => state.productLine.listProductLine);
    const isEditing = useSelector((state) => state.productLine.isEditing);
    const currentProductLine = useSelector((state) => state.productLine.currentProductLine);
    const isLoading = useSelector((state) => state.productLine.isLoading);
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [state, setState] = useState({ name: '' });

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
        dispatch(addProductLine());
        setShowPopup(!showPopup);
    };

    const handleEdit = (current) => {
        dispatch(editingProductLine(current));
        setShowPopup(!showPopup);
    };
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const actionResult = await dispatch(getAllProductLine({ ...state }));
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

    const handleSubmit = async (currentProductLine) => {
        try {
            if (isEditing) {
                const actionResult = await dispatch(updateProductLine(currentProductLine));
                const data = unwrapResult(actionResult);
            } else {
                const actionResult = await dispatch(createProductLine(currentProductLine));
                const data = unwrapResult(actionResult);
            }
            await dispatch(getAllProductLine()); // khi thêm thì update ngay tại bảng

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
        ? currentProductLine
        : {
              name: '',
              description: '',
          };

    const handleDelete = async (id) => {
        try {
            const actionResult = await dispatch(deleteProductLine(id));
            const data = unwrapResult(actionResult);
            await dispatch(getAllProductLine()); // khi thêm thì update ngay tại bảng
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };
    return (
        <Wrapper>
            <h5>Quản lý dòng sản phẩm</h5>
            <hr />
            <SearchProCate name="Dòng sản phẩm" state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Thêm dòng sản phẩm"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={handleAdd}
                />
                {/* <Button classname="btn-custom btn-icon" text="Tải Excel" icon={<BiDownload className="front-icon" />} /> */}
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
                                    <th width="20%">Tên dòng sản phẩm</th>
                                    <th width="30%">Mô tả</th>
                                    <th width="30%">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProductLine.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <div className="btn-container btn-action-container">
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="Sửa"
                                                    handleFunction={() => handleEdit(item)}
                                                />
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action delete"
                                                    text="xóa"
                                                    handleFunction={() => {
                                                        Swal.fire({
                                                            title: `Bạn có chắc xóa dòng sản phẩm này không`,
                                                            showCancelButton: true,
                                                            confirmButtonText: 'Có',
                                                            cancelButtonText: 'Thoát',
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                handleDelete(item.id);
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
                            // text="Tiếp"
                            handleFunction={nextPage}
                            icon={<GrCaretNext className="prev-next-icon" />}
                        />
                        <Button
                            classname="btn-custom btn-icon btn-action page"
                            // text="Trở Lại"
                            handleFunction={prevPage}
                            icon={<GrCaretPrevious className="prev-next-icon" />}
                        />
                        {/* <Button classname="btn-custom btn-icon btn-action page" text="toàn bộ" handleFunction={allPage} /> */}
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
                    title="Dòng Sản Phẩm"
                    isLoading={isLoading}
                />
            )}
        </Wrapper>
    );
};

export default AllProductLine;
