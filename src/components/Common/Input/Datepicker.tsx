import * as React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { SvgIcon, SxProps } from '@mui/material'

interface Props {
    label: string
    onChange?: any
    inputFormat?: string
    value?: any
    error?: any
    name?: any
    readonly?: any
    helperText?: any
    bgcolor?: any
}

const CommonDatepicker: React.FC<Props> = ({
    label,
    onChange,
    inputFormat = 'dd/MM/yyyy',
    value = null,
    error,
    readonly,
    helperText,
    bgcolor,
}) => {
    const today = new Date()
    const popperSx: SxProps = {
        '& .MuiPaper-root': {
            border: '1px solid #E7E8ED',
            backgroundColor: bgcolor ?? '#F5FBFD',
            borderRadius: '5px',
        },
        '& .MuiPickersDay-dayWithMargin': {
            color: '#141C4C',
            background: 'none',
            borderRadius: '10px !important',
            '&:hover': {
                background: 'rgba(0, 133, 255, 0.1)',
            },
        },
        '& .MuiPickersDay-dayOutsideMonth': {
            color: '#5B6082 !important',
            '&:hover': {
                background: 'none !important',
            },
        },
        '& .MuiTypography-root': {
            color: '#green',
            borderTop: '1px solid #E7E8ED',
            borderBottom: '1px solid #E7E8ED',
            margin: 0,
            padding: '0px 20px',
        },
        '& .MuiTypography-caption': {
            height: '30px !important',
        },

        '& .PrivatePickersYear-yearButton': {
            color: '#141C4C',
        },
        '& .MuiPickersArrowSwitcher-root': {
            '& .MuiSvgIcon-root': {
                color: '#141C4C',
                border: '1px solid #141C4C',
                borderRadius: '11px',
            },
        },
        '& .PrivatePickersFadeTransitionGroup-root': {
            color: 'red !important',
        },
        '& .MuiIconButton-root': {
            color: '#141C4C !important',
        },
    }

    const inputSx: SxProps = {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#141C4C !important',
            },
            '&:hover fieldset': {
                borderColor: 'green',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'purple',
            },
        },
    }

    const DateIcon = () => {
        if (value) {
            return (
                <SvgIcon>
                    <svg
                        width='17'
                        height='18'
                        viewBox='0 0 17 18'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M1.07422 6.92317H15.3334'
                            stroke='#141C4C'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M11.7536 10.0482H11.761'
                            stroke='#141C4C'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M8.20279 10.0482H8.2102'
                            stroke='#141C4C'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M4.6481 10.0482H4.65552'
                            stroke='#141C4C'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M11.7536 13.1566H11.761'
                            stroke='#141C4C'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M8.20279 13.1566H8.2102'
                            stroke='#141C4C'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M4.6481 13.1566H4.65552'
                            stroke='#141C4C'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M11.4331 1V3.63262'
                            stroke='#141C4C'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M4.97212 1V3.63262'
                            stroke='#141C4C'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M11.5906 2.26367H4.81677C2.46742 2.26367 1 3.57242 1 5.97809V13.2178C1 15.6613 2.46742 17.0003 4.81677 17.0003H11.5832C13.94 17.0003 15.4 15.684 15.4 13.2783V5.97809C15.4074 3.57242 13.9474 2.26367 11.5906 2.26367Z'
                            stroke='#141C4C'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </SvgIcon>
            )
        }
        return (
            <SvgIcon>
                <svg
                    width='17'
                    height='18'
                    viewBox='0 0 17 18'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M1.07422 6.92317H15.3334'
                        stroke='#141C4C'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        d='M11.7536 10.0482H11.761'
                        stroke='#141C4C'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        d='M8.20279 10.0482H8.2102'
                        stroke='#141C4C'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        d='M4.6481 10.0482H4.65552'
                        stroke='#141C4C'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        d='M11.7536 13.1566H11.761'
                        stroke='#141C4C'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        d='M8.20279 13.1566H8.2102'
                        stroke='#141C4C'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        d='M4.6481 13.1566H4.65552'
                        stroke='#141C4C'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        d='M11.4331 1V3.63262'
                        stroke='#141C4C'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        d='M4.97212 1V3.63262'
                        stroke='#141C4C'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M11.5906 2.26367H4.81677C2.46742 2.26367 1 3.57242 1 5.97809V13.2178C1 15.6613 2.46742 17.0003 4.81677 17.0003H11.5832C13.94 17.0003 15.4 15.684 15.4 13.2783V5.97809C15.4074 3.57242 13.9474 2.26367 11.5906 2.26367Z'
                        stroke='#141C4C'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            </SvgIcon>
        )
    }

    return (
        <div
            className={` w-full bg-white  rounded-lg custom-date-picker relative datepicker  ${
                error ? 'error-state' : ''
            }`}
        >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label={label}
                    value={value}
                    onChange={onChange}
                    inputFormat={inputFormat}
                    showDaysOutsideCurrentMonth
                    maxDate={today}
                    readOnly={readonly}
                    renderInput={(params) => (
                        <TextField
                            sx={{ backgroundColor: bgcolor ?? 'transparent' }}
                            label={label}
                            onKeyDown={(e) => {
                                e.preventDefault()
                            }}
                            fullWidth
                            {...params}
                            helperText={helperText}
                            error={error}
                            FormHelperTextProps={{ sx: inputSx }}
                        />
                    )}
                    PopperProps={{ sx: popperSx }}
                    components={{
                        OpenPickerIcon: DateIcon,
                    }}
                />
            </LocalizationProvider>
        </div>
    )
}

export default CommonDatepicker
