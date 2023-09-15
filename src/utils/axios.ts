import axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND_URL
const userToken: string = localStorage.getItem('user-token') || ''

// console.log(userToken,'userToken')

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
})

if (userToken.length) {
    /**
     * we'll be setting user token on all request only
     * if we user token on local storage.
     */
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${userToken}`
}

axiosInstance.defaults.withCredentials = true

axiosInstance.interceptors.request.use(
    (config:any) => {
      if(config){
        config.withCredentials = true
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('user-token')}`;
      }
          return config;
      },
      error => {
          return Promise.reject(error);
      }
);

export default axiosInstance
