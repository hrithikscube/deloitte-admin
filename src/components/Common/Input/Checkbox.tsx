import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import { makeStyles } from '@mui/styles'

interface Props {
  defaultChecked?: boolean
  handleCheck: any
  ischecked?: boolean
  Label?: string
  name?: string
  color?: string
  readonly?: boolean
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'rgba(0, 133, 255, 0.1) !important',
    },
  },
}))

const CustomCheckbox: React.FC<Props> = ({
  defaultChecked,
  handleCheck,
  ischecked,
  Label,
  name,
  color,
  readonly,
}) => {
  const classes = useStyles()
  return (
    <div className='flex items-center'>
      <Checkbox
        icon={
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='0.75'
              y='0.75'
              width='18.5'
              height='18.5'
              rx='5.25'
              stroke='#141C4C'
              stroke-width='1.5'
            />
          </svg>
        }
        checkedIcon={
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M5.67 0H14.34C17.73 0 20 2.38 20 5.92V14.091C20 17.62 17.73 20 14.34 20H5.67C2.28 20 0 17.62 0 14.091V5.92C0 2.38 2.28 0 5.67 0ZM9.42945 12.99L14.1795 8.24C14.5195 7.9 14.5195 7.35 14.1795 7C13.8395 6.66 13.2795 6.66 12.9395 7L8.80945 11.13L7.05945 9.38C6.71945 9.04 6.15945 9.04 5.81945 9.38C5.47945 9.72 5.47945 10.27 5.81945 10.62L8.19945 12.99C8.36945 13.16 8.58945 13.24 8.80945 13.24C9.03945 13.24 9.25945 13.16 9.42945 12.99Z'
              fill='#FF8059'
            />
          </svg>
        }
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 70,
            borderRadius: 20,
          },
        }}
        disabled={readonly}
        name={name}
        id={Label}
        checked={ischecked}
        className={classes.root}
        {...label}
        onChange={handleCheck}
      />

      <label
        // htmlFor={Label}
        className={` ml-1  break-word sm:text-sm text-xs   ${
          ischecked ? 'text-primarBtn' : `${color}`
        }`}
      >
        {Label}
      </label>
    </div>
  )
}
CustomCheckbox.defaultProps = {
  defaultChecked: false,
  ischecked: false,
  Label: '',
}

export default CustomCheckbox
