import styled from 'styled-components';

const Wrapper = styled.div`
    h3 {
        margin-bottom: 0.5rem;
        color: var(--primary-50);
    }

    p {
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: var(--black);
    }

    a {
        color: var(--primary-500);
        text-transform: capitalize;
    }

    img {
        height: 50vh;
    }

    .error-container {
        text-align: center;
    }
`;
export default Wrapper;
