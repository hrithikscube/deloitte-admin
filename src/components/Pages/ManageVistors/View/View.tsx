import Tab from './Tab'
import Logs from './Tabs/Logs'
import CustomButton from '../../../Common/CustomButton'
import CircularProgress from '@mui/material/CircularProgress'
import BreadCrumb from '../../../Common/Breadcrumb/BreadCrumb'
import { useParams, useNavigate, Link } from 'react-router-dom'
import edit__icon from '../../../../assets/icons/edit__icon.svg'
import { uuid } from '../../../../utils/helpers'
import axiosInstance from '../../../../utils/axios'
import { useEffect, useState } from 'react'

const ViewVisitor = () => {
    let { id } = useParams()

    const TabConstants = [
        {
            title: 'Logs',
        },

    ]

    const navigate = useNavigate()

    const [dataById, setDataById] = useState({}) as any

    const fetchVisitorInformationById = () => {
        axiosInstance.get(`/admin/visitors/${id}`)
            .then((response) => {
                let { data } = response.data
                console.log(data)
                setDataById(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        id && fetchVisitorInformationById()
    }, [id])


    const logsInfo = [
        // {
        //     name: 'Visitor ID',
        //     value: dataById?.visitor_id ?? '-'
        // },
        {
            name: 'Name',
            value: dataById?.name ?? '-'
        },
        {
            name: 'Phone Number',
            value: dataById?.phone ?? '-'
        },
        {
            name: 'Email ID',
            value: dataById?.email ?? '-'
        },
        {
            name: 'Visitor Type',
            value: dataById?.visitor_type ?? '-'
        },
        // {
        //     name: 'Location',
        //     value: dataById?.location ?? '-'
        // },
    ]

    return (
        <>
            <BreadCrumb
                links={[
                    { path: 'List of Visitors', url: '/admin/manage-visitors' },
                    { path: 'View Visitor   ', url: '' },
                ]}
            />

            <p className=' font-black mb-7'> View Visitor Profile</p>

            {false ? (
                <div className='w-full h-80 flex justify-center items-center'>
                    <CircularProgress />
                    <span className='text-3xl'>Loading...</span>
                </div>
            ) : (
                <div className='mb-24 grid grid-cols-1 sm:grid-cols-[20rem,minmax(670px,_1fr)] gap-5 '>
                    <div className='flex flex-col gap-5  '>
                        <div className='flex flex-col p-4 bg-white  rounded-lg border border-DreamyCloud	'>
                            <div className='bg-CalmWaters  flex flex-col gap-y-6 rounded-lg p-4 font-nunitoRegular '>
                                <div className='flex justify-between' key={uuid()}>
                                    <p className=' text-xs font-normal	 text-lightSpaceCadet'>
                                        Visitor ID
                                    </p>
                                    <p className='text-sm font-medium text-SpaceCadet  text-right break-words w-[150px]'>
                                        {dataById?.visitor_id ?? '-'}
                                    </p>
                                </div>

                                {logsInfo.map((item: any) => (
                                    <div className='flex justify-between' key={uuid()}>
                                        <p className=' text-xs font-normal	 text-lightSpaceCadet'>
                                            {item?.name}
                                        </p>
                                        <p className='text-sm font-medium	 text-SpaceCadet  text-right '>
                                            {item?.value}
                                        </p>
                                    </div>
                                ))}

                            </div>

                            <div className='mt-4'>
                                <Link to={`/admin/manage-visitors/edit/${id}`}>
                                    <CustomButton
                                        borderRadius='1rem'
                                        width='m-auto w-fit '
                                        variant='outlined'
                                        size='medium'
                                        icon={<img src={edit__icon} alt='edit__icon' />}
                                    >
                                        Edit Profile
                                    </CustomButton>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 '>
                        <div className='rounded-lg'>
                            <Tab
                                cols={TabConstants}
                                data={[
                                    <Logs visitor_id={dataById?.visitor_id} />,
                                ]}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ViewVisitor