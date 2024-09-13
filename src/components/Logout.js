import React from 'react'
import {Box, Button} from '@mui/material';

import {useNavigate} from 'react-router-dom';
import {useAuth} from './auth'

export function Logout() {

    const navigate = useNavigate();
    const auth = useAuth();

    const logout = (e) => {
        e.preventDefault();
        auth.logout();
        navigate('/');
    }
    const goBack = () => {
        navigate(-1);
    }

    return (
        <form onSubmit={logout}
        >
            <Box
                display="flex"
                flexDirection="column"
                maxWidth={250}
                alignItems="center"
                justifyContent="center"

                margin='auto'
                marginTop={'10%'}
                padding={5}
                borderRadius={3}
                boxShadow={'5px 5px 10px #ccc'}
                sx={{
                    ':hover': {
                        boxShadow: '10px 10px 20px #ccc'
                    }
                }}
            >

                <label>Are you sure you want to exit?</label>

                <Button
                    type='submit' fullWidth sx={{marginTop: 2}} variant='contained'
                    color='primary'>Sign Out
                </Button>
                <Button
                    onClick={goBack} fullWidth sx={{marginTop: 2}} variant='contained'
                    color='secondary'>Go Back
                </Button>
            </Box>
        </form>
    )
}

