import { Outlet } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/FixedLayout';
import { BigSidebar, Navbar, SmallSidebar } from '../../components';

function FixedLayout() {
    // const dispatch = useDispatch();
    // dispatch(
    //     updateInfoUser({
    //         token: localStorage.getItem('token'),
    //         user: localStorage.getItem('user'),
    //     })
    // );
    return (
        <Wrapper>
            <main className="dashboard">
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
            {/* this is center */}
        </Wrapper>
    );
}

export default FixedLayout;
