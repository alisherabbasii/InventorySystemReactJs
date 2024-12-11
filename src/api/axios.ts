// src/api/axios.ts
import axios from 'axios';
const BASE_URL = "http://localhost:8080/api"; 
// const BASE_URL = "http://198.7.124.104:8080/api";
// const BASE_URL = "https://inventorysystem.duckdns.org/api";



// export const SOCKET_URL = "http://localhost:8080";


const instance = axios.create({
  baseURL: BASE_URL, 
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;