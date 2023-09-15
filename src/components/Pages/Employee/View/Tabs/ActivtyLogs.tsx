import React, { useEffect, useMemo, useState } from 'react'
import ActivityLogsTable from './ActivityLogsTable'
import CustomButton from '../../../../Common/CustomButton'
import Badge from "@mui/material/Badge";

import filterIcon from "../../../../../assets/icons/ListingIcons/filterIcon.svg";
import add_user from "../../../../../assets/icons/ListingIcons/add_user.svg";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton/IconButton';
import { SelectInput } from '../../../../Common/Input/Select';
import Pagination from '../../../../Common/Pagination/Pagination';
import axiosInstance from '../../../../../utils/axios';
import { SelectWithName } from '../../../../Common/Input/SelectWithName';
import { DateRangePicker } from '../../../../Common/Input/DateRangePicker';
import moment from 'moment';
import { CircularProgress } from '@mui/material';

const ActivityLogs = ({ custId, membersList }: any) => {
    // handeling popup
    const [isMemberPopup, setIsMemberPopup] = useState({
        isopen: false,
        type: '',
    })

    const [memberId, setMemberId] = useState()

    const handleMemberPopup = (isopen: any, type: string, memberId: any) => {
        setIsMemberPopup({ ...isMemberPopup, isopen, type })
        setMemberId(memberId)
    }

    const initialStates = {
        start_date: '',
        end_date: '',
        entry_type: ''
    } as any

    const [params, setParams] = useState(initialStates);

    const onFilterChange = (event: any) => {
        setDisableButton(false)
        setParams({ ...params, [event.target.name]: event.target.value });
        // setIsModifiedFilter(true)
    };

    const [currentPage, setCurrentPage] = useState(1);

    const [logsList, setLogsList] = useState([]) as any
    const [metadata, setMetadata] = useState({}) as any


    const getActivityLogs = (thisData: any) => {
        axiosInstance.get(`/admin/employees/logs/${custId}?page=${currentPage}&start_date=${thisData.start_date}&end_date=${thisData.end_date}&entry_type=${thisData.entry_type}`)
            .then((response) => {
                let { data } = response.data
                setLogsList(data.data)
                setMetadata(data.meta)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getActivityLogs(initialStates)
    }, [currentPage])

    const [startDate, setStartDate] = useState() as any
    const [endDate, setEndDate] = useState() as any

    const handleDateRangeFilter = (dates: any) => {
        setDisableButton(false)
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
        const sDate = moment(start).format('YYYY-MM-DD')
        const eDate = moment(end).format('YYYY-MM-DD')
        setParams({ ...params, start_date: sDate, end_date: eDate })
    }

    const applyFilter = () => {
        setDisableButton(true)
        setIsLoading(true)
        getActivityLogs(params)
    }

    const resetFilter = () => {
        setDisableButton(true)
        setStartDate()
        setEndDate()
        setIsLoading(true)
        setParams(initialStates)
        getActivityLogs(initialStates)
    }

    const [disableButton, setDisableButton] = useState(true)

    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className='w-full rounded flex flex-col gap-6'>
            <div className='default_container bg-white '>

                <div className=''>
                    <div className='mb-5 flex lg:flex-row flex-col justify-between items-center w-full '>
                        {/* filter params */}
                        <div className='grid grid-cols-2 gap-5'>

                            <div className="lg:w-[300px] w-full">
                                <DateRangePicker
                                    label='Date Range'
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={handleDateRangeFilter}
                                    istodaymax={false}
                                />
                            </div>

                            <div className='lg:w-[300px] w-full'>
                                <SelectWithName
                                    width="100%"
                                    options={
                                        [
                                            {
                                                id: "Enter",
                                                name: "Enter",
                                            },
                                            {
                                                id: "Out",
                                                name: "Out",
                                            },
                                        ]
                                    }
                                    handleChange={onFilterChange}
                                    value={params.entry_type}
                                    label="Entry Type"
                                    name="entry_type"
                                />
                            </div>
                        </div>

                        {/* apply button & reset */}
                        <div className='flex lg:items-center items-start gap-2'>
                            <CustomButton
                                disabled={disableButton}
                                borderRadius="0.5rem"
                                variant="contained"
                                size="large"
                                height="h-[47px]"
                                onClick={applyFilter}
                            >
                                <p className="text-sm font-bold text-darkbg font-nunitoRegular">
                                    Apply
                                </p>
                            </CustomButton>

                            <IconButton onClick={resetFilter} sx={{ width: '44px', height: '44px' }}>
                                <div className='border p-[6px] rounded-lg border-black'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.91 15.51H15.38C15.1148 15.51 14.8604 15.6154 14.6729 15.8029C14.4854 15.9904 14.38 16.2448 14.38 16.51C14.38 16.7752 14.4854 17.0296 14.6729 17.2171C14.8604 17.4046 15.1148 17.51 15.38 17.51H17.78C16.6769 18.6627 15.2544 19.4593 13.6952 19.7974C12.1359 20.1355 10.5112 19.9996 9.02978 19.4072C7.54834 18.8149 6.27787 17.7931 5.38159 16.4732C4.48531 15.1532 4.00418 13.5955 4 12C4 11.7348 3.89464 11.4804 3.70711 11.2929C3.51957 11.1054 3.26522 11 3 11C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2.00529 13.9528 2.58222 15.8613 3.6596 17.49C4.73699 19.1187 6.26767 20.3964 8.06274 21.1652C9.85782 21.9341 11.8387 22.1605 13.761 21.8166C15.6833 21.4727 17.4628 20.5735 18.88 19.23V21C18.88 21.2652 18.9854 21.5196 19.1729 21.7071C19.3604 21.8946 19.6148 22 19.88 22C20.1452 22 20.3996 21.8946 20.5871 21.7071C20.7746 21.5196 20.88 21.2652 20.88 21V16.5C20.8775 16.2416 20.7752 15.9943 20.5943 15.8097C20.4135 15.6251 20.1683 15.5177 19.91 15.51ZM12 2C9.43639 2.00731 6.97349 2.99891 5.12 4.77V3C5.12 2.73478 5.01464 2.48043 4.82711 2.29289C4.63957 2.10536 4.38522 2 4.12 2C3.85478 2 3.60043 2.10536 3.41289 2.29289C3.22536 2.48043 3.12 2.73478 3.12 3V7.5C3.12 7.76522 3.22536 8.01957 3.41289 8.20711C3.60043 8.39464 3.85478 8.5 4.12 8.5H8.62C8.88522 8.5 9.13957 8.39464 9.32711 8.20711C9.51464 8.01957 9.62 7.76522 9.62 7.5C9.62 7.23478 9.51464 6.98043 9.32711 6.79289C9.13957 6.60536 8.88522 6.5 8.62 6.5H6.22C7.32247 5.34787 8.74409 4.5515 10.3024 4.21311C11.8607 3.87472 13.4846 4.00975 14.9656 4.60086C16.4466 5.19198 17.7172 6.21221 18.6142 7.5306C19.5113 8.849 19.9938 10.4054 20 12C20 12.2652 20.1054 12.5196 20.2929 12.7071C20.4804 12.8946 20.7348 13 21 13C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z" fill="#2B2F31" />
                                    </svg>
                                </div>
                            </IconButton>
                        </div>

                    </div>
                </div>

                <div className=' flex flex-col gap-4  justify-center '>
                    {
                        isLoading ? <div className="w-full h-96 flex justify-center items-center gap-2">
                            <CircularProgress />
                            <span className="text-3xl">Loading...</span>
                        </div> :
                            <div>
                                <ActivityLogsTable
                                    id={custId}
                                    dataList={logsList}
                                />
                            </div>
                    }

                    <div className="flex justify-center w-full gap-10">
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={metadata?.total}
                            pageSize={10}
                            onPageChange={(page: any) => {
                                setCurrentPage(page);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityLogs