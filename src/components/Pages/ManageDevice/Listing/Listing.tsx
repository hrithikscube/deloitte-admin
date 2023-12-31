import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import CustomButton from "../../../Common/CustomButton";
import { SelectInput } from "../../../Common/Input/Select";

import filterIcon from "../../../../assets/icons/ListingIcons/filterIcon.svg";
import add_user from "../../../../assets/icons/ListingIcons/add_user.svg";
import logsIcon from "../../../../assets/icons/logsIcon.svg";

import refresh from "../../../../assets/icons/ListingIcons/refresh.svg";

import view_logs from "../../../../assets/icons/view_logs.svg";

import Badge from "@mui/material/Badge";
import CircularProgress from "@mui/material/CircularProgress";
import { Input } from "../../../Common/Input/Input";
import { Pagination } from "../../../Common/Pagination/Pagination";
import CardsTable from "./Table";
import { CountItems, showToastMessage } from "../../../../utils/helpers";
import { DateRangePicker } from "../../../Common/Input/DateRangePicker";
import moment from "moment";
import axiosInstance from "../../../../utils/axios";
import AddDevice from "./AddDevice";
import { fetchDevice } from "../../../../features/manageDeviceSlice";
import TimeModal from "../Modal/TimeModal";

const initialStates = {
    search_key: "",
    status: "",
};

const ManageDeviceListing = () => {
    const cols = [
        {
            title: "Device Key",
        },
        {
            title: "Device Name",
        },
        {
            title: "Device Version",
        },
        {
            title: "Persons",
        },
        {
            title: "Photos",
        },
        {
            title: "Device IP",
        },
        {
            title: "Access Type",
        },
        {
            title: "Last Activity Time",
        },
        {
            title: "Status",
        },
        {
            title: "Action",
        },
    ];
    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const [filterOpen, setFilterOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [isModifiedFilter, setIsModifiedFilter] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);


    const [filtersCount, setFiltersCount] = useState(0);
    const [startDate, setStartDate] = useState();
    const [filterList, setFilterList] = useState({} as any);
    const [endDate, setEndDate] = useState();
    const { list, isLoading, metadata } = useSelector(
        (state: any) => state.device
    );


    const [currentPage, setCurrentPage] = useState(1);

    const [params, setParams] = useState(initialStates);

    const statusData = [
        {
            id: "Active",
            name: "Active",
        },
        {
            id: "Inactive",
            name: "Inactive",
        },

    ];

    const resetFilter = () => {
        setCurrentPage(1);
        setParams({ ...params, ...initialStates });
        setFiltersCount(0);
        dispatch(fetchDevice(initialStates, 1));
        setStartDate("" as any);
        setEndDate("" as any);
        setIsModifiedFilter(false)
    };

    const ToggleFilter = () => {
        filterOpen ? setFilterOpen(false) : setFilterOpen(true);
    };

    const openAddModal = () => {
        setAddModalOpen(true)
        console.log(addModalOpen, 'modal state')
    };


    const ApplyFilter = () => {
        setCurrentPage(1);
        dispatch(fetchDevice(params, 1));
        let p = JSON.parse(JSON.stringify(params));
        delete p.start_date
        const filtercount = CountItems(p);
        setFiltersCount(filtercount);
    };

    const onFilterChange = (event: any) => {
        setParams({ ...params, [event.target.name]: event.target.value });
        setIsModifiedFilter(true)
    };

    useEffect(() => {
        fetchPrerequest();
    }, []);

    useMemo(() => {
        dispatch(fetchDevice(params, currentPage));
    }, [currentPage]);

    const fetchPrerequest = () => {
        axiosInstance
            .get(`/admin/employees/prequestie`)
            .then((response) => {
                const data = response.data.data;
                console.log(data)
                setFilterList({
                    designations: data.designations.map(
                        (x: any) => x.designation
                    ),
                });
            })
            .catch((error) => {
                const { errors, message } = error.response.data;
                const errorMsg = errors[Object.keys(errors)[0]] || message;
                showToastMessage(errorMsg, "error");
            });
    };

    const handleToggleChange = (event: any, user: any) => {
        event.preventDefault();
        axiosInstance
            .patch(`/admin/employees/update-status/${user.id}`, {
                status: !user.is_active,
            })
            .then((response) => {
                showToastMessage(response.data.data.message, "success");
                // dispatch(fetchEmployees(params, currentPage));
            })
            .catch((error) => {
                const { errors, message } = error.response.data;
                const errorMsg = errors[Object.keys(errors)[0]] || message;
                showToastMessage(errorMsg, "error");
            });
    };

    const onRowDeleteClick = (item: any) => {
        setSelectedEmployee(item.id);
        setOpenDelete(true)
    }

    const onDeleteConfirm = (item: any) => {
        axiosInstance
            .delete(`/admin/employees/${selectedEmployee}`, {})
            .then((response) => {
                showToastMessage("EMPLOYEE DELETED SUCCESSFULLY", "success");
                // dispatch(fetchEmployees(params, currentPage));
                setSelectedEmployee('');
                setOpenDelete(false)
            })
            .catch((error) => {
                const { errors, message } = error.response.data;
                const errorMsg = errors[Object.keys(errors)[0]] || message;
                showToastMessage(errorMsg, "error");
                setSelectedEmployee('');
                setOpenDelete(false)
            });
    }
    const onDeleteCancel = (item: any) => {
        setSelectedEmployee('');
        setAddModalOpen(false)
    }
    const onRowEdit = (item: any) => {
        setSelectedEmployee(item);

        setAddModalOpen(true)
    }



    const [timeModal, setTimeModal] = useState(false)

    const timeModalOpen = (id: any) => {
        setTimeModal(true)
        setActiveId(id)
    }

    const timeModalFalse = () => {
        setTimeModal(false)
    }

    const [activeId, setActiveId] = useState() as any


    return (
        <React.Fragment>
            <div className=" mb-44 sm:mb-0">
                <div className="flex flex-col justify-between  sm:flex-row">
                    <div>
                        <p className="text-SpaceCadet font-nunitoBold">
                            List of Devices
                        </p>
                        <hr className="w-32 md:w-full line" />
                        <p className="mt-1 text-xs font-normal font-nunitoRegular text-SpaceCadet">
                            {metadata?.totalUsers}  {metadata?.totalUsers > 1 ? 'Devices' : 'Device'}
                        </p>
                    </div>
                    <br />

                    <div className="relative flex justify-between gap-6 sm:justify-end">
                        <div className="absolute left-0 -top-2">
                            <Badge
                                color="primary"
                                className="text-black"
                                badgeContent={filtersCount}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                            />
                        </div>
                        <CustomButton
                            borderRadius="0.5rem"
                            onClick={ToggleFilter}
                            variant="outlined"
                            size="large"
                            icon={<img src={filterIcon} alt="" />}
                        >
                            <p className="text-sm font-bold text-yellow font-nunitoRegular">
                                Filter
                            </p>
                        </CustomButton>

                        <CustomButton
                            borderRadius="0.5rem"
                            onClick={() => openAddModal()}
                            variant="outlined"
                            size="large"
                            icon={<img src={view_logs} alt="" />}
                        >
                            <p className="text-sm font-bold text-yellow font-nunitoRegular">
                                Add Device
                            </p>
                        </CustomButton>


                        <CustomButton
                            disabled={false}
                            borderRadius="0.5rem"
                            onClick={() => {
                                navigate("/admin/manage-devices/logs");
                            }}
                            variant="contained"
                            size="large"
                            icon={<img src={logsIcon} alt="addImageIcon" />}
                        >
                            <p className="text-sm font-bold text-darkbg font-nunitoRegular">
                                View Logs
                            </p>
                        </CustomButton>
                    </div>
                </div>
                {filterOpen ? (
                    <>
                        <div className="flex flex-col items-center gap-3 mt-4 sm:flex-row filters ">
                            <div className="w-full  sm:w-[600px]">
                                <SelectInput
                                    width="100%"
                                    options={statusData}
                                    handleChange={onFilterChange}
                                    value={params.status}
                                    label="Access Status"
                                    name="status"
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
                                    Apply Filter
                                </CustomButton>

                                <CustomButton
                                    borderRadius="8px"
                                    onClick={resetFilter}
                                    width="w-fit"
                                    variant="secondary"
                                    size="large"
                                >
                                    <img
                                        src={refresh}
                                        alt="reset_btn"
                                    />
                                </CustomButton>
                            </div>
                        </div>
                    </>
                ) : null}

                {list && list.length ? (
                    <p className="mt-2 text-Kimberly text-xs font-nunitoRegular font-normal">
                        Showing{" "}
                        <span className="text-SpaceCadet pr-1">
                            {currentPage != 1 ? (currentPage - 1) * 10 + 1 : 1}
                        </span>{" "}
                        to
                        <span className="text-SpaceCadet px-1">
                            {list.length +
                                (currentPage != 1 ? (currentPage - 1) * 10 : 0)}
                        </span>
                        out of{" "}
                        <span className="text-SpaceCadet">{metadata?.total}</span>{" "}
                        results
                    </p>
                ) : null}

                {isLoading ? (
                    <div className="w-full h-96 flex justify-center items-center">
                        <CircularProgress />
                        <span className="text-3xl">Loading...</span>
                    </div>
                ) : list && list.length ? (
                    <div>
                        <div className="w-full   rounded-lg mt-[16px]">
                            <CardsTable
                                cols={cols}
                                data={list}
                                onRowEdit={onRowEdit}
                                timeModalOpen={timeModalOpen}
                            />
                        </div>

                        <div className="flex justify-center w-full gap-10 p-4">
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
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 mt-6">
                        {/* <img src={NotFound} alt="Not Found" /> */}
                        <p className="text-[18px] font-nunitoBold">
                            No Results found !!
                        </p>
                    </div>
                )}
            </div>
            {/* 1. Add Device Modal */}
            <AddDevice
                open={addModalOpen}
                handleClose={onDeleteCancel}
                selectedItem={selectedEmployee}
                title={`Are you sure of deleting this employee record?`}
                isLoading={false}
            />

            <TimeModal
                id={activeId}
                open={timeModal}
                handleClose={timeModalFalse} />

        </React.Fragment>
    );
};

export default ManageDeviceListing;
