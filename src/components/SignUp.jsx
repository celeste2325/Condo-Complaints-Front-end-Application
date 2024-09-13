import React, {useState} from 'react'
import {Box, Button, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import background from "../assets/images/background.jpg";
import {getPersonByDocument} from "../services/personService";
import {signUp} from "../services/authService";
import {useAuth} from "./auth";
import {useNavigate} from "react-router-dom";

export function SignUp() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        document: '',
        password: ''
    });
    const [isValidResident, setIsValidResident] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
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
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        sign_up()
    };

    const handleChange = (e) => {
        setSignUpData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }))
        setErrorMessage('');
    }

    const validateResidentDocument = async () => {
        const personByDocument = await getPersonByDocument(signUpData.document);

        if (!personByDocument.success) {
            setErrorMessage(personByDocument.error);
            return;
        }
        return personByDocument.data.credential != null ? setErrorMessage('Account with this document exists.') : setIsValidResident(true);
    }

    const sign_up = async () => {
        const response = await signUp(signUpData)
        if (!response.success) {
            setErrorMessage(response.error);
            return;
        }
        auth.login(signUpData);
        navigate('/home');
    }

    const navigateSignIn = () => {
        navigate('/login');
    }

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit}>
                <Box
                    className={classes.form}
                    display="flex"
                    flexDirection="column"
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
                        Sign up
                    </Typography>

                    <TextField
                        disabled={isValidResident}
                        helperText={errorMessage}
                        required={true}
                        name="document"
                        value={signUpData.document}
                        onChange={handleChange}
                        margin='normal'
                        type={'text'}
                        variant='outlined'
                        placeholder='Document'
                        fullWidth
                        error={errorMessage !== ''}
                    />

                    <Button
                        onClick={validateResidentDocument}
                        disabled={signUpData.document === '' || isValidResident}
                        fullWidth sx={{marginTop: 2, marginBottom: 1}} variant='contained' color='secondary'>
                        Validate Resident
                    </Button>

                    {isValidResident &&
                        <TextField
                            required={true}
                            name='password'
                            value={signUpData.password}
                            onChange={handleChange}
                            margin='normal'
                            type={'password'}
                            variant='outlined' placeholder='Password'
                            fullWidth/>
                    }

                    {isValidResident && <Button
                        type='submit'
                        fullWidth sx={{marginTop: 2}}
                        variant='contained'
                        color='primary'>
                        Sign up
                    </Button>
                    }

                    <Button
                        onClick={navigateSignIn}
                        sx={{marginTop: 2}}>
                        SIGN IN
                    </Button>
                </Box>
            </form>
        </div>
    )
}
