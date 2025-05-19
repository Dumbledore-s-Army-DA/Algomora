import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// User-related APIs
export const login = (username, password) => {
  return axios.post(`${API_URL}/users/login`, { username, password });
};

export const signup = (userData) => {
  return axios.post(`${API_URL}/users/signup`, userData);
};

export const getUserData = (userId) => {
  return axios.get(`${API_URL}/users/${userId}`);
};


// Questions-related APIs
export const getQuestions = (difficulty) => {
  return axios.get(`${API_URL}/questions/difficulty/${difficulty}`);
};

// New API function to get a question by its ID
export const getQuestionById = (id) => {
  return axios.get(`${API_URL}/questions/${id}`);
};

// Shards-related API
export const getShards = (userId) => {
  return axios.get(`${API_URL}/shards/${userId}`);
};
