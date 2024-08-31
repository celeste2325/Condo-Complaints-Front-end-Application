import React, {useEffect, useState} from 'react';
import background from '../assets/images/background.jpg'
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import {NavBar} from './NavBar';
import {Complaint} from './Complaint'
import {useAuth} from './auth';
import {getUserByDocument} from '../services/serviceLogin'
import {complaintsByTenant, devuelveReclamos} from '../services/reclamoService';

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
    const [complaints, setComplaints] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (auth.user != null) {
            setComplaintsByTenant();
        }
    }, [auth.user])

    const setComplaintsByTenant = async () => {
        const userByDocument = await (await getUserByDocument(auth.user)).json();
        setUser(userByDocument.nombre);

        if (userByDocument.roles === 'admin') {
            setIsAdmin(true);
            //TODO change endpoint to get DTO
            const getAllComplaints = await (await devuelveReclamos()).json();
            setComplaints(getAllComplaints);
        } else {
            const complaintsByTenantResponse = await (await complaintsByTenant(auth.user)).json();
            setComplaints(complaintsByTenantResponse);
        }
    }
    return (
        <Box
            sx={{
                width: {lg: '70vw', xs: '80vw', sm: '72vw'},
                height: 'auto',
                margin: 'auto',
                padding: '10px',
                backgroundImage: `url(${background})`,
                boxSizing: 'border-box',
                marginTop: {sm: '10%', xs: '16%', lg: '5%'},
            }}
        >
            <NavBar isAdministrador={isAdmin}/>
            <Grid container spacing={2} columns={12}>
                <Grid item xs={12}>
                    <Item>
                        <Typography>
                            {isAdmin ?
                                `Hi ${user}! Welcome! You can easily manage condo complaints, check tenant issues, and update their status here.
`
                                :
                                `Hi ${user}, welcome! Here, you can submit your complaints and track their status.`
                            }
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant='h5'
                        textAlign='center'
                        margin='2%'
                        color={'blue'}>
                        {isAdmin ? "Tenant Complaints" : "My Complaints"}
                    </Typography>
                    <Item>
                        <Complaint complaints={complaints}/>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
