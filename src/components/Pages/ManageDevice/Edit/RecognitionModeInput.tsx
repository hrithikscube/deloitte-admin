import React, { Fragment, useEffect, useState } from "react";
import { Input } from "../../../Common/Input/Input";
import { SelectInput } from "../../../Common/Input/Select";
import { CircularProgress } from "@mui/material";
import CustomButton from "../../../Common/CustomButton";
import { showToastMessage } from "../../../../utils/helpers";
import Validator from "validatorjs";
import CustomRadio from "../../../Common/CustomRadio";
import CustomButtonGroup from "../../../Common/Input/IncrementInput";
import axiosInstance from "../../../../utils/axios";

const RecognitionModeInput = ({ data }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const initialStates = {
        name: "",
        com_mod_content: "#WG{idcardNum}#",
        com_mod_type: 1,
        delay_time_for_close_door: 100,
        display_mod_content: "{name}",
        display_mod_type: 1,
        identify_distance: 1,
        identify_scores: 1,
        multiplayer_detection: 2,
        rec_rank: 2,
        rec_stranger_times_threshold: 1,
        save_identify_mode: 1,
        save_identify_time: 4,
        rec_stranger_type: 1,
        tts_mod_content: "{name}",
        tts_mod_stranger_content: "{name}",
        tts_mod_stranger_type: 2,
        tts_mod_type: 2,
        wg: "#WG{id}#",
        whitelist: 1,
    };
    const errorStates = {
        name: "",
        com_mod_content: "",
        com_mod_type: "",
        delay_time_for_close_door: "",
        display_mod_content: "",
        display_mod_type: "",
        identify_distance: "",
        identify_scores: "",
        multiplayer_detection: "",
        rec_rank: "",
        rec_stranger_times_threshold: "",
        save_identify_mode: "",
        save_identify_time: "",
        rec_stranger_type: "",
        tts_mod_content: "",
        tts_mod_stranger_content: "",
        tts_mod_stranger_type: "",
        tts_mod_type: "",
        wg: "",
        whitelist: "",
    };

    const incrementFunction = (name: any) => {
        if (name === "identify_scores") {
            let temp = params.identify_scores;
            temp = parseInt(temp) + 1;

            setParams({ ...params, identify_scores: temp });
        }

        if (name === "delay_time_for_close_door") {
            let temp = params.delay_time_for_close_door;
            temp = parseInt(temp) + 1;

            setParams({ ...params, delay_time_for_close_door: temp });
        }
        if (name === "save_identify_time") {
            let temp = params.save_identify_time;
            temp = parseInt(temp) + 1;

            setParams({ ...params, save_identify_time: temp });
        }
    };

    const decrementFunction = (name: any) => {
        if (name === "identify_scores") {
            let temp = params.identify_scores;
            temp = parseInt(temp) - 1;

            setParams({ ...params, identify_scores: temp });
        }

        if (name === "delay_time_for_close_door") {
            let temp = params.delay_time_for_close_door;
            temp = parseInt(temp) - 1;

            setParams({ ...params, delay_time_for_close_door: temp });
        }
        if (name === "save_identify_time") {
            let temp = params.save_identify_time;
            temp = parseInt(temp) - 1;

            setParams({ ...params, save_identify_time: temp });
        }
    };

    const rules = {
        name: "required",
        com_mod_type: "required",
        delay_time_for_close_door: "required",
        display_mod_content: "required",
        display_mod_type: "required",
        identify_distance: "required",
        identify_scores: "required",
        multiplayer_detection: "required",
        rec_rank: "required",
        rec_stranger_times_threshold: "required",
        save_identify_mode: "required",
        save_identify_time: "required",
        rec_stranger_type: "required",
        tts_mod_content: "required",
        tts_mod_stranger_content: "required",
        tts_mod_stranger_type: "required",
        tts_mod_type: "required",
        wg: "required",
        whitelist: "required",
    };

    const [params, setParams] = useState(initialStates as any);
    const [errors, setErrors] = useState(errorStates as any);

    useEffect(() => {
        if (data) {
            setParams(data);
        }
        // set data here for edit page in recognition mode
    }, []);

    const updateParams = (records: any) => {
        const newParams = JSON.parse(JSON.stringify(params));
        Object.keys(records).forEach(
            (key) => (newParams[records[key].name] = records[key].value)
        );
        setParams(newParams);
    };

    const handleChange = (e: any) => {
        if (e.target) {
            const { name, value } = e.target;
            if (name === "email" && e.keyCode === 49) {
                return;
            }
            if (name === "pincode" || name === "phone") {
                const re = /^[0-9+]+$/;
                if (value && !re.test(value)) {
                    return;
                }
            }

            if (name === "alternate_phone") {
                const re = /^[0-9+]+$/;
                if (value && !re.test(value)) {
                    return;
                }
            }
            updateParams([
                {
                    name,
                    value: typeof value === "number" ? value : value.trim(),
                },
            ]);
        } else {
            updateParams([{ name: e?.name, value: e?.url }]);
        }

        setErrors({});
    };

    const validate = (parameters: any, rule: any) => {
        const validator = new Validator(parameters, rule);

        if (validator.fails()) {
            const fieldErrors: any = {};
            console.log(validator.errors.errors)
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
        console.log(params)
        if (!validate(params, rules)) {
            const err = Object.keys(errors);
            console.log(err)
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
        updateConfigure();
    };

    const radioItems = [
        {
            label: "Turn off",
            value: 1,
        },
        {
            label: "Turn on",
            value: 2,
        },
    ];

    const handleRadio = (e: any) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };

    const updateConfigure = () => {
        axiosInstance
            .put(`/admin/manage-device/configure/${data.id}`, params)
            .then((response) => {
                console.log(response);
                showToastMessage(
                    "Device  Config Updated  Successfully",
                    "success"
                );
                setDisableButton(false);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                showToastMessage("Unable to process that request", "error");
                setDisableButton(false);
                setIsLoading(false);
            });
    };

    return (
        <Fragment>
            <div className="grid grid-cols-1 gap-6 mt-5 w-1/2 mr-auto">
                <Input
                    rows={1}
                    width="w-full"
                    disabled={false}
                    readOnly={false}
                    handleChange={handleChange}
                    value={params?.name}
                    error={!!errors?.name}
                    helperText={errors?.name}
                    label="Name"
                    name="name"
                />
                <SelectInput
                    width="100%"
                    options={[
                        {
                            id: 0,
                            name: "Unlimited",
                        },
                        {
                            id: 1,
                            name: "0.5 meters",
                        },
                        {
                            id: 2,
                            name: "1.0 meters",
                        },
                        {
                            id: 3,
                            name: "1.5 meters",
                        },
                        {
                            id: 4,
                            name: "Within 3 meters",
                        },
                    ]}
                    value={params?.identify_distance}
                    // helperText={errors?.identify_distance}
                    handleChange={handleChange}
                    label="Recognition distance:"
                    name="identify_distance"
                />

                <div>
                    <div className="flex flex-row gap-6">
                        <p className=" text-lg">Recognition score:</p>

                        <CustomButtonGroup
                            value={params.identify_scores}
                            incrementFunction={incrementFunction}
                            decrementFunction={decrementFunction}
                            name="identify_scores"
                        />
                    </div>

                    <p className="text-start text-sm text-[#808080] mt-2">
                        {"Range should be 1 to 100"}
                    </p>
                </div>

                <div>
                    <div className="flex flex-row gap-6">
                        <p className=" text-lg">Recognition interval:</p>

                        <CustomButtonGroup
                            value={params.save_identify_time}
                            incrementFunction={incrementFunction}
                            decrementFunction={decrementFunction}
                            name="save_identify_time"
                        />
                    </div>
                    <p className="text-start text-sm text-[#808080] mt-2">
                        {"Range should be 1 to max positive numbers"}
                    </p>
                </div>

                <SelectInput
                    width="100%"
                    options={[
                        {
                            id: 0,
                            name: "Don't Resume",
                        },
                        {
                            id: 1,
                            name: "Resume",
                        },
                    ]}
                    value={params?.save_identify_mode}
                    // helperText={errors?.identify_distance}
                    handleChange={handleChange}
                    label="Identify recording mode:"
                    name="save_identify_mode"
                />

                <div>
                    <div className="flex flex-row gap-6">
                        <p className=" text-lg">Door open delay:</p>
                        <CustomButtonGroup
                            value={params.delay_time_for_close_door}
                            incrementFunction={incrementFunction}
                            decrementFunction={decrementFunction}
                            name="delay_time_for_close_door"
                        />
                    </div>
                    <p className="text-start text-sm text-[#808080] mt-2">
                        {"Range should be 1 to max positive numbers"}
                    </p>
                </div>

                <SelectInput
                    width="100%"
                    options={[
                        {
                            id: 1,
                            name: "Detect multiple faces",
                        },
                        {
                            id: 2,
                            name: "Detect the largest face",
                        },
                    ]}
                    value={params?.multiplayer_detection}
                    // helperText={errors?.identify_distance}
                    handleChange={handleChange}
                    label="Multi-face detection:"
                    name="multiplayer_detection"
                />

                <SelectInput
                    width="100%"
                    options={[
                        {
                            id: 1,
                            name: "No live detection",
                        },
                        {
                            id: 2,
                            name: "Living Monocular",
                        },
                        {
                            id: 3,
                            name: "Infrared binocular living body",
                        },
                    ]}
                    value={params?.rec_rank}
                    handleChange={handleChange}
                    label="Recognition level:"
                    name="rec_rank"
                />

                <SelectInput
                    width="100%"
                    options={[
                        {
                            id: 1,
                            name: "Direct witness comparison",
                        },
                        {
                            id: 2,
                            name: "Whitelist witness comparison",
                        },
                    ]}
                    value={params?.whitelist}
                    handleChange={handleChange}
                    label="Whitelist:"
                    name="whitelist"
                />

                <SelectInput
                    width="100%"
                    options={[
                        {
                            id: 1,
                            name: "Not broadcast",
                        },
                        {
                            id: 2,
                            name: "Broadcast name",
                        },
                        {
                            id: 100,
                            name: "Customize",
                        },
                    ]}
                    value={params?.tts_mod_type}
                    handleChange={handleChange}
                    label="Broadcast name:"
                    name="tts_mod_type"
                />

                {params?.tts_mod_type == 100 ? (
                    <Input
                        rows={1}
                        width="w-full"
                        disabled={false}
                        readOnly={false}
                        handleChange={handleChange}
                        value={params?.tts_mod_content}
                        error={!!errors?.tts_mod_content}
                        helperText={errors?.tts_mod_content}
                        label="Voice custom content"
                        name="tts_mod_content"
                    />
                ) : (
                    <></>
                )}

                <SelectInput
                    width="100%"
                    options={[
                        {
                            id: 1,
                            name: "Display name",
                        },
                        {
                            id: 100,
                            name: "Customize",
                        },
                    ]}
                    value={params?.display_mod_type}
                    handleChange={handleChange}
                    label="Display mode:"
                    name="display_mod_type"
                />

                {params?.display_mod_type == 100 ? (
                    <Input
                        rows={1}
                        width="w-full"
                        disabled={false}
                        readOnly={false}
                        handleChange={handleChange}
                        value={params?.display_mod_content}
                        error={!!errors?.display_mod_content}
                        helperText={errors?.display_mod_content}
                        label="Show custom content:"
                        name="display_mod_content"
                    />
                ) : (
                    <></>
                )}

                <SelectInput
                    width="100%"
                    options={[
                        {
                            id: 1,
                            name: "Open the door",
                        },
                        {
                            id: 2,
                            name: "No output",
                        },
                        {
                            id: 3,
                            name: "Output personnel ID",
                        },
                        {
                            id: 4,
                            name: "Output ID/IC card number",
                        },
                        {
                            id: 100,
                            name: "Customize",
                        },
                    ]}
                    value={params?.com_mod_type}
                    handleChange={handleChange}
                    label="Serial mode:"
                    name="com_mod_type"
                />

                {params?.com_mod_type == 100 ? (
                    <Input
                        rows={1}
                        width="w-full"
                        disabled={false}
                        readOnly={false}
                        handleChange={handleChange}
                        value={params?.com_mod_content}
                        error={!!errors?.com_mod_content}
                        helperText={errors?.com_mod_content}
                        label="Serial port output custom content:"
                        name="com_mod_content"
                    />
                ) : (
                    <></>
                )}

                <Input
                    rows={1}
                    width="w-full"
                    disabled={false}
                    readOnly={false}
                    handleChange={handleChange}
                    value={params?.wg}
                    error={!!errors?.wg}
                    helperText={errors?.wg}
                    label="Wiegand output:"
                    name="wg"
                />

                <div className="flex items-center gap-5">
                    <p className="font-nunitoMedium text-base">
                        Stranger recognition
                    </p>
                    <CustomRadio
                        name="rec_rank"
                        value={params.rec_rank}
                        items={radioItems}
                        onChange={handleRadio}
                    />
                </div>

                <div>
                    <div className="flex flex-row gap-6">
                        <p className=" text-lg">
                            Number of stranger judgments:
                        </p>
                        <CustomButtonGroup
                            value={params.rec_stranger_times_threshold}
                            incrementFunction={incrementFunction}
                            decrementFunction={decrementFunction}
                            name="rec_stranger_times_threshold"
                        />
                    </div>
                    <p className="text-start text-sm text-[#808080] mt-2">
                        {"Range should be 1 to max positive numbers"}
                    </p>
                </div>

                <SelectInput
                    width="100%"
                    options={[
                        {
                            id: 1,
                            name: "Not broadcast",
                        },
                        {
                            id: 2,
                            name: "Announce stranger warning",
                        },
                        {
                            id: 100,
                            name: "Customize",
                        },
                    ]}
                    value={params?.tts_mod_stranger_type}
                    handleChange={handleChange}
                    label="Stranger voice mode:"
                    name="tts_mod_stranger_type"
                />

                {params?.tts_mod_stranger_type == 100 ? (
                    <Input
                        rows={1}
                        width="w-full"
                        disabled={false}
                        readOnly={false}
                        handleChange={handleChange}
                        value={params?.tts_mod_stranger_content}
                        error={!!errors?.tts_mod_stranger_content}
                        helperText={errors?.tts_mod_stranger_content}
                        label="Custom content for stranger voice:"
                        name="com_mod_content"
                    />
                ) : (
                    <></>
                )}
            </div>
            <br />

            <div className="flex justify-end items-end">
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
    );
};

export default RecognitionModeInput;
