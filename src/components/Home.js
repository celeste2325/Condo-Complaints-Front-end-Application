import React, {useEffect, useState} from 'react';
import fondo from '../assets/images/fondoLogin.jpg'
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import {NavBar} from './NavBar';

import {Reclamo} from './Reclamo'
import {useAuth} from './auth';
import {getPersonByDocument} from '../services/serviceLogin'
import {devuelveReclamos} from '../services/reclamoService';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '2px',
    marginBottom: '5px'
}));

export function Home() {
    const auth = useAuth();
    const [user, setUser] = useState('')
    const [reclamos, setReclamos] = useState([])
    const [isAdministrador, setIsAdministrador] = useState(false)

    useEffect(() => {
        if (auth.user != null) {
            responseDuenio();
        }
    }, [auth.user])

    const responseDuenio = async () => {
        const respuesta = await (await getPersonByDocument(auth.user)).json();
        const reclamosByDocumento = respuesta.reclamosByDocumento;

        setUser(respuesta.nombre);
        if (respuesta.roles === 'admin') {
            console.log('roles', respuesta.roles);
            setIsAdministrador(true)
            const getReclamos = await (await devuelveReclamos()).json();

            console.log('profesor', getReclamos);
            setReclamos(getReclamos)
            return
        }

        setReclamos(reclamosByDocumento);


    }
    return (
        <Box
            sx={{
                width: {lg: '70vw', xs: '80vw', sm: '90vw'},
                margin: 'auto',
                padding: '10px',
                backgroundImage: `url(${fondo})`,
                boxSizing: 'border-box',
                marginTop: {sm: '10%', xs: '16%', lg: '5%'},
            }}
        >
            <NavBar isAdministrador={isAdministrador}/>
            <Grid container spacing={2} columns={12}>
                <Grid item xs={12}>
                    <Item>
                        <Typography>
                            {isAdministrador ?
                                `Hola ${user}. Bienvenido! a través de la plataforma puedes Gestionar reclamos referentes a edificios de los cuales eres administrador.
                                 Administrar edificios, personas, unidades funcionales, entre otros.`
                                :
                                `Hola ${user}. Bienvenido! A través de la plataforma puedes realizar reclamos y consultarlos.`
                            }
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={12}>

                    <Typography
                        variant='h5'
                        textAlign={'center'}
                        margin='2%'
                        color={'blue'}>
                        {isAdministrador ? 'Reclamos' : 'Tus Reclamos'
                        }
                    </Typography>
                    <Item>
                        <Reclamo reclamo={reclamos}/>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
