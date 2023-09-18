import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import CloseSquare from "../../../../../assets/icons/closeSquare.svg";
import CustomButton from "../../../../Common/CustomButton";
import TextArea from "../../../../Common/Input/TextArea";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};

const LostOrDamagedPopup = ({
  type,
  open,
  handleClose,
  title,
  handleYes,
}: any) => {
  return (
    <Modal
      open={open}
      onClose={()=>handleClose(type)}
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
              onClick={()=>handleClose(type)}
              src={CloseSquare}
              alt="Close"
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-3 mt-4">
            <div className="w-full">
              <TextArea placeholder={'Description'} rows={5}/>
            </div>
          </div>
          <div className="flex justify-end items-center gap-6 mt-6">
            <CustomButton
              borderRadius="8px"
              onClick={()=>handleClose(type)}
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
export default LostOrDamagedPopup;
