import { Image } from 'cloudinary-react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/SmallSidebar';
import NavLinks from './NavLinks';
import { toggleSidebar } from '../app/sidebar/sidebarSlice';

function SmallSidebar() {
    const toggleSidebar1 = useSelector((state) => state.sidebar);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <div className={toggleSidebar1 ? `sidebar-container show-sidebar` : 'sidebar-container'}>
                <div className="content">
                    <button type="button" className="close-btn" onClick={() => dispatch(toggleSidebar())}>
                        <FaTimes />
                    </button>
                    <header>
                        <Image
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            crop="scale"
                            publicId={currentUser.linkImg}
                            width="84"
                            height="84"
                        />
                        <h5>BK DMS</h5>
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    );
}

export default SmallSidebar;
