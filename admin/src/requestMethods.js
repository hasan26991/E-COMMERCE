import axios from "axios";
// console.log(localStorage.getItem('persist:root'))
const BASE_URL = 'http://localhost:5000/api'
const TOKEN = localStorage.getItem('persist:root') && JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser
    ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken
    : ''


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
});