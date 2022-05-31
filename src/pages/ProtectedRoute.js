import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const currentUser = useSelector((state) => state.user.currentUser);

    return currentUser ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
