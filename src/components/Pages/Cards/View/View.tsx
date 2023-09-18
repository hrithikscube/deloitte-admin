import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'
import React from 'react';
import { Link } from 'react-router-dom';

const ViewCardInfomration = () => {
    const cardFrontDetails = [
        {
            name: 'employee name',
            value: 'Praveen Kumar'
        },

        {
            name: 'Profile Picture',
            value: 'YES'
        },

        {
            name: 'department',
            value: 'Ministry of Rural Development, Departement of Finance'
        },
        {
            name: 'designation',
            value: '08/11/19Secretary, Minister of Finance( north Zone)95'
        },
    ]

    const cardBackDetails = [
        {
            name: 'blood group',
            value: 'O+ve'
        },

        {
            name: 'contact number',
            value: '9876543210'
        },

        {
            name: 'emergency contact number',
            value: '998986599'
        },
        {
            name: 'office address',
            value: '84, Rajaji street, Chathrapati sivaji nagar, Bangalore.'
        },
        {
            name: 'state',
            value: 'Karnataka'
        },
        {
            name: 'pincode',
            value: '560023'
        },
        {
            name: 'qr',
            value: 'Yes'
        },
    ]

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

    const [active, setActive] = useState(false)

    return (
        <>

            {false ? (
                <div className='w-full h-80 flex justify-center items-center'>
                    <CircularProgress />
                    <span className='text-3xl'>Loading...</span>
                </div>
            ) : (
                <div className="">

                    <div className='border rounded-lg p-5 bg-white w-full flex items-center gap-2'>

                        <Link to="/admin/cards">
                            <p className='text-sm font-nunitoMedium text-gray-500 cursor-pointer'>
                                All Cards &gt;
                            </p>
                        </Link>
                        <p className='text-black font-nunitoMedium text-sm'>View Details</p>

                    </div>

                    <br />

                    <div className='border rounded-lg bg-white'>
                        <p className='text-[#575ABC] text-sm font-nunitoBold p-5'>Details On Card Front</p>

                        <hr />

                        <div className='p-5 flex flex-col gap-2 w-[60%]'>
                            {React.Children.toArray(cardFrontDetails.map(item => (
                                <div className='grid grid-cols-2 gap-5'>
                                    <p className='uppercase text-sm font-nunitoBold tracking-wide text-[#27282D]/50'>{item.name}:</p>
                                    <p className="text-sm font-nunitoBold text-black">{item.value}</p>
                                </div>
                            )))}

                        </div>


                    </div>

                    <br />

                    <div className='border rounded-lg bg-white'>
                        <p className='text-[#575ABC] text-sm font-nunitoBold p-5'>Details On Card Back</p>

                        <hr />

                        <div className='p-5 flex flex-col gap-2 w-[60%]'>
                            {React.Children.toArray(cardBackDetails.map(item => (
                                <div className='grid grid-cols-2 gap-5'>
                                    <p className='uppercase text-sm font-nunitoBold tracking-wide text-[#27282D]/50'>{item.name}:</p>
                                    <p className="text-sm font-nunitoBold text-black">{item.value}</p>
                                </div>
                            )))}
                        </div>
                    </div>

                    <br />

                    {/*  <div>

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
                            active ? <div className='p-5 flex flex-col gap-2 w-[60%] bg-white rounded-lg'>
                                <div className='flex flex-col gap-2 w-[60%]'>
                                    {React.Children.toArray(printInfo.map(item => (
                                        <div className='grid grid-cols-2 gap-5'>
                                            <p className='uppercase text-sm font-nunitoBold tracking-wide text-[#27282D]/50'>{item.name}:</p>
                                            <p className="text-sm font-nunitoBold text-black">{item.value}</p>
                                        </div>
                                    )))}

                                </div>
                            </div> : <div>
                                Logs info
                            </div>
                        }


                    </div> */}
                </div>
            )}
        </>
    )
}

export default ViewCardInfomration