import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Button, ListItemIcon, ListItemText } from "@mui/material";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
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

import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


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

const Actions = ({ onClick }: any) => {
    return (
        // <Tooltip title="View Card">
        <div className="bg-white rounded">
            <IconButton onClick={onClick} className="cursor-pointer">
                <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 0C8.60444 0 8.21776 0.117298 7.88886 0.337061C7.55996 0.556824 7.30362 0.869181 7.15224 1.23463C7.00087 1.60009 6.96126 2.00222 7.03843 2.39018C7.1156 2.77814 7.30608 3.13451 7.58579 3.41421C7.86549 3.69392 8.22186 3.8844 8.60982 3.96157C8.99778 4.03874 9.39992 3.99913 9.76537 3.84776C10.1308 3.69638 10.4432 3.44004 10.6629 3.11114C10.8827 2.78224 11 2.39556 11 2C11 1.46957 10.7893 0.96086 10.4142 0.585787C10.0391 0.210714 9.53043 0 9 0ZM2 0C1.60444 0 1.21776 0.117298 0.88886 0.337061C0.559962 0.556824 0.303617 0.869181 0.152242 1.23463C0.000866562 1.60009 -0.0387401 2.00222 0.0384303 2.39018C0.115601 2.77814 0.306082 3.13451 0.585787 3.41421C0.865492 3.69392 1.22186 3.8844 1.60982 3.96157C1.99778 4.03874 2.39992 3.99913 2.76537 3.84776C3.13082 3.69638 3.44318 3.44004 3.66294 3.11114C3.8827 2.78224 4 2.39556 4 2C4 1.46957 3.78929 0.96086 3.41421 0.585787C3.03914 0.210714 2.53043 0 2 0ZM16 0C15.6044 0 15.2178 0.117298 14.8889 0.337061C14.56 0.556824 14.3036 0.869181 14.1522 1.23463C14.0009 1.60009 13.9613 2.00222 14.0384 2.39018C14.1156 2.77814 14.3061 3.13451 14.5858 3.41421C14.8655 3.69392 15.2219 3.8844 15.6098 3.96157C15.9978 4.03874 16.3999 3.99913 16.7654 3.84776C17.1308 3.69638 17.4432 3.44004 17.6629 3.11114C17.8827 2.78224 18 2.39556 18 2C18 1.46957 17.7893 0.96086 17.4142 0.585787C17.0391 0.210714 16.5304 0 16 0Z" fill="#27282D" fill-opacity="0.7" />
                </svg>
            </IconButton>
        </div>
        // </Tooltip>
    );
};

interface BasicTableProps {
    cols: any;
    data: any;
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

const CardsTable = ({
    cols,
    data,
}: BasicTableProps) => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [openElem, setOpenElem] = useState(null);

    const [shareParams, setShareParams] = useState({
        qr_image: "",
    });

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                                <p>{index + 1}</p>
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                <p>dummy_value</p>
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                <p>dummy_value</p>
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                <p>dummy_value</p>

                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                <p>dummy_value</p>

                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                <div className="flex flex-col justify-center items-center text-center">
                                    <p>dummy_value</p>

                                </div>
                            </TableCell>


                            <TableCell
                                align="center"
                                sx={{ fontSize: "0.8rem", color: "#141C4C" }}
                            >
                                <p>dummy_value</p>

                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ padding: "0px", fontSize: "0.8rem" }}
                            >
                                <div className="flex justify-center items-center">
                                    <button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <Actions />
                                    </button>
                                    <Menu
                                        elevation={1}
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem sx={{ fontSize: '14px',fontFamily:'Nunito Bold',marginTop:'2px' }} onClick={handleClose}>View Details</MenuItem>
                                        <MenuItem sx={{ fontSize: '14px',fontFamily:'Nunito Bold',marginTop:'2px' }} onClick={handleClose}>Hold Request</MenuItem>
                                        <MenuItem sx={{ fontSize: '14px',fontFamily:'Nunito Bold',marginTop:'2px' }} onClick={handleClose}>Mark as lost</MenuItem>
                                        <MenuItem sx={{ fontSize: '14px',fontFamily:'Nunito Bold',marginTop:'2px' }} onClick={handleClose}>Prepare for print</MenuItem>

                                    </Menu>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    );
};

export default CardsTable;
