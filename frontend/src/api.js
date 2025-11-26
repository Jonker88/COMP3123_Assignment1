import axios from 'axios';

export const createApi = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });
};

// Create a default instance
export const api = createApi();
