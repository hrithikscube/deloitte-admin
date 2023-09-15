// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import Select from '@mui/material/Select';
// import DownLight from '../../../assets/icons/lightIcons/DownLight.svg'
// import Checkbox from '@mui/material/Checkbox'
// import ListItemText from '@mui/material/ListItemText'
// import OutlinedInput from '@mui/material/OutlinedInput'
import { makeStyles } from '@mui/styles'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { color } from '@mui/system'

interface Props {
  name?: string
  value?: string
  label?: string
  error?: boolean
  helperText?: string
  handleChange?: any
  options: any
  width?: string
}

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

export const AutoCompleteSelect: React.FC<Props> = ({
  handleChange,
  value,
  label,
  error,
  helperText,
  options,
  // width,

  name,
}) => {
  const classes = useStyles()

  return (
    <div>
      <Autocomplete
        id={name}
        onChange={handleChange}
        className={!error ? classes.root : classes.error}
        fullWidth
        options={options}
        getOptionLabel={(option:any) => option.name || option.id || ''}
        style={{ width: '100%' }}
        renderInput={(params) => (
          <TextField
            style={{ color: 'white' }}
            error={error}
            helperText={helperText}
            {...params}
            label={label}
            variant='outlined'
            fullWidth
            value={value}
            name={name}
          />
        )}
      />
    </div>
  )
}
