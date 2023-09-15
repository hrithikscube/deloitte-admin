import Validator from "validatorjs";
import { Box, CircularProgress, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useEffect, useState } from "react";
import { showToastMessage } from "../../../../utils/helpers";
import { SelectWithName } from "../../../Common/Input/SelectWithName";
import CustomButton from "../../../Common/CustomButton";
import { Input } from "../../../Common/Input/Input";
import axiosInstance from "../../../../utils/axios";
import { fetchDevice } from "../../../../features/manageDeviceSlice";
import { useDispatch } from "react-redux";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fcfcfc",
};

const AddDevice = ({ id, open, handleClose, selectedItem }: any) => {

    const initialStates = {
        name: '',
        device_key: '',
        device_access_type: '',
        device_cloud_password: ''
    }

    const rules = {
        name: 'required|max:100|string',
        device_key: 'required|max:150|string',
        device_access_type: 'required|max:200|string',
        device_cloud_password: 'required',
    }


    const [params, setParams] = useState(initialStates) as any
    const [errors, setErrors] = useState(initialStates) as any

    const updateParams = (records: any) => {
        const newParams = JSON.parse(JSON.stringify(params))
        Object.keys(records).forEach((key) => (newParams[records[key].name] = records[key].value))
        setParams(newParams)
    }

    const onCloseClick = () => {
        setParams(initialStates)
        setErrors(initialStates)
        handleClose()
        setIsloading(false)
    };

    useEffect(() => {
        if (selectedItem) {
            let data = selectedItem
            setParams(selectedItem)
        }
    }, [selectedItem])

    const handleChange = (e: any) => {
        setIsloading(false)
        if (e.target.name === 'name') {
            let res = /^[a-zA-Z0-9 ]*$/g

            if (!res.test(e.target.value)) {
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

    const dispatch = useDispatch()

    const handleSubmit = () => {
        setIsloading(true)
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

            if (Object.keys(selectedItem).length)
                axiosInstance
                    .put(`/admin/manage-device/${selectedItem.id}`, params)
                    .then((response) => {
                        showToastMessage(response.data.data.message, 'success')
                        dispatch(fetchDevice({ status: '', search_key: '' }, 1));
                        onCloseClick()
                        setIsloading(false)

                    })
                    .catch((err) => {
                        const { errors, message } = err.response.data;
                        const erroMsg = errors[Object.keys(errors)[0]] || message;
                        showToastMessage(typeof erroMsg == 'string' ? erroMsg : erroMsg?.message, 'error')
                        setIsloading(false)

                    })
            else
                axiosInstance
                    .post('/admin/manage-device', params)
                    .then((response) => {
                        showToastMessage(response.data.data.message, 'success')
                        onCloseClick()
                        setIsloading(false)
                        dispatch(fetchDevice({ status: '', search_key: '' }, 1));
                    })
                    .catch((err) => {
                        const { errors, message } = err.response.data;
                        const erroMsg = errors[Object.keys(errors)[0]] || message;
                        showToastMessage(typeof erroMsg == 'string' ? erroMsg : erroMsg?.message, 'error')
                        setIsloading(false)
                    })

        }
    }

    const [isloading, setIsloading] = useState(false)

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
                                <h1 className="text-lg font-nunitoMedium text-[#141C4C]">Add Device</h1>

                            </div>
                            <div onClick={onCloseClick} className="cursor-pointer">
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

                        <div className="rounded-lg mt-2">
                            <div className="flex flex-col lg:gap-5 md:gap-5 gap-3 w-full border p-4 rounded-lg">
                                <Input
                                    rows={1}
                                    width="w-full"
                                    disabled={false}
                                    readOnly={false}
                                    handleChange={handleChange}
                                    value={params?.name}
                                    error={!!errors?.name}
                                    helperText={errors?.name}
                                    label="Device name"
                                    name="name"
                                />

                                <Input
                                    rows={1}
                                    width="w-full"
                                    disabled={false}
                                    readOnly={false}
                                    handleChange={handleChange}
                                    value={params?.device_key}
                                    error={!!errors?.device_key}
                                    helperText={errors?.device_key}
                                    label="Device Serial Number"
                                    name="device_key"
                                />




                                <SelectWithName
                                    width="100%"
                                    options={[
                                        {
                                            id: 'Enter',
                                            name: "Enter",
                                        },
                                        {
                                            id: "Out",
                                            name: "Out",
                                        },
                                        {
                                            id: "Enter/Out",
                                            name: "Enter/Out",
                                        }
                                    ]}
                                    value={params?.device_access_type}
                                    error={errors?.device_access_type}
                                    helperText={errors?.device_access_type}
                                    handleChange={handleChange}
                                    label="Access Type"
                                    name="device_access_type"
                                />

                                <Input
                                    rows={1}
                                    width="w-full"
                                    disabled={false}
                                    readOnly={false}
                                    handleChange={handleChange}
                                    value={params?.device_cloud_password}
                                    error={!!errors?.device_cloud_password}
                                    helperText={errors?.device_cloud_password}
                                    label="Cloud Communication Password"
                                    name="device_cloud_password"
                                />

                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-center mt-5">
                            <CustomButton
                                borderRadius='0.5rem'
                                onClick={handleSubmit}
                                variant='contained'
                                size='large'
                                width="w-33"
                                disabled={isloading}
                            >
                                <span className='flex items-center justify-center  gap-2 px-5 md:px-20 '>
                                    {isloading ? <CircularProgress size='2vh' sx={{ color: 'black' }} /> : ''}

                                    {true ? 'Submit' : 'Update'}
                                </span>
                            </CustomButton>
                        </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AddDevice;