import styled from 'styled-components';

const Wrapper = styled.nav`
    @import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap');
    height: var(--nav-height);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
    .logo {
        display: flex;
        align-items: center;
        width: 100px;
    }

    .nav-center {
        display: flex;
        width: 90vw;
        align-items: center;
        justify-content: space-between;
    }

    .toggle-btn {
        background: transparent;
        border-color: transparent;
        font-size: 1.75rem;
        color: var(--primary-50);
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    background: var(--white);

    .btn-container {
        position: relative;

        display: flex;
        align-items: center;
        gap: 0 0.2rem;
    }

    .btn-custom {
        display: flex;
        // align-items: center;
        // justify-content: center;
        gap: 0 0.5rem;
        position: relative;
        // box-shadow: var(--shadow-2);

        background: none;
        color: var(--text-color);
        box-shadow: none;

        transition: 0.5s;
    }

    .name {
        text-align: right;
        text-transform: none;
    }

    .btn-custom:hover {
        transition: 0.5s;
        box-shadow: var(--shadow-2);
    }
    .role {
        color: #4e4c4ccc;
        text-align: right;
        margin: 0;
        padding-top: 10px;
    }
    .icon-user {
        font-size: 20px;
        margin-top: 5px;
    }
    .icon-notify {
        font-size: 25px;
        cursor: pointer;
    }
    .dropdown {
        position: absolute;
        top: 64px;
        left: 25px;
        width: calc(100% - 25px);
        background: white;
        box-shadow: var(--shadow-1);
        padding: 0.8rem 0.5rem;
        text-align: center;
        visibility: hidden;
        border-radius: var(--borderRadius);
    }

    .show-dropdown {
        visibility: visible;
    }

    .dropdown-btn {
        background: transparent;
        border-color: transparent;
        letter-spacing: var(--letterSpacing);
        text-transform: capitalize;
        cursor: pointer;
        color: black;
        font-size: 16px;

        display: flex;
        margin: 0 auto;
        gap: 0 0.5rem;
        align-items: center;
    }

    .logo-text {
        display: none;
        margin: 0;
        color: var(--primary-50);
        font-weight: bold;
        font-family: 'Mochiy Pop P One', sans-serif;
    }

    @media (min-width: 992px) {
        position: sticky;
        top: 0;
        z-index: 1000;
        .nav-center {
            width: 90%;
        }
        .logo {
            display: none;
        }
        .logo-text {
            display: block;
        }
    }
`;
export default Wrapper;
