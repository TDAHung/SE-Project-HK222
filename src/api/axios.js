import axios from "axios";
import { API_URL } from "../utils/constants";


const Axios = axios.create({
    baseURL: API_URL,
    headers:{
        'Content-Type': 'application/json'
    }
});

export default Axios;

Axios.interceptors.request.use((config) => {

    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');

    return config
}, (error) => {
    return Promise.reject(error)
});

Axios.interceptors.response.use(config=>{
    return config;
}, error=>{
    return Promise.reject(error)
})

export const get = async (url, option = {}) =>{
    const response = await Axios.get(url, option);
    return response.data; 
}

export const add = async (url, data) => {
    await Axios.post(url,data);
}

export const update = async (url,data) => {
    await Axios.put(url, data);
}