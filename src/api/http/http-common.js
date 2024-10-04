import axios from "axios";
import authHeader from "../services/auth-headers";

export const apiUrl = "https://case-management-strapi.onrender.com/api";

export const instance = axios.create({
    baseURL: apiUrl,
    timeout: 300000,
    headers: {
        "Content-Type": "application/json",
    },
})