import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createApi } from '../api';
import '../styles/EmployeePages.css';

const SearchEmployees = () => {
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSearched(true);

    try {
      const params = new URLSearchParams();
      if (department) params.append('department', department);
      if (position) params.append('position', position);

      const api = createApi();
      const response = await api.get(`/emp/employees/search?${params.toString()}`);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search employees');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eid) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const api = createApi();
        await api.delete(`/emp/employees?eid=${eid}`);
        handleSearch({ preventDefault: () => {} });
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete employee');
      }
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Search Employees</h2>
        <Link to="/employees" className="btn btn-secondary">
          Back to List
        </Link>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g., IT, HR"
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g., Developer, Manager"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {searched && (
        <>
          <h3>Results ({results.length})</h3>
          {results.length === 0 ? (
            <p>No employees found matching your search criteria.</p>
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
                  {results.map((emp) => (
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
        </>
      )}
    </div>
  );
};

export default SearchEmployees;
