import styled from 'styled-components';

const Wrapper = styled.section`
    border-radius: 12px;
    width: 100%;
    background: var(--white);
    padding: 3rem 2rem 4rem;
    box-shadow: var(--shadow-2);

    .select-agency-map {
        color: red;
        font-style: italic;
    }
    .level-debt {
        margin-bottom: 10px;
        p {
            font-size: 14px;
            text-transform: capitalize;
            margin-bottom: 10px;

            letter-spacing: var(--letterSpacing);
        }
        display: flex;
        gap: 1rem 9rem;
    }
    .detail {
        color: blue;
        background: #438ffe3d;
        height: 30px;
        width: 115px;
    }

    .btn-action-container {
        display: flex;
        gap: 0.5rem 0.5rem;
    }

    .4word {
        width: 160px !important;
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
    .discount-products {
        input {
            margin-bottom: 10px;
        }
        .prefix-type-discount {
            margin-bottom: 10px;
        }
    }
    .form-center {
        display: grid;
        row-gap: 0.5rem;
    }
    .title-form {
        color: var(--grey-500);
        font-weight: bold;
        text-transform: capitalize;
        margin-bottom: 1rem;
    }

    .condition-level {
        display: block;
    }
    .level-gift {
        padding-bottom: 10px;
    }
    .condition-register {
        display: grid;
        width: 50%;
        grid-template-columns: 7fr 1fr 5fr 1fr;
        gap: 0 0.5rem;
        align-items: center;
        margin-bottom: 1rem;

        .css-react-select {
            flex: 10;
        }
        span,
        button {
            text-align: center;
        }
    }
    .form-row-two-input-notComponent {
        display: grid;
        grid-template-columns: 1fr 0.5fr;
    }
    .form-row-gift {
        display: grid;
        grid-template-columns: 4fr 2fr 2fr 1fr;
        gap: 0 1rem;
        margin-bottom: 1rem;
        align-items: center;
        input {
            margin-bottom: 10px;
        }
        button {
            text-align: right;
        }
    }
    .condition-reward {
        display: grid;
        grid-template-columns: 7fr 6fr 1fr 4fr 1fr;
        gap: 0 1rem;
        align-items: center;
        margin-bottom: 1rem;
        span {
            text-align: center;
        }
        button {
            text-align: right;
        }
    }

    // .form-center button {
    //     align-self: end;
    //     margin-top: 1rem;
    //     width: 200px;
    // }

    .row-info-extra {
        display: grid;
        grid-template-columns: 4fr 1fr;
        align-items: center;
        gap: 0 1rem;
        justify-content: center;

        small {
            font-size: 15px;
            color: var(--primary-50);
            margin-top: 28px;
        }
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

    .button-one {
        display: flex;
        flex-flow: row-reverse;
    }
    // .form-center-product {
    //    button {
    //        width: 200px
    //    }
    // }

    .switch-unit-input {
        display: flex;
        gap: 0 0.5rem;
        margin-bottom: 1rem;
        button {
            margin-top: 30px;
        }
    }
    .container-account {
        .avatar {
            .button-img {
                text-align: center;
                // display: block;
                // float: left;
            }
            text-align: center;
            button {
                margin: auto;
            }
            input[type='file'] {
                display: none;
            }
            margin-bottom: 20px;
            img {
                border-radius: 50%;
                width: 200px;
                height: 200px;
                border: 1px solid var(--primary-50-light);
                box-shadow: var(--shadow-2);
            }
            .img-delete {
                width: 90px;
            }
            .custom-file-upload {
                // display: flex;
                // align-items: center;
                // gap: 1rem;
                // width: 90px;
                border: 1px solid #ccc;
                display: inline-block;
                padding: 6px 12px;
                cursor: pointer;
                background: var(--primary-50-light);
                color: var(--white);
                border-radius: var(--borderRadius);
                letter-spacing: var(--letterSpacing);
                padding: 0.375rem 0.75rem;
                box-shadow: var(--shadow-2);
                transition: var(--transition);
                text-transform: capitalize;
                font-size: 14px;
                margin-bottom: 10px;
            }
        }

        display: block;
    }
    @media (min-width: 992px) {
        .form-center-agency {
            grid-template-columns: 1fr 1fr 1fr 1fr;
            column-gap: 1rem;
        }
        .form-center-level {
            column-gap: 1rem;
        }
        .form-center-product {
            grid-template-columns: 1fr;
            // align-items: center;
            column-gap: 1rem;
        }
    }

    @media (max-width: 1080px) {
        .switch-unit-input {
            display: block;
            button {
                margin-top: 5px;
                margin: 5px auto;
            }
        }
    }

    @media (max-width: 1348px) {
        .condition-level {
            display: block;
        }
        .condition-register {
            width: 100%;
        }
    }

    @media (max-width: 1250px) {
        .condition-reward {
            display: block;
        }
        .form-row-two-input-notComponent {
            margin: 1rem 0;
        }
        .btn-outline {
            display: block;
            margin: 0 auto;
            padding: 10px 0px;
            text-align: center;
        }

        .btn-outline-delete {
            display: block;
            text-align: center;
            margin: 0 auto;
            padding-top: 10px;
        }

        // span {
        //     display: block;
        //     text-align: center;
        // }
    }
    @media (max-width: 641px) {
        .form-row-gift {
            display: block;

            input {
                margin: 1rem 0;
            }
        }
    }

    @media (max-width: 601px) {
        .condition-register {
            width: 100%;
        }
        .condition-register,
        .condition-reward {
            display: block;

            .btn-outline {
                display: block;
                margin: 0 auto;
                padding: 10px 0px;
                text-align: center;
            }

            .btn-outline-delete {
                display: block;
                text-align: center;
                margin: 0 auto;
                padding-top: 10px;
            }

            span {
                display: block;
                text-align: center;
            }
        }
    }
    @media (min-width: 1120px) {
        .form-center-level {
            grid-template-columns: 1fr 1fr;
            column-gap: 1rem;
        }
        .form-center-product {
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 1rem;
        }
    }
    @media (max-width: 1200px) {
        .form-center-agency {
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 1rem;
        }
    }

    @media (max-width: 720px) {
        .form-center-agency {
            grid-template-columns: 1fr 1fr;
            column-gap: 1rem;
        }
    }
    // @media (max-width: 1120px) {
    //     .form-center-agency {
    //         grid-template-columns: 1fr 1fr 1fr;
    //         column-gap: 1rem;
    //     }
    // }

    @media (max-width: 538px) {
        .level-debt {
            display: block;
            text-align: center;

            button {
                margin: auto;
            }
        }

        .debt {
            margin-bottom: 10px;
        }
    }

    @media (max-width: 490px) {
        .form-center-agency {
            grid-template-columns: 1fr;
            column-gap: 1rem;
        }
    }
`;

export default Wrapper;
