import React, { useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import CustomButton from "../../../../Common/CustomButton";
import arrowIcon from "../../../../../assets/icons/arrowIcon.svg";
import useOutsideClick from "../../../../Common/ClickOutsideHook";
import LostOrDamagedPopup from "./LostOrDamagedPopup";
import ChangeInfoPopup from "./ChangeInfoPopup";
import SelectTemplatePopup from "./SelectTemplatePopup";
import NewCardPlacedPopup from "./NewCardPlacedPopup";

const useStyles = makeStyles(() => ({
    root: {
        "& td ": {
            color: "#141C4C",
        },
        "& th ": {
            color: "rgba(20, 28, 76, 0.7)",
        },
    },

    tr: {
        "& td:first-child ": {
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
        },
        "& td:last-child ": {
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
        },
    },
}));

const colList = [
    { title: "Card No." },
    { title: "UID" },
    { title: "Card Status" },
    { title: "Activity" },
];

const dataList = [
    {
        cardNo: 1,
        uid: "73ABD1",
        status: "Disabled",
        activity: "Marked As Lost",
    },
];

const ManageCards = () => {
    const classes = useStyles();
    const [options, setOptions] = useState(false);
    const [openPopup, setOpenPopup] = useState({
        lost: false,
        damaged: false,
        changeInfo: false,
        selectTemplate: false,
        newCardPlaced: false,
    });
    const impactRef: any = useRef();
    useOutsideClick(impactRef, () => setOptions(false));

    const dropdownOptions = () => {
        setOptions(!options);
    };

    const openPopupFun = (type: any) => {
        setOpenPopup({ ...openPopup, [type]: true });
    };
    const closePopupFun = (type: any) => {
        setOpenPopup({ ...openPopup, [type]: false });
    };
    const handleYes = () => {};

    return (
        <div className="w-full rounded flex flex-col gap-6">
            <div className="default_container bg-white z-10">
                <div className=" flex flex-col gap-4  justify-center">
                    <TableContainer component={Paper} elevation={0}>
                        {dataList.length > 0 ? (
                            <Table
                                aria-label="simple table"
                                sx={{
                                    [`& .${tableCellClasses.root}`]: {
                                        borderBottom: "1px solid #E7E8ED",
                                    },
                                    minWidth: 650,
                                    //   border: '1px solid #E7E8ED',
                                    borderCollapse: "separate",
                                    borderSpacing: "0px 5px",
                                    px: "24px",
                                    background: "#F1F4F8",
                                    borderRadius: "8px",
                                    "& .css-zvlqj6-MuiTableCell-root": {
                                        padding: 0,
                                    },
                                    padding: 0,
                                }}
                                className={classes.root}
                            >
                                <TableHead>
                                    <TableRow>
                                        {colList.map((item: any) => (
                                            <TableCell
                                                align="left"
                                                sx={{
                                                    color: "#5B6082",
                                                    fontSize: "0.8rem",
                                                }}
                                            >
                                                <span>{item?.title}</span>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataList?.map(
                                        (item: any, index: number) => (
                                            <TableRow
                                                sx={{
                                                    height: "16px",
                                                    backgroundColor: "#F1F4F8",
                                                    color: "#141C4C",
                                                }}
                                                className={classes.tr}
                                            >
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        fontSize: "0.8rem",
                                                        color: "#141C4C",
                                                        width: "200px",
                                                    }}
                                                >
                                                    {item.cardNo ?? "-"}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        fontSize: "0.8rem",
                                                        color: "#141C4C",
                                                        width: "200px",
                                                    }}
                                                >
                                                    {item.uid ?? "-"}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        fontSize: "0.8rem",
                                                        color: "#141C4C",
                                                        width: "200px",
                                                    }}
                                                >
                                                    {item.status ?? "-"}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        fontSize: "0.8rem",
                                                        color: "#141C4C",
                                                    }}
                                                >
                                                    <div className="">
                                                        <div
                                                            onClick={
                                                                dropdownOptions
                                                            }
                                                            className={`cursor-pointer w-[200px] border-2 border-gray-500 p-2 flex justify-center items-center gap-2 rounded-lg`}
                                                        >
                                                            <p className="font-bold">
                                                                Manage Card
                                                            </p>
                                                            <img
                                                                className={`${
                                                                    options
                                                                        ? "rotate-270"
                                                                        : "rotate-180"
                                                                }`}
                                                                src={arrowIcon}
                                                                alt=""
                                                            />
                                                        </div>
                                                        {options && (
                                                            <div
                                                                ref={impactRef}
                                                                className="bg-white w-[180px] shadow-md flex flex-col justify-start items-start absolute top-[40px] left-0 z-100 rounded"
                                                            >
                                                                <p
                                                                    className="cursor-pointer border-b w-full p-2"
                                                                    onClick={() =>
                                                                        openPopupFun(
                                                                            "lost"
                                                                        )
                                                                    }
                                                                >
                                                                    Mark as Lost
                                                                </p>
                                                                <p
                                                                    className="cursor-pointer border-b w-full p-2"
                                                                    onClick={() =>
                                                                        openPopupFun(
                                                                            "damaged"
                                                                        )
                                                                    }
                                                                >
                                                                    Mark as
                                                                    Damaged
                                                                </p>
                                                                <p
                                                                    className="cursor-pointer border-b w-full p-2"
                                                                    onClick={() =>
                                                                        openPopupFun(
                                                                            "changeInfo"
                                                                        )
                                                                    }
                                                                >
                                                                    Change in
                                                                    Information
                                                                </p>
                                                                <p
                                                                    className="cursor-pointer p-2"
                                                                    onClick={() =>
                                                                        openPopupFun(
                                                                            "selectTemplate"
                                                                        )
                                                                    }
                                                                >
                                                                    Change in
                                                                    Design
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="flex justify-center items-center flex-col gap-4 mt-6">
                                {/* <img src={NotFound} alt="" width="100px" /> */}
                                <p className="text-[18px] font-nunitoBold">
                                    No Results found !!
                                </p>
                            </div>
                        )}
                    </TableContainer>
                </div>
            </div>
            {openPopup.lost && (
                <LostOrDamagedPopup
                    type={"lost"}
                    open={openPopup.lost}
                    handleClose={closePopupFun}
                    title={"Mark As Lost"}
                    handleYes={handleYes}
                />
            )}
            {openPopup.damaged && (
                <LostOrDamagedPopup
                    type={"damaged"}
                    open={openPopup.damaged}
                    handleClose={closePopupFun}
                    title={"Mark As Damaged"}
                    handleYes={handleYes}
                />
            )}
            {openPopup.changeInfo && (
                <ChangeInfoPopup
                    type={"changeInfo"}
                    open={openPopup.changeInfo}
                    handleClose={closePopupFun}
                    title={"Change in Information"}
                    handleYes={handleYes}
                />
            )}
            {openPopup.selectTemplate && (
                <SelectTemplatePopup
                    type={"selectTemplate"}
                    open={openPopup.selectTemplate}
                    handleClose={closePopupFun}
                    title={"Select Template"}
                    handleYes={handleYes}
                />
            )}
            {openPopup.newCardPlaced && (
                <NewCardPlacedPopup
                    type={"newCardPlaced"}
                    open={openPopup.newCardPlaced}
                    handleClose={closePopupFun}
                    title={"New Card Placed Successfully"}
                    handleYes={handleYes}
                />
            )}
        </div>
    );
};

export default ManageCards;
