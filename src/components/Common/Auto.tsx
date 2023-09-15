import React, { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import { Paper } from '@mui/material'
const useStyles = makeStyles({
  error: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'red',
      borderRadius: '8px',
    },
  },

  select: {
    '& ul': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    '& li': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  icon: {
    fill: 'white',
  },
  root: {
    '& .MuiOutlinedInput-input': {
      color: '#141C4C',
    },
    '& .MuiInputLabel-root': {
      color: '#6A6A78',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#E7E8ED',
      borderRadius: '8px',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: '#141C4C',
    },
    '&:hover .MuiInputLabel-root': {
      color: '#6A6A78',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#141C4C',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: '#141C4C',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#F9AF2F',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#F9AF2F',
    },
  },
})
export default function MyAutocomplete({
  options,
  value,
  handleNewChange,
  label,
  error,
  helperText,
  name,
  readOnly
}: any) {
  const classes = useStyles()

  return (
    <Autocomplete
    readOnly={readOnly}
      className={!error ? classes.root : classes.error}
      id={label}
      value={value === '' ? '' : value}
      options={options}
      onChange={handleNewChange(name)}
      getOptionLabel={(option) => (option ? option.name || option : '')}
      fullWidth
      style={{ width: '100% !important' }}
      renderInput={(params) => (
        <TextField
          sx={{ background: 'white', borderRadius: '8px' }}
          {...params}
          name={label}
          label={label}
          error={error}
          variant='outlined'
          helperText={helperText}
          style={{ backgroundColor: 'pink !important' }}
      
        />
      )}
    />
    // <Autocomplete
    //   className={!error ? classes.root : classes.error}
    //   value={value === '' ? '' : value}
    //   onChange={handleNewChange(name)}
    //   options={options}
    //   getOptionLabel={(option) => (option ? option.name || option : '')}
    //   renderInput={(params) => (
    //     <TextField
    //       sx={{ backgroundColor: 'white !important' }}
    //       error={error}
    //       helperText={<span className='text-red-600'>{helperText}</span>}
    //       {...params}
    //       name={label}
    //       label={label}
    //     />
    //   )}
    // />
  )
}
