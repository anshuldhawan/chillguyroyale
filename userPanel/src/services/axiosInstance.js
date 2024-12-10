import axios from "axios";

// Function to get the token, adjust according to your auth logic
const getToken = () => {
  return localStorage.getItem("token"); // Example using localStorage
};

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
