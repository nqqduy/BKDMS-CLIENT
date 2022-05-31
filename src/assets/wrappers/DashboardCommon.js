import styled from 'styled-components';

const Wrapper = styled.section`
    border-radius: 12px;
    width: 100%;
    background: var(--white);
    padding: 3rem 2rem 4rem;
    box-shadow: var(--shadow-2);

    // input {
    //     height: 30px;
    // }

    span {
        cursor: pointer;
    }
    .container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .title-table {
        font-size: 14px;
    }
    p {
        margin-bottom: 0.5rem;
        text-transform: capitalize;
    }

    h5 {
        margin-top: 0;
        text-transform: uppercase;
        color: var(--grey-500);
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    hr {
        margin-bottom: 1rem;
        border: 0.5px solid #3333;
    }
    .form-unit-basic {
        margin: 0;
        border-radius: 0;
        box-shadow: none;
        padding: 0;
        //max-width: 100%;
        width: 100%;
        position: relative;
    }

    .row-crud-two,
    .row-crud-one {
        display: grid;
        grid-template-columns: 4fr 1fr 1fr;
        align-items: center;
        justify-content: center;
        gap: 0.5rem 0.5rem;
        margin-bottom: 1rem;
        text-align: center;
        button {
            background: transparent;
            border: none;
            cursor: pointer;
        }
    }

    .row-crud-one {
        margin-bottom: 0;
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
    .detail {
        color: blue;
        background: #438ffe3d;
        height: 30px;
        width: 115px;
    }
    .btn-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 992px) {
    }
    @media (max-width: 700px) {
    }
`;

export default Wrapper;
