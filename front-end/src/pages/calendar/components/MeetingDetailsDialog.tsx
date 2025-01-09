import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { Meeting } from '@utils/CommonInterface';

interface MeetingDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    meeting: Meeting | null;
}

const MeetingDetailsDialog: React.FC<MeetingDetailsDialogProps> = ({ open, onClose, meeting }) => {
    if (!meeting) return null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Meeting Details</DialogTitle>
            <DialogContent>
                <Typography variant="h6">{meeting.topic}</Typography>
                <Typography>Date: {meeting.date}</Typography>
                <Typography>Time: {meeting.time}</Typography>
                <Typography>Location: {meeting.location}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MeetingDetailsDialog;
