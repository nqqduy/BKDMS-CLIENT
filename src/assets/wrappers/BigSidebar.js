import styled from 'styled-components';

const Wrapper = styled.aside`
    display: none;
    @media (min-width: 992px) {
        display: block;
        box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
        .sidebar-container {
            background: var(--white);
            min-height: 100vh;
            height: 100%;
            width: 250px;
            margin-left: -250px;
            transition: var(--transition);
        }
        .content {
            position: sticky;
            top: 0;
        }
        .show-sidebar {
            margin-left: 0;
        }
        header {
            height: 6rem;
            display: flex;
            align-items: center;
            // padding-left: 2.5rem;
            justify-content: center;
            gap: 0.5rem;
        }

        header h5 {
            font-family: 'Mochiy Pop P One', sans-serif;
            color: var(--primary-50);
        }

        header .logo {
            height: 6em;
            width: 6em;
        }

        .nav-links {
            padding-top: 1rem;
            display: flex;
            flex-direction: column;
        }
        .nav-link {
            display: flex;
            align-items: center;
            color: var(--grey-500);
            padding: 1rem 0;
            padding-left: 2.5rem;
            text-transform: capitalize;
            transition: var(--transition);
            font-weight: 500;
            margin: 0 0.5rem;
            cursor: pointer;

            position: relative;
        }

        .sub-nav {
            background: var(--grey-50);
            // margin: 0 0.5rem;
            // border-radius: 6px;
            font-size: var(--small-text);
            transition: 0.5s;
        }
        .nav-link:hover {
            background: var(--grey-50);
            padding-left: 3rem;
            color: var(--primary-50);
            border-radius: 12px;
        }
        .nav-link:hover .icon {
            color: var(--primary-50);
        }

        .icon {
            font-size: 1.5rem;
            margin-right: 1rem;
            display: grid;
            place-items: center;
            // transition: var(--transition);
        }

        .active {
            // color: var(--grey-900);
            color: white;
        }

        .active .icon {
            // color: var(--primary-50);
            color: white;
        }

        .nav-link.active {
            background: var(--primary-50);
            box-shadow: var(--shadow-2);
            border-radius: 12px;
        }

        .nav-link.active:hover,
        .nav-link.active .icon {
            color: white;
            background: var(--primary-50);
        }

        .icon-down {
            position: absolute;
            font-size: 20px;
            top: 20px;
            left: 200px;
        }

        .active-subNav {
            background: var(--grey-50);
            margin: 0;
        }
    }
`;
export default Wrapper;
