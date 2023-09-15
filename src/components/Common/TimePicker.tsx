import React from "react";

import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";

const CustomTimePicker = ({
    error,
    label,
    name,
    helperText,
    bgcolor,
    height,
    success,
    value,
    handleChange,
}: any) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                label={label}
                value={value ? value : null}
                onChange={(newValue) => handleChange(newValue, name)}
                renderInput={(params) => (
                    <TextField
                        color="primary"
                        error={error}
                        name={name}
                        helperText={helperText}
                        sx={{
                            "& .MuiInputBase-input": {
                                color: "#141C4C",

                                borderRadius: "8px",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                // borderColor: '#E7E8ED',
                                borderRadius: "8px",
                            },
                            backgroundColor: bgcolor || "transparent",
                            borderRadius: "8px",
                            textarea: { color: "black", height },
                            // label: { color: success ? '#3AC730' : '#141C4C' },
                            "& .MuiFormLabel-root.Mui-hovered": {
                                color: "red",
                            },
                            "& .MuiFormLabel-root.Mui-focused": {
                                color: "#0C8EC7",
                            },
                            "& .MuiFormLabel-root.Mui-hover": {
                                color: "red",
                            },
                            "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": {
                                    color: "red",
                                    borderColor: "#141C4C",
                                },
                            },
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: bgcolor ?? "white",
                                borderRadius: "8px",
                                "& > fieldset": {
                                    borderColor: success
                                        ? "#3AC430"
                                        : "#E7E8ED",
                                },
                            },
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": {
                                    borderColor: "#0C8EC7",
                                },
                            },
                        }}
                        // variant="outlined"
                        fullWidth
                        {...params}
                    />
                )}
            />
        </LocalizationProvider>
    );
};

export default CustomTimePicker;
