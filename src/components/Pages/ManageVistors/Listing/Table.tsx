import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

import { Link, useNavigate } from "react-router-dom";
import { encryptData } from "../../../../utils/encryption";
import Status from "../../../Common/Status";
import Toggle from "../../../Common/Input/Toggle";
import { Avatar, Tooltip } from "@mui/material";
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

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ScheduleIcon = ({ onClick }: any) => {
    return (
        <IconButton>
            <Tooltip title="Schedule">
                <div
                    onClick={onClick}
                    className="cursor-pointer w-[24px] h-[24px] object-contain"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.0918 9.40445H20.9157"
                            stroke="#FF8059"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M16.4429 13.3097H16.4522"
                            stroke="#FF8059"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M12.0054 13.3097H12.0147"
                            stroke="#FF8059"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M7.55818 13.3097H7.56744"
                            stroke="#FF8059"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M16.4429 17.1964H16.4522"
                            stroke="#FF8059"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M12.0054 17.1964H12.0147"
                            stroke="#FF8059"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M7.55818 17.1964H7.56744"
                            stroke="#FF8059"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M16.0433 2V5.29078"
                            stroke="#FF8059"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M7.96515 2V5.29078"
                            stroke="#FF8059"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.2383 3.5791H7.77096C4.83427 3.5791 3 5.21504 3 8.22213V17.2718C3 20.3261 4.83427 21.9999 7.77096 21.9999H16.229C19.175 21.9999 21 20.3545 21 17.3474V8.22213C21.0092 5.21504 19.1842 3.5791 16.2383 3.5791Z"
                            stroke="#FF8059"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </Tooltip>
        </IconButton>
    );
};

const RescheduleIcon = ({ onClick }: any) => {
    return (
        <IconButton>
            <Tooltip title="Reschedule">
                <div
                    onClick={onClick}
                    className="cursor-pointer w-[24px] h-[24px] object-contain"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.0918 9.40445H20.9157"
                            stroke="#ffbf00"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M16.4429 13.3097H16.4522"
                            stroke="#ffbf00"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M12.0054 13.3097H12.0147"
                            stroke="#ffbf00"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M7.55818 13.3097H7.56744"
                            stroke="#ffbf00"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M16.4429 17.1964H16.4522"
                            stroke="#ffbf00"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M12.0054 17.1964H12.0147"
                            stroke="#ffbf00"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M7.55818 17.1964H7.56744"
                            stroke="#ffbf00"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M16.0433 2V5.29078"
                            stroke="#ffbf00"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M7.96515 2V5.29078"
                            stroke="#ffbf00"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.2383 3.5791H7.77096C4.83427 3.5791 3 5.21504 3 8.22213V17.2718C3 20.3261 4.83427 21.9999 7.77096 21.9999H16.229C19.175 21.9999 21 20.3545 21 17.3474V8.22213C21.0092 5.21504 19.1842 3.5791 16.2383 3.5791Z"
                            stroke="#ffbf00"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </Tooltip>
        </IconButton>
    );
};

const Separator = () => {
    return (
        <div className="px-1">
            <svg
                width="1"
                height="14"
                viewBox="0 0 1 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line
                    x1="0.5"
                    y1="1"
                    x2="0.499999"
                    y2="13"
                    stroke="#E1E3E7"
                    stroke-linecap="round"
                />
            </svg>
        </div>
    );
};

const ViewIcon = ({ onClick }: any) => {
    return (
        <Tooltip title="View Visitor">
            <IconButton onClick={onClick} className="cursor-pointer">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.1609 12.0536C15.1609 13.7996 13.7449 15.2146 11.9989 15.2146C10.2529 15.2146 8.83789 13.7996 8.83789 12.0536C8.83789 10.3066 10.2529 8.8916 11.9989 8.8916C13.7449 8.8916 15.1609 10.3066 15.1609 12.0536Z"
                        stroke="#40C79E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.998 19.355C15.806 19.355 19.289 16.617 21.25 12.053C19.289 7.48898 15.806 4.75098 11.998 4.75098H12.002C8.194 4.75098 4.711 7.48898 2.75 12.053C4.711 16.617 8.194 19.355 12.002 19.355H11.998Z"
                        stroke="#40C79E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </IconButton>
        </Tooltip>
    );
};

const EditIconSvg = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M11.492 2.78906H7.753C4.678 2.78906 2.75 4.96606 2.75 8.04806V16.3621C2.75 19.4441 4.669 21.6211 7.753 21.6211H16.577C19.662 21.6211 21.581 19.4441 21.581 16.3621V12.3341"
            stroke="#FF8059"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.82666 10.9205L16.2997 3.4475C17.2307 2.5175 18.7397 2.5175 19.6707 3.4475L20.8877 4.6645C21.8187 5.5955 21.8187 7.1055 20.8877 8.0355L13.3787 15.5445C12.9717 15.9515 12.4197 16.1805 11.8437 16.1805H8.09766L8.19166 12.4005C8.20566 11.8445 8.43266 11.3145 8.82666 10.9205Z"
            stroke="#FF8059"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M15.1641 4.60156L19.7301 9.16756"
            stroke="#FF8059"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

const CancelInvitation = ({ onClick }: any) => {
    return (
        <Tooltip title="Cancel Invitation">
            <IconButton onClick={onClick} className="cursor-pointer">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M14.3955 9.59473L9.60352 14.3867"
                        stroke="#F14D4D"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M14.3956 14.3898L9.59961 9.59277"
                        stroke="#F14D4D"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.635 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z"
                        stroke="#F14D4D"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </IconButton>
        </Tooltip>
    );
};
interface BasicTableProps {
    cols: any;
    data: any;
    editSrModalOpen: any;
    onRowDeleteClick: any;
    handleToggleChange: any;
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

const VisitorTable = ({
    cols,
    data,
    onRowDeleteClick,
    editSrModalOpen,
}: BasicTableProps) => {
    const navigate = useNavigate();
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
        onRowDeleteClick(item);
        handleClose();
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
                            <TableCell align="center">
                                {/* <img
                                    width={50}
                                    className="m-auto"
                                    src={item.image}
                                /> */}
                                <Avatar src={item.image} />
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.name}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                <p> {item.phone}</p>
                                <p> {item.email}</p>
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.purpose || "N/A"}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.come_from || "N/A"}
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                <div className="flex flex-col justify-center items-center text-center">
                                    <p> {item?.interviewee_name ?? "-"}</p>
                                </div>
                            </TableCell>

                            {/* <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item?.location ?? '-'}
                            </TableCell> */}

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.is_cancelled !== 1 ? (
                                    <div className="flex justify-center items-center">
                                        {item.status == 1
                                            ? "Permanently effective"
                                            : "Effective within the validity period"}
                                    </div>
                                ) : (
                                    "Cancelled"
                                )}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ padding: "0px", fontSize: "0.8rem" }}
                            >
                                <div className="flex justify-center items-center">
                                    {/* view visitor information */}

                                    <ViewIcon
                                        onClick={() =>
                                            navigate(
                                                `/admin/manage-visitors/view-visitor/${item.id}`
                                            )
                                        }
                                    />

                                    {item.is_cancelled !== 1 && (
                                        <>
                                            <Separator />
                                            <div
                                                // onClick={() => editAvModalOpen(item.id)}
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/manage-visitors/edit/${item.id}`
                                                    )
                                                }
                                                className="flex justify-center"
                                            >
                                                <Tooltip title="Edit Visitor">
                                                    <IconButton>
                                                        <EditIconSvg />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </>
                                    )}

                                    {/* schedule or reschedule */}
                                    {/* {
                                        false ?
                                            <ScheduleIcon onClick={editSrModalOpen} /> :
                                            <RescheduleIcon onClick={editSrModalOpen} />
                                    } */}

                                    {/* delete visitor */}
                                    {item?.is_cancelled !== 1 && (
                                        <>
                                            <Separator />
                                            <div key={index}>
                                                <Tooltip title="cancel invitation">
                                                    <CancelInvitation
                                                        onClick={() =>
                                                            onRowDelete(item)
                                                        }
                                                    />
                                                </Tooltip>
                                            </div>
                                        </>
                                    )}
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

export default VisitorTable;
