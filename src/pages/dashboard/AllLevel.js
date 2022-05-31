import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { BiDownload, BiPlusCircle } from 'react-icons/bi';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addLevel, getAllLevel, getCurrentLevel } from '../../app/level/levelSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, Loading } from '../../components';
import { SearchLevel } from './components';

function AllLevel() {
    const isLoading = useSelector((state) => state.level.isLoading);
    const listLevel = useSelector((state) => state.level.listLevel);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [state, setState] = useState({ name: '' });

    const prevPage = async () => {
        const pg = page === 1 ? 1 : page - 1;
        // console.log(pg);
        setPage(pg);
    };

    const nextPage = async () => {
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
        // console.log(page);
        setPage(pg);
    };

    const allPage = () => {
        setPage(null);
        setPageSize(null);
    };

    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        const fetchAllLevel = async () => {
            try {
                const actionResult = await dispatch(getAllLevel({ ...state, page: page, pageSize: pageSize }));
                const result = unwrapResult(actionResult);
                console.log(result.totalLevel);
                setTotalCount(result.totalLevel);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchAllLevel();
    }, [dispatch, page, pageSize, state]);
    const handleEdit = (item) => {
        dispatch(getCurrentLevel(item));
        navigate('/agency-level/add-level');
    };

    return (
        <Wrapper>
            <h5>Quản lý hạn mức</h5>
            <hr />
            <SearchLevel state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Thêm hạn mức"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={() => {
                        dispatch(addLevel());
                        navigate('/agency-level/add-level');
                    }}
                />
                {/* <Button classname="btn-custom btn-icon" text="Tải Excel" icon={<BiDownload className="front-icon" />} /> */}
            </div>
            {isLoading ? (
                <Loading center />
            ) : (
                <>
                    <div className="table table-product">
                        <table>
                            <thead>
                                <tr>
                                    <th width="10%">STT</th>
                                    <th width="30%">Tên</th>
                                    <th width="40%">Thời gian duy trì</th>
                                    <th width="20%">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listLevel?.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            {item.time.year !== '0' && `${item.time.year} năm `}
                                            {item.time.month !== '0' && `${item.time.month} tháng `}
                                            {item.time.day !== '0' && `${item.time.day} ngày `}
                                        </td>
                                        <td>
                                            <div className="btn-container btn-action-container">
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="Chi tiết"
                                                    handleFunction={() => handleEdit(item)}
                                                />
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action delete"
                                                    text="xóa"
                                                    // handleFunction={() =>
                                                    //     handleDelete(category)
                                                    // }
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
        </Wrapper>
    );
}

export default AllLevel;
