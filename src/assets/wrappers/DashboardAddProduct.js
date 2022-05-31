import styled from 'styled-components';

const Wrapper = styled.section`
    border-radius: 12px;
    width: 100%;
    background: var(--white);
    padding: 3rem 2rem 4rem;
    box-shadow: var(--shadow-2);
    h5 {
        margin-top: 0;
        text-transform: capitalize;
        color: #425472;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    hr {
        margin-bottom: 1rem;
        border: 0.5px solid #3333;
    }

    .form {
        margin: 0;
        border-radius: 0;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
        width: 100%;
        position: relative;
    }

    .form-center {
        display: grid;
        row-gap: 0.5rem;
    }

    .form-center button {
        align-self: end;
        margin-top: 1rem;
        width: 200px;
    }

    .btn-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 1rem;
        align-self: flex-end;
        margin-top: 0.5rem;

        position: absolute;
        top: calc(100% - 1rem);
        left: calc(100% - 200px);
    }

    @media (min-width: 992px) {
        .form-center {
            grid-template-columns: 1fr 1fr;
            // align-items: center;
            column-gap: 1rem;
        }
    }

    @media (min-width: 1120px) {
        .form-center {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
`;

export default Wrapper;
