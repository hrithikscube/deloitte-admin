import React, { useState } from "react";
import { usePagination, DOTS } from "./usePagination";
import "./pagination.scss";
import { uuid } from "../../../utils/helpers";

export const Pagination = (props: any) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });
    const [customPageNo, setcustomPageNo] = useState("");

    if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const handleKeyDown = (event: any) => {
        if (
            event.key === "Enter" &&
            Number(customPageNo) > 0 &&
            paginationRange &&
            Number(customPageNo) <= paginationRange[paginationRange.length - 1]
        ) {
            onPageChange(Number(customPageNo));
        }
    };

    const lastPage =
        paginationRange && paginationRange[paginationRange.length - 1];

    const handleInputChange = (event: any) => {
        const { value } = event.target;
        if (value && Number(value) === 0) return;
        const re = /^[0-9+]+$/;
        if (
            (value && !re.test(value)) ||
            (paginationRange &&
                Number(value) > paginationRange[paginationRange.length - 1])
        ) {
            return;
        }
        setcustomPageNo(value);
    };

    return (
        <div className="flex justify-center space-x-4">
            <ul className={`pagination-container ${className}`}>
                <li
                    key={uuid()}
                    className={`arrow-icon pagination-item ${
                        currentPage === 1 ? "disabled" : ""
                    }`}
                    onClick={onPrevious}
                >
                    <div className="arrow left" />
                </li>
                {paginationRange?.map((pageNumber) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li key={uuid()} className="pagination-item dots">
                                &#8230;
                            </li>
                        );
                    }

                    return (
                        <li
                            key={uuid()}
                            className={`pagination-item ${
                                pageNumber === currentPage ? "selected" : ""
                            }`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                <li
                    key={uuid()}
                    className={`arrow-icon pagination-item ${
                        currentPage === lastPage ? "disabled" : ""
                    }`}
                    onClick={onNext}
                >
                    <div className="arrow right" />
                </li>
            </ul>
            <div className="relative items-center justify-center hidden space-x-2 lg:flex text-SpaceCadet pagination-goto">
                <p className="text-sm">Go to Page:</p>
                <div className="h-[40px] w-[84px] pagination-input-sec relative px-2 lg:flex justify-center items-center rounded-md border border-[#141C4C]  bg-transparent hover:border-[2px] hover:border-[#86BC24]  hidden">
                    <input
                        type="text"
                        value={customPageNo}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="relative w-full h-full pl-1 bg-transparent rounded-md outline-none focus:outline-none hover:outline-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default Pagination;
