import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Alert, Autocomplete, Box, Button, Collapse, IconButton, TextField} from "@mui/material";
import axiosInstance from "../../../../util/axiosInstance.js";
import {useEffect, useState} from "react";
import AlertHook from "../../../../util/Alert.js";
import CloseIcon from "@mui/icons-material/Close";


const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'specialization', label: 'Specialization', minWidth: 100 },
    { id: 'hospital', label: 'Hospital', minWidth: 100 },
    { id: 'city', label: 'City', minWidth: 80 },

];


export default function ViewDoctor() {

    const {open, alertStatus, showAlert, closeAlert} = AlertHook();
    // ------------------------------------------------------------------

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchDoctors(newPage, rowsPerPage, searchText);
    };

    const handleChangeRowsPerPage = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setRowsPerPage(newSize);
        setPage(0);
        fetchDoctors(0, newSize, searchText);

    };

    // ------------------------------------------------------------------


    useEffect(() => {
        fetchSpecializations()
        fetchDoctors(page, rowsPerPage, searchText)
    }, []);

    // ------------------------------------------------------------------


    const [specializations, setSpecializations] = useState([])
    const [specialization, setSpecialization] = useState("")
    const [specName, setSpecName] = useState("")

    const fetchSpecializations = async ()=>{
        try {
            const response = await axiosInstance.get("http://localhost:9091/api/specializations/find-all-specializations",{params: {searchText:""}}
            );
            setSpecializations(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            showAlert("failed-fetch-spec")
            console.error("Error fetching specializations:", error);
        }
    }
    // ------------------------------------------------------------------

    const [searchText, setSearchText] = useState("")
    const [doctors, setDoctors] = useState([]);
    const [doctorCount, setDoctorCount] = useState(0);

    const fetchDoctors = async (pageNumber = page, size = rowsPerPage, search = searchText) => {

        try {
            const response = await axiosInstance.get('/doctors/find-all-doctors', {
                baseURL: 'http://localhost:9091/api', // baseURL dynamically set here
                params: {
                    searchText: search,
                    page: pageNumber,
                    size: size
                }
            });

            if(response.data.data.dataCount === 0){
                showAlert("no-doctor-found")
            }
            setDoctors(response.data.data.dataList);
            setDoctorCount(response.data.data.dataCount)



        } catch (err) {
            showAlert("failed-fetch-doc")
            console.log("Error is " + err);


        }
    };
    const rows = doctors.map((doc) => ({
        name: doc.name,
        email: doc.email,
        phoneNumber: doc.phoneNumber,
        specialization: doc.specialization,
        experience: doc.experience,
        hospital: doc.hospital,
        address: doc.address,
        licenceNo: doc.licenceNo,
        city: doc.city,
        doctorId: doc.doctorId,
        userId: doc.userId
    }));

    // ------------------------------------------------------------------

    return (
        <Box sx={{ width: '90%', mx: 'auto' , marginTop:"50px"}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap:5, height:"55px", marginBottom:"20px" }}>
                <Autocomplete
                    sx={{
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        input: { color: 'var(--text-primary)' },
                        label: { color: 'var(--text-secondary)' },
                        height:"100%",

                    }}
                    value={specializations.find(p => p.specialization === specName) || null}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setSpecialization(newValue);     // full object
                            setSpecName(newValue.specialization); // just the name string
                            fetchDoctors(page, rowsPerPage, newValue.specialization);

                        } else {
                            // setDoctor(null);
                            // setDocId(null);
                            // setDocName("");
                        }
                    }}
                    options={specializations}
                    getOptionLabel={(option) => option.specialization || ""}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    fullWidth
                    renderInput={(params) => <TextField sx={{
                        color: 'var(--text-primary)',
                        input: { color: 'var(--text-primary)' },
                        label: { color: 'var(--text-secondary)' },
                    }} {...params} label="search by specialization" />}
                />
                <Button sx={{
                    height:"100%",
                    paddingX:"30px",
                    backgroundColor:"var(--color-green-dark)",
                    color:"var(--color-off-white)",
                    fontSize:"18px",
                    "&:hover":{
                        backgroundColor:"var(--color-green-forest)",
                        color:"var(--color-off-white)",
                    }
                }} variant="contained" onClick={() => {
                    fetchDoctors(page, rowsPerPage, searchText).then(() => {
                        setSpecialization("")
                        setSpecName("")
                    })
                }}>cancel</Button>
            </Box>

            {
                open && (
                    <Box sx={{  width: { xs: '96%', sm: '70%', md: '50%' },
                        margin: "0 auto",
                        position: "fixed",
                        top: "65px",
                        right: 0,
                        left: 0,
                        zIndex: 14,
                        px: { xs: 1, sm: 0 } }}>
                        <Collapse in={open}>
                            <Alert
                                severity={alertStatus.includes("success") ? "success" : "error"}
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        onClick={closeAlert}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                }
                            >

                                {alertStatus === "success-fetch-doc" && "Doctors fetched successfully!"}
                                {alertStatus === "failed-fetch-doc" && "Failed to fetch doctors. Please refresh the page and try again."}
                                {alertStatus === "failed-fetch-spec" && "Failed to specializations. Please refresh the page and try again."}
                                {alertStatus === "no-doctor-found" && "No doctors found for this specialization."}
                            </Alert>
                        </Collapse>
                    </Box>
                )
            }

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 700 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={doctorCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        </Box>
    );
}
