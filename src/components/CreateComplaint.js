import {Box, Button, MenuItem, TextField, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {NavBar} from './NavBar'
import {useAuth} from './auth'
import {getPersonByDocument} from './../services/serviceLogin'
import {getBuildingsByTenant} from '../services/edificioService'
import {createComplaint} from '../services/reclamoService'

export function CreateComplaint() {
    const use = useAuth();
    const [complaintID, setComplaintID] = useState('')
    const [buildings, setBuildings] = useState([{
        name: '',
        address: '',
        units: [{
            unitID: '',
            unitNumber: '',
            floor: '',
        }],
        buildingID: '',
        unitID: '',
    }]);
    const [units, setUnits] = useState([{
        floor: '',
        unitNumber: ''
    }]);
    const [complaintData, setComplaintData] = useState({
        buildingName: '',
        unitID: '',
        complaintLocation: '',
        complaintDescription: '',
        image: ''
    })
    const [userData, setUserData] = useState({
        date: '',
        nameUser: ''
    });

    useEffect(() => {
        initialValues();
    }, [0]);

    const initialValues = async () => {
        if (use.user !== null) {
            //stores the data of the person who has logged in
            const informationUser = await getPersonByDocument(use.user).then((response) => response.json());
            setUserData({
                ...userData,
                nameUser: informationUser.nombre
            });

            const buildingData = await getBuildingsByTenant(use.user).then((response) => response.json());

            buildingData.map(building => {
                //stores the buildings rented by the person
                setBuildings((prevBuilding) => {
                    return [...prevBuilding,
                        {
                            name: building.buildingName,
                            address: building.buildingAddress,
                            buildingID: building.buildingID,
                            units: building.units,
                        }
                    ]
                });
            });
        }
    }

    const handleSelectBuilding = (e) => {
        //set value of building
        setComplaintData((prevState) => ({
            ...prevState,
            buildingName: e.target.value,
            [e.target.name]: e.target.value
        }))

        //set tenant units
        const unitAux = [];
        buildings.map(building => {
            if (building.name === e.target.value.name) {
                building.units.map(unit => unitAux.push(unit))
            }
        });
        setUnits(unitAux);
    }

    const handleChangeUnit = (e) => {
        setComplaintData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleChangeImage = (e) => {
        const imageValue = e.target.value.split('\\');
        let imageName = imageValue[imageValue.length - 1];
        const fileImage = `http://127.0.0.1:8887/${imageName}`
        setComplaintData((prevState) => ({
            ...prevState,
            [e.target.name]: fileImage
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        saveComplaint(complaintData, use.user);
    }

    const saveComplaint = async (complaintData, documentUser) => {
        const response = await createComplaint(complaintData, documentUser);
        if (response.ok) {
            const responseJson = await response.json();
            setComplaintID(responseJson.idReclamo);
        }
    }

    if (complaintID === '') {
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
                        <Typography variant='h5' padding={3}>Create complaint</Typography>

                        <Typography variant='p' padding={1}>{userData.nameUser}, {use.user}</Typography>

                        {<TextField
                            name="building"
                            margin='normal'
                            id="outlined-select-currency"
                            select
                            label="Select building"
                            value={complaintData.buildingName}
                            onChange={handleSelectBuilding}
                            fullWidth
                            size="small"
                        >
                            {buildings.map((building) => (
                                building.name != '' &&
                                <MenuItem key={building.buildingID} value={building}>Name: {building.name},
                                    Address: {building.address}</MenuItem>
                            ))}
                        </TextField>}

                        {units.length > 0 && <TextField
                            margin='normal'
                            id="outlined-select-currency"
                            select
                            label="Select unit"
                            value={complaintData.unitID}
                            name='unitID'
                            onChange={handleChangeUnit}
                            fullWidth
                            size="small"
                        >
                            {units.map((unit) => (
                                    unit.floor !== '' && <MenuItem key={unit.unitID} value={unit.unitID}>
                                        Floor: {unit.floor}, Unit number: {unit.unitNumber}
                                    </MenuItem>)
                            )}
                        </TextField>
                        }

                        <TextField
                            margin='normal'
                            label="Complaint location"
                            value={complaintData.complaintLocation}
                            type={'text'}
                            name='complaintLocation'
                            onChange={handleChangeUnit}
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
                            label="Complaint description"
                            value={complaintData.complaintDescription}
                            name='complaintDescription'
                            onChange={handleChangeUnit}
                            fullWidth
                            size="small"
                            variant='outlined'>
                        </TextField>

                        <TextField
                            margin='normal'
                            type={'file'}
                            value={''}
                            name='image'
                            onChange={handleChangeImage}
                            fullWidth
                            size="small"
                            variant='outlined'>
                        </TextField>

                        <Button
                            sx={{marginTop: 2}}
                            variant='contained'
                            color='primary'
                            fullWidth
                            type='submit'
                        >
                            Create
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
                        Complaint submitted successfully!
                    </Typography>

                    <Typography
                        variant='p'
                        padding={3}
                    >
                        Complaint Number: {complaintID}
                    </Typography>
                </Box>
            </>
        )
    }

}
