import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Don't show navbar on login/signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>Employee Management</h1>
        </div>
        <div className="navbar-menu">
          {token ? (
            <>
              <button
                className="nav-link"
                onClick={() => navigate('/employees')}
              >
                Employees
              </button>
              <button
                className="nav-link"
                onClick={() => navigate('/employees/search')}
              >
                Search
              </button>
              <button className="nav-link logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
