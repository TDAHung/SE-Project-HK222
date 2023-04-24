import axios from "axios";
import { API_URL_TASK } from "../utils/constants";


const AxiosTask = axios.create({
    baseURL: API_URL_TASK,
    headers:{
        'Content-Type': 'application/json'
    }
});

export default AxiosTask;

AxiosTask.interceptors.request.use((config) => {

    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');

    return config
}, (error) => {
    return Promise.reject(error)
});

AxiosTask.interceptors.response.use(config=>{
    return config;
}, error=>{
    return Promise.reject(error)
})

export const get = async (url, option = {}) =>{
    const response = await AxiosTask.get(url, option);
    return response.data; 
}

export const add = async (url, data) => {
    await AxiosTask.post(url,data);
}

export const destroy = async (url) => {
    await AxiosTask.delete(url);
}

export const update = async (url,data) => {
    await AxiosTask.put(url, data);
}