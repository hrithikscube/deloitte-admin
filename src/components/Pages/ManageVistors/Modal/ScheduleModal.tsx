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
import moment from "moment";
import CommonDatepicker from "../../../Common/Input/Datepicker";
import CustomTimePicker from "../../../Common/CustomTimepicker";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fcfcfc",
};

const ScheduleModal = ({ id, open, handleClose }: any) => {

    const initialStates = {
        purpose: '',
        preffered_date: '',
        preffered_check_in_time: '',
        preffered_check_out_time: '',
        access_location: '',
        from: '',
        cc: '',
        subject: '',
    }

    const rules = {
        purpose: 'required',
        preffered_date: 'required',
        preffered_check_in_time: 'required',
        preffered_check_out_time: 'required',
        access_location: 'required',
        from: 'required',
        cc: 'required',
        subject: 'required',
    }

    const [params, setParams] = useState(initialStates) as any
    // console.log('params:', params)
    const [errors, setErrors] = useState(initialStates) as any

    const updateParams = (records: any) => {
        const newParams = JSON.parse(JSON.stringify(params))
        Object.keys(records).forEach((key) => (newParams[records[key].name] = records[key].value))
        setParams(newParams)
    }

    const onCloseClick = () => {
        setParams(initialStates)
        setErrors({})
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
        }
    }

    const onDateChange = (event: any, name: any) => {
        setParams({ ...params, [name]: moment(event).format('YYYY-MM-DD') })
        setErrors({} as any)
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
                        {/* title & close button */}
                        <div className="flex lg:items-center justify-between">
                            <div>
                                <h1 className="text-lg font-nunitoMedium text-[#141C4C]">
                                    {true ? 'Schedule Visit and Send Invitation' : 'Reschedule Visit and Send Invitation'}
                                </h1>

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

                        <div className="h-[500px] overflow-auto">
                            <div className="rounded-lg mt-2">
                                <div className="flex flex-col lg:gap-5 md:gap-5 gap-3 w-full border p-4 rounded-lg">


                                    <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.purpose}
                                        error={!!errors?.purpose}
                                        helperText={errors?.purpose}
                                        label="Purpose of Visit"
                                        name="purpose"
                                    />

                                    <CommonDatepicker
                                        label='Preffered Date'
                                        onChange={(e: any) => onDateChange(e, 'date')}
                                        value={params.date}
                                        error={errors?.date}
                                        helperText={errors?.date}
                                    />

                                    <CustomTimePicker label="Preffered Time for Check in" />

                                    <CustomTimePicker label="Preffered Time for Check out" />

                                </div>
                            </div>

                            <div className="rounded-lg mt-4">
                                <div className="flex flex-col lg:gap-5 md:gap-5 gap-3 w-full border p-4 rounded-lg">

                                    <SelectWithName
                                        width="100%"
                                        options={[
                                            {
                                                id: 1,
                                                name: "location1",
                                            },
                                            {
                                                id: 2,
                                                name: "location2",
                                            },
                                            {
                                                id: 3,
                                                name: "location3",
                                            },
                                        ]}
                                        value={params?.access_location}
                                        error={errors?.access_location}
                                        helperText={errors?.access_location}
                                        handleChange={handleChange}
                                        label="Select Access Location"
                                        name="access_location"
                                    />

                                </div>
                            </div>

                            <div className="rounded-lg mt-4">
                                <div className="flex flex-col lg:gap-5 md:gap-5 gap-3 w-full border p-4 rounded-lg">
                                    <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.from}
                                        error={!!errors?.from}
                                        helperText={errors?.from}
                                        label="From"
                                        name="from"
                                    />
                                    <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.cc}
                                        error={!!errors?.cc}
                                        helperText={errors?.cc}
                                        label="CC"
                                        name="cc"
                                    />
                                    <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.subject}
                                        error={!!errors?.subject}
                                        helperText={errors?.subject}
                                        label="Subject"
                                        name="subject"
                                    />
                                    {/* <TextArea
                                        placeholder='Message'
                                        name='body'
                                        rows={5}
                                        handleChange={handleChange}
                                        value={params?.body}
                                        error={errors?.body}
                                        helperText={errors?.body}
                                    /> */}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-end items-end mt-5">
                            <CustomButton
                                borderRadius='0.5rem'
                                onClick={handleSubmit}
                                variant='contained'
                                size='large'
                            >
                                <p className='font-bold text-darkbg font-nunitoRegular text-sm '>
                                    {true ? 'Send Invitation' : 'Update Invitation'}
                                </p>
                            </CustomButton>
                        </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ScheduleModal;