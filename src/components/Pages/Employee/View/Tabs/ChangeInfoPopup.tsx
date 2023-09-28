import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import CloseSquare from "../../../../../assets/icons/closeSquare.svg";
import danger from "../../../../../assets/icons/dangerIcon.svg";
import CustomButton from "../../../../Common/CustomButton";
import TextArea from "../../../../Common/Input/TextArea";
import { Input } from "../../../../Common/Input/Input";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
};

const ChangeInfoPopup = ({
    type,
    open,
    handleClose,
    title,
    handleYes,
}: any) => {
    return (
        <Modal
            open={open}
            onClose={() => handleClose(type)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className="w-[320px] sm:w-[600px]"
                sx={style}
                style={{
                    textAlign: "center",
                    borderRadius: "16px",
                    outline: "none",
                    // padding: '10px',
                }}
            >
                <div className="bg-bodyBg p-6 rounded-lg">
                    <div className="flex justify-between items-start">
                    <p className="font-bold text-[18px] text-blackFont ">
                            {title}
                        </p>
                        <img
                            className="cursor-pointer"
                            onClick={() => handleClose(type)}
                            src={CloseSquare}
                            alt="Close"
                        />
                    </div>
                    <div className="mt-4">
                        <div className="w-full flex flex-col justify-start items-start gap-3 border rounded-lg p-5">
                            <Input
                                rows={1}
                                width="w-full"
                                disabled={false}
                                readOnly={false}
                                // value={params.search_key}
                                // handleChange={onFilterChange}
                                label="First Name"
                                name="search_key"
                            />
                            <Input
                                rows={1}
                                width="w-full"
                                disabled={false}
                                readOnly={false}
                                // value={params.search_key}
                                // handleChange={onFilterChange}
                                label="Last Name"
                                name="search_key"
                            />
                            <Input
                                rows={1}
                                width="w-full"
                                disabled={false}
                                readOnly={false}
                                // value={params.search_key}
                                // handleChange={onFilterChange}
                                label="Designation"
                                name="search_key"
                            />
                            <Input
                                rows={1}
                                width="w-full"
                                disabled={false}
                                readOnly={false}
                                // value={params.search_key}
                                // handleChange={onFilterChange}
                                label="Location"
                                name="search_key"
                            />
                        </div>
                        <div className="flex justify-end items-end mt-4">
                            <CustomButton
                                borderRadius="8px"
                                onClick={handleYes}
                                width="w-fit"
                                variant="contained"
                                size="large"
                            >
                                Update
                            </CustomButton>
                        </div>
                        <div className="flex justify-start items-center gap-8 border rounded-lg p-4 mt-4">
                            <img src={danger} alt="" />
                            <p className="text-sm text-[#909090]">New Change Detected</p>
                            <p className="text-sm">Designation Changed</p>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-6 mt-6">
                        <CustomButton
                            borderRadius="8px"
                            onClick={() => handleClose(type)}
                            width="w-fit"
                            variant="secondary"
                            size="large"
                        >
                            <p className="text-base text-blackFont font-redHatDisplayBold tracking-normal">
                                Cancel
                            </p>
                        </CustomButton>
                        <CustomButton
                            borderRadius="8px"
                            onClick={handleYes}
                            width="w-fit"
                            variant="contained"
                            size="large"
                        >
                            Place New Card
                        </CustomButton>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};
export default ChangeInfoPopup;
