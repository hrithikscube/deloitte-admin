import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Validator from "validatorjs";
import HeadingTab from "../../../Common/HeadingTab/HeadingTab";
import { Input } from "../../../Common/Input/Input";
import CustomButton from "../../../Common/CustomButton";
import Popup from "../../../Common/Popup";
import { showToastMessage } from "../../../../utils/helpers";
import axiosInstance from "../../../../utils/axios";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import { SelectInput } from "../../../Common/Input/Select";
import CustomRadio from "../../../Common/CustomRadio";
import BasicInformationInput from "./BasicInformationInput";
import RecognitionModeInput from "./RecognitionModeInput";
import { useLocation } from "react-router";

// const initialStates = {
//     name: '',
//     device_key: '',
//     device_access_type: '',
//     device_cloud_password: '',
//     ip_address: '',

//     // recognition mode configuration
//     recognition_level: '',

//     // brush face
//     brush_mode_type: '',

//     // swipe
//     swipe_mode: '',
//     temperature_mode: '',
//     face_mode: '',
//     hardware_type: '',
//     transmission_interface: '',

//     // Witness model
//     id_card_mode: '',
//     // QR code
//     qr_code_mode: '',
// }

// const rules = {
//     name: 'required|max:100|string',
//     device_key: 'required|max:150|string',
//     device_access_type: 'required|max:200|string',
//     device_cloud_password: 'required',
//     recognition_level: 'required',
//     ip_address: 'required',
//     brush_mode_type: 'required'
// }

interface Props {
    id?: any;
}

const Form: React.FC<Props> = ({ id }) => {
    const navigate = useNavigate();

    const { state } = useLocation()

    console.log(state, 'location at form')

    const basicInfo = [
        {
            name: 'Device Name',
            value: state.name ?? '-'
        },
        {
            name: 'Device Serial Key',
            value: state.device_key ?? '-'
        },
        {
            name: 'IP',
            value: state.device_ip ?? '-'
        }
    ]

    const [activeTab, setActiveTab] = useState('Basic Information')

    const toggleActive = (tabName: any) => {
        setActiveTab(tabName)
    }

    return (
        <>
            {false ? (
                <div className="flex items-center justify-center w-full h-80">
                    <CircularProgress />
                    <span className="text-3xl">Loading...</span>
                </div>
            ) : (
                <>
                    {" "}
                    <div className="bg-white border p-5 rounded-lg grid lg:grid-cols-3 grid-cols-1">
                        {
                            React.Children.toArray(basicInfo.map(({ name, value }) => (
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-nunitoBold">{name}</p>
                                    <p className="text-base">{value}</p>
                                </div>
                            )))
                        }

                    </div>

                    <br />

                    <div className="bg-white p-5 rounded-lg border">
                        <div className="flex items-center gap-10">
                            {
                                React.Children.toArray(["Basic Information", "Device Configuration"].map(item => (
                                    <p onClick={() => toggleActive(item)}
                                        className={`text-base  ${activeTab === item ? 'border-b-2 border-blue-500 font-nunitoBold' : 'border-b-2  border-white cursor-pointer font-nunitoBold text-[#808080]'} py-2`}>{item}</p>
                                )))
                            }
                        </div>

                        {
                            activeTab === 'Basic Information' ?
                                <BasicInformationInput data={state} /> :
                                <RecognitionModeInput data={state} />
                        }
                    </div>
                    <br />

                </>
            )}
        </>
    );
};

export default Form;
