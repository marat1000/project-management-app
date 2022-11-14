import axios from 'axios';
import { ELSKeys } from 'ts/enums';

const BASE_URL = 'http://localhost:5000';
export const $api = axios.create({
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
  if (config && config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(ELSKeys.token)}`;
  }
  return config;
});
