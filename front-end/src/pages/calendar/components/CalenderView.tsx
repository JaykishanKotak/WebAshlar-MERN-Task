import { Meeting } from '@utils/CommonInterface';
import { filter } from 'lodash';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box } from '@mui/material';

interface CalendarViewProps {
    schedules: Meeting[];
    onDateChange: (date: Date) => void;
    selectedDate: Date | null;
}

const CalendarView: React.FC<CalendarViewProps> = ({
    schedules,
    onDateChange,
    selectedDate,
}: any) => {

    const tileContent = ({ date }: any) => {
        const dateStr = date.toISOString().split('T')[0];

        const meetingsForDay = filter(schedules, (meeting) => meeting.date === dateStr);

        if (meetingsForDay.length > 0) {
            const sortedMeetings = meetingsForDay.sort((a, b) => {
                const timeA = Number(a.time.split(':').join(''));
                const timeB = Number(b.time.split(':').join(''));
                return timeA - timeB;
            });

            return (
                <div style={{ textAlign: 'center' }}>
                    {sortedMeetings.map((meeting) => (
                        <span
                            key={meeting.id}
                            style={{
                                display: 'block',
                                color: 'red',
                                fontSize: '12px',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            }}
                        >
                            • {meeting.time} - {meeting.topic}
                        </span>
                    ))}
                </div>
            );
        }

        return null;
    };


    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                maxWidth: 'none',
                maxHeight: 'none',
                '& .react-calendar': {
                    width: '100% !important',
                    height: '100% !important',
                },
            }}
        >
            <Calendar
                onChange={onDateChange}
                value={selectedDate || new Date()}
                tileContent={tileContent}
            />
        </Box>
    );
};

export default CalendarView;
