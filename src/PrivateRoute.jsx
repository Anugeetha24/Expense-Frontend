import { Navigate } from 'react-router-dom';
import authService from './services/auth';

function PrivateRoute({ children, redirectTo = '/login' }) {
  const user = authService.getCurrentUser();
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
}

export default PrivateRoute;