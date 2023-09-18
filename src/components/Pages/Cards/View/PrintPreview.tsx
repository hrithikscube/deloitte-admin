import CircularProgress from '@mui/material/CircularProgress'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from 'react';
import cardImage from '../../../../assets/images/cardImage.svg'

const PrintPreview = () => {

    const printInfo = [
        {
            name: 'Card Requested On',
            value: '15:00 AM, 19-07-2022'
        },

        {
            name: 'Card Delivered On',
            value: '15:00 AM, 19-07-2022'
        },

        {
            name: 'Card Status',
            value: 'Marked as Lost'
        },

    ]

    const [active, setActive] = useState(true)

    return (
        <>

            {false ? (
                <div className='w-full h-80 flex justify-center items-center'>
                    <CircularProgress />
                    <span className='text-3xl'>Loading...</span>
                </div>
            ) : (
                <div className="w-full">

                    <div className='border rounded-lg p-5 bg-white w-full flex items-center gap-2'>

                        <Link to="/admin/cards"><p className='text-sm font-nunitoMedium text-gray-500 cursor-pointer'>All Cards &gt;</p></Link>
                        <p className='text-black font-nunitoMedium text-sm'>View Details</p>

                    </div>


                    <br />

                    <div>

                        <div className='flex items-center gap-5'>
                            <p className='text-base font-nunitoBold '>Card Information</p>

                            <div className='flex items-center gap-3'>

                                <button
                                    onClick={active ? () => { } : () => setActive(!active)}
                                    className={`${active ? 'text-[#86BC24]' : 'text-gray-500'} font-nunitoMedium text-sm `}>Print Info</button>

                                <button
                                    onClick={!active ? () => { } : () => setActive(!active)}
                                    className={`${!active ? 'text-[#86BC24]' : 'text-gray-500'} font-nunitoMedium text-sm `}>Logs Info</button>

                            </div>

                        </div>

                        <br />

                        {
                            active ? <div className='p-5 flex flex-col gap-2 w-full bg-white rounded-lg'>
                                <div className='flex items-center gap-10'>

                                    <img src={cardImage} alt={cardImage} className='w-[200px] h-[200px] shadow-xl rounded-lg p-2' />

                                    <div className='flex flex-col gap-2'>
                                        {React.Children.toArray(printInfo.map(item => (
                                            <div className='grid grid-cols-2 gap-5'>
                                                <p className='uppercase text-sm font-nunitoBold tracking-wide text-[#27282D]/50'>{item.name}:</p>
                                                <p className="text-sm font-nunitoBold text-black">{item.value}</p>
                                            </div>
                                        )))}
                                    </div>
                                </div>
                            </div> : <div>
                                Logs info
                            </div>
                        }


                    </div>
                </div>
            )}
        </>
    )
}

export default PrintPreview