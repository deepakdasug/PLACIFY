import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole?: 'student' | 'trainer';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isLoggedIn, user } = useAuth();
  const [searchParams] = useSearchParams();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Allow trainers to access student dashboard if they have a studentId query param
  if (requiredRole === 'student' && user?.userType === 'trainer') {
    const studentId = searchParams.get('studentId');
    if (studentId) {
      return children;
    }
    return <Navigate to="/trainer/dashboard" replace />;
  }

  if (requiredRole && user?.userType !== requiredRole) {
    return <Navigate to={user?.userType === 'trainer' ? '/trainer/dashboard' : '/student/dashboard'} replace />;
  }

  return children;
};
