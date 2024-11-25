// src/api/axios.ts
import axios from 'axios';
// const BASE_URL = "http://localhost:8080/api";
// export const SOCKET_URL = "http://localhost:8080";


//  const BASE_URL = "https://45.159.223.118:8443";
 const BASE_URL = "https://lmsapi.duckdns.org/api";
export const SOCKET_URL = "https://lmsapi.duckdns.org";


const instance = axios.create({
  baseURL: BASE_URL, 
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;