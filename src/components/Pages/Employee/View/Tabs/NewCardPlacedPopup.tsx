import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import greenTick from "../../../../../assets/icons/greenTick.svg";
import CustomButton from "../../../../Common/CustomButton";
import TextArea from "../../../../Common/Input/TextArea";
import RadioButton from "../../../../Common/RadioButton";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
};

const NewCardPlacedPopup = ({
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
                    <div className="flex justify-start items-start gap-4">
                        <img
                            className="cursor-pointer"
                            onClick={() => handleClose(type)}
                            src={greenTick}
                            alt="Close"
                        />
                        <p className="font-bold text-[18px] text-blackFont ">
                            {title}
                        </p>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-3 mt-4">
                        <p className="font-bold text-[14px] text-blackFont ">
                            You have successfully placed the New card. Do you
                            want to Disable the card?
                        </p>
                        <div className="flex justify-start items-center mt-2 gap-3 w-full">
                            <div className="flex justify-start items-center border px-3 rounded-lg w-1/2">
                                <div>
                                    <RadioButton
                                        items={[{ value: "1" }]}
                                        onChange={() => {}}
                                    />
                                </div>
                                <p>Disable Card Now</p>
                            </div>
                            <div className="flex justify-start items-center border px-3 rounded-lg w-1/2">
                                <div>
                                    <RadioButton
                                        items={[{ value: "1" }]}
                                        onChange={() => {}}
                                    />
                                </div>
                                <p>Disable card on Delivery</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-6 mt-6">
                        <CustomButton
                            borderRadius="8px"
                            onClick={handleYes}
                            width="w-fit"
                            variant="contained"
                            size="large"
                        >
                            Done
                        </CustomButton>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};
export default NewCardPlacedPopup;
