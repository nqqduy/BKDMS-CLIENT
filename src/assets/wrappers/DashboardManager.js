import styled from 'styled-components';

const Wrapper = styled.section`
    border-radius: 12px;
    width: 100%;
    background: var(--white);
    padding: 3rem 2rem 4rem;
    box-shadow: var(--shadow-2);
    .search-report-detail-warehouse {
        display: flex;
        gap: 1rem;
        .form-row {
            width: 200px;
        }
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
    .search-chart {
        display: flex;
        gap: 1rem 1rem;
        button {
            height: 40px;
            margin-top: 13px;
        }

        align-items: center;
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
    . table-product {
    }
    .form-row {
        margin-bottom: 15px;
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
        display: flex;
        flex-flow: row-reverse;
        margin-bottom: 1rem;
        gap: 1rem 1rem;
    }
    .btn-container-page {
        display: flex;
        flex-flow: row-reverse;
        .page {
            color: #102a43;
            background: #438ffe3d;
            width: 80px;
            border-radius: 0px;
        }
    }
    button a {
        color: white;
    }

    .flex-two-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 2rem;
        margin-bottom: 2rem;
    }

    .btn-action-container {
        flex-flow: row;
        justify-content: space-between;
    }

    .btn-action {
        border-color: var(--primary-50);
    }

    .detail {
        color: blue;
        background: #438ffe3d;
        height: 30px;
        width: 115px;
        //padding: 25px 0;
    }
    .delete {
        color: red;
        background: #ff00003d;
        height: 30px;
        width: 115px;
        // padding: 25px 0;
    }

    .container-report-warehouse {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        p {
            margin-bottom: 5px;
        }
        .title {
            text-transform: capitalize;
            font-weight: bold;
            color: #425472;
        }

        .card-report-warehouse {
            display: flex;
            gap: 1rem;
            cursor: pointer;
            padding: 2rem;
            align-items: center;

            border: 1px solid var(--grey);
            border-radius: 6px;
        }

        svg {
            font-size: 2rem;
        }
    }

    @media (min-width: 992px) {
        .form-center {
            grid-template-columns: 1fr 1fr;
            // align-items: center;
            column-gap: 1rem;
        }
    }
    @media (max-width: 992px) {
        .flex-two-row {
            grid-template-columns: 1fr;
            column-gap: 1rem;
        }
    }
    @media (min-width: 1120px) {
        .form-center {
            grid-template-columns: 1fr 1fr;
        }
    }
`;

export default Wrapper;
