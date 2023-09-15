import Validator from 'validatorjs'
import { useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Input } from '../../Common/Input/Input'
import CustomButton from '../../Common/Button'
import Authenticated from '../../Authenticated'
import LightHide from '../../../assets/icons/LightIcons/LightHide.svg'
import LightShow from '../../../assets/icons/LightIcons/LightShow.svg'
import PasswordSuccess from '../../PasswordSuccess'
import axiosInstance from './../../../utils/axios'
import { showToastMessage } from './../../../utils/helpers'
import CircularProgress from '@mui/material/CircularProgress'


const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const fields = {
    token,
    password: '',
    password_confirmation: '',
  }

  const [params, setParams] = useState(fields)
  const [formErrors, setFormErrors] = useState(fields)
  const [isLoading, setLoading] = useState(false)
  const [apiSuccess, setApiSuccess] = useState(false)

  const [eyeOpen, seteyeOpen] = useState(false)

  const handleChange = (e: any) => {
    if (e.currentTarget.value.includes(' ')) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, '')
    }
    setParams({ ...params, [e.target.name]: e.target.value })
    setFormErrors(fields)
  }

  const submit = async (e: any) => {
    e.preventDefault()
    const validation = new Validator(params, {
      password: 'required|min:8|max:14|confirmed',
      password_confirmation: 'required|min:8|max:14',
    })

    if (validation.fails()) {
      const fieldErrors: any = {}
      Object.keys(validation.errors.errors).forEach((key) => {
        fieldErrors[key] = validation.errors.errors[key][0]
      })
      setFormErrors(fieldErrors)
      return false
    }

    ResetPassword()
    return true
  }

  const ResetPassword = () => {
    setLoading(true)
    axiosInstance
      .post('/reset-password', params)
      .then((response: any) => {
        console.log('response:', response)
        setApiSuccess(true)
        setLoading(false)
        showToastMessage(response.data.data.message, 'success')
        navigate('/admin/employees')
      })
      .catch((error: any) => {
        setLoading(false)
        setApiSuccess(false)
        showToastMessage(error.response.data.errors.message, 'error')
      })
  }

  return (
    <>
    <div className='flex md:hidden w-full gap-2 justify-center pb-8'>
                <img className=' w-1/5' src='/assets/images/logo.svg' alt='zainmain_logo' />
      </div>

      {apiSuccess ? (
        <Authenticated>
          <div className='w-11/12 md:w-inherit sm:mx-auto  rounded-lg bg-white md:bg-inherit mx-6 md:mx-0 '>
            <PasswordSuccess />
          </div>
        </Authenticated>
      ) : (
        <Authenticated>
          <div className='w-11/12 md:w-inherit sm:mx-auto  rounded-lg  bg-white md:bg-inherit mx-6 md:mx-0'>
            <div className='   flex flex-col justify-center items-center p-6 sm:p-12 rounded-lg '>
              <p className=' text-Sailboat text-[19px] sm:text-[22px]  font-nunitoBold flex items-center sm:gap-2 mb-4'>
                Create New Password
              </p>
              <p className='text-center sm:text-left text-xs text-Sailboat mb-8'>
                Enter Your New Password.
              </p>

              <form className='flex flex-col gap-y-5 w-full ' onSubmit={submit}>
                <div className=' relative'>
                  <Input
                    rows={1}
                    width='w-full'
                    disabled={false}
                    readOnly={false}
                    label='Enter New Password'
                    name='password'
                    value={params?.password}
                    handleChange={handleChange}
                    type={eyeOpen ? 'text' : 'password'}
                    helperText={formErrors?.password ? formErrors?.password : ''}
                    error={formErrors?.password?.length > 0}
                  />
                  {eyeOpen ? (
                    <img
                      className=' absolute right-2 top-4 cursor-pointer'
                      onClick={() => seteyeOpen(false)}
                      src={LightShow}
                      alt='eye-closed'
                    />
                  ) : (
                    <img
                      className=' absolute right-2 top-4 cursor-pointer'
                      onClick={() => seteyeOpen(true)}
                      src={LightHide}
                      alt='eye-closed'
                    />
                  )}
                </div>
                <Input
                  rows={1}
                  width='w-full'
                  label='Confirm New Password'
                  name='password_confirmation'
                  value={params?.password_confirmation}
                  handleChange={handleChange}
                  type='password'
                  helperText={
                    formErrors?.password_confirmation ? formErrors?.password_confirmation : ''
                  }
                  error={formErrors?.password_confirmation?.length > 0}
                />

                <CustomButton type='submit' variant='contained' disabled={isLoading}>
                  <span className='flex items-center justify-center gap-2'>
                    {isLoading ? <CircularProgress size='2vh' sx={{ color: 'black' }} /> : ''}
                    Submit New Password
                  </span>
                </CustomButton>

                <div className=' flex items-center gap-2 justify-center '>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M3.54102 10.2282L16.041 10.2282'
                      stroke='#141C4C
'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M8.58203 15.2488L3.54037 10.2288L8.58203 5.20801'
                      stroke='#141C4C
'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>

                  <Link to='/login' className=' text-Sailboat text-sm '>
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Authenticated>
      )}
    </>
  )
}

export default ResetPassword
