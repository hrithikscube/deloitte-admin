import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { SxProps } from '@mui/material'

interface DateProps {
    handleChange: any
    value: any
    error: any
    label?: string
    helperText?: string
    minDate? : any
}

export const TimeandDatePicker = ({
    handleChange,
    value,
    error,
    label = 'Date time',
    helperText,
    minDate,
}: DateProps) => {
    const popperSx: SxProps = {
        '& .MuiPickersDay-dayWithMargin': {
            color: 'black',
            background: 'none',
            borderRadius: '10px !important',
            '&:hover': {
                background: '#F5FBFD',
            },
        },
        '& .MuiPickersDay-today': {
            // background: "#0C8EC7 !important",
            // color: "#000",
            border: 'none !important',
        },
        '& .MuiPickersDay-dayOutsideMonth': {
            color: '#6A6A78 !important',
            '&:hover': {
                background: 'none !important',
            },
        },

        '& .MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected': {
            // backgroundColor: "#0C8EC7 !important",
            color: '#000',
            borderRadius: '10px !important',
        },
        '& .MuiTypography-root': {
            color: '#6A6A78',
            // borderTop: "1px solid #404050",
        },
        '& .MuiTypography-caption': {
            height: '30px !important',
        },

        '& .css-l0iinn': {
            color: 'white',
            '& .MuiSvgIcon-root': {
                color: 'white',
            },
        },
        '& .PrivatePickersYear-yearButton': {
            color: 'white',
        },
        '& .css-m1gykc.Mui-selected': {
            backgroundColor: '#F9AF2F !important',
            color: '#000',
        },

        '& .MuiPickersArrowSwitcher-root': {
            '& .MuiSvgIcon-root': {
                color: 'black',
                // border: "1px solid white",
                borderRadius: '11px',
            },

            '& button .MuiDateRangePickerDay-dayOutsideRangeInterval': {
                backgroundColor: 'red !important',
            },

            '& .MuiDateRangePickerDay-rangeIntervalDayHighlight': {
                backgroundColor: 'red !important',
            },
        },
    }

    const onKeyDown = (e: any) => {
        e.preventDefault()
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack
                spacing={3}
                sx={{
                    '& .MuiInputBase-input': {
                        color: '#5B6082',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#404050',
                        borderRadius: '8px',
                    },
                    backgroundColor: 'transparent',
                    textarea: { color: '#FFFFFF' },
                    label: { color: '#6A6A78' },
                    '& .MuiFormLabel-root.Mui-hovered': {
                        color: '#F9AF2F',
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                        color: '#F9AF2F',
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                            borderColor: '#FFFFFF',
                        },
                    },
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                            borderColor: '#404050',
                        },
                    },
                    '& .MuiOutlinedInput-root.Mui-focused': {
                        '& > fieldset': {
                            borderColor: '#F9AF2F',
                        },
                    },
                }}
            >
                <div className='flex flex-col gap-1'>
                    <DateTimePicker
                        label={label}
                        value={value}
                        onChange={handleChange}
                        minDate={minDate}
                        renderInput={(params) => (
                            <TextField
                          
                                onKeyDown={onKeyDown}
                                {...params}
                                sx={{ width: '100%' }}
                                error={error}
                                
                            />
                        )}
                       
                        components={
                            {
                                // OpenPickerIcon: MoreTimeIcon,
                                // LeftArrowIcon: ArrowBackIcon,
                                // RightArrowIcon: ArrowForwardIcon,
                                // SwitchViewIcon: ChangeCircleIcon
                            }
                        }
                        onError={() => error}
                        PopperProps={{ sx: popperSx }}
                        OpenPickerButtonProps={{ style: { color: '#5B6082' } }}
                    />
                    <p className='text-xs text-red-600 ml-4'>{helperText}</p>
                </div>
            </Stack>
        </LocalizationProvider>
    )
}
