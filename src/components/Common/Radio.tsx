import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { AnyARecord } from 'dns'

interface Props {
  Items?: any
  defaultValue?: any
  handleChange?: any
  checked?: any
  view?: any
}

const RadioButtonsGroup: React.FC<Props> = ({
  view,
  Items,
  defaultValue,
  handleChange,
  checked,
}) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue={defaultValue}
        name='radio-buttons-group'
      >
        <div className='flex'>
          <FormControlLabel
            disabled={view}
            value={'Percentage'}
            label={'Percentage'}
            name='type'
            control={
              <Radio
                checked={defaultValue == 'Percentage'}
                onChange={handleChange}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 133, 255, 0.1) ',
                  },
                  color: '#141C4C',
                  '&.Mui-checked': {
                    color: '#F9AF2F',
                  },
                }}
              />
            }
          />

          <FormControlLabel
            disabled={view}
            value={'Amount'}
            label={'Amount'}
            name='type'
            control={
              <Radio
                checked={defaultValue == 'Amount'}
                onChange={(e) => {
                  if (view) {
                    return
                  } else handleChange(e)
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 133, 255, 0.1) ',
                  },
                  color: '#141C4C',
                  '&.Mui-checked': {
                    color: '#F9AF2F',
                  },
                }}
              />
            }
          />
        </div>
      </RadioGroup>
    </FormControl>
  )
}

export default RadioButtonsGroup
