import React, {useEffect, useState} from 'react';
import {DataGrid, GridPagination} from '@mui/x-data-grid';
import {Box, Card, CardContent, CardMedia, MenuItem, Select, Typography} from '@mui/material';
import {getImage} from '../services/fileService';
import {updateComplaintStatus} from "../services/complaintService";
import {useAuth} from "./auth";

export function Complaint(props) {
    const complaints = props.complaints;
    const auth = useAuth();
    const columns = [
        {field: 'complaintID', headerName: 'Complaint ID', width: 100},
        {field: 'buildingName', headerName: 'Building', width: 170},
        {field: 'unit', headerName: 'Unit', width: 80},
        {field: 'locationIssue', headerName: 'Location issue', width: 150},
        {field: 'description', headerName: 'Description', width: 200},
        {
            field: 'status', headerName: 'Status', width: 90, editable: auth.isAdmin,
            //this defines how the cell will be rendered in edit mode
            renderEditCell: (params) => <StatusEditCell {...params} />,
        },
    ];
    const [rows, setRows] = useState([{
        complaintID: '',
        buildingName: '',
        locationIssue: '',
        description: '',
        unit: '',
        status: '',
    }])
    const [selectedComplaint, setSelectedComplaint] = useState(rows);
    const [selectedComplaintImage, setSelectedComplaintImage] = useState(null);
    const [showDataComplaint, setShowDataComplaint] = useState(false);

    useEffect(() => {
        setRowValues();

    }, [complaints])

    const setRowValues = async () => {
        const rowsAux = [];
        if (complaints.length > 0) {
            complaints.map(complaint => {
                const {complaintID, buildingName, locationIssue, description, unit, status} = complaint;
                rowsAux.push({
                    complaintID,
                    buildingName,
                    locationIssue,
                    description,
                    unit,
                    status
                })
            });
            setRows(rowsAux);
        }
    }
    const handleSelectedComplaint = async (e) => {
        //It allows displaying the selected complaint information.
        setShowDataComplaint(true);

        const {complaintID, buildingName, locationIssue, description, unit, status} = e.row;

        setSelectedComplaint((prevState) => ({
            ...prevState,
            complaintID,
            buildingName,
            locationIssue,
            description,
            unit,
            status
        }));

        //get and set selected complaint image
        const getImageResponse = await getImage(e.row.complaintID);
        setSelectedComplaintImage(getImageResponse.data);
    }

    //Render the drop-down menu in the status cell when in edit mode
    function StatusEditCell(props) {
        //id: rowID; value: The current value of the cell(status); field: The field being edited (status).
        //api: methods provided by the DataGrid API to interact with and manipulate the grid.
        const {id, value, field, api} = props;

        const handleChange = (event) => {
            //This updates the value of the cell
            api.setEditCellValue({id, field, value: event.target.value});
            //This updates the value of the cell
            api.commitCellChange({id, field});
            // Return to view mode after selection
            api.setCellMode(id, field, 'view'); // Return to view mode after selection
        };
        return (
            <Select
                value={value || ''}
                onChange={handleChange}
                autoWidth
            >
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="In process">In process</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
        );
    }

    //set new status
    const handleProcessRowUpdate = (newRow) => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === newRow.id ? newRow : row))
        );
        return newRow;
    };
    //save the new status in the API
    const handleCellEditCommit = async (e) => {
        setSelectedComplaint(prevState => ({
            ...prevState,
            status: e.value
        }))
        return (await updateComplaintStatus(e));
    }

    const CustomFooter = () => {
        return (
            <Box p={2} bgcolor="background.paper"
                 display="flex"
                 justifyContent="space-between">

                <Card sx={{minWidth: '100%'}}>
                    <GridPagination/>
                    {showDataComplaint &&
                        <CardMedia
                            component="img"
                            height="auto"
                            image={selectedComplaintImage}
                            title="Photo issue"
                        />
                    }
                    {showDataComplaint &&
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {selectedComplaint.buildingName} Building |
                                Unit: {selectedComplaint.unit} |
                                Location Issue: {selectedComplaint.locationIssue}
                            </Typography>
                            <Typography variant="body1">
                                <Typography component="span" variant="subtitle1" fontWeight="bold">
                                    Description:&nbsp;
                                </Typography>
                                {selectedComplaint.description}
                            </Typography>

                            <Typography variant="body1">
                                <Typography component="span" variant="subtitle1" fontWeight="bold">
                                    Status:&nbsp;
                                </Typography>
                                {selectedComplaint.status}
                            </Typography>
                        </CardContent>
                    }
                </Card>
            </Box>
        );
    };

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
                processRowUpdate={handleProcessRowUpdate}
                onCellEditCommit={handleCellEditCommit}
                components={{
                    Footer: () => <CustomFooter/>
                }}
            />
        </div>
    );
}





