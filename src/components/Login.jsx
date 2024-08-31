import React, {useState} from 'react'
import {Box, Button, TextField, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {getIncioDeSesion} from '../services/serviceLogin'
import fondo from '../assets/images/background.jpg'
import {useNavigate} from 'react-router-dom';
import {useAuth} from './auth'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: `url(${fondo})`,
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
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e) => {
        setLoginData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }))
        setErrorMessage('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sign_in();
    };

    const sign_in = async () => {
        const loginResponse = await getIncioDeSesion(loginData.document, loginData.password);
        if (loginResponse.ok) {
            const response = await loginResponse.text();
            auth.login(loginData.document, loginData.password);
            navigate('/home');
        } else {
            setErrorMessage('Incorrect document or password');
        }
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
