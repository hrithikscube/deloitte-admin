



import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const CustomButtonGroup: React.FC<any> = ({
  width,
  incrementFunction,
  decrementFunction,
  value,
  name
}) => {

  return (
    <div className={width}>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button variant='contained' disabled={name === 'identify_scores' && value === 100 ? true : false} onClick={() => incrementFunction(name)} >+</Button>
        <Button disabled>{value}</Button>
        <Button variant='contained' disabled={value === 1} onClick={() => decrementFunction(name)}>-</Button>
      </ButtonGroup>
    </div>
  )
}
CustomButtonGroup.defaultProps = {
  disabled: false,
  children: null,
  variant: '',
  width: '',
  size: '',
  icon: '',
  borderRadius: '',
  onClick: function test() { },
}
export default CustomButtonGroup
