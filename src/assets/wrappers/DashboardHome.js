import styled from 'styled-components';

const Wrapper = styled.section`
    border-radius: 12px;
    width: 100%;
    background: var(--white);
    padding: 3rem 2rem 4rem;
    box-shadow: var(--shadow-2);
    background-color: #fefefe;
    background-image: linear-gradient(315deg, #091c65d1 0%, #438ffe 74%);
    .information h5 {
        margin-top: 0;
        text-transform: capitalize;
        color: white;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .top-container {
        display: flex;
        gap: 0 2rem;
    }

    .img-home {
        width: 50%;
        text-align: right;
        img {
            height: 250px;
            width: 280px;
        }
    }

    .information {
        width: 50%;
    }
    .information p {
        color: var(--grey-500);
        letter-spacing: 0.5px;
        color: white;
    }

    .information-company {
        p {
            display: flex;
            align-items: center;
            gap: 0 0.5rem;
        }
    }
    @media (max-width: 750px) {
        .information {
            width: 100%;
        }

        .top-container {
            display: block;
        }

        .img-home {
            display: none;
        }
    }
`;

export default Wrapper;
