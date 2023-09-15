import Axios from 'axios'
import * as actions from './api-creators'
const baseURL = process.env.REACT_APP_BACKEND_URL
import { toast } from 'react-toastify';
import { logout } from '../../utils/auth';

const api =
    ({ dispatch }: { dispatch: any }) =>
    (next: any) =>
    async (action: any) => {
        const userToken: string = localStorage.getItem('user-token') || ''
        if (action.type !== actions.apiCallBegan.type) return next(action)

        const { url, method, data, onStart, onSuccess, onError } = action.payload

        if (onStart) dispatch({ type: onStart, payload: {} })

        const headers = { Authorization: `Bearer ${userToken}` }
        try {
            const response = await Axios.request({
                baseURL,
                url,
                method,
                data,
                headers,
                withCredentials:true,
            })

            if (response.headers.Authorization) {
                response.data.data.token = response.headers.Authorization || ''
            }

            if (onSuccess) {
                dispatch({ type: onSuccess, payload: response.data.data, total:response.data.total_list })
            }
        } catch (error: any) {
        const { status } = error.response;

            if (status === 401) {
                toast.dismiss(); // i need to hide all toast notification
                toast.error('Session Expired', {
                  position: toast.POSITION.TOP_RIGHT,
                });
                logout();
                window.location.href = '';
              }

            if (onError) {
                dispatch({ type: onError, payload: error.response.data.errors || {} })
            }
        }

        next(action)
    }

export default api
