import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

import { Link } from "react-router-dom";
import { encryptData } from "../../../../utils/encryption";
import Status from "../../../Common/Status";
import Toggle from "../../../Common/Input/Toggle";
import { Tooltip } from "@mui/material";
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { copyToClipboard, showToastMessage } from "../../../../utils/helpers";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import Avatar from '@mui/material/Avatar';
import viewIcon from '../../../../assets/icons/ListingIcons/viewIcon.svg'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface BasicTableProps {
    cols: any;
    data: any;
    handleToggleChange: any;
    onRowDeleteClick: any
}

const width = window.innerWidth;

const useStyles = makeStyles(() => ({
    root: {
        "& td ": {
            color: "#141C4C",
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

const CardsTable = ({ cols, data, handleToggleChange, onRowDeleteClick, }: BasicTableProps) => {
    const classes = useStyles();
    const [openElem, setOpenElem] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const [shareParams, setShareParams] = useState({
        qr_image: "",
    });
    const handleClick = (elem: any) => (event: any) => {
        setAnchorEl(event.currentTarget);
        setOpenElem(elem);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenElem(null);
        setOpen(false);
    };

    const onRowDelete = (item: any) => {
        onRowDeleteClick(item)
        handleClose()
    };

    return (
        <TableContainer
            elevation={0}
            component={Paper}
            sx={{
                borderRadius: "0.5rem",
                backgroundColor: "white",
                alignItems: "center",
            }}
        >
            <Table
                sx={{
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                    },
                    minWidth: 650,
                    border: "1px solid #E7E8ED",
                    borderCollapse: "separate",
                    borderSpacing: width < 768 ? "0px 3px" : "0px 20px",
                    px: "24px",
                    borderRadius: "8px",
                    "& .css-zvlqj6-MuiTableCell-root": {
                        padding: 0,
                    },
                    "& .MuiTableCell-head": {
                        padding: 0,
                    },
                }}
                className={classes.root}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        {cols.map((header: any) => (
                            <TableCell
                                align="center"
                                sx={{ color: "#5B6082", fontSize: "0.8rem" }}
                            >
                                {header.title}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((item: any, index: number) => (
                        <TableRow
                            sx={{
                                height: "16px",
                                backgroundColor: "#F1F4F8",
                                color: "#141C4C",
                            }}
                            className={classes.tr}
                        >
                            <TableCell align="center">{item.id ?? '-'}</TableCell>
                            <TableCell align="center">
                                <div>
                                    <Avatar className="w-[44px] h-[44px]" alt="employee_image" src={item.image} />
                                </div>

                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.firstName}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.lastName}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.phone ?? '-'}
                            </TableCell>


                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.email || "NA"}
                            </TableCell>


                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.designation || "NA"}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                 {item.department || "NA"}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                 {item.location || "NA"}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                <Toggle
                                    name=""
                                    ischecked={true}
                                    handleCheck={(e: any) => {
                                        handleToggleChange(e, item);
                                    }}
                                />
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ padding: "0px", fontSize: "0.8rem" }}
                            >
                                <div className="flex justify-center items-center gap-2">
                                    <div>
                                        <Tooltip title="View Employee">
                                            <Link to={`/admin/employees/view/${item.id}`}>
                                                <img src={viewIcon} alt="viewIcon" className="w-[24px] h-[24px] object-fill  cursor-pointer" />
                                            </Link>
                                        </Tooltip>
                                    </div>

                                    {/* <Link
                                        to={`/admin/employees/edit/${encryptData(
                                            item.id
                                        )}`}
                                        className="flex justify-center"
                                    >
                                        <Tooltip title="Edit Employee">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.492 2.78906H7.753C4.678 2.78906 2.75 4.96606 2.75 8.04806V16.3621C2.75 19.4441 4.669 21.6211 7.753 21.6211H16.577C19.662 21.6211 21.581 19.4441 21.581 16.3621V12.3341" stroke="#FF8059" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.82666 10.9205L16.2997 3.4475C17.2307 2.5175 18.7397 2.5175 19.6707 3.4475L20.8877 4.6645C21.8187 5.5955 21.8187 7.1055 20.8877 8.0355L13.3787 15.5445C12.9717 15.9515 12.4197 16.1805 11.8437 16.1805H8.09766L8.19166 12.4005C8.20566 11.8445 8.43266 11.3145 8.82666 10.9205Z" stroke="#FF8059" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M15.1641 4.60156L19.7301 9.16756" stroke="#FF8059" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                        </Tooltip>
                                    </Link> */}

                                    {/* <div key={index}>
                                        <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls={"long-menu" + index}
                                            aria-haspopup="true"
                                            onClick={handleClick(index)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id={"long-menu" + index}
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={openElem === index}
                                            onClose={handleClose}
                                        >
                                            <MenuItem
                                                onClick={() =>
                                                    onRowDelete(item)
                                                }
                                            >
                                                Delete Employee
                                            </MenuItem>
                                        </Menu>
                                    </div> */}

                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Scan the QR"}</DialogTitle>
                <DialogContent>
                    <img src={shareParams.qr_image} />
                </DialogContent>
            </Dialog>
        </TableContainer>
    );
};

export default CardsTable;
