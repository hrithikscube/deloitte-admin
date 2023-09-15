import { useNavigate } from "react-router-dom";
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
import FileUpload from "../../../Common/FileUpload";

const fields = {
    emp_id: "",
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    designation: "",
    // card_number: "",
    group: "",
    image: ""
};

interface Props {
    handleBack?: any;
    handleNext?: any;
    edit?: boolean;
    id?: any;
    isview: any;
}

const Form: React.FC<Props> = ({ edit, id, isview }) => {
    const navigate = useNavigate();

    // form states
    const [params, setParams] = useState(fields as any);
    const [errors, setErrors] = useState(fields as any);

    const [isLoading, setIsLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    // popup states
    const [open, setOpen] = useState({
        success: false,
        warning: false,
        question: false,
    });

    const [cancel, setCancel] = useState(false);

    const onCancel = () => {
        handlePopup("warning", true);
        setCancel(true);
    };

    // form Handling Functions
    // const handleChange = (e: any) => {
    //     if (e.target) {
    //         const { name, value } = e.target
    //         if (name === 'email' && e.keyCode === 49) {
    //             return
    //         }
    //         if (name === 'pincode' || name === 'phone') {
    //             const re = /^[0-9+]+$/
    //             if (value && !re.test(value)) {
    //                 return
    //             }
    //         }

    //         if (name === 'alternate_phone') {
    //             const re = /^[0-9+]+$/
    //             if (value && !re.test(value)) {
    //                 return
    //             }
    //         }
    //         updateParams([{ name, value: typeof value === 'number' ? value : value.trim() }])
    //     } else {
    //         updateParams([{ name: e?.name, value: e?.url }])
    //     }

    //     if (e?.file) {
    //         updateParams([{ name: 'image', value: e?.url }])
    //         setFile(e.file)
    //     }

    //     setErrors({})
    // }

    const handleChange = (e: any) => {
        if (e.target && e.target.name === 'name') {
            let res = /^[a-zA-Z0-9 ]*$/g

            if (!res.test(e.target.value)) {
                return
            }
        }

        if ( e.target &&(
            e.target.name === 'pincode' ||
            e.target.name === 'phone' ||
            e.target.name === 'alternate_phone')
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

        if (e?.file) {
            updateParams([{ name: 'image', value: e?.url }])
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
        if (!validate(params, {
            emp_id:'required',
            first_name: 'required|max:50|string',
            last_name: 'required|max:150|string',
            designation: 'required|max:200|string',
            email: 'required|email|max:225',
            group: 'required',
            image: 'required'

        })) {
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

        if (!params.email.endsWith('@scube.me')) {
            setErrors({ ...errors, email: 'Invalid Email Domain!' })
            return
        }

        setDisableButton(true);
        setIsLoading(true);

        const formdata = new FormData()

        for (let key in params) {
            if (params[key] === null || params[key] === undefined || key ==='image') 
                continue

            formdata.append(key, params[key])
        }
 
        if(file) {
         formdata.append('user_image', file)
        }

        if(!id && !file) {
            setErrors({ ...errors, image: 'Please Select Image' })
            return 
        }

        if (id) {
            axiosInstance
                .put(`/admin/employees/${id}`, formdata)
                .then((response) => {
                    showToastMessage('Employee record updated successfully', "success");
                    navigate("/admin/employees");
                    setDisableButton(false);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setDisableButton(false);
                    setIsLoading(false);
                    const { errors, message } = err.response.data;
                    const errorMsg = errors[Object.keys(errors)[0]] || message;
                    showToastMessage(errorMsg, "error");
                });
        }

        else {
            axiosInstance
                .post("/admin/employees", formdata)
                .then((response) => {
                    showToastMessage(response.data.data.message, "success");
                    navigate("/admin/employees");
                    setDisableButton(false);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setDisableButton(false);
                    setIsLoading(false);
                    const { errors, message } = err.response.data;
                    const errorMsg = errors[Object.keys(errors)[0]] || message;
                    showToastMessage(errorMsg, "error");
                });
        }
    };

    // Popup Handling Functions
    const handlePopup = (key: any, value: any) => {
        setOpen({ ...open, [key]: value });
    };

    const handleYes = async () => {
        cancel ? navigate("/admin/employees") : handleSubmit();
    };

    const handleNo = () => {
        setDisableButton(false);
    };

    const handleOkay = () => {
        navigate("/admin/employees");
    };

    const onDateChange = (event: any, name: any) => {
        setParams({ ...params, [name]: moment(event).format('YYYY-MM-DD') })
        setErrors({} as any)
    }

    const fetchEmployeeById = useCallback(async () => {
        setIsLoading(true);
        axiosInstance
            .get(`admin/employees/${id}`)
            .then((response) => {
                console.log(response.data)
                const data = response.data.data;
                setIsLoading(false);

                let tempFile = data.image
                if (tempFile.startsWith('data:image/jpeg;base64,')) {
                    tempFile = data.image
                }
                else {
                    tempFile = 'data:image/jpeg;base64,' + data.image
                }

                setParams({
                    // id: data.id,
                    ...params,
                    first_name: data.first_name ?? '',
                    last_name: data.last_name ?? '',
                    designation: data.designation ?? '',
                    email: data.email ?? '',
                    team: data.team ?? '',
                    group: data.group ?? '',
                    phone: data.phone ?? '',
                    file: tempFile,
                    // file: 'data:image/jpeg;base64,' + data.image,
                    image: tempFile,
                    // card_number: data?.card_no ?? '',
                    emp_id: data.emp_id,
                })
            })
            .catch((error) => {
                setIsLoading(false);
                const { errors, message } = error.response.data;
                const errorMsg = errors[Object.keys(errors)[0]] || message;
                showToastMessage(errorMsg, "error");
            });
    }, [id]);

    useEffect(() => {
        id && fetchEmployeeById();
    }, [id]);

    const updateParams = (records: any) => {
        const newParams = JSON.parse(JSON.stringify(params))
        Object.keys(records).forEach((key) => (newParams[records[key].name] = records[key].value))
        setParams(newParams)
    }

    const [file, setFile] = useState('')

    const removeImage = (name: string) => {
        setFile('')
        updateParams([{ name: name, value: '' }])
    }

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center w-full h-80">
                    <CircularProgress />
                    <span className="text-3xl">Loading...</span>
                </div>
            ) : (
                <>
                    {" "}
                    <div className={`bg-white default_container ${isview ? 'pointer-events-none' : ''}`} >
                        <div>
                            <HeadingTab title="Employee Details" />

                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 ">
                                <div className="w-full flex flex-col gap-5">
                                    <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.emp_id}
                                        error={!!errors?.emp_id}
                                        helperText={errors?.emp_id}
                                        label="Employee ID"
                                        name="emp_id"
                                    />

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
                                        readOnly={id ? true : false}
                                        handleChange={handleChange}
                                        value={params?.email}
                                        error={!!errors?.email}
                                        helperText={errors?.email}
                                        label="Email ID"
                                        name="email"
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
                                        label="Designation"
                                        value={params?.designation}
                                        error={!!errors?.designation}
                                        helperText={errors?.designation}
                                        name="designation"
                                    />

                                    {/* <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        label="Card Number"
                                        value={params?.card_number}
                                        error={!!errors?.card_number}
                                        helperText={errors?.card_number}
                                        name="card_number"
                                    /> */}

                                    <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.group}
                                        error={!!errors?.group}
                                        helperText={errors?.group}
                                        label="Group"
                                        name="group"
                                    />
                                </div>
                                <FileUpload
                                    imageUrl={params.file}
                                    removeImage={() => removeImage('file')}
                                    styleType={window.innerWidth < 768 ? 'md' : 'lg'}
                                    setImage={handleChange}
                                    acceptMimeTypes={['image/jpeg', 'image/png']}
                                    title='Upload or Drag and Drop image'
                                    label='File Format: .jpeg/ .png'
                                    id='img'
                                    maxSize={5}
                                    filename='file'
                                    error={errors?.image}
                                />

                            </div>

                        </div>
                    </div>
                    <br />
                    <br className="block sm:hidden" />
                    {
                        !isview && (
                            <div className="flex justify-end ">
                                <div />
                                <div className="flex justify-between w-full gap-4 sm:justify-end">
                                    <CustomButton
                                        height="47px"
                                        disabled={disableButton}
                                        borderRadius="0.5rem"
                                        onClick={onCancel}
                                        // width='w-44'
                                        variant="outlined"
                                        size="large"
                                    >
                                        <p className="px-5">Cancel</p>
                                    </CustomButton>

                                    <CustomButton
                                        height="47px"
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

                                            {id ? "Update & Save" : "Save"}
                                        </span>
                                    </CustomButton>
                                </div>
                            </div>
                        )
                    }

                    {/* POPUPS */}
                    <>
                        {/* 1. Warning Popup */}
                        <Popup
                            handleYes={handleYes}
                            handleNo={handleNo}
                            open={open.warning}
                            handlePopup={handlePopup}
                            popup="warning"
                            isdeletebtn
                            subtitle={`${cancel
                                ? "Changes are not saved !"
                                : "Are your sure need to delete this profile?"
                                }`}
                            popupmsg={`${cancel
                                ? "Do you want to Proceed without Saving the Details ?"
                                : "Doing this will completely delete the Card information and that cannot be retained agian!"
                                }`}
                        />
                        {/* Success popup */}
                        <Popup
                            handleYes={handleYes}
                            open={open?.success}
                            handlePopup={handlePopup}
                            popup="success"
                            subtitle="Information saved !"
                            popupmsg="Customer Created Successfully !"
                            handleOkay={handleOkay}
                        />
                    </>
                </>
            )}
        </>
    );
};

export default Form;
