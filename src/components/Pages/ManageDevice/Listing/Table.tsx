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
import { ListItemIcon, ListItemText, Tooltip } from "@mui/material";
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

import editIcon from "../../../../assets/icons/ListingIcons/editIcon.svg";
import deleteIcon from "../../../../assets/icons/deleteIcon.svg";

import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ConfirmDialog from "./Confirmation";
import axiosInstance from "../../../../utils/axios";

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
    onRowEdit: any;
    timeModalOpen: any;
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

const CardsTable = ({ cols, data, onRowEdit, timeModalOpen }: BasicTableProps) => {
    const classes = useStyles();
    const [dialogMeta, setDialogMeta] = useState({
        open: false,
        title: "",
        sub_title: "",
        selected_item: '',
        type: "",
    } as any);

    const [selectedItem, setSelectedItem] = useState("" as any);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleReboot = (item: any) => {
        if (!item.is_online) {
            showToastMessage("Selected device must be online", "error");
            return;
        }
        setDialogMeta({
            open: true,
            title: "Are you sure you want to reboot the selected device?",
            sub_title: "",
            selected_item: item,
            type: "reboot",
        });
    };
    const handleReset = (item: any) => {
        if (!item.is_online) {
            showToastMessage("Selected device must be online", "error");
            return;
        }

        setDialogMeta({
            open: true,
            title: "Are you sure you want to reset the selected device?",
            sub_title: `this action will Delete all the identification data, registration photos, on-site photos, personnel, 
            characteristics and other data on the device, and clear all the databases`,
            selected_item: item,
            type: "reset",
        });
    };

    const handleSetTime = (item: any) => {

        if (!item.is_online) {
            showToastMessage("Selected device must be online", "error");
            return;
        }
        else {
            timeModalOpen(item?.id)
        }

        // console.log(item);

        // setSelectedItem(item);

        // axiosInstance
        //     .put(`/admin/manage-device/update-time/${item.id}`, { timestamp: Date.now() })
        //     .then((response) => {
        //         showToastMessage(response.data.data.message, 'success')

        //     })
        //     .catch((err) => {
        //         const { errors, message } = err.response.data;
        //         const errorMsg = errors[Object.keys(errors)[0]] || message;
        //         showToastMessage(typeof errorMsg == 'string' ? errorMsg : errorMsg?.message, 'error')
        //     })
    };

    const handleOpenDoor = (item: any) => {
        if (!item.is_online) {
            showToastMessage("Selected device must be online", "error");
            return;
        }

        axiosInstance
            .put(`/admin/manage-device/open-door/${item.id}`, {})
            .then((response) => {
                showToastMessage(response.data.data.message, 'success')

            })
            .catch((err) => {
                const { errors, message } = err.response.data;
                const errorMsg = errors[Object.keys(errors)[0]] || message;
                showToastMessage(typeof errorMsg == 'string' ? errorMsg : errorMsg?.message, 'error')

            })
    };

    const onConfirmDialogCancel = () => {
        setDialogMeta({
            open: false,
            title: "",
            sub_title: "",
            selected_item: "",
            type: "",
        });
    };

    const onConfirmDeviceSubmit = () => {
        setDialogMeta({ ...dialogMeta, open: false })

        if (dialogMeta.type === "reboot") {
            axiosInstance
                .put(`/admin/manage-device/reboot/${dialogMeta.selected_item.id}`, {})
                .then((response) => {
                    showToastMessage(response.data.data.message, 'success')

                })
                .catch((err) => {
                    const { errors, message } = err.response.data;
                    const errorMsg = errors[Object.keys(errors)[0]] || message;
                    showToastMessage(typeof errorMsg == 'string' ? errorMsg : errorMsg?.message, 'error')

                })

        } else {
            axiosInstance
                .put(`/admin/manage-device/reset/${dialogMeta.selected_item.id}`, {})
                .then((response) => {
                    showToastMessage(response.data.data.message, 'success')

                })
                .catch((err) => {
                    const { errors, message } = err.response.data;
                    const errorMsg = errors[Object.keys(errors)[0]] || message;
                    showToastMessage(typeof errorMsg == 'string' ? errorMsg : errorMsg?.message, 'error')

                })

        }

    };


    const navigate = useNavigate();
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
                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.device_key}
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
                                {item.device_version || "N/A"}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.person_count}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.face_count}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.device_ip || "N/A"}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.device_access_type}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                {item.last_activity
                                    ? moment(item.last_activity).format(
                                        "DD/M/yy hh:mm A"
                                    )
                                    : "N/A"}
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                <div className="flex justify-center items-center">
                                    <Status>
                                        {item?.is_online ? "Online" : "Offline"}
                                    </Status>
                                </div>
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ padding: "0px", fontSize: "0.8rem" }}
                            >
                                <div className="flex justify-center items-center">
                                    <Link to={`/admin/manage-devices/edit/${item.id}`} state={item}>
                                        <Tooltip
                                            // onClick={() =>
                                            //     navigate(`/admin/manage-devices/edit/1`, {
                                            //         state:
                                            //         {
                                            //             name: item.name,
                                            //             device_key: item.device_key,
                                            //             device_ip: item.device_ip
                                            //         }
                                            //     })
                                            // }
                                            title="Edit"
                                        >
                                            <IconButton>
                                                <img
                                                    src={editIcon}
                                                    alt="editIcon"
                                                    className="cursor-pointer w-[24px] h-[24px] object-contain"
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>

                                    <Separator />
                                    {/* other operations */}
                                    <div className="relative group">
                                        <IconButton
                                            id="basic-button"
                                            aria-controls={
                                                open ? "basic-menu" : undefined
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={
                                                open ? "true" : undefined
                                            }
                                            onClick={handleClick}
                                        >
                                            <MoreVertIcon className="cursor-pointer" />
                                        </IconButton>

                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                "aria-labelledby":
                                                    "basic-button",
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <PauseCircleOutlineOutlinedIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    onClick={() =>
                                                        handleReboot(item)
                                                    }
                                                >
                                                    Reboot
                                                </ListItemText>
                                            </MenuItem>

                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <RestartAltOutlinedIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    onClick={() =>
                                                        handleReset(item)
                                                    }
                                                >
                                                    Reset
                                                </ListItemText>
                                            </MenuItem>

                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <AccessTimeOutlinedIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    onClick={() =>
                                                        handleSetTime(item)
                                                    }
                                                >
                                                    Set Time
                                                </ListItemText>
                                            </MenuItem>

                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <LockOpenOutlinedIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    onClick={() =>
                                                        handleOpenDoor(item)
                                                    }
                                                >
                                                    Open Door
                                                </ListItemText>
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ConfirmDialog
                handleConfirm={onConfirmDeviceSubmit}
                handleDialogClose={onConfirmDialogCancel}
                open={dialogMeta.open}
                title={dialogMeta.title}
                sub_title={dialogMeta.sub_title}
                isLoading={false}
            />
        </TableContainer>
    );
};

export default CardsTable;
