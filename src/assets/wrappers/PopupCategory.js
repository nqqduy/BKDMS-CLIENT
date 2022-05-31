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
    .barcode,
    .scanner-barcode {
        border-radius: 6px;
        padding: 3rem 2rem 4rem;
        box-shadow: var(--shadow-2);
        width: 500px;
        background: white;
    }
    .form-discount,
    .form-category,
    .form-agency,
    .form-contain-product {
        border-radius: 6px;
        padding: 3rem 2rem 4rem;
        box-shadow: var(--shadow-2);
        width: 100%;

        position: relative;
        background: white;
    }

    .debt-detail {
        display: flex;
        gap: 1rem 5rem;
    }

    .form-agency {
        max-width: 1200px;
    }

    .form-category {
        max-width: 640px;
    }

    .form-contain-product {
        max-width: 1200px;
    }

    .contain-product-container {
        display: grid;
        grid-template-columns: auto auto auto auto;
        gap: 1rem;
    }
    .card-contain-product {
        .title {
            color: #0068ff;
            font-weight: bold;
        }
    }
    .btn-container-agency {
        margin-top: 10px;
        display: flex;
        flex-direction: row-reverse;
        gap: 1rem;
    }

    .payment-debt {
        display: grid;
        gap: 0 0.5rem;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        button {
            margin-top: 15px;
            height: 35px;
        }
        align-items: center;
        // .form-row {
        //     margin: 0;
        //     input {
        //         height: 30px;
        //     }
        // }

        // margin-bottom: 10px;
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

    .form-discount {
        max-width: 1200px;
    }

    .discount-each-product {
        display: grid;
        gap: 0 0.5rem;
        grid-template-columns: 0.5fr 3fr 1fr 2.5fr 2fr 2.5fr;
        margin-bottom: 10px;
        align-items: center;
    }
    .discount-products {
        min-width: 750px;
        max-height: 300px;
        height: 300px;
    }
    .container-each-product {
        overflow: auto;
    }
    .form-center-category,
    .form-center-discount {
        margin: 0;
        border-radius: 0;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
        width: 100%;
        position: relative;
    }

    .form-center-category button {
        align-self: end;
        margin-top: 1rem;
        // width: 200px;
    }

    .btn-container-category {
        display: flex;
        gap: 0 0.5rem;
        align-self: flex-end;
        margin-top: 0.5rem;
        flex-flow: row-reverse wrap;
        // position: absolute;
        // top: calc(100% - 1rem);
        // right: 0;
    }
    .button-react-select {
        height: 40px !important;
    }

    .table {
        max-height: 50vh;
        overflow-y: auto;
    }
    @media (max-width: 992px) {
        width: 100%;
    }

    @media (max-width: 750px) {
        .payment-debt {
            .form-row {
                margin-bottom: 5px;
            }
            grid-template-columns: 1fr 1fr 1fr;
            margin-bottom: 10px;
        }
    }

    @media (max-width: 500px) {
        .payment-debt {
            .form-row {
                margin-bottom: 5px;
            }
            display: block;
            margin-bottom: 10px;
        }
    }

    .register-level {
        margin-top: 0px !important;
        margin-bottom: 15px;
    }
`;

export default Wrapper;
