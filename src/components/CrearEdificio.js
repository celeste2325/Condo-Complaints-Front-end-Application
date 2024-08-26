import {Box, Button, TextField, Typography} from '@mui/material'
import React, {useState} from 'react'
import Edificio from './Edificio'
import {crear} from './../services/edificioService'
import {useNavigate} from 'react-router-dom';


export function CrearEdificio() {
    const navigate = useNavigate();
    const [isExito, setIsExito] = useState('inicio')
    const [inputs, setInputs] = useState({
        nombre: '',
        direccion: ''
    })
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        crear(inputs).then(setIsExito('exito'));
        console.log('inpust', inputs);
    }
    const volver = () => {

        setIsExito('inicio')
        setInputs({
            nameUser: '',
            direccion: ''
        })
    }
    console.log(isExito);

    if (isExito === 'inicio') {
        return (
            <>
                <Edificio></Edificio>
                <form onSubmit={handleSubmit}>
                    <Box
                        display="flex"
                        flexDirection={"column"}
                        justifyContent={"center"}
                        alignItems="center"
                        maxWidth={300}
                        margin='auto'
                        marginTop={'20%'}
                        padding={3}
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
                            padding={3}
                        >
                            Crear Edificio
                        </Typography>

                        <TextField
                            name='nombre'
                            margin='normal'
                            id="outlined-select-edificio"
                            type={'text'}
                            label="Nombre"
                            value={inputs.nombre}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        ></TextField>

                        <TextField
                            margin='normal'
                            label="Direccion"
                            value={inputs.direccion}
                            type={'text'}
                            name='direccion'
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            variant='outlined'
                            xs={{
                                color: 'red'
                            }}
                        >
                        </TextField>

                        <Button
                            sx={{marginTop: 2}}
                            variant='contained'
                            color='primary'
                            fullWidth
                            type='submit'
                        >
                            Crear
                        </Button>

                    </Box>
                </form>
            </>
        )
    } else {
        return (
            <>
                <Edificio></Edificio>
                <Box
                    display="flex"
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems="center"
                    maxWidth={300}
                    margin='auto'
                    marginTop={'30%'}
                    padding={3}
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
                        padding={3}
                        textAlign='center'
                    >
                        Edificio creado con exito!
                    </Typography>
                    <Button
                        onClick={volver} fullWidth sx={{marginTop: 2}} variant='contained'
                        color='secondary'>Volver
                    </Button>

                </Box>
            </>
        )
    }

}
