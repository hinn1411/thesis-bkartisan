import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

export const authClient = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_URL}`,
  withCredentials: true,
});

// export const axiosClient = axios;
// export const authClient = axios