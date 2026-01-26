import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://employee-management-system-backend-eta.vercel.app",
  withCredentials: true,
});

export default axiosInstance;