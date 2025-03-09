// src/services/api.ts

import { IError } from "@/types/generic.types";
import axios, { AxiosError } from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (config) => config,
  (error: AxiosError<IError>) => {
    return Promise.reject(error.response?.data || error);
  }
);

export default API;
