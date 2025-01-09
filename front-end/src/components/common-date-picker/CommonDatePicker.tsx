import React from 'react';
import TextField from '@mui/material/TextField';
import moment from 'moment';

interface DatePickerProps {
    label: string;
    value: Date | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: { message?: string } | boolean | any;
    helperText?: string;
}

const CommonDatePicker: React.FC<DatePickerProps> = ({
    label,
    value,
    onChange,
    error,
    helperText,
}) => {
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
                    type: "date",
                },
            }}
            onChange={(event) => {
                const dateString = event.target.value;
                if (dateString) {
                    const date: any = moment(dateString, 'YYYY-MM-DD').toDate();
                    onChange(date);
                }
            }}
            value={value ? moment(value).format('YYYY-MM-DD') : ''}
            helperText={error?.message || helperText}
        />
    );
};

export default CommonDatePicker;