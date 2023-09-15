import React from 'react'
import Logo from '../assets/images/logo.svg'
import scube from '../assets/images/scube.svg'

interface Props {
    children: any
}
const Authenticated: React.FC<Props> = ({ children }) => (
    <div className='relative '>
        <div className='flex justify-between h-screen'>
            <div className=' hidden md:flex home-background w-full gap-2 justify-center  md:w-7/12'>
                <div className='flex justify-center items-center flex-col'>
                <img  src={Logo} alt='Logo' />
                <p className='text-white text-2xl pt-2'>Transforming Vision into digital realities!</p>
                </div>
            </div>
            <div className='w-full md:w-5/12 '>
                <div className=' w-full rounded-lg bg-lightGray md:bg-white flex items-center flex-col md:flex-row justify-center   h-screen' >
                    {children}
                </div>
                <p className='w-inherit absolute bottom-1 flex gap-2  items-center text-yellow font-nunitoLight text-xs justify-center '>
                    Powered By
                    <span>
                        <img
                            className=' relative bottom-[2px] w-[78px]'
                            src={scube}
                            alt='scubelogo'
                        />
                    </span>
                </p>
            </div>
        </div>
    </div>
)

export default Authenticated
