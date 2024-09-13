import React, {useState} from 'react'
import {Box, Button, TextField, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {login} from '../services/authService'
import background from '../assets/images/background.jpg'
import {useNavigate} from 'react-router-dom';
import {useAuth} from './auth'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        backgroundColor: '#C4D7FF'
    }
}))

export const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const classes = useStyles();
    const [loginData, setLoginData] = useState({
        document: '',
        password: '',
        role: ''
    });
    const [errorMessage, setErrorMessage] = useState('')

    //set document and password
    const handleChange = (e) => {
        setLoginData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }))
        setErrorMessage('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        log_in();
    };

    const log_in = async () => {
        const loginResponse = await login(loginData);
        if (!loginResponse.success) {
            setErrorMessage(loginResponse.error);
            return;
        }
        const updateLoginData = {
            ...loginData,
            role: loginResponse.data
        };

        auth.login(updateLoginData);
        navigate('/home');
    }

    const navigateSignUp = () => {
        navigate('/signUp');
    }

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit}>
                <Box
                    className={classes.form}
                    display="flex"
                    flexDirection={"column"}
                    maxWidth={300}
                    alignItems="center"
                    justifyContent={"center"}
                    margin='10px'
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
                        Login
                    </Typography>

                    <TextField
                        error={errorMessage !== ''}
                        helperText={errorMessage}
                        required={true}
                        name="document"
                        value={loginData.document}
                        onChange={handleChange}
                        margin='normal'
                        type={'text'}
                        variant='outlined'
                        placeholder='Document'
                        fullWidth
                    />

                    <TextField
                        error={errorMessage !== ''}
                        helperText={errorMessage}
                        required={true}
                        name='password'
                        value={loginData.password}
                        onChange={handleChange}
                        margin='normal'
                        type={'password'}
                        variant='outlined' placeholder='Password'
                        fullWidth/>

                    <Button
                        type='submit' fullWidth sx={{marginTop: 2}} variant='contained'
                        color='primary'>SIGN IN</Button>
                    <Button
                        onClick={navigateSignUp}
                        sx={{marginTop: 2}}>SIGN UP</Button>
                </Box>
            </form>
        </div>
    )
}
