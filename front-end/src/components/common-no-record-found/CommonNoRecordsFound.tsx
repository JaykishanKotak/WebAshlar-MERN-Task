import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

interface NoRecordsFoundProps {
    message?: string;
    isShowIcon?: boolean
}

const CommonNoRecordsFound: React.FC<NoRecordsFoundProps> = ({ message = 'No records found.', isShowIcon = false }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Stack alignItems="center" spacing={2}>
                {isShowIcon && <EmojiEmotionsIcon sx={{ fontSize: 100 }} />}
                <Typography className='text-center' variant="h6">{message}</Typography>
            </Stack>
        </Box>
    );
};

export default CommonNoRecordsFound;