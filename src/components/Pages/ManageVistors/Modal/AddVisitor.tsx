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

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fcfcfc",
};

const AddVisitor = ({ id, open, handleClose, isEdit }: any) => {

    const initialStates = {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        type: ''
    }

    const rules = {
        first_name: 'required',
        last_name: 'required',
        phone: 'required',
        email: 'required',
        type: 'required'
    }

    const [params, setParams] = useState(initialStates) as any
    console.log('params:', params)
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
                    <div className="lg:p-5 md:p-5 p-4 flex flex-col lg:w-[671px] md:w-[671px] w-[300px] m-auto">
                        <div className="flex lg:items-center justify-between">
                            <div>
                                <h1 className="text-lg font-nunitoMedium text-[#141C4C]">{isEdit ? 'Edit Visitor' : 'Add Visitor'}</h1>

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

                        <div className="rounded-lg mt-2 w-full">
                            <div className="flex flex-col lg:gap-5 md:gap-5 gap-3 w-full border p-4 rounded-lg">
                                <Input
                                    rows={1}
                                    width="w-full"
                                    disabled={false}
                                    readOnly={false}
                                    handleChange={handleChange}
                                    value={params?.first_name}
                                    error={!!errors?.first_name}
                                    helperText={errors?.first_name}
                                    label="First Name"
                                    name="first_name"
                                />

                                <Input
                                    rows={1}
                                    width="w-full"
                                    disabled={false}
                                    readOnly={false}
                                    handleChange={handleChange}
                                    value={params?.last_name}
                                    error={!!errors?.last_name}
                                    helperText={errors?.last_name}
                                    label="Last Name"
                                    name="last_name"
                                />

                                <Input
                                    rows={1}
                                    width="w-full"
                                    disabled={false}
                                    readOnly={false}
                                    handleChange={handleChange}
                                    value={params?.phone}
                                    error={!!errors?.phone}
                                    helperText={errors?.phone}
                                    label="Phone Number"
                                    name="phone"
                                />

                                <Input
                                    rows={1}
                                    width="w-full"
                                    disabled={false}
                                    readOnly={false}
                                    handleChange={handleChange}
                                    value={params?.email}
                                    error={!!errors?.email}
                                    helperText={errors?.email}
                                    label="Email ID"
                                    name="email"
                                />

                                <SelectWithName
                                    width="100%"
                                    options={[
                                        {
                                            id: 1,
                                            name: "type1",
                                        },
                                        {
                                            id: 2,
                                            name: "type2",
                                        },
                                        {
                                            id: 3,
                                            name: "type3",
                                        },
                                    ]}
                                    value={params?.type}
                                    error={errors?.type}
                                    helperText={errors?.type}
                                    handleChange={handleChange}
                                    label="Visitor Type"
                                    name="type"
                                />

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
                                    {isEdit ? 'Update' : 'Submit'}
                                </p>
                            </CustomButton>
                        </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AddVisitor;