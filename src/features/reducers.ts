import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import employeeSlice from "./employeeSlice";
import manageDeviceSlice from "./manageDeviceSlice";
import visitorSlice from "./visitorSlice";



export default combineReducers({
    auth: authReducer,
    employee:employeeSlice,
    visitor:visitorSlice,
    device:manageDeviceSlice
});
