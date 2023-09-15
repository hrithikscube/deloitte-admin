import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function CustomTimePicker({ label, bgcolor, success, height, error, helperText }: any) {


    const customStyles = {
        '& .MuiInputBase-input': {
            color: '#141C4C',

            borderRadius: '8px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            // borderColor: '#E7E8ED',
            borderRadius: '8px',
        },
        backgroundColor: bgcolor || 'transparent',
        borderRadius: '8px',
        textarea: { color: 'black', height },
        // label: { color: success ? '#3AC730' : '#141C4C' },
        '& .MuiFormLabel-root.Mui-hovered': {
            color: 'red',
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: '#0C8EC7',
        },
        '& .MuiFormLabel-root.Mui-hover': {
            color: 'red',
        },
        '& .MuiOutlinedInput-root:hover': {
            '& > fieldset': {
                color: 'red',
                borderColor: '#141C4C',
            },
        },
        '& .MuiOutlinedInput-root': {
            backgroundColor: bgcolor ?? 'white',
            borderRadius: '8px',
            '& > fieldset': {
                borderColor: success ? '#3AC430' : '#E7E8ED',
            },
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
            '& > fieldset': {
                borderColor: '#0C8EC7',
            },
        },
    }

    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <TimePicker
                    label={label}
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) =>
                        <TextField
                            error={error}
                            helperText={helperText}
                            sx={customStyles}
                            variant='outlined'
                            {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}