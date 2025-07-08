import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = (username, password) =>
  axios.post(`${API_URL}/users/login`, { username, password });

export const signup = (userData) =>
  axios.post(`${API_URL}/users/signup`, userData);

export const getUserData = (userId) =>
  axios.get(`${API_URL}/users/${userId}`);

export const getQuestions = (difficulty) =>ge
  axios.get(`${API_URL}/questions/difficulty/${difficulty}`);

export const getQuestionById = (id) =>
  axios.get(`${API_URL}/questions/${id}`);

export const getShards = (userId) =>
  axios.get(`${API_URL}/shards/${userId}`);

export const getEvents = () =>
  axios.get(`${API_URL}/events`);