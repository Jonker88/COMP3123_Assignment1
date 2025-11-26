import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Employee Management System</h1>
        <p>Manage your employees efficiently and securely</p>
        
        <div className="landing-buttons">
          <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary btn-lg">
            Sign Up
          </Link>
        </div>

        <div className="landing-features">
          <h2>Features</h2>
          <ul>
            <li>✓ Secure employee management</li>
            <li>✓ Upload employee photos</li>
            <li>✓ Search employees by department and position</li>
            <li>✓ Complete CRUD operations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
