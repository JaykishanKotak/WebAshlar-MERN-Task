import React from 'react';
import { TextField } from '@mui/material';

interface CommonInputProps {
    label: string;
    name: string;
    value: string | number | boolean | Date | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean
    type?: React.HTMLInputTypeAttribute
    id: string
    autoFocus?: boolean
    error?: any;
    helperText?: string;
    color?: "error" | "primary" | "secondary" | "info" | "success" | "warning" | undefined
    disabled?: boolean
    fullWidth: boolean
    placeholder: string
    size?: 'medium' | 'small' | undefined
    margin?: "normal" | "dense" | "none" | undefined
    sx?: any
    multiline?: boolean
    rows?: number | undefined
}


const CommonInput: React.FC<CommonInputProps> = ({
    label = "",
    name = "",
    value = " ",
    onChange = () => { },
    error,
    helperText,
    color = "primary",
    disabled = false,
    fullWidth = true,
    placeholder = "",
    margin = "normal",
    size,
    required = false,
    type = "text",
    id = "",
    autoFocus = false,
    sx,
    multiline = false,
    rows = 4
}) => {
    return (
        <TextField
            label={label}
            name={name}
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message || helperText}
            margin={margin}
            color={color}
            disabled={disabled}
            fullWidth={fullWidth}
            placeholder={placeholder}
            size={size}
            required={required}
            autoFocus={autoFocus}
            sx={sx}
            multiline={multiline}
            rows={rows}
        />
    );
};

export default CommonInput;