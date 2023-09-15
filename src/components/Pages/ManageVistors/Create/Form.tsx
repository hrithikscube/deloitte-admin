import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Validator from "validatorjs";
import React from "react";
import HeadingTab from "../../../Common/HeadingTab/HeadingTab";
import { Input } from "../../../Common/Input/Input";
import CustomButton from "../../../Common/CustomButton";
import Popup from "../../../Common/Popup";
import { showToastMessage } from "../../../../utils/helpers";
import axiosInstance from "../../../../utils/axios";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import FileUpload from "../../../Common/FileUpload";
import CustomRadio from "../../../Common/CustomRadio";
import { TimeandDatePicker } from "../../../Common/DateTimePicker";
import Toggle from "../../../Common/Input/Toggle";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import CustomTimePicker from "../../../Common/TimePicker";

const fields = {
    // create visitor states
    name: "",
    email: "",
    image: "",
    phone: "",
    gender: "Male",
    id_card_no: "",
    purpose: "",
    come_from: "",
    status: 1, //radio input
    remark: "",
    interviewee_name: "",
    notified_email_list: "",

    // date time field when status is 2
    end_time: "",

    //pass time

    start_time_a: "",
    end_time_a: "",
    start_time_b: "",
    end_time_b: "",
    start_time_c: "",
    end_time_c: "",

    // rule_a: "",
    // rule_b: "",
    // rule_c: "",

    // location: ''
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

    console.log(params, "params at visitor form");

    const [errors, setErrors] = useState(fields as any);
    console.log(errors, "errors");

    // console.log(params, 'params')

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
    //     if (e.target.name === "name") {
    //         let res = /^[a-zA-Z0-9 ]*$/g;

    //         if (!res.test(e.target.value)) {
    //             return;
    //         }
    //     }

    //     if (
    //         e.target.name === "pincode" ||
    //         e.target.name === "phone" ||
    //         e.target.name === "alternate_phone"
    //     ) {
    //         const re = /^[0-9+]+$/;
    //         if (e.target.value && !re.test(e.target.value)) {
    //             return;
    //         }
    //     }

    //     if (e.target) {
    //         const { name, value } = e.target;
    //         updateParams([{ name, value }]);
    //     }
    //     if (e.url) {
    //         updateParams([{ name: e?.name, value: e?.url }]);
    //     }
    //     if (e?.file) {
    //         setParams({ ...params, image: e?.file })
    //         setFile(e.file);
    //     }

    //     setErrors({});
    // };

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

    let rules = {
        name: "required|max:50|string",
        phone: "required|max:20",
        email: "required|email|max:225",
        gender: "required",
        status: "required",
        interviewee_name: "required",

        // start_time_a: "required",
        // start_time_b: "required",
        // start_time_c: "required",
        // end_time_a: "required",
        // end_time_b: "required",
        // end_time_c: "required",
    };
    let rules2 = {
        name: "required|max:50|string",
        phone: "required|max:20",
        email: "required|email|max:225",
        gender: "required",
        status: "required",
        interviewee_name: "required",

        // start_time_a: "required",
        // start_time_b: "required",
        // start_time_c: "required",
        // end_time_a: "required",
        // end_time_b: "required",
        // end_time_c: "required",

        // date time field
        end_time: "required",
    };

    const rulesValidation = () => {
        if (ruleA !== "" && ruleB === "" && ruleC !== "") {
            showToastMessage(
                "Passing time 'A' & 'C' cannot be sent without Passing time 'C'",
                "error"
            );

            return true;
        }

        if (ruleA === "" && ruleB !== "" && ruleC !== "") {
            showToastMessage(
                "Passing time 'B' & 'C' cannot be sent without Passing time 'A'",
                "error"
            );

            return true;
        }

        if (ruleA !== "" && ruleB !== "" && ruleC === "") {
            return false;
        }

        if (ruleA !== "" && ruleB === "" && ruleC === "") {
            return false;
        }

        if (ruleA === "" && ruleB === "" && ruleC === "") {
            return false;
        }
        if (ruleA === "" && ruleB === "" && ruleC !== "") {
            showToastMessage(
                "Passing time 'C' cannot be sent without Passing time 'A' & 'B'",
                "error"
            );
            return true;
        }
        if (ruleA === "" && ruleB !== "" && ruleC === "") {
            showToastMessage(
                "Passing time 'B' cannot be sent without Passing time 'A'",
                "error"
            );
            return true;
        }
    };

    const [ruleA, setRuleA] = useState("") as any;
    const [ruleB, setRuleB] = useState("") as any;
    const [ruleC, setRuleC] = useState("") as any;

    console.log(ruleA, "ruleA");
    console.log(ruleB, "ruleB");
    console.log(ruleC, "ruleC");
    // 24 hr format
    useEffect(() => {
        if (params.start_time_a !== "" || params.end_time_a !== "") {
            let temp1 =
                moment(params.start_time_a).format("HH:mm:ss") +
                "," +
                moment(params.end_time_a).format("HH:mm:ss");
            setRuleA(temp1);
            setParams({ ...params, rule_a: temp1 });
        }
        if (params.start_time_b !== "" || params.end_time_b !== "") {
            let temp2 =
                moment(params.start_time_b).format("HH:mm:ss") +
                "," +
                moment(params.end_time_b).format("HH:mm:ss");
            setRuleB(temp2);
            setParams({ ...params, rule_b: temp2 });
        }
        if (params.start_time_c !== "" || params.end_time_c !== "") {
            let temp3 =
                moment(params.start_time_c).format("HH:mm:ss") +
                "," +
                moment(params.end_time_c).format("HH:mm:ss");
            setRuleC(temp3);
            setParams({ ...params, rule_c: temp3 });
        }
    }, [
        params.start_time_a,
        params.start_time_b,
        params.start_time_c,
        params.end_time_a,
        params.end_time_b,
        params.end_time_c,
    ]);

    const handleSubmit = () => {
        if (rulesValidation()) {
            return;
        }

        // return;

        if (!validate(params, params.status === 2 ? rules2 : rules)) {
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
        } else if (validateTimeInterval()) {
            return;
        }
        // else if (rulesValidation()) {
        //     return;
        // }

        setDisableButton(true);
        setIsLoading(true);

        const formdata = new FormData();

        for (let key in params) {
            if (params[key] === null || params[key] === undefined) continue;

            formdata.append(key, params[key]);
        }
        if (file) {
            formdata.append('image', file)
        } else {
            formdata.append('image', params.user_image)
        }

        if (id) {
            axiosInstance
                .put(`/admin/visitors/${id}`, formdata)
                .then((response) => {
                    showToastMessage("Visitor updated successfully", "success");
                    navigate("/admin/manage-visitors");
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
        } else {
            axiosInstance
                .post("/admin/visitors", formdata)
                .then((response) => {
                    showToastMessage(response.data.data.message, "success");
                    navigate("/admin/manage-visitors");
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
        setParams({ ...params, [name]: moment(event).format("YYYY-MM-DD") });
        setErrors({} as any);
    };

    // function convertTimeStringToIST(timeString: any) {
    //     const now = new Date();
    //     const [hours, minutes, seconds] = timeString.split(':');

    //     now.setHours(hours, minutes, seconds);

    //     const istOptions = {
    //         timeZone: 'Asia/Kolkata',
    //         weekday: 'short',
    //         year: 'numeric',
    //         month: 'short',
    //         day: 'numeric',
    //         hour: 'numeric',
    //         minute: 'numeric',
    //         second: 'numeric',
    //         timeZoneName: 'long',
    //     } as any

    //     const formattedDate = now.toLocaleString('en-US', istOptions);
    //     return formattedDate;
    // }

    function convertToCustomFormat(timeString: any) {
        const now = new Date();
        const [hours, minutes, seconds] = timeString.split(':').map(Number);

        now.setHours(hours);
        now.setMinutes(minutes);
        now.setSeconds(seconds);

        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
        } as any

        return now.toLocaleString('en-US', options);
    }



    const fetchVisitorInformationById = () => {
        axiosInstance
            .get(`/admin/visitors/${id}`)
            .then((response) => {
                let { data } = response.data;
                console.log(data, 'data at fetch by id');
                // console.error(data.rule_a.split(","), "ssssssss");
                // const timeA = data.rule_a.split(",");
                // console.log(data.rule_a)

                const timeA = data.rule_a !== null ? data?.rule_a?.split(",") : []
                const timeB = data.rule_b !== null ? data?.rule_b?.split(",") : []
                const timeC = data.rule_c !== null ? data?.rule_c?.split(",") : []

                let tempValue1 = timeA.length > 1 ? convertToCustomFormat(timeA[0]) : ''
                let tempValue2 = timeA.length > 1 ? convertToCustomFormat(timeA[1]) : ''

                let tempValue3 = timeB.length > 1 ? convertToCustomFormat(timeB[0]) : ''
                let tempValue4 = timeB.length > 1 ? convertToCustomFormat(timeB[1]) : ''

                let tempValue5 = timeC.length > 1 ? convertToCustomFormat(timeC[0]) : ''
                let tempValue6 = timeC.length > 1 ? convertToCustomFormat(timeC[1]) : ''

                setParams({
                    ...params,
                    name: data?.name,
                    email: data?.email,
                    image: data?.image,
                    phone: data?.phone,
                    gender: data?.gender,
                    id_card_no: data?.id_card_no,
                    purpose: data?.purpose,
                    come_from: data?.come_from,
                    status: data?.status,
                    remark: data?.remark,
                    interviewee_name: data?.interviewee_name,
                    notified_email_list: data?.notified_email_list,
                    
                    start_time_a: tempValue1,
                    end_time_a: tempValue2,

                    start_time_b: tempValue3,
                    end_time_b: tempValue4,

                    start_time_c: tempValue5,
                    end_time_c: tempValue6,

                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (id) {
            fetchVisitorInformationById();
        }
    }, [id]);

    const updateParams = (records: any) => {
        const newParams = JSON.parse(JSON.stringify(params));
        Object.keys(records).forEach(
            (key) => (newParams[records[key].name] = records[key].value)
        );
        setParams(newParams);
    };

    const [file, setFile] = useState("");

    const removeImage = (name: string) => {
        setFile("");
        updateParams([{ name: name, value: "" }]);
    };

    const radioItems = [
        {
            label: "Male",
            value: "Male",
        },
        {
            label: "Female",
            value: "Female",
        },
    ];

    const statusTypes = [
        {
            label: "Permanently effective",
            value: 1,
        },
        {
            label: "Effective within validity period",
            value: 2,
        },
    ];

    const handleRadio = (e: any) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };

    const handleDate = (newValue: any) => {
        setErrors(fields);
        const newDate = moment(new Date(newValue)).format(
            "DD-MMM-YYYY HH:mm:ss"
        );

        setParams({ ...params, end_date: newDate });
    };

    const handleTime = (newValue: any | null, name: any) => {
        setErrors({});
        setParams({ ...params, [name]: new Date(newValue) });
    };

    function checkOverlap(intervals: any) {
        // Sort intervals based on their start times
        intervals.sort((a: any, b: any) => a[0] - b[0]);

        for (let i = 1; i < intervals.length; i++) {
            const prevInterval = intervals[i - 1];
            const currentInterval = intervals[i];

            if (currentInterval[0] < prevInterval[1]) {
                return true; // Overlap detected
            }
        }

        return false; // No overlap
    }

    const [isOverlap, setIsOverlap] = useState(false);

    const validateTimeInterval = () => {
        if (
            params.start_time_a !== "" &&
            params.end_time_a !== "" &&
            params.start_time_b !== "" &&
            params.end_time_b &&
            params.start_time_c !== "" &&
            params.end_time_c
        ) {
            const interval1 = [
                moment(params?.start_time_a).format("LT").slice(0, 5),
                moment(params?.end_time_a).format("LT").slice(0, 5),
            ];
            const interval2 = [
                moment(params?.start_time_b).format("LT").slice(0, 5),
                moment(params?.end_time_b).format("LT").slice(0, 5),
            ];
            const interval3 = [
                moment(params?.start_time_c).format("LT").slice(0, 5),
                moment(params?.end_time_c).format("LT").slice(0, 5),
            ];

            const timeIntervals = [interval1, interval2, interval3];

            console.log(timeIntervals, "timeIntervals");

            const overlapExists = checkOverlap(timeIntervals);
            console.log(overlapExists, "is Overlap");
            setIsOverlap(overlapExists);
            // alert(overlapExists)
            if (overlapExists) {
                showToastMessage("Time Period has an overlap", "error");
                return overlapExists;
            } else {
                return overlapExists;
            }
        }
    };

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
                    <div
                        className={`bg-white default_container ${isview ? "pointer-events-none" : ""
                            }`}
                    >
                        <div>
                            <HeadingTab title="Visitor Information" />

                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 ">
                                <div className="w-full flex flex-col gap-5">
                                    {/* <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.name}
                                        error={errors?.name}
                                        helperText={errors?.name}
                                        label="Enter Name"
                                        name="name"
                                    /> */}
                                    <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.name}
                                        error={!!errors?.name}
                                        helperText={errors?.name}
                                        label="First Name"
                                        name="name"
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
                                        label="Enter Phone"
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
                                        label="Enter Email"
                                        name="email"
                                    />
                                    {/* <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.location}
                                        error={!!errors?.location}
                                        helperText={errors?.location}
                                        label="Location"
                                        name="location"
                                    /> */}

                                    <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.id_card_no}
                                        error={!!errors?.id_card_no}
                                        helperText={errors?.id_card_no}
                                        label="ID Card / IC Card"
                                        name="id_card_no"
                                    />

                                    <div className="flex items-center gap-5">
                                        <p className="font-nunitoMedium text-base">
                                            Gender:
                                        </p>
                                        <CustomRadio
                                            name="gender"
                                            value={params.gender}
                                            items={radioItems}
                                            onChange={handleRadio}
                                        />
                                    </div>

                                    <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.purpose}
                                        error={!!errors?.purpose}
                                        helperText={errors?.purpose}
                                        label="Purpose"
                                        name="purpose"
                                    />

                                    <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.come_from}
                                        error={!!errors?.come_from}
                                        helperText={errors?.come_from}
                                        label="Come From (Company)"
                                        name="come_from"
                                    />

                                    <div className="flex items-center gap-5">
                                        <p className="font-nunitoMedium text-base">
                                            Status:
                                        </p>
                                        <CustomRadio
                                            name="status"
                                            value={params.status}
                                            items={statusTypes}
                                            onChange={handleRadio}
                                        />
                                    </div>

                                    {params.status == 2 ? (
                                        <div>
                                            <TimeandDatePicker
                                                label="End Time"
                                                handleChange={handleDate}
                                                value={params.end_time}
                                                error={errors.end_time}
                                                helperText={errors.end_time}
                                                minDate={new Date()}
                                            />

                                            <p className="text-sm mt-1 text-start font-nunitoMedium text-[#808080]">
                                                Note: After the validity period
                                                expires, the device will
                                                automatically delete personnel
                                            </p>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.remark}
                                        error={!!errors?.remark}
                                        helperText={errors?.remark}
                                        label="Remark"
                                        name="remark"
                                    />

                                    <div className="flex flex-col gap-2">
                                        <p className="text-base font-nunitoBold">
                                            Passing Time A
                                        </p>
                                        <div className="flex flex-row gap-6 w-full">
                                            <CustomTimePicker
                                                label="Start Time"
                                                name="start_time_a"
                                                value={params.start_time_a}
                                                handleChange={handleTime}
                                                error={errors.start_time_a}
                                                helperText={errors.start_time_a}
                                            />

                                            <CustomTimePicker
                                                label="End Time"
                                                name="end_time_a"
                                                value={params.end_time_a}
                                                handleChange={handleTime}
                                                error={errors.end_time_a}
                                                helperText={errors.end_time_a}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <p className="text-base font-nunitoBold">
                                            Passing Time B
                                        </p>
                                        <div className="flex flex-row gap-6 w-full">
                                            <CustomTimePicker
                                                label="Start Time"
                                                name="start_time_b"
                                                value={params.start_time_b}
                                                handleChange={handleTime}
                                                error={errors.start_time_b}
                                                helperText={errors.start_time_b}
                                            />

                                            <CustomTimePicker
                                                label="End Time"
                                                name="end_time_b"
                                                value={params.end_time_b}
                                                handleChange={handleTime}
                                                error={errors.end_time_b}
                                                helperText={errors.end_time_b}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <p className="text-base font-nunitoBold">
                                            Passing Time C
                                        </p>
                                        <div className="flex flex-row gap-6 w-full">
                                            <CustomTimePicker
                                                label="Start Time"
                                                name="start_time_c"
                                                value={params.start_time_c}
                                                handleChange={handleTime}
                                                error={errors.start_time_c}
                                                helperText={errors.start_time_c}
                                            />

                                            <CustomTimePicker
                                                label="End Time"
                                                name="end_time_c"
                                                value={params.end_time_c}
                                                handleChange={handleTime}
                                                error={errors.end_time_c}
                                                helperText={errors.end_time_c}
                                            />
                                        </div>
                                    </div>

                                    {isOverlap ? (
                                        <p className="text-start -mt-2 text-sm font-nunitoMedium text-red-500">
                                            Pass Time Period has an overlap
                                        </p>
                                    ) : (
                                        <p className="text-start -mt-2 text-sm font-nunitoMedium text-[#808080]">
                                            Note: If you don’t fill all, person
                                            can pass whole day in default.
                                        </p>
                                    )}

                                    <Input
                                        rows={1}
                                        width="w-full"
                                        disabled={false}
                                        readOnly={false}
                                        handleChange={handleChange}
                                        value={params?.interviewee_name}
                                        error={!!errors?.interviewee_name}
                                        helperText={errors?.interviewee_name}
                                        label="Interview Name"
                                        name="interviewee_name"
                                    />

                                    <div>
                                        <Input
                                            rows={1}
                                            width="w-full"
                                            disabled={false}
                                            readOnly={false}
                                            handleChange={handleChange}
                                            value={params?.notified_email_list}
                                            error={
                                                !!errors?.notified_email_list
                                            }
                                            helperText={
                                                errors?.notified_email_list
                                            }
                                            label="Notified Email List"
                                            name="notified_email_list"
                                        />
                                        <p className="text-sm mt-2 text-[#808080] font-nunitoMedium">
                                            Multiple emails should be separated
                                            by comma.
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-start text-base font-nunitoBold mb-2">
                                        Face recognition avatar
                                    </p>

                                    <FileUpload
                                        imageUrl={params?.image}
                                        removeImage={() => removeImage("image")}
                                        styleType={
                                            window.innerWidth < 768 ||
                                                params.role_id === 5
                                                ? "md"
                                                : "lg"
                                        }
                                        setImage={handleChange}
                                        acceptMimeTypes={[
                                            "image/jpeg",
                                            "image/png",
                                        ]}
                                        title="Upload or Drag and Drop image"
                                        label="File Format: .jpeg/ .png"
                                        id="image"
                                        maxSize={0.5}
                                        filename="image"
                                        error={errors?.image}
                                    />
                                    <p className="text-center text-sm font-nunitoMedium text-[#808080] mt-2">
                                        Note: Please upload JPG, PNG, JPEG
                                        images in not more than 500KB.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br className="block sm:hidden" />
                    {!isview && (
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
                    )}
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
