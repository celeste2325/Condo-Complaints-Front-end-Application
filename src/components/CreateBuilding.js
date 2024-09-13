import {Box, Button, TextField, Typography} from '@mui/material'
import React, {useState} from 'react'
import {create_building} from '../services/buildingService'
import {useNavigate} from 'react-router-dom';


export function CreateBuilding() {
    const navigate = useNavigate();
    const [buildingCreated, setBuildingCreated] = useState(false)
    const [inputs, setInputs] = useState({
        buildingName: '',
        address: ''
    })

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await create_building(inputs);
        if (response.success) {
            setBuildingCreated(true);
        }
    }
    const goBack = () => {
        setBuildingCreated(false)
        setInputs({
            buildingName: '',
            address: ''
        })
    }

    if (!buildingCreated) {
        return (
            <>
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
                            Register Building
                        </Typography>

                        <TextField
                            name='buildingName'
                            margin='normal'
                            id="outlined-select-edificio"
                            type={'text'}
                            label="Name"
                            value={inputs.buildingName}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        ></TextField>

                        <TextField
                            margin='normal'
                            label="Address"
                            value={inputs.address}
                            type={'text'}
                            name='address'
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
                            Register
                        </Button>

                    </Box>
                </form>
            </>
        )
    } else {
        return (
            <>
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
                        Building created successfully!
                    </Typography>
                    <Button
                        onClick={goBack} fullWidth sx={{marginTop: 2}} variant='contained'
                        color='secondary'>Go Back
                    </Button>

                </Box>
            </>
        )
    }

}
