import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export default function AutocompleteCheckbox({
  testsProducts,
  handleChange,
  label,
  error,
  helperText,
}: any) {
  return (
    <Autocomplete
      onChange={(event, values) => {
        handleChange()
      }}
      multiple
      id={label}
      options={testsProducts}
      disableCloseOnSelect
      getOptionLabel={(option: any) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          helperText={helperText}
          error={error}
          {...params}
          label='Checkboxes'
          placeholder='Favorites'
        />
      )}
    />
  )
}
