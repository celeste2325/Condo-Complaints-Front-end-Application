import React, {useEffect, useState} from 'react';
import {DataGrid, GridPagination} from '@mui/x-data-grid';
import {Box, Card, CardContent, CardMedia, Typography} from '@mui/material';
import background from '../../src/assets/images/background.jpg'

export function Complaint(props) {
    const complaints = props.complaints;
    const columns = [
        {field: 'complaintID', headerName: 'Complaint ID', width: 100},
        {field: 'buildingName', headerName: 'Building', width: 170},
        {field: 'unitNumber', headerName: 'Unit', width: 80},
        {field: 'locationIssue', headerName: 'Location issue', width: 150},
        {field: 'description', headerName: 'Description', width: 200},
        {field: 'status', headerName: 'Status', width: 90, editable: true},
    ];
    const [rows, setRows] = useState([{
        complaintID: '',
        buildingName: '',
        locationIssue: '',
        description: '',
        unitNumber: '',
        status: '',
    }]);
    const [selectedComplaint, setSelectedComplaint] = useState('');
    const CustomFooter = () => {
        return (
            <Box p={2} bgcolor="background.paper"
                 display="flex"
                 justifyContent="space-between">

                <Card sx={{minWidth: '100%'}}>
                    <GridPagination/>
                    {selectedComplaint !== '' &&
                        <CardMedia
                            component="img"
                            height="140"
                            image={background}
                            title="Photo issue"
                        />
                    }
                    {selectedComplaint !== '' &&
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {selectedComplaint.buildingName} Building |
                                Unit: {selectedComplaint.unitNumber} |
                                Location Issue: {selectedComplaint.locationIssue}
                            </Typography>
                            <Typography variant="body1">
                                <Typography component="span" variant="subtitle1" fontWeight="bold">
                                    Description:&nbsp;
                                </Typography>
                                {selectedComplaint.description}
                            </Typography>
                        </CardContent>
                    }
                </Card>
            </Box>
        );
    };

    useEffect(() => {
        setRowValues();

    }, [complaints])

    const setRowValues = async () => {
        const rowsAux = [];
        if (complaints.length > 0) {
            complaints.map(complaint => {
                rowsAux.push({
                    complaintID: complaint.complaintID,
                    buildingName: complaint.buildingName,
                    locationIssue: complaint.locationIssue,
                    description: complaint.description,
                    unitNumber: complaint.unit,
                    status: complaint.status,
                })
            });
            setRows(rowsAux);
        }
    }
    const handleSelectedComplaint = (e) => {
        setSelectedComplaint(e.row)
    }

    return (
        <div style={{height: 'auto', width: '100%'}}>
            <DataGrid
                getRowId={(row) => row.complaintID}
                rows={rows}
                columns={columns}
                pageSize={6}
                rowsPerPageOptions={[5]}
                autoHeight
                onCellClick={handleSelectedComplaint}
                components={{
                    Footer: () => <CustomFooter/>
                }}
            />
        </div>
    );
}





