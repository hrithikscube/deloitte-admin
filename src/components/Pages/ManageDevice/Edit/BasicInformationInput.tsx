import React, { Fragment, useEffect, useState } from 'react'
import { Input } from '../../../Common/Input/Input'
import { CircularProgress } from '@mui/material';
import CustomButton from '../../../Common/CustomButton';
import { showToastMessage } from '../../../../utils/helpers';
import Validator from 'validatorjs';
import { SelectWithName } from '../../../Common/Input/SelectWithName';
import axiosInstance from '../../../../utils/axios';
import FileUpload from '../../../Common/FileUpload';

const BasicInformationInput = ({ data }: any) => {

    const [isLoading, setIsLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    const initialStates = {
        name: '',
        device_access_type: '',
        device_logo: ''
    }

    const rules = {
        name: 'required|max:100|string',
        device_access_type: 'required|max:200|string',
        device_logo: 'required'

    }
    const [params, setParams] = useState(initialStates as any);
    const [errors, setErrors] = useState(initialStates as any);

    const updateParams = (records: any) => {
        const newParams = JSON.parse(JSON.stringify(params))
        Object.keys(records).forEach((key) => (newParams[records[key].name] = records[key].value))
        setParams(newParams)
    }

    useEffect(() => {
        if (data.toString() !== '') {
            setParams({
                ...params,
                name: data.name,
                device_key: data.device_key,
                device_access_type: data.device_access_type,
                device_logo: data.image
                // ip_address: data.device_ip
            })
        }
    }, [data])


    const updateBasicInformation = () => {
        let payload = {
            name: params.name,
            device_key: data.device_key,
            device_access_type: params.device_access_type,
            image: params.device_logo
        }

        axiosInstance.put(`/admin/manage-device/${data.id}`, payload)
            .then((response) => {
                console.log(response)
                showToastMessage('Device  Config Updated  Successfully', 'success')
                setDisableButton(false)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                showToastMessage('Unable to process that request', 'error')
                setDisableButton(false)
                setIsLoading(false)
            })
    }

    const handleChange = (e: any) => {
        if (e.target) {
            const { name, value } = e.target
            if (name === 'email' && e.keyCode === 49) {
                return
            }
            if (name === 'pincode' || name === 'phone') {
                const re = /^[0-9+]+$/
                if (value && !re.test(value)) {
                    return
                }
            }

            if (name === 'alternate_phone') {
                const re = /^[0-9+]+$/
                if (value && !re.test(value)) {
                    return
                }
            }
            updateParams([{ name, value: typeof value === 'number' ? value : value.trim() }])
        } else {
            updateParams([{ name: e?.name, value: e?.url }])
        }

        if (e?.file) {
            updateParams([{ name: 'device_logo', value: e?.url }])
            setFile(e.file)
        }

        setErrors({})
    }

    const validate = (parameters: any, rule: any) => {
        const validator = new Validator(parameters, rule);

        if (validator.fails()) {
            const fieldErrors: any = {};

            /* eslint-disable */
            for (const key in validator.errors.errors) {
                fieldErrors[key] = validator.errors.errors[key][0];
            }
            /* eslint-enable */

            setErrors(fieldErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleSubmit = () => {
        if (!validate(params, rules)) {
            const err = Object.keys(errors);
            if (err?.length) {
                const input: any = document.querySelector(
                    `input[name=${err[0]}]`
                );
                if (input) {
                    input.scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                        inline: "start",
                    });
                }
            }
            showToastMessage("Please check form errors!", "error");
            return;
        }

        setDisableButton(true);
        setIsLoading(true);

        // api call goes here
        updateBasicInformation()
    };

    const [file, setFile] = useState('')


    const removeImage = (name: string) => {
        setFile('')
        updateParams([{ name: name, value: '' }])
    }

    return (
        <Fragment>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-2 mt-5">

                <Input
                    rows={1}
                    width="w-full"
                    disabled={false}
                    readOnly={false}
                    handleChange={handleChange}
                    value={params?.name}
                    error={!!errors?.name}
                    helperText={errors?.name}
                    label="Device Name"
                    name="name"
                />


                <SelectWithName
                    width="100%"
                    options={[
                        {
                            id: 1,
                            name: "Enter",
                        },
                        {
                            id: 2,
                            name: "Out",
                        },
                        {
                            id: 3,
                            name: "Enter/Out",
                        },
                    ]}
                    value={params?.device_access_type}
                    error={errors?.device_access_type}
                    helperText={errors?.device_access_type}
                    handleChange={handleChange}
                    label="Access Type"
                    name="device_access_type"
                />

                <FileUpload
                    imageUrl={params?.device_logo}
                    removeImage={() => removeImage('device_logo')}
                    styleType={'md'}
                    setImage={handleChange}
                    acceptMimeTypes={['image/jpeg', 'image/png']}
                    title='Upload or Drag and Drop image'
                    label='File Format: .jpeg/ .png'
                    id={`uuid()+device_logo`}
                    maxSize={0.5}
                    filename='device_logo'
                    error={errors?.device_logo}
                />

            </div>
            <br />

            <div className='flex justify-end items-end'>
                <CustomButton
                    // height="47px"
                    disabled={disableButton}
                    borderRadius="0.5rem"
                    onClick={handleSubmit}
                    // width='w-44'
                    variant="contained"
                    size="large"
                >
                    <span className="flex items-center justify-between gap-2 px-5 md:px-20">
                        {isLoading ? (
                            <CircularProgress
                                size="2vh"
                                sx={{ color: "black" }}
                            />
                        ) : (
                            ""
                        )}

                        Update
                    </span>
                </CustomButton>
            </div>
        </Fragment>
    )
}

export default BasicInformationInput