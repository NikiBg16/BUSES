// src/services/api.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:4000/api", // адрес на бекенда
});

export default api;
