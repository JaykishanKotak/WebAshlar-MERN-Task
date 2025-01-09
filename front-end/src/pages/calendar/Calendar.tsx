import React from 'react';
import 'react-calendar/dist/Calendar.css';
import { Box, Button, Container, Typography } from '@mui/material';
import { useCalendar } from './hooks';
import { CalendarView, MeetingDetailsDialog } from './components';


const Calendar: React.FC = () => {
    const { selectedDate, selectedMeeting, openDialog, onChangeDate, onClickDialogClose, schedules } = useCalendar();

    return (
        <Container maxWidth="lg">
            <Box my={4} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h1" color="primary">
                    Meeting Calendar
                </Typography>
                <Button variant="contained" color="primary">
                    Add Meeting
                </Button>
            </Box>

            <CalendarView schedules={schedules} onDateChange={onChangeDate} selectedDate={selectedDate} />

            <MeetingDetailsDialog
                open={openDialog}
                onClose={onClickDialogClose}
                meeting={selectedMeeting}
            />
        </Container>
    );
};

export default Calendar;
