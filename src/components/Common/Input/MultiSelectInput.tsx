import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'
import { makeStyles } from '@mui/styles'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import OutlinedInput from '@mui/material/OutlinedInput'

interface Props {
  name?: string
  value?: string[]
  label?: string
  error?: boolean
  helperText?: string
  handleChange?: any
  options: any
  width?: string
  readonly?: any
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
      backgroundColor: 'rgba(255, 255, 255, 0.1);',
    },
    '& li': {
      backgroundColor: '#2F3344',
    },
  },
  icon: {
    fill: '#141C4C',
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

export const MultiSelectInput: React.FC<Props> = ({
  handleChange,
  value = [],
  label,
  error,
  helperText,
  options,
  width,
  name,
  readonly,
}) => {
  const classes = useStyles()

  // const selectPocName = (options: any, selected: any) => {
  //   let names = ''
  //   names = options
  //     .filter((x: any) => selected.includes(x.id))
  //     .map((x: any) => x.name)
  //     .toString()
  //   return names || ''
  // }
  const selectPocName = (options: any, selected: any) => {
    let names = ''
    names = options
      .filter((x: any) => selected.includes(x))
      .map((x: any) => x)
      .toString()
    return names || ''
  }
  return (
    <div>
      <FormControl className={!error ? classes.root : classes.error} fullWidth error={error}>
        <InputLabel id='multi-select-input-label'>{label}</InputLabel>
        <Select
          readOnly={readonly}
          labelId='multi-select-input-label'
          style={{
            width,
          }}
          MenuProps={{
            sx: {
              '&& .MuiMenuItem-root': {
                backgroundColor: '#F5FBFD',
                border: '1px solid #E7E8ED !important',
                color: '#141C4CFF',
                '&:hover': {
                  backgroundColor: '#E7E8ED !important',
                },
              },
              '&& .MuiMenu-list': {
                padding: '0',
              },

              '&& .Mui-selected': {
                color: '#F9AF2F !important',
                backgroundColor: '#F5FBFD',
              },
            },
          }}
          sx={{
            color: '#141C4C',
            '.MuiSvgIcon-root ': {
              fill: '#141C4C !important',
            },
          }}
          value={value}
          onChange={handleChange}
          label={label}
          name={name}
          multiple
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(', ')}
        >
          {options.length > 0 ? (
            options?.map((name: any) => (
              <MenuItem value={name}>
                <Checkbox
                  sx={{
                    color: '#141C4C',
                    '&:hover': {
                      color: '#141C4C',
                    },
                    '&.Mui-checked': {
                      color: '#F9AF2F',
                    },
                  }}
                  checked={value.indexOf(name) > -1}
                />
                <ListItemText primary={name} />
              </MenuItem>
            ))
          ) : (
            <p className='text-#141C4C p-4 text-xl'>Not found !</p>
          )}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  )
}
