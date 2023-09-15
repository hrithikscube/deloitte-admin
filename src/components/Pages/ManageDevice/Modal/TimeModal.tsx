import Validator from "validatorjs";
import { useEffect } from 'react';
import { Box, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import { showToastMessage } from "../../../../utils/helpers";
import { SelectWithName } from "../../../Common/Input/SelectWithName";
import CustomButton from "../../../Common/CustomButton";
import TextArea from "../../../Common/Input/TextArea";
import { Input } from "../../../Common/Input/Input";
import { TimeandDatePicker } from "../../../Common/DateTimePicker";
import moment from "moment";
import axiosInstance from "../../../../utils/axios";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fcfcfc",
};

const TimeModal = ({ id, open, handleClose }: any) => {

    const fields = {
        time_value: ''
    }

    const rules = {
        time_value: 'required'
    }

    const [params, setParams] = useState(fields) as any
    console.log('params:', params)
    const [errors, setErrors] = useState(fields) as any

    const updateParams = (records: any) => {
        const newParams = JSON.parse(JSON.stringify(params))
        Object.keys(records).forEach((key) => (newParams[records[key].name] = records[key].value))
        setParams(newParams)
    }

    const onCloseClick = () => {
        setParams(fields)
        setErrors(fields)
        handleClose()
    };

    const handleChange = (e: any) => {
        if (e.target.name === 'name') {
            let res = /^[a-zA-Z0-9 ]*$/g

            if (!res.test(e.target.value)) {
                return
            }
        }

        if (
            e.target.name === 'pincode' ||
            e.target.name === 'phone' ||
            e.target.name === 'alternate_phone'
        ) {
            const re = /^[0-9+]+$/
            if (e.target.value && !re.test(e.target.value)) {
                return
            }
        }

        if (e.target) {
            const { name, value } = e.target
            updateParams([{ name, value }])
        }
        if (e.url) {
            updateParams([{ name: e?.name, value: e?.url }])
        }

        setErrors({})
    }

    const validate = (parameters: any, rule: any) => {
        const validator = new Validator(parameters, rule)

        if (validator.fails()) {
            const fieldErrors: any = {}

            /* eslint-disable */
            for (const key in validator.errors.errors) {
                fieldErrors[key] = validator.errors.errors[key][0]
            }
            /* eslint-enable */

            setErrors(fieldErrors)
            return false
        }
        setErrors({})
        return true
    }

    const handleSubmit = () => {
        if (!validate(params, rules)) {
            const err = Object.keys(errors)
            if (err?.length) {
                const input: any = document.querySelector(`input[name=${err[0]}]`)
                if (input) {
                    input.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                        inline: 'start',
                    })
                }
            }
            showToastMessage('Please check form errors!', 'error')
            return
        }
        else {
            // api call goes here
            setTimeApiCall()
        }
    }

    const handleDate = (newValue: any) => {
        setErrors(fields)
        const newDate = moment(new Date(newValue)).format('DD-MMM-YYYY HH:mm:ss')

        setParams({ ...params, time_value: newDate })
    }


    const setTimeApiCall = () => {
        axiosInstance
            .put(`/admin/manage-device/update-time/${id}`, { timestamp: moment(params.tiem_value).unix() })
            .then((response) => {
                showToastMessage(response.data.data.message, 'success')

            })
            .catch((err) => {
                const { errors, message } = err.response.data;
                const errorMsg = errors[Object.keys(errors)[0]] || message;
                showToastMessage(typeof errorMsg == 'string' ? errorMsg : errorMsg?.message, 'error')
            })
    }

    return (
        <div className="">
            <Modal
                open={open}
                onClose={onCloseClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableEnforceFocus
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box
                    sx={style}
                    style={{
                        // textAlign: "center",
                        borderRadius: "8px",
                        outline: "none",
                    }}
                >
                    <div className="lg:p-5 md:p-5 p-4 flex flex-col lg:w-[496px] md:w-[496px] w-[300px] m-auto">
                        <div className="flex lg:items-center justify-between">
                            <div>
                                <h1 className="text-lg font-nunitoMedium text-[#141C4C]">Select Time</h1>

                            </div>
                            <div onClick={handleClose} className="cursor-pointer">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Iconly/Light/Close Square">
                                        <g id="Close Square">
                                            <path id="Stroke 1" d="M14.3936 9.59375L9.60156 14.3857" stroke="#2B2C34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path id="Stroke 2" d="M14.3976 14.3907L9.60156 9.59375" stroke="#2B2C34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path id="Stroke 3" fill-rule="evenodd" clip-rule="evenodd" d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.635 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z" stroke="#2B2C34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div className="bg-[rgb(241,244,248)] rounded-lg p-5 mt-2">
                            <TimeandDatePicker
                                label='Select Time'
                                handleChange={handleDate}
                                value={params.time_value}
                                error={errors.time_value}
                                helperText={errors.time_value}
                                minDate={new Date()}
                            />
                        </div>

                        

                        <div className="flex flex-col justify-end items-end mt-5">
                            <CustomButton
                                borderRadius='0.5rem'
                                onClick={handleSubmit}
                                variant='contained'
                                size='large'
                            >
                                <p className='font-bold text-darkbg font-nunitoRegular text-sm '>
                                    {true ? 'Submit' : 'Update'}
                                </p>
                            </CustomButton>
                        </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default TimeModal;