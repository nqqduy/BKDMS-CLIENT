import { Link } from 'react-router-dom';
import imgNotFound from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/Error';

function Error() {
    return (
        <Wrapper className="full-page">
            <div className="error-container">
                <img src={imgNotFound} alt="not-found" />
                <h3>Page not found</h3>
                <p>Trang này không tồn tại</p>
                <Link to="/">Trở về</Link>
            </div>
        </Wrapper>
    );
}

export default Error;
