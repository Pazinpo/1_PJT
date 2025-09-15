import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem("accessToken");

const api = axios.create({
  baseURL: url,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
  withCredentials: true,
});

export default api;
