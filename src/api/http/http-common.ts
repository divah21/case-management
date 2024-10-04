import axios from "axios";


export const apiUrl = "https://case-management-strapi.onrender.com/api";

export const instance = axios.create({
    baseURL: apiUrl,
    timeout: 300000,
    headers: {
        "Content-Type": "application/json",
    },
})