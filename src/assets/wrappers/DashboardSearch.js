import styled from 'styled-components';

const Wrapper = styled.section`
    border-radius: 12px;
    width: 100%;
    background: var(--white);
    padding: 1rem 2rem;
    box-shadow: var(--shadow-3);
    margin-bottom: 20px;

    .search-container {
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        gap: 1rem 1rem;
    }
    .search-container-goods-receipt {
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        gap: 1rem 1rem;
    }
    .search-container-agency {
        display: grid;
        grid-template-columns: auto auto auto auto;
        gap: 1rem 1rem;
    }
    @media (min-width: 992px) {
    }

    @media (max-width: 1200px) {
        .search-container-goods-receipt {
            grid-template-columns: auto auto auto auto;
        }
    }

    @media (max-width: 950px) {
        .search-container-goods-receipt {
            grid-template-columns: auto auto auto;
        }
    }

    @media (max-width: 880px) {
        .search-container {
            display: grid;
            grid-template-columns: auto auto auto;
            gap: 1rem 1rem;
        }
    }

    @media (max-width: 795px) {
        .search-container-goods-receipt {
            grid-template-columns: auto auto;
        }
    }
    @media (max-width: 660px) {
        .search-container {
            display: grid;
            grid-template-columns: auto auto;
            gap: 1rem 1rem;
        }
    }
    @media (max-width: 590px) {
        .search-container-goods-receipt {
            grid-template-columns: auto;
        }
    }
    @media (max-width: 567px) {
        .search-container {
            display: grid;
            grid-template-columns: auto;
            gap: 1rem 1rem;
        }
    }
    @media (min-width: 1120px) {
    }
`;

export default Wrapper;
