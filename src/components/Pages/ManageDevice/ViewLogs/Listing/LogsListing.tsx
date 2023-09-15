import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import filterIcon from "../../../../../assets/icons/ListingIcons/filterIcon.svg";
import add_user from "../../../../../assets/icons/ListingIcons/add_user.svg";
import refresh from "../../../../../assets/icons/ListingIcons/refresh.svg";
import view_logs from "../../../../../assets/icons/view_logs.svg";
import Badge from "@mui/material/Badge";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import LogsTable from "./LogsTable";
import Pagination from "../../../../Common/Pagination/Pagination";
import CustomButton from "../../../../Common/CustomButton";
import { Input } from "../../../../Common/Input/Input";
import { SelectInput } from "../../../../Common/Input/Select";
import { CountItems, showToastMessage } from "../../../../../utils/helpers";
import BreadCrumb from "../../../../Common/Breadcrumb/BreadCrumb";
import CommonDatepicker from "../../../../Common/Input/Datepicker";
import axiosInstance from "../../../../../utils/axios";
import ConfirmDelete from "./DeleteConfirmation";
import { DateRangePicker } from "../../../../Common/Input/DateRangePicker";

const initialStates = {
    start_date: "",
    end_date: "",
    access_type: "",
    search_key: "",
    entry_type: ""
};

const LogsListing = () => {
    const cols = [
        {
            title: "Photo",
        },
        {
            title: "Name",
        },
        {
            title: "Identity",
        },
        {
            title: "Id",
        },
        {
            title: "Device Name",
        },
        {
            title: "Entry Type",
        },

        {
            title: "Created At",
        },

        {
            title: "Action",
        },
    ];


    const [filterOpen, setFilterOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState('' as any);
    const [isModifiedFilter, setIsModifiedFilter] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const [filtersCount, setFiltersCount] = useState(0);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [currentPage, setCurrentPage] = useState(1);

    const [params, setParams] = useState(initialStates);


    const accessTypes = [
        {
            id: "STRANGER",
            name: "STRANGER",
        },
        {
            id: "EMPLOYEE",
            name: "EMPLOYEE",
        },
        {
            id: "VISITOR",
            name: "VISITOR",
        }
    ];

    const entryTypes = [
        {
            id: "Enter",
            name: "Enter",
        },
        {
            id: "Out",
            name: "Out",
        },
    ];

    const resetFilter = () => {
        setCurrentPage(1);
        setParams({ ...params, ...initialStates });
        setFiltersCount(0);
        // dispatch(fetchDevice(initialStates, 1));

        setStartDate("" as any);
        setEndDate("" as any);

        getLogsInformation()
        setIsModifiedFilter(false)
    };

    const ToggleFilter = () => {
        filterOpen ? setFilterOpen(false) : setFilterOpen(true);
    };

    const openAddModal = () => {
        setAddModalOpen(true)
    };


    const ApplyFilter = () => {
        setCurrentPage(1);
        // dispatch(fetchDevice(params, 1));
        getLogsInformation()

        let p = JSON.parse(JSON.stringify(params));
        delete p.start_date

        const filtercount = CountItems(p);
        setFiltersCount(filtercount);
    };

    const onFilterChange = (event: any) => {
        setParams({ ...params, [event.target.name]: event.target.value });
        setIsModifiedFilter(true)
    };

    const onDeleteConfirm = (item: any) => {
        axiosInstance
            .delete(`/admin/device-logs/${selectedEmployee}`, {})
            .then((response: any) => {
                showToastMessage("LOG DELETED SUCCESSFULLY", "success");
                getLogsInformation()
                setSelectedEmployee('');
                setOpenDelete(false)
            })
            .catch((error: any) => {
                const { errors, message } = error.response.data;
                const errorMsg = errors[Object.keys(errors)[0]] || message;
                showToastMessage(errorMsg, "error");
                setSelectedEmployee('');
                setOpenDelete(false)
            });
    }
    const onDeleteCancel = (item: any) => {
        setSelectedEmployee('');
        setOpenDelete(false)
    }
    const onRowEdit = (item: any) => {
        setSelectedEmployee(item);
        setAddModalOpen(true)
    }


    const onDateChange = (event: any, name: any) => {
        setParams({ ...params, [name]: moment(event).format('YYYY-MM-DD') })
        // setErrors({} as any)
    }

    const [allStates, setAllStates] = useState({
        logsList: [],
        metadata: {}
    }) as any


    const getLogsInformation = () => {
        setIsLoading(true)
        axiosInstance.get(`/admin/device-logs?page=${currentPage}&start_date=${params.start_date}&end_date=${params.end_date}&access_type=${params.access_type}&search_key=${params.search_key}&entry_type=${params.entry_type}`)
            .then((response) => {
                let { data } = response.data
                setAllStates({ ...allStates, metadata: data.meta, logsList: data.data })
                setIsLoading(false)
            })

            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
    }


    useEffect(() => {
        getLogsInformation()
    }, [])

    useMemo(() => {
        getLogsInformation()
    }, [currentPage])

    const onRowDeleteClick = (item: any) => {
        setSelectedEmployee(item.id);
        setOpenDelete(true)
    }

    const handleDateRangeFilter = (dates: any) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
        const sDate = moment(start).format('YYYY-MM-DD')
        const eDate = moment(end).format('YYYY-MM-DD')
        setParams({ ...params, start_date: sDate, end_date: eDate })
    }

    return (
        <div className=" mb-44 sm:mb-0">
            <BreadCrumb
                links={[
                    { path: "List of Access Machines", url: "/admin/manage-devices" },
                    { path: "View Logs", url: "" },
                ]}
            />
            <div className="flex flex-col justify-between  sm:flex-row">
                <div>
                    <p className="text-SpaceCadet font-nunitoBold">
                        View Logs
                    </p>
                    <hr className="w-32 md:w-full line" />
                    <p className="mt-1 text-xs font-normal font-nunitoRegular text-SpaceCadet">
                        {allStates.metadata?.total}  {allStates.metadata?.total > 1 ? 'Device Logs' : 'Device Logs'}
                    </p>
                </div>
                <br />
            </div>


            <div className="flex flex-col items-center gap-3 mt-4 sm:flex-row filters ">

                <div className="w-full  sm:w-[600px] -mt-1">
                    <DateRangePicker
                        label='Date Created'
                        startDate={startDate}
                        endDate={endDate}
                        onChange={handleDateRangeFilter}
                        istodaymax={false}
                    />
                </div>


                <div className="w-full  sm:w-[600px]">
                    <SelectInput
                        width="100%"
                        options={accessTypes}
                        handleChange={onFilterChange}
                        value={params.access_type}
                        label="Access type"
                        name="access_type"
                        bgcolor="white"
                    />
                </div>

                <div className="w-full  sm:w-[600px]">
                    <SelectInput
                        width="100%"
                        options={entryTypes}
                        handleChange={onFilterChange}
                        value={params.entry_type}
                        label="Entry Type"
                        name="entry_type"
                        bgcolor="white"
                    />
                </div>

                <div className="w-full sm:w-[800px]">
                    <Input
                        rows={1}
                        width="w-full"
                        disabled={false}
                        readOnly={false}
                        value={params.search_key}
                        handleChange={onFilterChange}
                        label="Search"
                        name="search_key"
                    />
                </div>
                <div className="flex justify-end w-full gap-3 ">
                    <CustomButton
                        borderRadius="8px"
                        disabled={!isModifiedFilter}
                        onClick={ApplyFilter}
                        width="w-fit"
                        variant="contained"
                        size="large"
                    >
                        Apply
                    </CustomButton>

                    <CustomButton
                        borderRadius="8px"
                        onClick={resetFilter}
                        width="w-fit"
                        variant="outlined"
                        size="large"
                    >
                        <img
                            src={refresh}
                            alt="reset_btn"
                        />
                    </CustomButton>
                </div>
            </div>

            {true ? (
                <p className="mt-2 text-Kimberly text-xs font-nunitoRegular font-normal">
                    Showing{" "}
                    <span className="text-SpaceCadet pr-1">
                        {currentPage != 1 ? (currentPage - 1) * 10 + 1 : 1}
                    </span>{" "}
                    to
                    <span className="text-SpaceCadet px-1">
                        {allStates.logsList.length +
                            (currentPage != 1 ? (currentPage - 1) * 10 : 0)}
                    </span>
                    out of{" "}
                    <span className="text-SpaceCadet">{allStates.metadata?.total}</span>{" "}
                    results
                </p>
            ) : null}

            {isLoading ? (
                <div className="w-full h-96 flex justify-center items-center">
                    <CircularProgress />
                    <span className="text-3xl">Loading...</span>
                </div>
            ) : allStates.logsList.length ? (
                <div>
                    <div className="w-full rounded-lg mt-[16px]">
                        <LogsTable
                            cols={cols}
                            data={allStates.logsList}
                            onRowDeleteClick={onRowDeleteClick}
                        />
                    </div>

                    <div className="flex justify-center w-full gap-10 p-4">
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={allStates.metadata?.total}
                            pageSize={10}
                            onPageChange={(page: any) => {
                                setCurrentPage(page);
                            }}
                        />
                    </div>
                    {/* 1. Warning Popup */}
                    {/* 1. Warning Popup */}
                    <ConfirmDelete
                        handleConfirm={onDeleteConfirm}
                        handleDialogClose={onDeleteCancel}
                        open={openDelete}
                        title={`Are you sure of deleting this device log?`}
                        isLoading={false}
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 mt-6">
                    {/* <img src={NotFound} alt="Not Found" /> */}
                    <p className="text-[18px] font-nunitoBold">
                        No Results found !!
                    </p>
                </div>
            )}
        </div>
    );
};

export default LogsListing;
