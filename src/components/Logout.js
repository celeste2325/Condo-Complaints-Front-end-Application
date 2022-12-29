import React from 'react'
import { Box, Typography, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth'
import { ImportantDevices } from '@mui/icons-material';

export function Logout() {

    const navigate = useNavigate();
    const auth = useAuth();

    const logout = (e) => {
        e.preventDefault();
        auth.logout();
        navigate('/');
    }
    const volver = () => {
        navigate(-1);
    }

    return (
        <form onSubmit={logout}
        >
            <Box
                display="flex"
                flexDirection={"column"}
                maxWidth={250}
                alignItems="center"
                justifyContent="center"
                
                margin = 'auto'
                marginTop =  {'10%'}
                padding={5}
                borderRadius={3}
                boxShadow={'5px 5px 10px #ccc'}
                sx={{
                    ':hover': {
                        boxShadow: '10px 10px 20px #ccc'
                    }
                }}
            >
                <Typography
                    variant='h5'
                    padding={3}>
                    Logout
                </Typography>

                <label>¿Estas seguro que quieres salir?</label>

                <Button
                    type='submit' fullWidth sx={{ marginTop: 2 }} variant='contained'
                    color='primary'>Salir
                </Button>
                <Button
                    onClick={volver} fullWidth sx={{ marginTop: 2 }} variant='contained'
                    color='secondary'>Volver
                </Button>
            </Box>
        </form>
    )
}

