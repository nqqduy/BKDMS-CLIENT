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
            <h5>Qu???n l?? h???n m???c</h5>
            <hr />
            <SearchLevel state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Th??m h???n m???c"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={() => {
                        dispatch(addLevel());
                        navigate('/agency-level/add-level');
                    }}
                />
                {/* <Button classname="btn-custom btn-icon" text="T???i Excel" icon={<BiDownload className="front-icon" />} /> */}
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
                                    <th width="30%">T??n</th>
                                    <th width="40%">Th???i gian duy tr??</th>
                                    <th width="20%">Thao t??c</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listLevel?.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            {item.time.year !== '0' && `${item.time.year} n??m `}
                                            {item.time.month !== '0' && `${item.time.month} th??ng `}
                                            {item.time.day !== '0' && `${item.time.day} ng??y `}
                                        </td>
                                        <td>
                                            <div className="btn-container btn-action-container">
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="Chi ti???t"
                                                    handleFunction={() => handleEdit(item)}
                                                />
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action delete"
                                                    text="x??a"
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
        </Wrapper>
    );
}

export default AllLevel;
