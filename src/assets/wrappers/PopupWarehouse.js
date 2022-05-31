import styled from 'styled-components';

const Wrapper = styled.section`
    // bóng mờ
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #33333347;
    backdrop-filter: blur(1px);

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;

    .form-warehouse,
    .form-goods-receipt {
        border-radius: 6px;
        padding: 3rem 2rem 4rem;
        box-shadow: var(--shadow-2);

        width: 100%;
        max-width: 900px;
        position: relative;
        background: white;
    }

    h5 {
        margin-top: 0;
        color: var(--color-title);
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    hr {
        margin-bottom: 1rem;
        border: 0.5px solid #3333;
    }

    .form-center-warehouse {
        margin: 0;
        border-radius: 0;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
        width: 100%;
        position: relative;

        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 1rem;
    }

    .form-center-goods-receipt {
        margin: 0;
        border-radius: 0;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
        width: 100%;
        position: relative;
    }
    .form-center-warehouse button,
    .goods-receipt button {
        align-self: end;
        margin-top: 1rem;
        // width: 200px;
    }

    .btn-container-warehouse {
        display: flex;
        gap: 0 0.5rem;
        align-self: flex-end;
        margin-top: 0.5rem;
        flex-flow: row-reverse wrap;
        // position: absolute;
        // top: calc(100% - 1rem);
        // right: 0;
    }
    @media (max-width: 992px) {
        width: 100%;
    }
`;

export default Wrapper;
