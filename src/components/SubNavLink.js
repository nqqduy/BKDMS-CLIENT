import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SubNavLink = ({ link }) => {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav((prev) => !prev);
    return (
        <div className="nav-link-sub">
            <div className={subnav ? 'nav-link active-subNav' : 'nav-link'} onClick={() => showSubnav()}>
                <span className="icon">{link.icon}</span>
                {link.text}
                {subnav ? link.iconClosed : link.iconOpened}
            </div>
            <div className="sub-nav">
                {subnav &&
                    link.subNav.map((linkSubNav, indexSub) => {
                        return (
                            <NavLink
                                // onClick={() => dispatch(toggleSidebar())}
                                to={linkSubNav.path}
                                key={indexSub}
                                className={({ isActive }) => {
                                    return isActive ? 'nav-link active' : 'nav-link';
                                }}
                            >
                                <span className="icon">{linkSubNav.icon}</span>
                                {linkSubNav.text}
                            </NavLink>
                        );
                    })}
            </div>
        </div>
    );
};

export default SubNavLink;
