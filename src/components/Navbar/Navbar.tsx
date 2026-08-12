import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src="/placify_logo_v2.png" alt="Logo" className="navbar-logo" />
          <span className="subtitle">Training Institute</span>
        </div>

        <div className="navbar-content">
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/signup" className="nav-link nav-link-button">Sign Up</Link>
          </div>
          
          {user && (
            <>
              <div className="navbar-user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-type">{user.userType}</span>
              </div>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
