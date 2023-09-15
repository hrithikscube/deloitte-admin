// import userDefault from '../../../../assets/images/ViewLogos/user_default.svg'
import Tab from './Tab'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import edit__icon from '../../../../assets/icons/edit__icon.svg'
import { useParams, useNavigate, Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { checkModulePrivilegeAccess, showToastMessage, uuid } from '../../../../utils/helpers'
import BreadCrumb from '../../../Common/Breadcrumb/BreadCrumb'
import CustomButton from '../../../Common/Button'
import ActivityLogs from './Tabs/ActivtyLogs'
import axiosInstance from '../../../../utils/axios'

const ViewEmployee = () => {
    let { id } = useParams()
    const [customer, setCustomer] = useState({} as any)
    const [loading, setLoading] = useState(false)

    const TabConstants = [
        {
            title: 'Data Logs',
        },
        {
            title: 'Manage Cards',
        },
    ]


    const navigate = useNavigate()

    const [dataById, setDataById] = useState({} as any)


    const fetchEmployeeById = useCallback(async () => {
        axiosInstance
            .get(`/admin/employees/${id}`)
            .then((response) => {
                const data = response.data.data;
                // console.log(data, 'employee by id data')
                setDataById(data)
            })
            .catch((error) => {
                const { errors, message } = error.response.data;
                const errorMsg = errors[Object.keys(errors)[0]] || message;
                showToastMessage(errorMsg, "error");
            });
    }, [id]);


    useEffect(() => {
        fetchEmployeeById()
    }, [])

    const employeeInfo = [
        {
            name: 'Employee ID',
            value: dataById.emp_id ?? '-'
        },
        {
            name: 'First Name',
            value: dataById.first_name ?? '-'
        },
        {
            name: 'Last Name',
            value: dataById.last_name ?? '-'
        },
        {
            name: 'Phone Number',
            value: dataById.phone ?? '-'
        },
        {
            name: 'Email ID',
            value: dataById.email ?? '-'
        },
        {
            name: 'Designation',
            value: dataById.designation ?? '-'
        },
        {
            name: 'Team/Department',
            value: dataById?.group ?? '-'
        },
        {
            name: 'Location',
            value: dataById?.card_no ?? '-'
        },
        {
            name: 'Profile Status',
            value: dataById?.card_no ?? '-'
        },
    ]

    return (
        <>
            <BreadCrumb
                links={[
                    { path: 'Employee', url: '/admin/employees' },
                    { path: 'View Employee', url: '' },
                ]}
            />

            <p className=' font-black mb-7'> View Employee Profile</p>

            {false ? (
                <div className='w-full h-80 flex justify-center items-center'>
                    <CircularProgress />
                    <span className='text-3xl'>Loading...</span>
                </div>
            ) : (
                <div className='mb-24 grid grid-cols-1 sm:grid-cols-[20rem,minmax(670px,_1fr)] gap-5 '>
                    <div className='flex flex-col gap-5  '>
                        <div className='flex flex-col p-4 bg-white  rounded-lg border border-DreamyCloud	'>
                            <div className='flex items-center  justify-between sm:gap-0  flex-col mt-4 mb-4 '>
                                <img
                                    className='sm:m-auto rounded-[50%]   sm:h-[174px] sm:w-[173px] h-[101px] w-[102px]'
                                    src={dataById.image && !dataById.image.includes('base64') ? `data:image/jpeg;base64,${dataById.image}` : dataById.image}
                                    alt='user profile'
                                />
                                <br />
                                <Link to={`/admin/employees/edit/${id}`}>
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


                                <div className=''>
                                    <p className='subheading text-center'>Customer Name</p>
                                </div>


                            </div>

                            <div className='bg-CalmWaters  flex flex-col gap-y-6 rounded-lg p-4 font-nunitoRegular '>
                                {employeeInfo.map((item: any) => (
                                    <div className='flex justify-between' key={uuid()}>
                                        <p className=' text-xs font-normal	 text-lightSpaceCadet'>
                                            {item?.name}
                                        </p>
                                        <p className='text-sm font-medium	 text-SpaceCadet  text-right'>
                                            {item?.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 '>
                        <div className='rounded-lg'>
                            <Tab
                                cols={TabConstants}
                                data={[
                                    <ActivityLogs custId={id} />,
                                ]}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ViewEmployee