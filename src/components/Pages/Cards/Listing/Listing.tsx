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
import CardsTable from "./Table";
import Badge from "@mui/material/Badge";
import { Pagination } from "../../../Common/Pagination/Pagination";
import { CountItems, showToastMessage } from "../../../../utils/helpers";
import { DateRangePicker } from "../../../Common/Input/DateRangePicker";
import { Input } from "../../../Common/Input/Input";
import { CircularProgress } from "@mui/material";

const initialStates = {
    search_key: "",
    status: "",
    start_date: "",
    end_date: "",
    designation: "",
};

const AllCardsListing = () => {
    const cols = [
        {
            title: "UID",
        },
        {
            title: "Location",
        },
        {
            title: "Department & Designation",
        },
        {
            title: "Name Email",
        },
        {
            title: "Date of Request",
        },
        {
            title: "Card Type",
        },
        {
            title: "Card Status",
        },
        {
            title: "ACTION",
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
        // dispatch(fetchVisitors(initialStates, 1));
        setStartDate("" as any);
        setEndDate("" as any);
        setIsModifiedFilter(false);
    };

    const ToggleFilter = () => {
        setFilterOpen(!filterOpen)
    };

    const ApplyFilter = () => {
        setCurrentPage(1);
        // dispatch(fetchVisitors(params, 1));
        let p = JSON.parse(JSON.stringify(params));
        delete p.start_date;
        const filtercount = CountItems(p);
        setFiltersCount(filtercount);
    };

    const onFilterChange = (event: any) => {
        setParams({ ...params, [event.target.name]: event.target.value });
        setIsModifiedFilter(true);
    };

    // useMemo(() => {
    //     dispatch(fetchVisitors(params, currentPage));
    // }, [currentPage]);


    return (
        <React.Fragment>
            <div className=" mb-44 sm:mb-0">
                <div className="flex flex-col justify-between  sm:flex-row">
                    <div>
                        <p className="text-SpaceCadet font-nunitoBold">
                            All Cards
                        </p>
                        <hr className="w-32 md:w-full line" />
                        <p className="mt-1 text-xs font-normal font-nunitoRegular text-SpaceCadet">
                            {metadata?.totalUsers}{" "}
                            {metadata?.totalUsers > 1 ? "Cards" : "Cards"}
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
                ) : [1, 1, 1, 1, 2, 3].length ? (
                    <div>
                        <div className="w-full   rounded-lg mt-[16px]">
                            <CardsTable
                                cols={cols}
                                data={[11, 1, 2, 23, 4, 5]}
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
                        <p className="text-[18px] font-nunitoBold">
                            No Results found !!
                        </p>
                    </div>
                )}
            </div>

        </React.Fragment>
    );
};

export default AllCardsListing;
