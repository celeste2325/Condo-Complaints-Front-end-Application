import React, {useState} from 'react'
import {Box, Button, TextField, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {getIncioDeSesion, getPersonByDocument, registro} from '../services/serviceLogin'
import fondo from '../assets/images/fondoLogin.jpg'
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
    formulario: {
        backgroundColor: '#C4D7FF'
    }

}))

export const Login = () => {

    const classes = useStyles();

    const auth = useAuth();
    const [isRegistro, setIsRegistro] = useState(false);
    const [inpust, setInpust] = useState({
        documento: '',
        contrasenia: ''
    });
    const [personaValida, setPersonaValida] = useState(false)
    const [leyendaErrorDocumento, setLeyendaErrorDocumento] = useState('Campo obligatorio')
    const [errorDocumento, setErrorDocumento] = useState(true)
    const [errorContrasenia, setErrorContrasenia] = useState(true)
    const [leyendaErrorContrasenia, setLeyendaErrorContrasenia] = useState('Campo obligatorio')

    const handleChange = (e) => {
        setInpust((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }))
        validarCampos(e);
    }
    const validarCampos = (e) => {
        if (e.target.name === 'contrasenia' && e.target.value === '') {
            setErrorContrasenia(true);
            setLeyendaErrorContrasenia('El campo es obligatorio');
        } else if (e.target.name === 'contrasenia' && e.target.value) {
            setErrorContrasenia(false);
            setLeyendaErrorContrasenia('');
        } else if (e.target.name === 'documento' && e.target.value === '') {
            setErrorDocumento(true);
            setLeyendaErrorDocumento('El campo es obligatorio');
        } else {
            setErrorDocumento(false);
            setLeyendaErrorDocumento('');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistro) {
            registrarse()
        } else {
            iniciarSesion();
        }
    };

    const validarDocumento = async () => {
        const documentoValido = await getPersonByDocument(inpust.documento);

        if (documentoValido.ok && isRegistro) {
            setPersonaValida(true);
            setErrorDocumento(false);

        } else if (inpust.documento !== '') {
            const respuesta = await documentoValido.text();
            setErrorDocumento(true);
            setLeyendaErrorDocumento(respuesta);
            setErrorContrasenia(true);
            setLeyendaErrorContrasenia('El campo es obligatorio');
        }
    }
    const navigate = useNavigate();

    const iniciarSesion = async () => {
        const loginResponse = await getIncioDeSesion(inpust.documento, inpust.contrasenia);
        const respuesta = await loginResponse.text();
        if (loginResponse.ok) {
            auth.login(inpust.documento, inpust.contrasenia);
            navigate('/home');
        } else if (!loginResponse.ok && inpust.documento !== '' && inpust.contrasenia !== '') {
            setErrorDocumento(true);
            setErrorContrasenia(true);
            setLeyendaErrorContrasenia(respuesta);
            setLeyendaErrorDocumento(respuesta);
        }
    }

    const registrarse = async () => {
        const registroResponse = await registro(inpust.documento, inpust.contrasenia)
        if (registroResponse.ok && inpust.documento !== '' && inpust.contrasenia !== '') {
            auth.login(inpust.documento, inpust.contrasenia);
            navigate('/home');
        } else if (!registroResponse.ok) {
            const respuesta = await registroResponse.text();
            setErrorDocumento(true);
            setLeyendaErrorDocumento(respuesta);
            setPersonaValida(false);
            setInpust({
                contrasenia: ''
            });
        }

    }

    const resetState = () => {
        setIsRegistro(!isRegistro);
        setInpust({
            documento: '',
            contrasenia: ''
        });
        setPersonaValida(false);
        setErrorDocumento(true);
        setLeyendaErrorDocumento('El campo es obligatorio');
        setErrorContrasenia(true);
        setLeyendaErrorContrasenia('El campo es obligatorio');

    }

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit}>
                <Box
                    className={classes.formulario}
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
                        {!isRegistro ? 'Login' : 'Registrarse'}
                    </Typography>

                    <TextField
                        error={errorDocumento}
                        helperText={leyendaErrorDocumento}


                        name='documento'
                        value={inpust.documento}
                        onChange={handleChange}
                        margin='normal'
                        type={'text'}
                        variant='outlined'
                        placeholder='Documento'
                        fullWidth
                    />

                    {isRegistro && <Button
                        onClick={validarDocumento}
                        fullWidth sx={{marginTop: 2, marginBottom: 1}} variant='contained' color='secondary'>
                        Validar documento </Button>}

                    {(personaValida || !isRegistro) &&
                        <TextField
                            error={errorContrasenia}
                            helperText={leyendaErrorContrasenia}

                            name='contrasenia'
                            value={inpust.contrasenia}
                            onChange={handleChange}
                            margin='normal'
                            type={'password'}
                            variant='outlined' placeholder='Contraseña'
                            fullWidth/>
                    }

                    {(personaValida || !isRegistro) &&
                        <Button

                            type='submit' fullWidth sx={{marginTop: 2}} variant='contained'
                            color='primary'>{!isRegistro ? 'Iniciar sesion' : 'Registrarse'}</Button>
                    }
                    <Button
                        onClick={resetState}
                        sx={{marginTop: 2}}>{isRegistro ? 'Iniciar sesion' : 'Registrarse'}</Button>
                </Box>
            </form>
        </div>
    )
}
