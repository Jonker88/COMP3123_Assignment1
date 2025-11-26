import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createApi } from '../api';
import '../styles/EmployeePages.css';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
  });
  const [photo, setPhoto] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const api = createApi();
      const response = await api.get(`/emp/employees/${id}`);
      const emp = response.data;
      setFormData({
        first_name: emp.first_name,
        last_name: emp.last_name,
        email: emp.email,
        position: emp.position,
        salary: emp.salary,
        date_of_joining: emp.date_of_joining.split('T')[0],
        department: emp.department
      });
      setCurrentPhoto(emp.photo);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employee');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (photo) {
        data.append('photo', photo);
      }

      const api = createApi();
      await api.put(`/emp/employees/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update employee');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h2>Edit Employee</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="salary">Salary:</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date_of_joining">Date of Joining:</label>
            <input
              type="date"
              id="date_of_joining"
              name="date_of_joining"
              value={formData.date_of_joining}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Photo:</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              accept="image/*"
            />
            {currentPhoto && !photo && (
              <p className="current-photo">Current photo: {currentPhoto}</p>
            )}
            {photo && <p className="new-photo">New photo selected</p>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Updating...' : 'Update Employee'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/employees')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
