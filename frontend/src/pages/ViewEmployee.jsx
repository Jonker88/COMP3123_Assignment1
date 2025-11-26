import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createApi } from '../api';
import '../styles/EmployeePages.css';

const ViewEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const api = createApi();
      const response = await api.get(`/emp/employees/${id}`);
      setEmployee(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employee');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><div className="error-message">{error}</div></div>;
  if (!employee) return <div className="container"><p>Employee not found</p></div>;

  return (
    <div className="container">
      <div className="page-header">
        <h2>Employee Details</h2>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/employees')}
        >
          Back to List
        </button>
      </div>

      <div className="employee-details">
        {employee.photo && (
          <div className="employee-photo">
            <img src={`http://localhost:3000${employee.photo}`} alt={employee.first_name} />
          </div>
        )}
        <div className="employee-info">
          <div className="info-row">
            <strong>First Name:</strong>
            <span>{employee.first_name}</span>
          </div>
          <div className="info-row">
            <strong>Last Name:</strong>
            <span>{employee.last_name}</span>
          </div>
          <div className="info-row">
            <strong>Email:</strong>
            <span>{employee.email}</span>
          </div>
          <div className="info-row">
            <strong>Position:</strong>
            <span>{employee.position}</span>
          </div>
          <div className="info-row">
            <strong>Salary:</strong>
            <span>${employee.salary.toFixed(2)}</span>
          </div>
          <div className="info-row">
            <strong>Date of Joining:</strong>
            <span>{new Date(employee.date_of_joining).toLocaleDateString()}</span>
          </div>
          <div className="info-row">
            <strong>Department:</strong>
            <span>{employee.department}</span>
          </div>

          <div className="action-buttons">
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/employees/${id}/edit`)}
            >
              Edit Employee
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/employees')}
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
