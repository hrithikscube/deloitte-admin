import Validator from "validatorjs";
import { useEffect } from "react";
import { Box, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import { showToastMessage } from "../../../../utils/helpers";
import CustomButton from "../../../Common/CustomButton";
import TextArea from "../../../Common/Input/TextArea";
import { Input } from "../../../Common/Input/Input";
import React from "react";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../../Common/FileUpload";
import FileCheckModal from "./FileCheckModal";
import axiosInstance from "../../../../utils/axios";
import CircularProgress from "@mui/material/CircularProgress";
import Excel from "exceljs";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fcfcfc",
};

const AddNewRecordModal = ({
    id,
    open,
    handleClose,
    handleOpen,
    isUpl,
    operationType
}: any) => {

    const initialStates = {
        xlsx_file: "",
    };

    const [uploadedRecords, setUploadedRecords] = useState('');

    const [params, setParams] = useState(initialStates) as any;
    const [errors, setErrors] = useState(initialStates) as any;
    const [sheetValidationErrors, setSheetValidationErrors] = useState([]) as any;


    const updateParams = (records: any) => {
        const newParams = JSON.parse(JSON.stringify(params));
        Object.keys(records).forEach(
            (key) => (newParams[records[key].name] = records[key].value)
        );
        setParams(newParams);
    };

    const onCloseClick = () => {
        setParams(initialStates);
        setErrors({});
        handleClose();
        setIsUpload(false);
    };

    const handleSubmit = () => {
        if (!uploadedRecords) {
            showToastMessage("Please check form errors!", "error");
            return;
        }
        // call api here
        fileUploadAPI();
    };

    const [isUpload, setIsUpload] = useState(false);

    useEffect(() => {
        setIsUpload(isUpl);
    }, [isUpl]);


    const removeImage = (name: string) => {
        ("");
        updateParams([{ name: name, value: "" }]);
        setErrors({});
    };

    const [fCheckModal, setfCheckModal] = useState(false);

    const fCheckModalOpen = () => {
        onCloseClick();
        setfCheckModal(true);
    };

    const fCheckModalClose = () => {
        setfCheckModal(false);
    };

    const backHere = () => {
        // close file check modal
        fCheckModalClose();
        // open modal containing file upload component
        setIsUpload(true);
        handleOpen();
    };

    const handleResetState = () => {
        removeImage("xlsx_file")
        setUploadedRecords('')
        setIsProcessing(false)
        fCheckModalClose();
        handleOpen();
    }

    const handleSkip = () =>{
        fCheckModalClose();
        handleSubmit();
        setIsProcessing(false)
        setIsUpload(true)
        handleOpen();
    }

    const [status, setStatus] = useState("");

    const fileUploadAPI = () => {
        console.log(operationType,'operationType')

        setIsLoading(true)
        if(operationType && operationType ==='delete_replace') {
            axiosInstance
            .post("/admin/employees/upload-sheet-replace-data", uploadedRecords)
            .then((response) => {
                setIsLoading(false)
                setIsProcessing(false)
                showToastMessage("File uploaded success", "success");
                setStatus("success");
                fCheckModalOpen();
            })
            .catch((error) => {
                setIsLoading(false)
                setIsProcessing(false)
                const { errors, message } = error.response.data;
                const errorMsg = errors[Object.keys(errors)[0]] || message;
                showToastMessage(errorMsg, "error");
            });
        } else {
            axiosInstance
            .post("/admin/employees/upload-sheet", uploadedRecords)
            .then((response) => {
                setIsLoading(false)
                setIsProcessing(false)
                showToastMessage("File uploaded success", "success");
                setStatus("success");
                fCheckModalOpen();
            })
            .catch((error) => {
                setIsLoading(false)
                setIsProcessing(false)
                const { errors, message } = error.response.data;
                const errorMsg = errors[Object.keys(errors)[0]] || message;
                showToastMessage(errorMsg, "error");
            });
        }
       
    };



    const handleUploadAndProcessFile = (e: any) => {
        setIsProcessing(true);
        const file = e?.file;
        const wb = new Excel.Workbook() as any;
        const reader = new FileReader() as any;

        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            const buffer = reader.result as any;

            wb.xlsx.load(buffer).then((workbook: any) => {
                let temp = [] as any;
                const worksheet = workbook.worksheets[0];
                let jsonData: any = [];
                workbook.eachSheet((sheet: any, id: any) => {
                    let firstRow = sheet.getRow(1);
                    if (!firstRow.cellCount) return;
                    let keys: any = firstRow.values;
                    sheet.eachRow((row: any, rowNumber: number) => {
                        if (rowNumber == 1) return;
                        let values = row.values;
                        let obj: any = {};
                        for (let i = 1; i < keys.length; i++) {
                            obj[keys[i].toLowerCase()] = values[i];
                        }
                        jsonData.push(obj);
                    });
                });

                const duplicateEmails: any = [];
                const duplicateIDs: any = [];
                for (let i = 0; i < jsonData.length; i++) {
                    const currentRecord: any = jsonData[i];

                    for (let j = i + 1; j < jsonData.length; j++) {
                        const otherRecord = jsonData[j];

                        if (currentRecord.employee_email === otherRecord.employee_email) {
                            duplicateEmails.push({
                                message: "Duplicate Email found",
                                rowId: j+1,
                                email: currentRecord.employee_email,
                            });
                        }
                        if (currentRecord.employee_id === otherRecord.employee_id) {
                            duplicateIDs.push({
                                message: "Duplicate Employee Id found",
                                rowId: j+1,
                                email: currentRecord.employee_id,
                            });
                        }
                    }
                }

              

                for (const image of worksheet.getImages()) {
                    const img: any = workbook.model.media.find(
                        (m: any) => m.index === image.imageId
                    );
                    if (img && jsonData[image.range.tl.nativeRow - 1]) {
                        jsonData[image.range.tl.nativeRow - 1]["image"] =
                            img.buffer.toString("base64");
                    }
                }
                setUploadedRecords(jsonData)

                if (duplicateEmails.length || duplicateIDs.length) {
                    console.log(duplicateEmails, duplicateIDs);
                    let errors = [...duplicateEmails,...duplicateIDs]
                    setSheetValidationErrors(errors)
                    setStatus("duplicate");
                    fCheckModalOpen();
                    return
                }

                // console.log('done processing the file')
                setIsProcessing(false);
            });
        };
    };

    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // to download template
    const downloadTemplate = () => {
        const linkSource = `https://scube-users.s3.ap-south-1.amazonaws.com/EMPLOYEE_SHEET_TEMPLATE.xlsx`;
        const downloadLink = document.createElement("a");
        const fileName = `template.xlsx`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        showToastMessage("Template file successfully downloaded!", "success");
    };
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
                                <h1 className="text-lg font-nunitoBold text-[#2B2C34]">
                                    {isUpload
                                        ? "Add New Record"
                                        : "Upload to the Admin Panel"}
                                </h1>
                            </div>
                            <div
                                onClick={handleClose}
                                className="cursor-pointer"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="Iconly/Light/Close Square">
                                        <g id="Close Square">
                                            <path
                                                id="Stroke 1"
                                                d="M14.3936 9.59375L9.60156 14.3857"
                                                stroke="#2B2C34"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                id="Stroke 2"
                                                d="M14.3976 14.3907L9.60156 9.59375"
                                                stroke="#2B2C34"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                id="Stroke 3"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.635 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z"
                                                stroke="#2B2C34"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            {!isUpload ? (
                                <React.Fragment>
                                    {/* Add new record rules */}

                                    <p className="text-sm font-nunitoMedium text-[#2B2C34] w-[90%]">
                                        To ensure that your data updates are
                                        processed accurately and efficiently, we
                                        recommend following these simple steps:
                                    </p>
                                    {/* Step 1 */}
                                    <div className="p-2 border border-[#E1E3E7] rounded-lg">
                                        <div className="w-full flex flex-col mt-2">
                                            <p className="text-sm font-nunitoBold text-[#2B2C34]">
                                                Step 1: Download the Data Sheet
                                            </p>
                                            <p className="text-sm font-nunitoMedium text-[#767676] mt-1">
                                                Click the "Download Data Sheet"
                                                button below to obtain the
                                                latest version of the data
                                                sheet. This file contains the
                                                most up-to-date template with
                                                all the necessary fields for
                                                your data updates.
                                            </p>
                                        </div>

                                        <div className="flex justify-end items-end mt-2">
                                            <button
                                                className="bg-white w-[212px] h-[47px] text-base rounded-lg text-black border border-[#2B2C34] font-nunitoBold"
                                                onClick={downloadTemplate}
                                            >
                                                Download Data sheet
                                            </button>
                                        </div>
                                    </div>
                                    {/* Step 2 */}
                                    <div className="p-2 border border-[#E1E3E7] rounded-lg">
                                        <div className="w-full flex flex-col mt-2">
                                            <p className="text-sm font-nunitoBold text-[#2B2C34]">
                                                Step 2: Update Data in the File
                                            </p>
                                            <p className="text-sm font-nunitoMedium text-[#767676] mt-1">
                                                Open the downloaded data sheet
                                                using your preferred spreadsheet
                                                software (e.g., Microsoft Excel,
                                                Google Sheets). Here, you can
                                                add, modify, or remove the data
                                                as needed. Please ensure that
                                                all changes are made in
                                                accordance with the{" "}
                                                <span className="text-[#FF8059] underline cursor-pointer">
                                                    provided guidelines
                                                </span>
                                                .
                                            </p>
                                        </div>
                                    </div>
                                    {/* Step 3 */}
                                    <div className="p-2 border border-[#E1E3E7] rounded-lg">
                                        <div className="w-full flex flex-col mt-2">
                                            <p className="text-sm font-nunitoBold text-[#2B2C34]">
                                                Step 3: Save the Updated Data
                                                Sheet
                                            </p>
                                            <p className="text-sm font-nunitoMedium text-[#767676] mt-1">
                                                After making the necessary
                                                changes, save the data sheet to
                                                your computer, ensuring it's
                                                saved in the XLS format.
                                            </p>
                                        </div>
                                    </div>
                                    {/* Step 4 */}
                                    <div className="p-2 border border-[#E1E3E7] rounded-lg">
                                        <div className="w-full flex flex-col mt-2">
                                            <p className="text-sm font-nunitoBold text-[#2B2C34]">
                                                Step 4: Upload to the Admin
                                                Panel
                                            </p>
                                            <p className="text-sm font-nunitoMedium text-[#767676] mt-1">
                                                Now, click the "Upload to Admin
                                                Panel" button below, and select
                                                the updated data sheet from your
                                                computer. This will initiate the
                                                process of updating the data on
                                                the admin panel.
                                            </p>
                                        </div>

                                        <div className="flex justify-end items-end mt-2">
                                            <button
                                                onClick={() =>
                                                    setIsUpload(true)
                                                }
                                                className="bg-[#40C79E] w-[142px] h-[47px] text-base rounded-lg text-white font-nunitoBold"
                                            >
                                                Upload File
                                            </button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {/* updload xlsx file to the admin panel */}
                                    <div className="my-2">
                                        <FileUpload
                                            imageUrl={params.xlsx_file}
                                            removeImage={() =>
                                                removeImage("xlsx_file")
                                            }
                                            styleType={
                                                window.innerWidth < 768 ||
                                                params.role_id === 5
                                                    ? "md"
                                                    : "lg"
                                            }
                                            setImage={
                                                handleUploadAndProcessFile
                                            }
                                            acceptMimeTypes={[
                                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                            ]}
                                            title="Drag and Drop xls file here"
                                            label="File Format: .xlsx/ .xls"
                                            id="img"
                                            maxSize={5}
                                            filename="xlsx_file"
                                            error={errors?.xlsx_file}
                                        />

                                        {true ? (
                                            <div className="flex flex-row items-center mt-5 w-full justify-between">
                                                <div>
                                                    {isProcessing && (
                                                        <span className="flex gap-2 items-center my-2 text-sm font-nunitoBold">
                                                            <CircularProgress size="30px" />{" "}
                                                            We are processing
                                                            your file. Please
                                                            wait...{" "}
                                                        </span>
                                                    )}
                                                </div>

                                                <CustomButton
                                                    disabled={isLoading}
                                                    borderRadius="0.5rem"
                                                    variant="contained"
                                                    size="large"
                                                    width="w-42"
                                                    onClick={handleSubmit}
                                                >
                                                    <p className="text-sm font-bold text-darkbg font-nunitoRegular">
                                                        {isLoading ? 'Uploading...' : 'Validate'} 
                                                    </p>
                                                </CustomButton>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col justify-end items-end mt-5">
                                                <CustomButton
                                                    disabled={isLoading}
                                                    borderRadius="0.5rem"
                                                    variant="contained"
                                                    size="large"
                                                    width="w-42"
                                                    onClick={handleSubmit}
                                                >
                                                    <p className="text-sm font-bold text-darkbg font-nunitoRegular">
                                                        {isLoading ? 'Uploading...' : 'Validate'} 
                                                    </p>
                                                </CustomButton>
                                            </div>
                                        )}
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </Box>
            </Modal>
            {/* status can be 'success' or 'duplicate' or 'template error' */}
            <FileCheckModal
                sheetErrors={sheetValidationErrors}
                status={status}
                open={fCheckModal}
                handleClose={fCheckModalClose}
                backHere={backHere}
                handleSkip={handleSkip}
                handleResetState={handleResetState}
            />
        </div>
    );
};

export default AddNewRecordModal;
