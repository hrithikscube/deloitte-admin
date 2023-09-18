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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

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
    // const [options, setOptions] = useState(false as boolean);
    const [openPopup, setOpenPopup] = useState({
        lost: false,
        damaged: false,
        changeInfo: false,
        selectTemplate: false,
        newCardPlaced: false,
    });
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const options = Boolean(anchorEl);

    const dropdownOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                                                            onClick={(e: any) =>
                                                                dropdownOptions(
                                                                    e
                                                                )
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
                                                        <Menu
                                                            elevation={1}
                                                            id="basic-menu"
                                                            anchorEl={anchorEl}
                                                            open={options}
                                                            onClose={
                                                                handleClose
                                                            }
                                                            MenuListProps={{
                                                                "aria-labelledby":
                                                                    "basic-button",
                                                            }}
                                                        >
                                                            <MenuItem
                                                                sx={{
                                                                    fontSize:
                                                                        "14px",
                                                                    fontFamily:
                                                                        "Nunito Bold",
                                                                    marginTop:
                                                                        "2px",
                                                                }}
                                                                onClick={() =>
                                                                    openPopupFun(
                                                                        "lost"
                                                                    )
                                                                }
                                                            >
                                                                Mark as Lost
                                                            </MenuItem>
                                                            <MenuItem
                                                                sx={{
                                                                    fontSize:
                                                                        "14px",
                                                                    fontFamily:
                                                                        "Nunito Bold",
                                                                    marginTop:
                                                                        "2px",
                                                                }}
                                                                onClick={() =>
                                                                    openPopupFun(
                                                                        "damaged"
                                                                    )
                                                                }
                                                            >
                                                                Mark as Damaged
                                                            </MenuItem>
                                                            <MenuItem
                                                                sx={{
                                                                    fontSize:
                                                                        "14px",
                                                                    fontFamily:
                                                                        "Nunito Bold",
                                                                    marginTop:
                                                                        "2px",
                                                                }}
                                                                onClick={() =>
                                                                    openPopupFun(
                                                                        "changeInfo"
                                                                    )
                                                                }
                                                            >
                                                                Change in
                                                                Information
                                                            </MenuItem>
                                                            <MenuItem
                                                                sx={{
                                                                    fontSize:
                                                                        "14px",
                                                                    fontFamily:
                                                                        "Nunito Bold",
                                                                    marginTop:
                                                                        "2px",
                                                                }}
                                                                onClick={() =>
                                                                    openPopupFun(
                                                                        "selectTemplate"
                                                                    )
                                                                }
                                                            >
                                                                Change in Design
                                                            </MenuItem>
                                                        </Menu>
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
