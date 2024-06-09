import axios, {type AxiosInstance, type AxiosResponse} from "axios";
import {toast, type ToastOptions} from "vue3-toastify";

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error): Promise<never> => {
        toast("error.message", {type: 'error'} as ToastOptions);
        return Promise.reject(error);
    }
);

export default api;