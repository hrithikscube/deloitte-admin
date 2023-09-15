import { Input } from '../../Common/Input/Input'
import CustomButton from '../../Common/Button'
import Validator from 'validatorjs'
import {  useState } from 'react'
import { Link } from 'react-router-dom'
import Authenticated from '../../Authenticated'
import axiosInstance from './../../../utils/axios'
import { showToastMessage } from './../../../utils/helpers'
import CircularProgress from '@mui/material/CircularProgress'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [formErrors, setFormErrors] = useState({ email: '' })

  const [isLoading, setLoading] = useState(false)
  const [apiSuccess, setApiSuccess] = useState(false)

  const ForgotPassword = (email: any) => {
    setLoading(true)
    axiosInstance
      .post('/forgot-password', email)
      .then((response) => {
        setApiSuccess(true)
        setLoading(false)
        showToastMessage(response.data.data.message, 'success')
      })
      .catch((error) => {
        setLoading(false)
        setApiSuccess(false)
        showToastMessage(error.response.data.errors.message, 'error')
      })
  }

  const handleEmail = (e: any) => {
    if (e.currentTarget.value.includes(' ')) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, '')
    }
    setEmail(e.target.value)
    setFormErrors({ email: '' })
  }

  async function forgot(e: any) {
    e.preventDefault()
    const validation = new Validator(
      {
        email,
      },
      {
        email: 'email|required|max:150',
      },
      {
        required: '*required',
      },
    )

    if (validation.fails()) {
      const fieldErrors: any = {}
      Object.keys(validation.errors.errors).forEach((key) => {
        fieldErrors[key] = validation.errors.errors[key][0]
      })

      setFormErrors(fieldErrors)
      return false
    }

    ForgotPassword({ email })

    return true
  }
  return (
    <Authenticated>

      <div className='flex md:hidden w-full gap-2 justify-center pb-8'>
                <img className=' w-1/5' src='/assets/images/logo.svg' alt='zainmain_logo' />
      </div>

      <div className='w-11/12 md:w-inherit sm:mx-auto  rounded-lg bg-white md:bg-inherit mx-6 md:mx-0 '>
        <div className=' flex flex-col justify-center items-center p-6 sm:p-12 rounded-lg  '>
          <p className=' text-SpaceCadet text-[20px] sm:22px font-nunitoBold flex items-center gap-2 mb-4 '>
            Forgot Your Password?
          </p>
          <p className=' text-center sm:text-left text-xs text-SpaceCadet mb-8 '>
            Enter your email and we′ll send you instructions to reset your password.
          </p>
          {/* First Time Login & Login  */}
          <form onSubmit={forgot} className='w-full'>
            <div className='relative flex flex-col gap-5 w-full mb-8'>
              <Input
                success={apiSuccess}
                rows={1}
                width='w-full'
                readOnly={false}
                label='Email Id'
                name='email'
                value={email}
                handleChange={handleEmail}
                type='text'
                helperText={formErrors?.email}
                error={formErrors?.email?.length > 0}
              />
              {apiSuccess ? (
                <p className='text-sm absolute -bottom-7 left-4  text-LimeGreen'>
                  Reset link has been sent to your email ID.
                </p>
              ) : null}
            </div>
            <br />
            <div className=' w-full '>
              <CustomButton disabled={isLoading || apiSuccess} type='submit' variant='contained'>
                <span className='flex items-center justify-center gap-2'>
                  {isLoading ? <CircularProgress size='2vh' sx={{ color: 'black' }} /> : ''}
                  Send Reset Link
                </span>
              </CustomButton>
              <div className=' flex items-center gap-2 justify-center mt-4'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3.54102 10.2282L16.041 10.2282'
                    stroke='#141C4C'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M8.58203 15.2488L3.54037 10.2288L8.58203 5.20801'
                    stroke='#141C4C'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>

                <Link to='/login' className=' text-SpaceCadet text-sm '>
                  Back to Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Authenticated>
  )
}

export default ForgotPassword
