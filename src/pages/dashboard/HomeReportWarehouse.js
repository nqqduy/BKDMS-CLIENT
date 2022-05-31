import { FaWarehouse } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reportDetailWarehouse, reportOverviewWarehouse } from '../../app/warehouse/warehouseSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';

const HomeReportWarehouse = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <h5>Danh sách báo cáo kho</h5>
            <hr />
            <div className="container-report-warehouse">
                <div
                    className="card-report-warehouse"
                    onClick={() => {
                        navigate('/report-warehouse/overview');
                        dispatch(reportOverviewWarehouse());
                    }}
                >
                    <div className="icon">
                        <FaWarehouse />
                    </div>
                    <div className="info">
                        <p className="title">Báo cáo tồn kho</p>
                        <p>Quản lý số lượng và giá trị tồn kho của chi nhánh kho</p>
                    </div>
                </div>
                <div
                    className="card-report-warehouse"
                    onClick={() => {
                        navigate('/report-warehouse/detail');
                        dispatch(reportDetailWarehouse());
                    }}
                >
                    <div className="icon">
                        <FaWarehouse />
                    </div>
                    <div className="info">
                        <p className="title">Báo cáo tồn kho hiện tại</p>
                        <p>Quản lý số lượng ở các trạng thái khác nhau</p>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default HomeReportWarehouse;
