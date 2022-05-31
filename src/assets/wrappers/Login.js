import styled from 'styled-components';

const Wrapper = styled.div`
    // display: flex;
    // align-items: center;

    .logo {
        height: 8em;
        width: 8em;
    }

    h3 {
        color: var(--primary-50);
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: var(--letterSpacing);
        // text-transform: capitalize;
    }

    a {
        text-align: left;
        display: block;
        margin-bottom: 0.5rem;
        letter-spacing: var(--letterSpacing);
    }

    .a--register {
        display: inline-block;
        padding-left: 0.3rem;
    }

    p {
        color: var(--grey-500);
        margin: 0;
        padding: 0;
        margin-top: 1rem;
        margin-bottom: 1rem;
        letter-spacing: var(--letterSpacing);
        text-align: center;
    }

    .p--register {
        margin-bottom: 0;
    }

    .icon {
        color: var(--primary-50);
    }

    .btn-custom {
        width: 100%;
        padding: 1rem;
        font-size: 16px;
    }

    input {
        height: 3rem;
    }

    form {
        text-align: center;
    }

    form a {
        color: var(--primary-50);
    }

    .form-row-two {
        display: flex;
        justify-content: space-between;
        gap: 0 0.5rem;
    }
`;
export default Wrapper;
