import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../middleware/api-creators'
import * as user from '../../utils/auth'
import { showToastMessage } from '../../utils/helpers'

const initialState = {
    user: {},
    isLoading: false,
    show_verify_otp:false,
    login_successfull:false,
    errors: {
        login: {},
    },
}

export const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        formReset: (state, action) => {
            state.errors.login = {}
            state.isLoading = true
            state.show_verify_otp = false
        },

        loginSuccessful: (state, action) => {
            state.isLoading = false;
            if (action.payload.token) {
                state.show_verify_otp = false
                state.login_successfull = true
                user.login(action?.payload?.token.token)
                state.user = action?.payload;
                localStorage.setItem('auth_user', JSON.stringify(state.user))
                showToastMessage("Login Successfully.", 'success')
            } else {
                state.show_verify_otp = true;
                showToastMessage(action.payload.message, 'success')
            }
        },

        otpVerifySuccess: (state, action) => {
            state.isLoading = false
            state.show_verify_otp = false
            state.user = action?.payload;
            state.login_successfull = true
            localStorage.setItem('auth_user', JSON.stringify(state.user))
            user.login(action?.payload?.token)
            showToastMessage("Login Successfully.", 'success')
        },

        authenticationSuccessful: (state, action) => {
            if (action.payload.data.phone) {
                state.user = {
                    phone: action.payload.data.phone,
                }
            }
        },

        loginFailure: (state, action) => {
            state.isLoading = false;    
            state.errors.login = action.payload
            showToastMessage(action.payload.message, 'error')
        },

        loggedOut: (state, action) => {
            state.user = {}
            state.show_verify_otp = false
            state.login_successfull = false
            user.logout()
        },
    },
})

export const {
    loginSuccessful,
    otpVerifySuccess,
    loginFailure,
    authenticationSuccessful,
    loggedOut,
    formReset
} = loginSlice.actions

export default loginSlice.reducer

export const login = (data: any) =>
    apiCallBegan({
        url: '/login',
        method: 'POST',
        data,
        onStart: formReset.type,
        onSuccess: loginSuccessful.type,
        onError: loginFailure.type,
    })

export const verifyOtp = (data: any) =>
    apiCallBegan({
        url: '/verify-otp',
        method: 'POST',
        data,
        onStart: formReset.type,
        onSuccess: otpVerifySuccess.type,
        onError: loginFailure.type,
    })

export const authenticate = () =>
    apiCallBegan({
        url: '/authenticate',
        method: 'GET',
        onSuccess: authenticationSuccessful.type,
        onError: loggedOut.type,
    })

export const logout = () =>
    apiCallBegan({
        url: '/logout',
        method: 'POST',
        onSuccess: loggedOut.type,
    })
