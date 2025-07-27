import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 10_000,
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    return Promise.reject(new Error(JSON.stringify(error)));
  }
);
