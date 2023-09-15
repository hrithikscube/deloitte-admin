import Validator from "validatorjs";
import { useEffect } from 'react';
import { Box, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import { showToastMessage } from "../../../../utils/helpers";
import { SelectWithName } from "../../../Common/Input/SelectWithName";
import CustomButton from "../../../Common/CustomButton";
import TextArea from "../../../Common/Input/TextArea";
import { Input } from "../../../Common/Input/Input";

import individual from './assets/individual.svg'
import deleteRequest from './assets/deleteRequest.svg'
import newRecord from './assets/newRecord.svg'
import downloadXLS from './assets/downloadXLS.svg'

import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddNewRecordModal from "./AddNewRecordModal";
import FileCheckModal from "./FileCheckModal";
import FileReplacementModal from "./FileReplacement";



const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fcfcfc",
};

const FourChoiceModal = ({ id, open, handleClose }: any) => {

    const navigate = useNavigate()
    
    // to download template
    const downloadTemplate = () => {
        console.log(';ddd')
        const linkSource = `https://scube-users.s3.ap-south-1.amazonaws.com/template.xlsx`;
        const downloadLink = document.createElement("a");
        const fileName = `template.xlsx`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        showToastMessage('Template file successfully downloaded!', 'success')
    }

    // menu cards : add individual employee, add new record, delete & replace record, download format
    const options = [
        {
            title: 'Add Individual Employee',
            image: individual,
            clickAction: () => navigate("/admin/employees/create"),
        },
        {
            title: 'Add New Record',
            image: newRecord,
            clickAction: () => nrModalOpen(),
        },
        {
            title: 'Delete & Replace Record',
            image: deleteRequest,
            clickAction: () => deleteModalOpen(),
        },
        {
            title: 'Download XLS Template',
            image: downloadXLS,
            clickAction: () => downloadTemplate(),
        },
    ]

    const initialStates = {
        device_id: '',
        location: '',
        type: '',
        access_status: '',
        group: '',
    }

    const rules = {
    }

    const [params, setParams] = useState(initialStates) as any
    // console.log('params:', params)
    const [errors, setErrors] = useState(initialStates) as any

    const updateParams = (records: any) => {
        const newParams = JSON.parse(JSON.stringify(params))
        Object.keys(records).forEach((key) => (newParams[records[key].name] = records[key].value))
        setParams(newParams)
    }

    const onCloseClick = () => {
        setParams(initialStates)
        setErrors(initialStates)
        handleClose()
    };

    const [nrModal, setNrModal] = useState(false)

    const nrModalOpen = () => {
        onCloseClick()
        setNrModal(true)
    }

    const nrModalClose = () => {
        // onCloseClick()
        setNrModal(false)
    }

    const [deleteModal, setDeleteModal] = useState(false)

    const deleteModalOpen = () => {
        onCloseClick()
        setDeleteModal(true)
    }

    const deleteModalClose = () => {
        setDeleteModal(false)
    }

    return (
        <div className="">
            <Modal
                open={open}
                onClose={onCloseClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableEnforceFocus
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box
                    sx={style}
                    style={{
                        // textAlign: "center",
                        borderRadius: "8px",
                        outline: "none",
                    }}
                >
                    <div className="lg:p-5 md:p-5 p-4 flex flex-col lg:w-[671px] md:w-[671px] w-[500px] m-auto">
                        <div className="flex lg:items-center justify-between">
                            <div>
                                <h1 className="text-lg font-nunitoBold text-[#2B2C34]">Add Employee</h1>

                            </div>
                            <div onClick={handleClose} className="cursor-pointer">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Iconly/Light/Close Square">
                                        <g id="Close Square">
                                            <path id="Stroke 1" d="M14.3936 9.59375L9.60156 14.3857" stroke="#2B2C34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path id="Stroke 2" d="M14.3976 14.3907L9.60156 9.59375" stroke="#2B2C34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path id="Stroke 3" fill-rule="evenodd" clip-rule="evenodd" d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.635 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z" stroke="#2B2C34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5 p-5 mt-5">

                            {
                                options.map((item: any) => (
                                    <div onClick={item.clickAction} className="flex flex-col justify-center items-center p-5 border border-[#E1E3E7] rounded-lg cursor-pointer hover:bg-[#f2f2f2]">
                                        <img src={item.image} alt="individual" />
                                        <div className="flex items-center gap-2 mt-3">

                                            <h2 className="text-sm font-nunitoBold">{item.title}</h2>

                                            <Tooltip title={String(item.title).toLowerCase()}>
                                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.61337 1.33203H11.3934C13.6534 1.33203 15.1667 2.9187 15.1667 5.2787V10.726C15.1667 13.0794 13.6534 14.6654 11.3934 14.6654H5.61337C3.35337 14.6654 1.83337 13.0794 1.83337 10.726V5.2787C1.83337 2.9187 3.35337 1.33203 5.61337 1.33203ZM8.49395 6.03937C8.18061 6.03937 7.92061 5.7787 7.92061 5.45937C7.92061 5.1327 8.18061 4.8727 8.50728 4.8727C8.82728 4.8727 9.08728 5.1327 9.08728 5.45937C9.08728 5.7787 8.82728 6.03937 8.49395 6.03937ZM9.07947 10.5194C9.07947 10.8394 8.81947 11.0994 8.4928 11.0994C8.1728 11.0994 7.9128 10.8394 7.9128 10.5194V7.5727C7.9128 7.25203 8.1728 6.98603 8.4928 6.98603C8.81947 6.98603 9.07947 7.25203 9.07947 7.5727V10.5194Z" fill="#2B2C34" />
                                                </svg>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            }


                        </div>

                    </div>
                </Box>
            </Modal>
            {/* Add new record modal */}
            <AddNewRecordModal open={nrModal} handleClose={nrModalClose} handleOpen={nrModalOpen} operationType={''} />

            {/* Delete & replace flow */}
            <FileReplacementModal status="delete_replace" open={deleteModal} handleClose={deleteModalClose} />

        </div>
    );
};

export default FourChoiceModal;