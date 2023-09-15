import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

interface Props {
    items?: any
    name?: any
    title?: any
    onChange?: any
    value?: any
    
}

const CustomRadio: React.FC<Props> = ({ name, items, title, onChange, value }) => {
    return (
        <FormControl>
            {/* <FormLabel id={title}>{title}</FormLabel> */}
            <RadioGroup row aria-labelledby={title} name={name} onChange={onChange} value={value} >
                {items.map((btn: any) => {
                    return (
                        <FormControlLabel value={btn.value} control={<Radio />} label={btn.label} />
                    )
                })}
            </RadioGroup>
        </FormControl>
    )
}
export default CustomRadio
