import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../Common/CustomButton";
import { SelectInput } from "../../../Common/Input/Select";

import refresh from "../../../../assets/icons/ListingIcons/refresh.svg";
import add_user from "../../../../assets/icons/ListingIcons/add_user.svg";
import filterIcon from "../../../../assets/icons/ListingIcons/filterIcon.svg";

import moment from "moment";
import VisitorTable from "./Table";
import Badge from "@mui/material/Badge";
import AddVisitor from "../Modal/AddVisitor";
import ScheduleModal from "../Modal/ScheduleModal";
import { Input } from "../../../Common/Input/Input";
import axiosInstance from "../../../../utils/axios";
import InvitationCancelModal from "../Modal/InvitationCancel";
import CircularProgress from "@mui/material/CircularProgress";
import { Pagination } from "../../../Common/Pagination/Pagination";
import { CountItems, showToastMessage } from "../../../../utils/helpers";
import { DateRangePicker } from "../../../Common/Input/DateRangePicker";
import { Link } from "react-router-dom";
import { fetchVisitors } from "../../../../features/visitorSlice";

const initialStates = {
    search_key: "",
    status: "",
    start_date: "",
    end_date: "",
    designation: "",
};

const ManageVisitorsListing = () => {
    const cols = [
        {
            title: "Photo",
        },
        {
            title: "Name",
        },
        {
            title: "Phone",
        },
        {
            title: "Purpose",
        },
        {
            title: "Come From",
        },
        {
            title: "Receiving Employee",
        },
        // {
        //     title: "Location",
        // },
        {
            title: "Status",
        },
        {
            title: "Action",
        },
    ];
    const dispatch = useDispatch<any>();

    const [filterOpen, setFilterOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [isModifiedFilter, setIsModifiedFilter] = useState(false);

    const [filtersCount, setFiltersCount] = useState(0);
    const [startDate, setStartDate] = useState();
    const [filterList, setFilterList] = useState({} as any);
    const [endDate, setEndDate] = useState();
    const { list, isLoading, metadata } = useSelector(
        (state: any) => state.visitor
    );

    // DateRange picker
    const handleDateRangeFilter = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        const sDate = moment(start).format("YYYY-MM-DD");
        const eDate = moment(end).format("YYYY-MM-DD");
        setParams({ ...params, start_date: sDate, end_date: eDate });
        setIsModifiedFilter(true);
    };

    const [currentPage, setCurrentPage] = useState(1);

    const [params, setParams] = useState(initialStates);

    const statusData = [
        {
            id: "false",
            name: "InActive",
        },
        {
            id: "true",
            name: "Active",
        },
    ];

    const resetFilter = () => {
        setCurrentPage(1);
        setParams({ ...params, ...initialStates });
        setFiltersCount(0);
        dispatch(fetchVisitors(initialStates, 1));
        setStartDate("" as any);
        setEndDate("" as any);
        setIsModifiedFilter(false);
    };

    const ToggleFilter = () => {
        filterOpen ? setFilterOpen(false) : setFilterOpen(true);
    };

    const ApplyFilter = () => {
        setCurrentPage(1);
        dispatch(fetchVisitors(params, 1));
        let p = JSON.parse(JSON.stringify(params));
        delete p.start_date;
        const filtercount = CountItems(p);
        setFiltersCount(filtercount);
    };

    const onFilterChange = (event: any) => {
        setParams({ ...params, [event.target.name]: event.target.value });
        setIsModifiedFilter(true);
    };

    useEffect(() => {
        fetchPrerequest();
    }, []);

    useMemo(() => {
        dispatch(fetchVisitors(params, currentPage));
    }, [currentPage]);

    const fetchPrerequest = () => {
        axiosInstance
            .get(`/admin/employees/prequestie`)
            .then((response) => {
                const data = response.data.data;
                console.log(data);
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
                dispatch(fetchVisitors(params, currentPage));
            })
            .catch((error) => {
                const { errors, message } = error.response.data;
                const errorMsg = errors[Object.keys(errors)[0]] || message;
                showToastMessage(errorMsg, "error");
            });
    };

    const onRowDeleteClick = (item: any) => {
        setSelectedEmployee(item.id);
        cancelModalOpen(item.id);
        // setOpenDelete(true)
    };

    // to clear previous selected employee
    const cleanUp = () => {
        setSelectedEmployee("");
    };
    // Add or Edit Visitor modal states
    const [avModal, setAvModal] = useState(false);

    const [activeData, setActiveData] = useState({
        id: "",
        edit: false,
    });

    const avModalOpen = () => {
        setActiveData({
            ...activeData,
            id: "",
            edit: false,
        });
        setAvModal(true);
    };

    const editAvModalOpen = (id: any) => {
        setActiveData({
            ...activeData,
            id: id,
            edit: true,
        });
        setAvModal(true);
    };

    const avModalClose = () => {
        setAvModal(false);
    };

    // Schedule or Reschedule modal states
    const [srModal, setSRModal] = useState(false);

    const srModalOpen = () => {
        setSRModal(true);
    };

    const editSrModalOpen = () => {
        setSRModal(true);
    };

    const srModalClose = () => {
        setSRModal(false);
    };

    // Cancel Invitation modal states
    const [cancelModal, setCancelModal] = useState(false);
    const [cancelId, setCancelId] = useState();

    const cancelModalOpen = (thisId: any) => {
        setCancelId(thisId);
        setCancelModal(true);
    };

    const cancelModalClose = () => {
        setCancelModal(false);
    };

    return (
        <React.Fragment>
            <div className=" mb-44 sm:mb-0">
                <div className="flex flex-col justify-between  sm:flex-row">
                    <div>
                        <p className="text-SpaceCadet font-nunitoBold">
                            List of Visitors
                        </p>
                        <hr className="w-32 md:w-full line" />
                        <p className="mt-1 text-xs font-normal font-nunitoRegular text-SpaceCadet">
                            {metadata?.totalUsers}{" "}
                            {metadata?.totalUsers > 1 ? "Visitors" : "Visitors"}
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

                        <Link to="/admin/manage-visitors/create">
                            <CustomButton
                                disabled={false}
                                borderRadius="0.5rem"
                                variant="contained"
                                size="large"
                                icon={<img src={add_user} alt="addImageIcon" />}
                                // onClick={avModalOpen}
                            >
                                <p className="text-sm font-bold text-darkbg font-nunitoRegular">
                                    Add Visitor
                                </p>
                            </CustomButton>
                        </Link>
                    </div>
                </div>
                {filterOpen ? (
                    <>
                        <div className="flex flex-col items-center gap-3 mt-4 sm:flex-row filters ">
                            <div className="w-full lg:w-[300px]">
                                <DateRangePicker
                                    label="Joined Date"
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={handleDateRangeFilter}
                                    istodaymax={true}
                                />
                            </div>

                            <div className="w-full  sm:w-[600px]">
                                <SelectInput
                                    width="100%"
                                    options={filterList.designations}
                                    handleChange={onFilterChange}
                                    value={params.designation}
                                    label="Designation"
                                    name="designation"
                                    bgcolor="white"
                                />
                            </div>
                            <div className="w-full  sm:w-[600px]">
                                <SelectInput
                                    width="100%"
                                    options={statusData}
                                    handleChange={onFilterChange}
                                    value={params.status}
                                    label="Active/Inactive"
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
                                    <img src={refresh} alt="reset_btn" />
                                </CustomButton>
                            </div>
                        </div>
                    </>
                ) : null}

                {/* {!isLoading && list.length ? ( */}
                {!isLoading && list.length ? (
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
                        <span className="text-SpaceCadet">
                            {metadata?.total}
                        </span>{" "}
                        results
                    </p>
                ) : null}

                {isLoading ? (
                    <div className="w-full h-96 flex justify-center items-center">
                        <CircularProgress />
                        <span className="text-3xl">Loading...</span>
                    </div>
                ) : list.length ? (
                    <div>
                        <div className="w-full   rounded-lg mt-[16px]">
                            <VisitorTable
                                cols={cols}
                                data={list}
                                // editAvModalOpen={editAvModalOpen}
                                editSrModalOpen={editSrModalOpen}
                                onRowDeleteClick={onRowDeleteClick}
                                handleToggleChange={handleToggleChange}
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
                        {/* 1. Warning Popup */}
                        {/* <ConfirmDelete
                            handleConfirm={onDeleteConfirm}
                            handleDialogClose={onDeleteCancel}
                            open={openDelete}
                            title={`Are you sure of deleting this employee record?`}
                            isLoading={false}
                        /> */}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 mt-6">
                        <p className="text-[18px] font-nunitoBold">
                            No Results found !!
                        </p>
                    </div>
                )}
            </div>

            {/* Add or Edit Visitor Information Modal */}
            <AddVisitor
                open={avModal}
                isEdit={activeData.edit}
                handleClose={avModalClose}
                id={activeData.id !== "" ? activeData.id : ""}
            />

            {/* Schedule or Reschedule invitation */}
            <ScheduleModal open={srModal} handleClose={srModalClose} />

            {/* Cancel invitation modal*/}
            <InvitationCancelModal
                id={cancelId}
                open={cancelModal}
                handleClose={cancelModalClose}
                cleanUp={cleanUp}
            />
        </React.Fragment>
    );
};

export default ManageVisitorsListing;
