import NavLinks from './NavLinks';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useSelector } from 'react-redux';
import { Image } from 'cloudinary-react';

function BigSidebar() {
    const toggleSidebar = useSelector((state) => state.sidebar);
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <Wrapper>
            <div className={toggleSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'}>
                <div className="content">
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

export default BigSidebar;
