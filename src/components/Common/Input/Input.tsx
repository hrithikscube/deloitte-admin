import TextField from "@mui/material/TextField";

const onPaste = (e: any) => {
    const ranges = [
        "(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])", // U+1F680 to U+1F6FF
    ];

    if (e.clipboardData.getData("text/plain").match(ranges.join("|"))) {
        e.preventDefault();
        return false;
    }
};

const onkeydownEvent = (e: any, handleChange: any) => {
    const ranges = [
        "(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])", // U+1F680 to U+1F6FF
    ];
    if (e.target.value && e.target.value.match(ranges.join("|"))) {
        e.preventDefault();
        return false;
    }
    handleChange(e);
};
interface Props {
    success?: boolean;
    name?: string;
    rows?: number;
    width?: any;
    value?: any;
    type?: string;
    label?: string;
    error?: boolean;
    helperText?: any;
    readOnly?: boolean;
    disabled?: boolean;
    handleChange?: any;
    height?: string;
    bgcolor?: any;
}
export const Input: React.FC<Props> = ({
    success,
    rows,
    height,
    width,
    type,
    value,
    label,
    error,
    helperText,
    readOnly,
    disabled,
    handleChange,
    name,
    bgcolor,
}) => (
    <div className={`${width}`}>
        <TextField
            onKeyDown={
                type === "number"
                    ? (evt: any) =>
                          ["e", "E", "+", "-"].includes(evt.key) &&
                          evt.preventDefault()
                    : () => {}
            }
            onWheel={(e: any) => e.target?.blur()}
            autoComplete="off"
            type={type}
            rows={rows}
            name={name}
            // multiline
            fullWidth
            onPaste={onPaste}
            onChange={(e) => onkeydownEvent(e, handleChange)}
            disabled={disabled}
            inputProps={{ readOnly, autoComplete: "off" }}
            error={error}
            helperText={helperText}
            sx={{
                "& .MuiInputBase-input": {
                    color: "#141C4C",

                    borderRadius: "8px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    // borderColor: '#E7E8ED',
                    borderRadius: "8px",
                },
                backgroundColor: bgcolor || "transparent",
                borderRadius: "8px",
                textarea: { color: "black", height },
                // label: { color: success ? '#3AC730' : '#86BC24' },
                "& .MuiFormLabel-root.Mui-hovered": {
                    color: "red",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                    color: "#86BC24",
                },
                "& .MuiFormLabel-root.Mui-hover": {
                    color: "red",
                },
                "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                        color: "red",
                        borderColor: "#86BC24",
                    },
                },
                "& .MuiOutlinedInput-root": {
                    backgroundColor: bgcolor ?? "white",
                    borderRadius: "8px",
                    "& > fieldset": {
                        borderColor: success ? "#3AC430" : "#E7E8ED",
                    },
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                        borderColor: "#86BC24",
                    },
                },
            }}
            variant="outlined"
            value={value}
            label={label}
        />
    </div>
);
