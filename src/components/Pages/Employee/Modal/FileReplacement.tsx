import { Box, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import AddNewRecordModal from "./AddNewRecordModal";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fcfcfc",
};

const FileReplacementModal = ({ id, open, handleClose, status }: any) => {
    const onCloseClick = () => {
        handleClose();
    };

    const [nrModal, setNrModal] = useState(false);

    const nrModalOpen = () => {
        onCloseClick();
        setNrModal(true);
    };

    const nrModalClose = () => {
        setNrModal(false);
    };

    const [isUpl, setIsUpl] = useState(false);

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
                        borderRadius: "8px",
                        outline: "none",
                    }}
                >
                    <div className="lg:p-5 md:p-5 p-4 flex flex-col lg:w-[671px] md:w-[671px] w-[500px] m-auto">
                        {/* delete and replace warning */}
                        {status === "delete_replace" && (
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15.1377 2.93692L23.516 17.4486C23.8233 17.9808 23.9999 18.5978 23.9999 19.2564C23.9999 21.2566 22.3784 22.8782 20.3782 22.8782H11.9999L9.10254 12.0006L11.9999 1.12305C13.3415 1.12305 14.5118 1.85303 15.1377 2.93692Z"
                                                fill="#3B4145"
                                            />
                                            <path
                                                d="M8.86223 2.93692L0.483891 17.4486C0.176672 17.9808 0 18.5978 0 19.2564C0 21.2566 1.6215 22.8782 3.62175 22.8782H12V1.12305C10.6584 1.12305 9.48811 1.85303 8.86223 2.93692Z"
                                                fill="#525A61"
                                            />
                                            <path
                                                d="M22.2615 18.1723L13.8833 3.6607C13.5056 3.00638 12.8122 2.5935 12.0623 2.57227L19.228 21.4289H20.3783C21.5763 21.4289 22.5513 20.454 22.5513 19.2559C22.5513 18.8753 22.4508 18.5006 22.2615 18.1723Z"
                                                fill="#FFB751"
                                            />
                                            <path
                                                d="M20.8525 18.1718C21.0162 18.5001 21.1026 18.8748 21.1026 19.2554C21.1026 20.4535 20.2619 21.4284 19.228 21.4284H3.62176C2.42368 21.4284 1.44873 20.4535 1.44873 19.2554C1.44873 18.8748 1.54918 18.5001 1.73846 18.1718L10.1167 3.6602C10.505 2.98802 11.2264 2.57031 12 2.57031C12.0208 2.57031 12.0415 2.57078 12.0623 2.57177C12.706 2.59689 13.3005 3.00878 13.6245 3.6602L20.8525 18.1718Z"
                                                fill="#FFD764"
                                            />
                                            <path
                                                d="M12 16.5996V19.0141C12.6669 19.0141 13.2073 18.4737 13.2073 17.8068C13.2073 17.14 12.6669 16.5996 12 16.5996Z"
                                                fill="#3B4145"
                                            />
                                            <path
                                                d="M12 16.5996C12.1333 16.5996 12.2414 17.14 12.2414 17.8069C12.2414 18.4738 12.1333 19.0141 12 19.0141C11.3331 19.0141 10.7927 18.4738 10.7927 17.8069C10.7927 17.14 11.3331 16.5996 12 16.5996Z"
                                                fill="#525A61"
                                            />
                                            <path
                                                d="M12 6.21875V15.1524C12.6669 15.1524 13.2073 14.6115 13.2073 13.9451V7.42602C13.2073 6.75913 12.6669 6.21875 12 6.21875Z"
                                                fill="#3B4145"
                                            />
                                            <path
                                                d="M12 6.21875C12.1333 6.21875 12.2414 6.75913 12.2414 7.42602V13.9451C12.2414 14.6115 12.1333 15.1524 12 15.1524C11.3331 15.1524 10.7927 14.6115 10.7927 13.9451V7.42602C10.7927 6.75913 11.3331 6.21875 12 6.21875Z"
                                                fill="#525A61"
                                            />
                                        </svg>
                                    </div>
                                    <h1 className="text-base font-nunitoBold text-[#2B2C34]">
                                        File Replacement - All Employee Activity
                                        Logs Will Be Deleted
                                    </h1>
                                </div>

                                <p className="text-sm font-nunitoMedium text-[#2B2C34] mt-2">
                                    Caution! The action you are about to take
                                    will result in the deletion and replacement
                                    of the existing file. This will lead to the
                                    removal of all the activity logs of
                                    employees currently stored in the file.
                                </p>

                                <div className="flex flex-row gap-5 justify-end items-end mt-5">
                                    <button className="w-[201px] h-[47px] bg-[#FF7B7B] rounded-lg hover:shadow-sm">
                                        <p
                                            onClick={() => {
                                                setIsUpl(true);
                                                nrModalOpen();
                                            }}
                                            className="text-sm font-bold text-darkbg font-nunitoRegular text-white"
                                        >
                                            Delete & Replace
                                        </p>
                                    </button>

                                    <button
                                        className="w-[106px] h-[47px] bg-white border border-black rounded-lg hover:shadow-sm"
                                        onClick={onCloseClick}
                                    >
                                        <p className="text-sm font-bold text-darkbg font-nunitoRegular">
                                            Cancel
                                        </p>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </Box>
            </Modal>
            <AddNewRecordModal
                open={nrModal}
                handleClose={nrModalClose}
                handleOpen={nrModalOpen}
                isUpl={isUpl}
                operationType={'delete_replace'}
            />
        </div>
    );
};

export default FileReplacementModal;
