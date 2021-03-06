import { unwrapResult } from '@reduxjs/toolkit';
import { Image } from 'cloudinary-react';
import { useEffect, useState } from 'react';
import { BiDownload, BiPlusCircle } from 'react-icons/bi';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addProduct, deleteProduct, editingProduct, getAllProduct } from '../../app/product/productSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, Loading } from '../../components';
import { TYPE_PRODUCT } from '../../constants/constants';
import SearchProduct from './components/SearchProduct';
function AllProduct() {
    const isLoading = useSelector((state) => state.product.isLoading);
    const listProduct = useSelector((state) => state.product.listProduct);
    const [state, setState] = useState({ name: '', categoryId: '', productLineId: '', type: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dispatch(getAllProduct({ ...state }));

                unwrapResult(result);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchData();
    }, [dispatch, state]);
    const handleEdit = (product) => {
        dispatch(editingProduct(product));
        navigate('/product/add-product');
    };

    const handleAdd = () => {
        dispatch(addProduct());
        navigate('/product/add-product');
    };

    const handleDelete = async (id) => {
        try {
            //deleteProduct
            const result1 = await dispatch(deleteProduct(id));
            unwrapResult(result1);

            const result = await dispatch(getAllProduct());
            unwrapResult(result);
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
            <h5>Qu???n l?? s???n ph???m</h5>
            <hr />
            <SearchProduct state={state} setState={setState} />
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Th??m s???n ph???m"
                    icon={<BiPlusCircle className="front-icon" />}
                    handleFunction={handleAdd}
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
                                    <th width="5%">STT</th>
                                    <th width="25%">T??n</th>
                                    <th width="15%">???nh</th>
                                    <th width="15%">Danh M???c</th>
                                    <th width="15%">D??ng S???n Ph???m</th>
                                    <th width="15%">Tr???ng Th??i</th>
                                    <th width="10%">Thao t??c</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProduct.map((product, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{product.name}</td>
                                        <td>
                                            <Image
                                                cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                                                crop="scale"
                                                publicId={product.linkImg}
                                                width="100"
                                            />
                                        </td>
                                        <td>{product.category?.name}</td>
                                        <td>{product.productLine?.name}</td>
                                        <td>{TYPE_PRODUCT.find((item) => item.value === product.type)?.label}</td>
                                        <td>
                                            <div className="btn-container btn-action-container">
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action detail"
                                                    text="Chi ti???t"
                                                    handleFunction={() => handleEdit(product)}
                                                />
                                                <Button
                                                    type="button"
                                                    classname="btn-custom btn-icon btn-action delete"
                                                    text="x??a"
                                                    handleFunction={() => {
                                                        Swal.fire({
                                                            title: `B???n c?? ch???c x??a s???n ph???m n??y kh??ng`,
                                                            showCancelButton: true,
                                                            confirmButtonText: 'C??',
                                                            cancelButtonText: 'Tho??t',
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                handleDelete(product.id);
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
        </Wrapper>
    );
}

export default AllProduct;
