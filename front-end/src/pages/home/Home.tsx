import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { CommonDataTable, CommonPagination } from '@components/index';
import { useHome } from './hooks';



const Home: React.FC = () => {


    const { meetingData, columns, actions, onActionClick, onClickAddMeeting, onChangePage, page, recordCount } = useHome()

    return (
        <Container maxWidth="lg">
            <Box my={4} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h1" color="primary">
                    Meeting Schedules
                </Typography>
                <Button variant="contained" color="primary" onClick={onClickAddMeeting}>
                    Add Meeting
                </Button>
            </Box>
            <CommonDataTable
                columns={columns}
                data={meetingData}
                actions={actions}
                onActionClick={onActionClick}
            />
            <div className='flex justify-end mt-3 mb-3'>
                <CommonPagination page={page} count={recordCount} onPageChange={onChangePage} />
            </div>
        </Container>
    );
};

export default Home;
