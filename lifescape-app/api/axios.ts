import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const IP_ADDRESS = process.env.REACT_APP_IP_ADDRESS;

const api = axios.create({
  baseURL: `${IP_ADDRESS}:8000`,
});

export default api;
