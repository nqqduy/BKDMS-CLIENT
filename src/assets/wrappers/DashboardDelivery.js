import styled from 'styled-components';

const Wrapper = styled.section`
    .container-delivery {
        display: flex;
        gap: 1rem 2rem;
    }
    .container-button {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        gap: 1rem;
    }
    .delivery-detail,
    .delivery-info,
    .config-delivery,
    .config-delivery-info {
        border-radius: 12px;
        background: var(--white);
        padding: 3rem 2rem 4rem;
        box-shadow: var(--shadow-2);
    }

    .config-delivery-info {
        width: 30%;
    }
    .config-delivery {
        width: 70%;
    }

    .title-delivery {
        margin-top: 0;
        text-transform: capitalize;
        color: #425472;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    .total {
        margin-top: 10px;
    }

    .list-product-container {
        height: 55vh;
        overflow-y: auto;
    }
    .product {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        margin-bottom: 20px;
    }
    .title-order,
    .title-order-hightLine {
        margin-top: 5px;
        font-size: 15px;
        letter-spacing: var(--letterSpacing);
        margin-bottom: 0px;
        color: var(--color-parent);
    }

    .delivery-detail {
        width: 70%;
        position: relative;
    }

    .delivery-info {
        width: 30%;
    }

    .title-order-hightLine {
        color: var(--primary-50);
        font-weight: bold;
        text-transform: capitalize;
    }

    .hightLine {
        color: var(--primary-50);
    }
    .hightLine-date {
        color: #333;
        font-style: italic;
        color: var(--primary-50);
    }

    .payment {
        position: absolute;
        bottom: 0;
        left: 0;
        margin-left: 32px;
    }

    .title-delivery-info {
        font-weight: bold;
        text-transform: capitalize;
        color: #425472;
    }

    .order-info {
        margin-bottom: 10px;
    }
    .receive-info {
        margin-top: 10px;
    }
`;

export default Wrapper;
