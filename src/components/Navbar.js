import { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { FaAlignLeft, FaCaretDown, FaRegUserCircle } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { VscAccount } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toggleSidebar } from '../app/sidebar/sidebarSlice';
import { logoutUser } from '../app/user/userSlice';
import Wrapper from '../assets/wrappers/Navbar';
import Logo from './Logo';
import { Image } from 'cloudinary-react';

function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Wrapper>
            <div className="nav-center">
                <button type="button" className="toggle-btn" onClick={() => dispatch(toggleSidebar())}>
                    <FaAlignLeft />
                </button>
                <div>
                    {/* <Logo /> */}
                    <h3 className="logo-text">Dashboard</h3>
                </div>
                <div className="btn-container navbar1">
                    <IoMdNotificationsOutline className="icon-notify" />
                    <button type="button" className="btn-custom" onClick={() => setShowDropdown(!showDropdown)}>
                        <div>
                            <h5 className="name">{currentUser?.fullName}</h5>
                            <p className="role">{currentUser?.role}</p>
                        </div>

                        {/* <VscAccount className="icon-user" /> */}
                        <Image
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            crop="scale"
                            publicId={currentUser.avatar}
                            width="40"
                        />
                        <FaCaretDown className="icon-user" />
                    </button>
                    <div className={showDropdown ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button type="button" className="dropdown-btn" onClick={() => navigate('/my-account')}>
                            <FaRegUserCircle /> Tài khoản
                        </button>
                        <br />
                        <button
                            type="button"
                            className="dropdown-btn"
                            onClick={() => {
                                Swal.fire({
                                    title: 'Bạn có muốn đăng xuất ?',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'OK',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        dispatch(logoutUser());
                                    }
                                });
                            }}
                        >
                            <BiLogOut />
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default Navbar;
