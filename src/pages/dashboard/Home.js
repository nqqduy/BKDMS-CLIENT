import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { BiCopyright, BiStore } from 'react-icons/bi';
import { BsHouseDoor } from 'react-icons/bs';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoCartOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { getAgenciesInMap } from '../../app/agency/agencySlice';
import { getAllOrder } from '../../app/order/orderSlice';
import { getAllProduct } from '../../app/product/productSlice';
import { getAllWarehouse } from '../../app/warehouse/warehouseSlice';
import home from '../../assets/images/home.svg';
import Wrapper from '../../assets/wrappers/DashboardHome';
import WrapperItem from '../../assets/wrappers/ItemContainer';
import ItemHome from '../../components/ItemHome';

const defaultStats = [
    {
        title: 'Đại lý',
        count: 0,
        icon: <BiStore />,
        color: '#e9b949',
        bcg: '#fcefc7',
        code: 'agency',
    },
    {
        title: 'Sản phẩm',
        count: 0,
        icon: <BiStore />,
        color: '#7d49e9',
        bcg: '#7d49e945',
        code: 'product',
    },
    {
        title: 'Đơn hàng',
        count: 0,
        icon: <IoCartOutline />,
        color: '#647acb',
        bcg: '#e0e8f9',
        code: 'order',
    },
    {
        title: 'Nhà kho',
        count: 0,
        icon: <BsHouseDoor />,
        color: '#d66a6a',
        bcg: '#ffeeee',
        code: 'warehouse',
    },
];
function Home() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const listAgencies = useSelector((state) => state.agency.listAgencies);
    const listWarehouse = useSelector((state) => state.warehouse.listWarehouse);
    const listOrder = useSelector((state) => state.order.listOrder);
    const listProduct = useSelector((state) => state.product.listProduct);
    for (let item of defaultStats) {
        if (item.code === 'warehouse') {
            item.count = listWarehouse.length;
        } else if (item.code === 'order') {
            item.count = listOrder.length;
        } else if ((item.code = 'agency')) {
            item.count = listAgencies.length;
        } else if (item.code === 'product') {
            item.count = listProduct.length;
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const result = await Promise.all([
                dispatch(getAgenciesInMap()),
                dispatch(getAllOrder()),
                dispatch(getAllWarehouse()),
                dispatch(getAllProduct()),
            ]);
            unwrapResult(result[0]);
            unwrapResult(result[1]);
            unwrapResult(result[2]);
            unwrapResult(result[3]);
        };
        fetchData();
    }, [dispatch]);
    return (
        <Wrapper>
            <div className="top-container">
                <div className="information">
                    <h5>Hey, {currentUser.fullName}</h5>
                    <p>
                        <i>Chào mừng bạn đến ứng dụng BKDMS, một ứng dụng quản lý việc phân phối hàng hóa đến đại lý</i>
                    </p>

                    <div className="information-company">
                        <p>
                            <HiOutlineOfficeBuilding className="front-icon" /> Doanh nghiệp: <b>{currentUser.companyName}</b>
                        </p>
                        <p>
                            <BiCopyright className="front-icon" /> Tên tổ chức: <b>{currentUser.workspace}</b>
                        </p>
                    </div>
                </div>
                <div className="img-home">
                    <img src={home} />
                </div>
            </div>
            <WrapperItem className="bottom-container">
                {defaultStats.map((item, index) => {
                    return <ItemHome key={index} {...item} />;
                })}
            </WrapperItem>
        </Wrapper>
    );
}

export default Home;
