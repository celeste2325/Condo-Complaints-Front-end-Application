import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { NavBar } from './NavBar'
import { useAuth } from './auth'
import { getPersonaByDocumento } from './../services/serviceLogin'
import { getUnidadByIdentificador } from '../services/unidadService'
import { getEdificioByCodigo } from '../services/edificioService'
import { crear_reclamo } from '../services/reclamoService'

const currencies = [
  {
    value: '',
    label: '',
    numero: '',
    piso: '',
    codigoEdificio: '',
    codigoUnidad: '',
  }
];

const unidad = [
  {
    piso: '',
    numero: ''
  }
];


export function CrearReclamo() {
  const use = useAuth();
  const [respuestaok, setRespuestaok] = useState(false)
  const [idReclamo, setIdReclamo] = useState('')
  const [edificio, setEdificio] = useState(currencies);
  const [unida, setUnida] = useState(unidad);
  const [inputs, setInputs] = useState({
    edificioName: '',
    unidades: '',
    ubicacion: '',
    descripcion: '',
    foto: ''

  })
  const [datos, setDatos] = useState({
    fecha: '',
    nombre: ''
  });
  useEffect(() => {
    compruebaEstado();
  }, [0]);

  const getDatosByDocumento = async () => {
    const arreglo = [];

    if (use.user !== null) {

      const respuesta = await getPersonaByDocumento(use.user).then((response) => response.json());

      respuesta.inquilinosByDocumento.map(async unida => {
        const unidad = await getUnidadByIdentificador(unida.identificador).then((response) => response.json());

        const datosEdificio = await getEdificioByCodigo(unidad.codigoEdificio).then((response) => response.json());

        setEdificio(edificio.push({
          value: datosEdificio.nombre,
          label: datosEdificio.direccion,
          numero: unidad.numero,
          piso: unidad.piso,
          codigoEdificio: unidad.codigoEdificio,
          codigoUnidad: unidad.identificador,
        }))

      });

      console.log('arreglo', arreglo);


      console.log('edificio', edificio);
      console.log('currencies', currencies);

      setDatos({
        ...datos,
        nombre: respuesta.nombre
      });
    }

    return arreglo;
  }

  const compruebaEstado = async () => {
    const respuesta = await getDatosByDocumento();
    if (respuesta.length > 0) {
      console.log('arreglo..', respuesta);
      setEdificio(respuesta);
      console.log('hola', respuesta);
      setRespuestaok(true);
      console.log('respuestaok ', respuestaok);
    }
  }

  const handleChangeReclamos = (e) => {
    setRespuestaok(true);
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    const unidadArreglo = [];
    currencies.map(edi => {
      console.log('celeste respuesta', edi);
      if (edi.value === e.target.value.value) {
        unidadArreglo.push({
          ...unidadArreglo,
          piso: edi.piso,
          numero: edi.numero
        });
      }
    });
    setUnida(unidadArreglo);
    console.log('que es', unida);

  }

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value

    }))
  }
  const handleChangeFoto = (e) => {
    console.log('target',e.target.value);

    const fotoValue = e.target.value.split('\\')
    const FotoFile = `http://127.0.0.1:8887/${fotoValue[fotoValue.length-1]}` 
    console.log(FotoFile)
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: FotoFile

    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    crearReclamo(inputs, use.user);
    console.log('inpust', inputs, 'docuemnto:', use.user);
  }

  const crearReclamo = async (inputs, documento) => {
    const response = await crear_reclamo(inputs, documento);
    if (response.ok) {
      const responseJson = await response.json();
      setIdReclamo(responseJson.idReclamo);
    }

  }

  if (idReclamo === '') {
    return (
      <>
        <NavBar></NavBar>
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems="center"
            maxWidth={300}
            margin='auto'
            marginTop={'15%'}
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
              Crear Reclamo
            </Typography>

            <Typography
              variant='p'
              padding={1}
            >
              {datos.nombre}, {use.user}
            </Typography>



            {<TextField
              name='edificio'
              margin='normal'
              id="outlined-select-currency"
              select
              label="Selecciona el edificio"
              value={inputs.edificioName}
              onChange={handleChangeReclamos}
              fullWidth
              size="small"
            >
              {currencies.map((option) => (
                option.value != '' && <MenuItem key={option.codigoEdificio} value={option}>
                  Nombre: {option.value}, Dirección: {option.label}
                </MenuItem>
              ))}
            </TextField>}

            {unida.length > 0 && <TextField
              margin='normal'
              id="outlined-select-currency"
              select
              label="Selecciona la unidad"
              value={inputs.unidades}
              name='unidades'
              onChange={handleChange}
              fullWidth
              size="small"
            >
              {unida.map((option) => (
                option.piso !== '' && <MenuItem key={option.piso} value={option.piso}>
                  piso: {option.piso}, numero: {option.numero}
                </MenuItem>
              ))}
            </TextField>
            }

            <TextField
              margin='normal'
              label="Ubicación"
              value={inputs.ubicacion}
              type={'text'}
              name='ubicacion'
              onChange={handleChange}
              fullWidth
              size="small"
              variant='outlined'
              xs={{
                color: 'red'
              }}
            >
            </TextField>

            <TextField
              margin='normal'
              type={'text'}
              label="Descripción"
              value={inputs.descripcion}
              name='descripcion'
              onChange={handleChange}
              fullWidth
              size="small"
              variant='outlined'>
            </TextField>

            <TextField
              margin='normal'
              type={'file'}
              
              value={inputs.foto}
              name='fotos'
              onChange={handleChangeFoto}
              fullWidth
              size="small"
              variant='outlined'>
            </TextField>

            <Button
              sx={{ marginTop: 2 }}
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
        <NavBar></NavBar>
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
            Reclamo realizado con exito!
          </Typography>

          <Typography
            variant='p'
            padding={3}
          >
            Nro de reclamo: {idReclamo}
          </Typography>
        </Box>
      </>
    )
  }

}
