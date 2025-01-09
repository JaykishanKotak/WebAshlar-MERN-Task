import {
    Avatar,
    CssBaseline,
    Box,
    Typography,
    Container,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CommonButton, CommonDatePicker, CommonInput, CommonTimePicker } from '@components/index';
import { useMeeting } from './hooks';
import { AttendeeSelect } from './components';

const Meeting = () => {

    const { handleSubmit, control, onSubmit, editData, watch } = useMeeting()

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {editData ? "Edit Meeting" : "Add Meeting"}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className='flex flex-col gap-5 w-full overflow-auto'
                    sx={{ mt: 1 }}
                >
                    <Controller
                        name="title"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CommonInput
                                label="Title"
                                name="title"
                                placeholder='Enter Meeting Title'
                                id="title"
                                fullWidth
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error?.message}
                                required
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CommonInput
                                margin="normal"
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                placeholder="Enter Meeting Description"
                                multiline
                                required
                                rows={4}
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="startTime"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CommonTimePicker
                                label="Start Time"
                                error={!!error}
                                helperText={error?.message}
                                value={value || ""}
                                onChange={({ target }) => {

                                    onChange(target.value);
                                }}
                            />
                        )}
                    />

                    <Controller
                        name="endTime"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CommonTimePicker
                                label="End Time"
                                error={!!error}
                                helperText={error?.message}
                                value={value || ""}
                                onChange={({ target }) => {

                                    onChange(target.value);
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="meetingDate"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CommonDatePicker
                                label="Select Date"
                                error={!!error}
                                helperText={error?.message}
                                value={value || null}
                                onChange={onChange}
                            />

                        )}
                    />
                    <AttendeeSelect name="attendees" control={control} watch={watch} />
                    <CommonButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        label={editData ? "Edit Meeting" : "Add Meeting"}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default Meeting;