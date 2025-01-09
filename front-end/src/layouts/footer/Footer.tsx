import { Box, Typography } from '@mui/material'

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                position: 'static',
                bottom: 0,
                left: 0,
                width: '100%',
                py: 3,
                bgcolor: 'grey.800',
                color: 'white',
                textAlign: 'center',
                overflow: "auto"
            }}
        >
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
            </Typography>
            <Typography variant="body2">
                Designed and Developed by
                Jaykishan Kotak
            </Typography>
        </Box>
    )
}

export default Footer