import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface TimePickerProps {
    label: string;
    value: string | Date | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: any;
    helperText?: string;
}

const CommonTimePicker: React.FC<TimePickerProps> = ({ label, value, onChange, error,
    helperText, }) => {
    return (
        <TextField
            label={label}
            variant="outlined"
            fullWidth
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                inputProps: {
                    type: "time",
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <span role="img" aria-label="clock">
                            🕒
                        </span>
                    </InputAdornment>
                ),
            }}
            onChange={onChange}
            value={value}
            error={!!error}
            helperText={error?.message || helperText}
        />
    );
};

export default CommonTimePicker;
