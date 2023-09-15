import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import editIcon from "../../../../../assets/icons/ListingIcons/editIcon.svg";
import Status from "../../../../Common/Status";
import { Avatar, Tooltip } from "@mui/material";
import moment from "moment";

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
    onRowDeleteClick: any;
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

const LogsTable = ({ cols, data, onRowDeleteClick }: BasicTableProps) => {
    const classes = useStyles();

    const onRowDelete = (item: any) => {
        onRowDeleteClick(item);
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
                                <img
                                    width={50}
                                    className="m-auto"
                                    src={"data:image/jpeg;base64," + item.image}
                                />
                            </TableCell>
                            <TableCell align="center">
                                {item.person_name || "N/A"}
                            </TableCell>

                            <TableCell align="center">
                                {item.access_type}
                            </TableCell>

                            <TableCell align="center">
                                {item.person_id &&
                                    item.person_id != "STRANGERBABY"
                                    ? item.person_id
                                    : "STRANGE"}
                            </TableCell>

                            <TableCell align="center">
                                {item.device && item.device.name}
                            </TableCell>

                            <TableCell align="center">
                                {item.entry_type}
                            </TableCell>

                            <TableCell align="center">
                                {moment(item.created_at).format(
                                    "DD/M/yy hh:mm A"
                                ) ?? "-"}
                            </TableCell>

                            <TableCell align="center">
                                <div className="flex justify-center items-center">
                                    <Tooltip title="Delete Log">
                                        <svg
                                            onClick={() => onRowDelete(item)}
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M19.3238 9.46875C19.3238 9.46875 18.7808 16.2037 18.4658 19.0407C18.3158 20.3957 17.4788 21.1898 16.1078 21.2148C13.4988 21.2618 10.8868 21.2648 8.27881 21.2098C6.95981 21.1828 6.13681 20.3788 5.98981 19.0478C5.67281 16.1858 5.13281 9.46875 5.13281 9.46875"
                                                stroke="#F14D4D"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M20.708 6.23828H3.75"
                                                stroke="#F14D4D"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M17.4406 6.239C16.6556 6.239 15.9796 5.684 15.8256 4.915L15.5826 3.699C15.4326 3.138 14.9246 2.75 14.3456 2.75H10.1126C9.53358 2.75 9.02558 3.138 8.87558 3.699L8.63258 4.915C8.47858 5.684 7.80258 6.239 7.01758 6.239"
                                                stroke="#F14D4D"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LogsTable;
