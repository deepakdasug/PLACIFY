import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StudentDataProvider } from './context/StudentDataContext';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Home } from './components/Auth/Home';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/Signup';
import { StudentDashboard } from './components/StudentDashboard/StudentDashboard';
import { TrainerDashboard } from './components/TrainerDashboard/TrainerDashboard';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import './styles/global.css';
import './styles/Home.css';

function AppRoutes() {
  const { isLoggedIn, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={isLoggedIn ? <Navigate to={user?.userType === 'trainer' ? '/trainer/dashboard' : '/student/dashboard'} replace /> : <Home />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to={user?.userType === 'trainer' ? '/trainer/dashboard' : '/student/dashboard'} replace /> : <Login />} />
      <Route path="/signup" element={isLoggedIn ? <Navigate to={user?.userType === 'trainer' ? '/trainer/dashboard' : '/student/dashboard'} replace /> : <Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Student Protected Route */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Trainer Protected Route */}
      <Route
        path="/trainer/dashboard"
        element={
          <ProtectedRoute requiredRole="trainer">
            <TrainerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <StudentDataProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </StudentDataProvider>
    </Router>
  );
}

export default App;
