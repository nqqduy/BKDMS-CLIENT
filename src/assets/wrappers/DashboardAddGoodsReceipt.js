import styled from 'styled-components';

const Wrapper = styled.section`
    border-radius: 12px;
    width: 100%;
    background: var(--white);
    padding: 3rem 2rem 4rem;
    box-shadow: var(--shadow-2);

    .form-center-warehouse,
    .form-center-order {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        column-gap: 1rem;
        display: grid;
        row-gap: 0.5rem;

        button {
            align-self: end;
            margin-top: 1rem;
            width: 200px;
        }
    }

    .container-table {
        // overflow-x: auto;
        // overflow-y: visible !important;
        margin-bottom: 10px;
    }
    table {
        width: 100%;
        min-width: 1000px;
    }
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

    .button-one {
        display: flex;
        flex-flow: row-reverse;
        gap: 0 1.5rem;
    }
    .form-row {
        margin-bottom: 10px;
    }
    @media (max-width: 1160px) {
        .form-center-warehouse,
        .form-center-order {
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 0.5rem;
        }
    }
    @media (max-width: 620px) {
        .form-center-warehouse,
        .form-center-order {
            grid-template-columns: 1fr 1fr;
            column-gap: 0.5rem;
        }
    }

    @media (max-width: 420px) {
        .form-center-warehouse,
        .form-center-order {
            grid-template-columns: 1fr;
            column-gap: 0.5rem;
        }
    }
`;

export default Wrapper;
