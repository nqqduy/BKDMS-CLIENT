import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { adminLinks, shipperLinks } from '../utils/links';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../app/sidebar/sidebarSlice';
import { ADMIN, SHIPPER } from '../constants/constants';
import SubNavLink from './SubNavLink';

const NavLinks = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [menuApp, setMenuApp] = useState([]);
    // const dispatch = useDispatch();
    // const [subnav, setSubnav] = useState(false);
    // const showSubnav = () => setSubnav((prev) => !prev);
    useEffect(() => {
        let menu = [];

        if (currentUser.role === ADMIN) {
            menu = adminLinks;
        } else if (currentUser.role === SHIPPER) {
            menu = shipperLinks;
        }

        setMenuApp(menu);
    }, [currentUser]);
    return (
        <div className="container-sidebar">
            <div className="nav-links">
                {menuApp.map((link, index) => {
                    const { text, path, icon, subNav } = link;

                    return (
                        <div key={index}>
                            {subNav ? (
                                <SubNavLink link={link} />
                            ) : (
                                <NavLink
                                    to={path}
                                    // key={index}
                                    className={({ isActive }) => {
                                        return isActive ? 'nav-link active' : 'nav-link';
                                    }}
                                >
                                    <span className="icon">{icon}</span>
                                    {text}
                                </NavLink>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NavLinks;
