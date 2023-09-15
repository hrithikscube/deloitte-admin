import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import ButtonComponent from './Button'
import { SxProps } from '@mui/material'

interface Props {
  open?: any
  handlePopup?: any
  popup?: string
  title?: string
  subtitle?: string
  popupmsg?: string
  handleYes?: any
  handleOkay?: any
  handleNo?: any
  isdeletebtn?: any
  loading?:any
}

const dialogSx: SxProps = {
  '& .MuiPaper-root-MuiDialog-paper': {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '100%',
    padding: '1.5rem',
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(5px)',
  },
}

const Popup: React.FC<Props> = ({
  open,
  handlePopup,
  popup,
  title,
  subtitle,
  popupmsg,
  handleYes,
  handleNo,
  handleOkay,
  isdeletebtn,
  loading
}) => {
  const DialogContentSx: SxProps = {
    color: popup === 'success' ? '#57CD53' : popup === 'warning' ? '#141C4C' : 'white',
    fontSize: '16px',
    fontWeight: '800',
    lineHeight: '22px',
  }
  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') {
    } else {
      handlePopup(popup, false)
    }
  }
  return (
    <div className=''>
      <Dialog
        sx={dialogSx}
        open={open}
        disableEscapeKeyDown
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent sx={{ width: '100%', padding: window.innerWidth < 768 ? '0.5rem' : '0.5rem' }}>
          <DialogContentText component='div' sx={DialogContentSx} id='alert-dialog-description'>
            <div>
              <div className={`${popup !== 'question' ? 'hidden' : 'flex justify-between mb-4'}`}>
                <p className=' text-white'>{title}</p>
                <svg
                  className=' cursor-pointer '
                  onClick={() => handlePopup(popup, false)}
                  width='24'
                  height='25'
                  viewBox='0 0 24 25'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M14.3936 10.1211L9.60156 14.9131'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M14.3976 14.9181L9.60156 10.1211'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M16.334 3.27734H7.665C4.644 3.27734 2.75 5.41634 2.75 8.44334V16.6113C2.75 19.6383 4.635 21.7773 7.665 21.7773H16.333C19.364 21.7773 21.25 19.6383 21.25 16.6113V8.44334C21.25 5.41634 19.364 3.27734 16.334 3.27734Z'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              <div className=' bg-white rounded-lg py-5 mt-2'>
                <div className=' flex gap-3 items-center'>
                  <div
                    className={`flex flex-col   gap-1 justify-center items-center ${
                      popup === 'question' ? 'px-20 text-center' : ''
                    }`}
                  >
                    <p>{subtitle}</p>
                  </div>
                </div>
                <p
                  className={`${
                    popup === 'question' ? 'hidden' : 'text-Comet font-normal text-sm mt-5'
                  }`}
                >
                  {popupmsg}
                </p>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'end',
            paddingBottom: '1rem',
          }}
        >
          <div>
            {popup === 'success' ? (
              <ButtonComponent onClick={handleOkay} variant='contained' borderRadius='8px'>
                Okay
              </ButtonComponent>
            ) : (
              <ButtonComponent
                isdeletebtn={isdeletebtn}
                onClick={handleYes}
                variant='contained'
                borderRadius='8px'
                disabled={loading}
              >
                {popup === 'success' ? 'Okay' : popup === 'warning' ? 'Yes' : 'Save'}
              </ButtonComponent>
            )}
          </div>
          <div className={`${popup === 'success' ? 'hidden' : ''}`}>
            <ButtonComponent
              onClick={() => {
                handleNo()
                handlePopup(popup, false)
              }}
              variant='outlined'
              borderRadius='8px'
            >
              No
            </ButtonComponent>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Popup

Popup.defaultProps = {
  popup: '',
  title: '',
  subtitle: '',
  popupmsg: '',
  handleYes: function test() {},
  handleOkay: function test() {},
  open: false,
  handlePopup: function test() {},
}
