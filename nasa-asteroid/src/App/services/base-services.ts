import axios from "axios";
import { NASA_BASE_URL } from "App/constants";

export const axiosInstance = axios.create({
  baseURL: NASA_BASE_URL,
});

export default axiosInstance;
