import Button from "@mui/material/Button";
import React from "react";

interface Props {
    disabled?: boolean;
    children?: React.ReactNode | null;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: any;
    width?: any;
    size?: any;
    icon?: any;
    borderRadius?: any;
    type?: any;
    isdeletebtn?: boolean;
    height?: any;
}

const CustomButton: React.FC<Props> = ({
    disabled,
    children,
    onClick,
    variant = "outlined",
    width,
    size,
    icon,
    borderRadius,
    type = "button",
    isdeletebtn,
    height,
}) => {
    const styles: any = {
        border: `1px solid ${isdeletebtn ? "#EF4949" : "#141C4C"}`,
        color: `${isdeletebtn ? "#EF4949" : "#141C4C"}`,
        "&:hover": {
            border: "1px solid #141C4C",
            backgroundColor: "#86BC24",
        },
        "&:active": {
            background: "#86BC24",
        },
    };
    const styles1: any = {
        border: "none",
        color: "#fff",
        fontWeight: "700",
        background: isdeletebtn ? "#EF4949" : "#86BC24",
        backgroundColor: isdeletebtn ? "#EF4949" : "#86BC24",
        "&:hover": {
            border: "none",
            background: isdeletebtn ? "#EF4949" : "#86BC24",
            backgroundColor: isdeletebtn ? "#EF4949" : "#86BC24",
            opacity: isdeletebtn ? "0.8" : "",
        },
        "&:active": {
            background: isdeletebtn ? "#EF4949" : "#86BC24",
        },
    };

    const disabledStyles: any = {
        "&:disabled": {
            fontWeight: "700",
            border: "none ",
            color: "#797979",
            backgroundColor: "#D9D9D9",
        },
    };
    const secondayStyles: any = {
        border: "1px solid #F9AF2F",
        color: "#F9AF2F",
        "&:hover": {
            // border: '1px solid #141C4C',
            backgroundColor: "#86BC24;",
        },
        "&:active": {
            background: "#86BC24",
        },
    };
    return (
        <div className={width}>
            <Button
                style={{ borderRadius, textTransform: "none", height: height }}
                fullWidth
                size={size}
                disabled={disabled}
                onClick={onClick}
                variant={variant}
                startIcon={icon}
                className="font-nunitoRegular"
                type={type}
                sx={
                    variant === "secondary" && !disabled
                        ? secondayStyles
                        : variant === "outlined" && !disabled
                        ? styles
                        : variant === "contained" && !disabled
                        ? styles1
                        : disabled && variant === "contained"
                        ? {
                              "&:disabled": {
                                  fontWeight: "700",
                                  border: "none",
                                  color: "#6A6A78 !important",
                              },
                          }
                        : disabled
                        ? disabledStyles
                        : ""
                }
            >
                <p className="w-full font-bold font-nunitoRegular text-sm">
                    {children}
                </p>
            </Button>
        </div>
    );
};
CustomButton.defaultProps = {
    disabled: false,
    children: null,
    variant: "",
    width: "",
    size: "",
    icon: "",
    borderRadius: "",
    onClick: function test() {},
};
export default CustomButton;
