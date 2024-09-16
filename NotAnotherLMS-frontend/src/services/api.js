// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const login = (credentials) => {
  return axios.post(`${API_URL}/auth/google`, credentials);
};

export const register = (userData) => {
  return axios.post(`${API_URL}/auth/google`, userData);
};
