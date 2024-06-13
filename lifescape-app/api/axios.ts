import axios from "axios";

const IP_ADDRESS = process.env.EXPO_PUBLIC_IP_ADDRESS;

const api = axios.create({
  baseURL: `http://${IP_ADDRESS}:8000`,
});

export default api;
