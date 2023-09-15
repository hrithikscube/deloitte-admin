import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

interface Props {
  defaultChecked?: boolean
  handleCheck: any
  ischecked?: boolean //   Label?: string;
  name: string
  disabled?:any
}

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const GreenSwitch = styled(Switch)(() => ({

  '& .MuiSwitch-switchBase.Mui-disabled': {
    color: '#C5C9D6',
  },
  '& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track': {
    backgroundColor: '#FFFFFF',
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#F9AF2F',
    '&:hover': {
      backgroundColor: 'rgba(20, 28, 76,0.1)',
    },
  },
  ' & .MuiSwitch-switchBase': {
    color: '#141C4C',
    '&:hover': {
      backgroundColor: 'rgba(0, 133, 255, 0.1)',
    },
  },
  '.MuiSwitch-track': {
    backgroundColor: '#141C4C',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#F9AF2F',
  },
}));

const Toggle: React.FC<Props> = ({
  ischecked,
  handleCheck,
  defaultChecked,
  disabled,

  name,
}) => (
  <div>
    <GreenSwitch name={name} disabled = {disabled} checked={ischecked} onChange={handleCheck} {...label} />
  </div>
);

export default Toggle;
