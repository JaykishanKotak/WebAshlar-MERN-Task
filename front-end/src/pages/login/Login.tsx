import { Controller } from 'react-hook-form';
import {
    Avatar,
    CssBaseline,
    Box,
    Typography,
    Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CommonButton, CommonInput } from '@components/index';
import { useLogin } from './hooks';

const LoginPage = () => {
    const { control,
        handleSubmit,
        onSubmit,
    } = useLogin()
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CommonInput
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                placeholder='Enter Your Email'
                                autoFocus
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CommonInput
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={value}
                                placeholder='Enter Your Password'
                                onChange={onChange}
                                error={!!error}
                                helperText={error?.message}
                            />
                        )}
                    />
                    <CommonButton type="submit"
                        fullWidth
                        variant="contained"
                        label='Sign In'
                        sx={{ mt: 3, mb: 2 }}
                    />
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;