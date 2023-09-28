import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import NotFound from "../../../../../assets/images/NotFound.svg";

import { useDispatch } from "react-redux";
import { Avatar, CircularProgress } from "@mui/material";

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
const ActivityLogsTable = ({ id, isLoading, dataList }: any) => {
    console.log(dataList, "dataList at logs table");
    const dispatch = useDispatch();

    const classes = useStyles();
    const [memberId, setMemberId] = useState();

    const headings = ["Activity", "Log Details", "Date & Time"];

    return (
        <>
            <TableContainer component={Paper} elevation={0}>
                {isLoading ? (
                    <div className="w-full h-80 flex justify-center items-center">
                        <CircularProgress />
                        <span className="text-3xl">Loading...</span>
                    </div>
                ) : dataList.length > 0 ? (
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
                                <TableCell
                                    align="left"
                                    sx={{
                                        color: "#5B6082",
                                        fontSize: "0.8rem",
                                    }}
                                >
                                    <span>Activity</span>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        color: "#5B6082",
                                        fontSize: "0.8rem",
                                    }}
                                >
                                    <span>Log Details</span>
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        color: "#5B6082",
                                        fontSize: "0.8rem",
                                    }}
                                >
                                    <span>Date & Time</span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataList?.map((item: any, index: number) => (
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
                                        }}
                                    >
                                        {item.activity ?? "-"}
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        sx={{
                                            fontSize: "0.8rem",
                                            color: "#141C4C",
                                        }}
                                    >
                                        <div className="flex flex-col justify-start items-start gap-1">
                                            <p className="font-bold">
                                                Location Changed
                                            </p>
                                            <p>Change Description:</p>
                                            <div className="bg-white p-3 rounded-lg w-full">
                                                <p>from - Bangalore</p>
                                                <p>to - Mumbai</p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        sx={{
                                            fontSize: "0.8rem",
                                            color: "#141C4C",
                                        }}
                                    >
                                        {moment(item.created_at).format(
                                            "YYYY-MM-DD HH:mm:ss"
                                        ) ?? "-"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex justify-center items-center flex-col gap-4 mt-6">
                        <img src={NotFound} alt="" width="100px" />
                        <p className="text-[18px] font-nunitoBold">
                            No Results found !!
                        </p>
                    </div>
                )}
            </TableContainer>
        </>
    );
};
export default ActivityLogsTable;
