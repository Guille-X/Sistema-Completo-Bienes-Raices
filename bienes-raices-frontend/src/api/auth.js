import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const logout = () => {
  localStorage.removeItem('token');
};

export const login = (data) => axios.post(`${API_URL}/login`, data);
export const register = (formData) =>
  axios.post(`${API_URL}/register`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
export const getPendingUsers = () => axios.get(`${API_URL}/pendientes`);
export const approveUser = (id) => axios.put(`${API_URL}/aprobar/${id}`);
export const rejectUser = (id) => axios.delete(`${API_URL}/rechazar/${id}`);
export const verifyToken = (token) =>
  axios.get(`${API_URL}/verify-token`, {
    headers: { Authorization: `Bearer ${token}` }
  });
