import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import CloseSquare from "../../../../../assets/icons/closeSquare.svg";
import danger from "../../../../../assets/icons/dangerIcon.svg";
import CustomButton from "../../../../Common/CustomButton";
import TextArea from "../../../../Common/Input/TextArea";
import { Input } from "../../../../Common/Input/Input";
import RadioButton from "../../../../Common/RadioButton";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
};

const SelectTemplatePopup = ({
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
                    <div className="mt-4 border rounded-lg px-8 py-4">
                        <div className="border rounded-lg p-3 flex justify-center items-center gap-3">
                            <div className=" w-1/2">
                                <div className="bg-[#F4F4F4] rounded-lg flex flex-col justify-center items-center gap-4">
                                    <p className="font-bold mt-4">Deloitte.</p>
                                    <div className="relative">
                                        <div className="w-[112px] h-[118px] bg-[#c7c7c7] rounded"></div>
                                        <div className="absolute -top-[6px] -left-[5px] w-[16px] h-[16px] bg-[#86BC24] rounded-full"></div>
                                        <div className="mt-1 absolute top-[9px] -left-[8px] w-[10px] h-[10px] bg-[#86BC24] rounded-full"></div>
                                        <div className="absolute -bottom-[6px] -right-[5px] w-[16px] h-[16px] bg-[#86BC24] rounded-full"></div>
                                        <div className="mt-1 absolute bottom-[12px] -right-[8px] w-[10px] h-[10px] bg-[#86BC24] rounded-full"></div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-0">
                                        <p className="font-bold">
                                            Marley Siphron
                                        </p>
                                        <p className="text-[#00000050] text-sm">
                                            Junior Developer
                                        </p>
                                        <p className="text-[#00000050] text-sm">
                                            Deloitte
                                        </p>
                                    </div>
                                    <div className="bg-[#1B1B1B] w-full p-3 rounded-b-lg">
                                        <p className="text-[#F4F4F4] text-sm">
                                            developer@company.com
                                        </p>
                                        <p className="text-[#F4F4F4] text-sm">
                                            +91 9876543200
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center mt-2">
                                    <div>
                                        <RadioButton
                                            items={[{ value: "1" }]}
                                            onChange={() => {}}
                                        />
                                    </div>
                                    <p>Template id : 2S</p>
                                </div>
                            </div>
                            <div className="w-1/2 ">
                                <div className="bg-[#1B1B1B] rounded-lg flex flex-col justify-center items-center gap-4">
                                    <p className="font-bold mt-4 text-white">Deloitte.</p>
                                    <div className="relative">
                                        <div className="w-[112px] h-[118px] bg-[#c7c7c7] rounded"></div>
                                        <div className="absolute -top-[6px] -left-[5px] w-[16px] h-[16px] bg-[#86BC24] rounded-full"></div>
                                        <div className="mt-1 absolute top-[9px] -left-[8px] w-[10px] h-[10px] bg-[#86BC24] rounded-full"></div>
                                        <div className="absolute -bottom-[6px] -right-[5px] w-[16px] h-[16px] bg-[#86BC24] rounded-full"></div>
                                        <div className="mt-1 absolute bottom-[12px] -right-[8px] w-[10px] h-[10px] bg-[#86BC24] rounded-full"></div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-0">
                                        <p className="font-bold text-white">
                                            Marley Siphron
                                        </p>
                                        <p className="text-[#ffffff50] text-sm">
                                            Junior Developer
                                        </p>
                                        <p className="text-[#ffffff50] text-sm">
                                            Deloitte
                                        </p>
                                    </div>
                                    <div className="bg-[#D9D9D9] w-full p-3 rounded-b-lg">
                                        <p className="text-[#1B1B1B] text-sm">
                                            developer@company.com
                                        </p>
                                        <p className="text-[#1B1B1B] text-sm">
                                            +91 9876543200
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center mt-2">
                                    <div>
                                        <RadioButton
                                            items={[{ value: "1" }]}
                                            onChange={() => {}}
                                        />
                                    </div>
                                    <p>Template id : 3S</p>
                                </div>
                            </div>
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
export default SelectTemplatePopup;
