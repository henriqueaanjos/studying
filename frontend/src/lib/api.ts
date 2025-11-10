import axios from "axios";  

export const api = axios.create({
    baseURL: 'http://api-staurora:3333'
});