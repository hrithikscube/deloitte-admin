import { useState } from 'react';
import { ClickAwayListener } from '@mui/base';
import Tooltip from '@mui/material/Tooltip';

export default function CustomTooltip({ imageIcon, title }: any) {

    const [show, setShow] = useState(false)

    return (
        <div className='flex flex-col justify-center items-center'>
            <ClickAwayListener onClickAway={() => setShow(false)}>
                <Tooltip sx={{fontSize:'8px'}} onClick={() => setShow(true)} open={show} title={<p className='text-xs'>{title}</p>}>
                    {imageIcon}
                </Tooltip>
            </ClickAwayListener>
        </div>
    );
}