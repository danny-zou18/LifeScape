import axios from "axios";

const api = axios.create({
  baseURL: "http://128.113.145.204:8000",
});

export default api;
