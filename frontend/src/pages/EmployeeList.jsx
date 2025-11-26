import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createApi } from '../api';
import '../styles/EmployeePages.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const api = createApi();
      const response = await api.get('/emp/employees');
      setEmployees(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eid) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const api = createApi();
        await api.delete(`/emp/employees?eid=${eid}`);
        fetchEmployees();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete employee');
      }
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="page-header">
        <h2>Employee List</h2>
        <Link to="/employees/add" className="btn btn-primary">
          Add Employee
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="table-responsive">
          <table className="employees-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.employee_id}>
                  <td>{emp.first_name}</td>
                  <td>{emp.last_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department}</td>
                  <td>${emp.salary.toFixed(2)}</td>
                  <td className="actions">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => navigate(`/employees/${emp.employee_id}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => navigate(`/employees/${emp.employee_id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(emp.employee_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
