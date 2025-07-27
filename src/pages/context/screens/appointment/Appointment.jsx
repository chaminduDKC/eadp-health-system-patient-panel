import React, {useEffect, useState} from "react";
import {useColorMode} from "../../../../util/theme/ThemeContext.jsx";
import {
    Box,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
    TextField,
    Autocomplete, CircularProgress, IconButton, Alert, Collapse
} from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import axiosInstance from "../../../../util/axiosInstance.js";
import AlertHook from '../../../../util/Alert.js'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const Appointment = () => {
    const mode = useColorMode();

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    const token = localStorage.getItem("access_token");
    const decoded = parseJwt(token);
    const email = decoded?.email || decoded?.preferred_username;
    const [rows, setRows] = useState([]);

    const fetchMyAppointments = async () =>{
        try {
            const resp = await axiosInstance.get(`http://localhost:9092/api/patients/find-patient-by-email/${email}`)
            const {patientId} = resp.data.data;

            const response = await axiosInstance.get(`http://localhost:9093/api/bookings/find-bookings-by-patient/${patientId}`);
            console.log(response.data.data)
            setRows(response.data.data)
        } catch (e) {
            showAlert("failed-fetch-my-appointments");
            console.log(e)
        }
    }

    const {showAlert, open, alertStatus, closeAlert} = AlertHook();

    const [specialization, setSpecialization] = useState("");
    const [doctor, setDoctor] = useState("");
    const [date, setDate] = useState(null);
    const [timeSlot, setTimeSlot] = useState("");
    const [reason, setReason] = useState("Any Reason");
    const [loading, setLoading] = useState(false)


    const handlePlaceAppointment = async () => {
        setLoading(true)

        try {
            const resp = await axiosInstance.get(`http://localhost:9092/api/patients/find-patient-by-email/${email}`)
                const {name, patientId} = resp.data.data;

            const bookingRequest = {
                patientId:patientId,
                patientName:name,
                doctorId:docId,
                doctorName:docName,
                date:date.format("YYYY-MM-DD"),
                time:timeSlot,
                reason:reason,
                status:"PENDING",
                paymentStatus:"PENDING"
            }
            console.log("booking req is ")
            console.log(bookingRequest)
            await axiosInstance.post("http://localhost:9093/api/bookings/create-booking",
                bookingRequest,
                {headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("access_token")}`}}
            ).then(()=>{
                setTimeSlot("")
                fetchTimeSlots(docId, date.format("YYYY-MM-DD"))
                fetchMyAppointments()
                showAlert("success-create-appointment")
            });

        } catch (error) {
            showAlert("failed-create-appointment")
            setLoading(false)
            console.error("Failed to fetch patient by email", error);
        }

        setLoading(false)
        console.log("Placed")
    };

    const [specializations, setSpecializations] = useState([]);

    useEffect(() => {
        fetchSpecializations()
        fetchDoctors();
        fetchMyAppointments();

    }, []);
    const fetchSpecializations = async () => {
        try {
            const response = await axiosInstance.get("http://localhost:9091/api/specializations/find-all-specializations", {params: {searchText: ""}}
            );
            setSpecializations(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            showAlert("failed-fetch-spec")
            console.error("Error fetching specializations:", error);
        }
    }

    const [specId, setSpecId] = useState("")
    const [specName, setSpecName] = useState("")
    const [doctors, setDoctors] = useState([])
    const [availableDatesByDoctor, setAvailableDatesByDoctor] = useState([]);

    const fetchDoctorsBySpecialization = async (specialization) => {
        try {
            const response = await axiosInstance.get(`http://localhost:9091/api/doctors/find-doctors-by-specialization`, {params: {specialization}}
            );
            if(response.data.data === null || response.data.data.length === 0){
                showAlert("no-doctor-found-for-spec")
                setDoctors([]);
                return;
            } else {
                setDoctors(response.data.data);
                console.log(response.data.data);
            }

        } catch (error) {
            showAlert("failed-fetch-doc")
            console.error("Error fetching doctors by specialization:", error);
        }

        console.log(specialization)
    }
    const [docName, setDocName] = useState("")
    const [docId, setDocId] = useState("")

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [bookingId, setBookingId] = useState("");

    const handleCloseDeleteModal = ()=>{
        setDeleteModalOpen(false)
    }

    const deleteBooking = async (bookingId)=>{

        try {
            await axiosInstance.delete(`http://localhost:9093/api/bookings/delete-by-booking-id/${bookingId}`,
                {headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("access_token")}`}}
            );
            showAlert("success-delete")
            await fetchMyAppointments();
            setDeleteModalOpen(false);
        } catch (error) {
            showAlert("failed-delete")
            console.error("Error deleting booking:", error);
        }
    }

    const fetchDoctors = async () => {
        try {
            const response = await axiosInstance.get("http://localhost:9091/api/doctors/find-all-doctors",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    },
                    params: {searchText: "", page: 0, size: 1000}
                }
            );
            if(response.data.data.dataList.length === 0){
                showAlert("no-any-doctor-found")
                setDoctors([]);
                return;
            }
            const doctorNames = response.data.data.dataList.map((d) => ({
                id: d.doctorId,
                name: d.name,
            }));
            setDoctors(doctorNames);
        } catch (error) {
            showAlert("failed-fetch-doc")
            console.log(error)

        }
    }

    const getAvailableDatesByDoctor = async (docId)=>{
        await axiosInstance.get(`http://localhost:9093/api/bookings/get-available-dates-by-doctor/${docId}`).then(res=>{

            if(res.data.data.length === 0){
                showAlert("no-available-dates-for-doctor")
                setAvailableDatesByDoctor([])

            } else {
                console.log(res.data.data)
                setAvailableDatesByDoctor(res.data.data)
            }
        }).catch((error)=>{
            showAlert("failed-fetch-available-dates")
            console.log(error)
        })

    }


    const [timeSlots, setTimeSlots] = useState([])

    const fetchTimeSlots = async (docId, date) => {
        console.log("doc id id in method "+docId)
        console.log("date in method "+date)
        try {
            const response = await axiosInstance.get(`http://localhost:9093/api/availabilities/get-availabilities-by-date-and-doctor/${docId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                },
                params: {date: date}
            });
            if (response.data.data.length === 0) {
                showAlert("failed-not-selected-or-available")
                setTimeSlots([]);
                return;
            }
            const slots = response.data.data.map((slot, idx) => ({id: idx, name: slot}));
            setTimeSlots(slots);
            console.log(slots)
            return slots;
        } catch (error) {
            showAlert("failed-fetch-time-slot");
            console.error("Error fetching time slots:", error);
            return [];
        }
    }

    const clearFields = ()=>{
        setDate(null)
        setDocName("")
        setSpecialization("")
        setSpecName("")
    }

  return (
      <>

      <Box sx={{
          display:"flex", marginTop: "50px", mx:"auto", width: "100%", gap: 3, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: "center"
      }}>
          {
              open && (
                  <Box sx={{ width: '50%', margin: "0 auto", position: "absolute", top: "65px", right: "0", left: "0", zIndex: "14" }}>
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

                              {alertStatus === "failed-fetch-doc" && "Failed to load doctors. Please refresh the page and try again."}
                              {alertStatus === "failed-fetch-my-appointments" && "Failed to load your booked appointments. Please refresh the page and try again."}
                              {alertStatus === "success-create-appointment" && "Appointment created successfully."}
                              {alertStatus === "failed-create-appointment" && "Appointment created was unsuccessful."}
                              {alertStatus === "failed-fetch-time-slot" && "Failed to load available times. Please refresh the page and try again."}
                              {alertStatus === "failed-fetch-spec" && "Failed to specializations. Please refresh the page and try again."}
                              {alertStatus === "failed-fetch-available-dates" && "Failed load available dates. Please refresh the page and try again."}
                              {alertStatus === "no-doctor-found" && "No doctors found for this specialization."}
                              {alertStatus === "no-any-doctor-found" && "No doctors found at this time."}
                              {alertStatus === "no-doctor-found-for-spec" && "No doctors found this specialization."}
                              {alertStatus === "no-available-dates-for-doctor" && "No available dates for this doctor. Try another doctor"}
                              {alertStatus === "failed-not-selected-or-available" && "No time is available for this doctor on this date. Please select another date or doctor."}
                          </Alert>
                      </Collapse>
                  </Box>
              )
          }
    <Box sx={{ width: '30%', p: 2, display:"flex", flexDirection:"column",maxHeight:"700px", border:"1px solid var(--color-dark2)",borderRadius:2, gap:3,  }}>

        <React.Fragment>
            <Dialog
                open={deleteModalOpen}
                onClose={handleCloseDeleteModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you delete, all appointment related data will be lost
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            color:"var(--color-green-forest)"
                        }}
                        onClick={()=>{
                            handleCloseDeleteModal();
                        }} autoFocus>Cancel</Button>
                    <Button variant='contained'
                            sx={{
                                backgroundColor:"var(--color-green-forest)"
                            }}
                            onClick={()=>{
                                console.log("current id is " + bookingId)
                                deleteBooking(bookingId)

                            }} >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </ React.Fragment>

      <Typography sx={{
          color:"var(--color-green-forest)"
      }} variant="h5" textAlign="center" mb={1}>Book an Appointment</Typography>
        <Autocomplete
            sx={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                input: { color: 'var(--text-primary)' },
                label: { color: 'var(--text-secondary)' },
                marginTop: "10px"
            }}
            value={specializations.find(p => p.specialization === specName) || null}
            onChange={(event, newValue) => {
                if (newValue) {
                    setSpecialization(newValue);     // full object
                    setSpecId(newValue.specializationId);    // patient ID
                    setSpecName(newValue.specialization); // just the name string
                    fetchDoctorsBySpecialization(newValue.specialization);
                } else {
                    setDoctor(null);
                    setDocId(null);
                    setDocName("");
                }
            }}
            options={specializations}
            getOptionLabel={(option) => option.specialization || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Specializations" />}
        />



        <Autocomplete
            sx={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                input: { color: 'var(--text-primary)' },
                label: { color: 'var(--text-secondary)' },
                marginTop: "10px"
            }}

            value={doctors.find(p => p.name === docName) || null}
            onChange={(event, newValue) => {
                if (newValue) {
                    setDoctor(newValue);
                    console.log(newValue)// full object
                    setDocId(newValue.doctorId);    //
                    setDocName(newValue.name); //
                    console.log( (newValue.doctorId)); //
                    getAvailableDatesByDoctor(newValue.doctorId)
                } else {
                    getAvailableDatesByDoctor(docId)
                    console.log("New value")
                }
            }}
            options={doctors}
            getOptionLabel={(option) => option.name || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Doctors" />}
        />


      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Choose Date"
          value={date}
          onChange={newDate => {
              setTimeSlot("")
              console.log(newDate.format("YYYY-MM-DD"))
              console.log(" doc iid is "+docId)
              setDate(newDate);
              if (docId && newDate) {
                  const formattedDate = newDate.format ? newDate.format("YYYY-MM-DD") : newDate;
                  fetchTimeSlots(docId, formattedDate);
              }
          }}
          disabled={!doctor}
          disablePast
          shouldDisableDate={d => {
            if (!doctor || !availableDatesByDoctor || !Array.isArray(availableDatesByDoctor)) return true;
            const iso = d.format('YYYY-MM-DD');
            return !availableDatesByDoctor.includes(iso);
          }}
          renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
        />
      </LocalizationProvider>
      <FormControl fullWidth sx={{ mb: 2 }} disabled={!date}>
        <InputLabel>Time Slot</InputLabel>
        <Select
            value={timeSlot}
            label="Time Slot"
            onChange={e => setTimeSlot(e.target.value)}
        >
          {timeSlots.map(slot => (
            <MenuItem key={slot.id} value={slot.name}>{slot.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

        <TextField
            label="Reason for Appointment"
            variant="outlined"
            fullWidth
            placeholder="Optional"
            onChange={(e)=>{
                setReason(e.target.value)
            }}
            value={reason} // Placeholder text, can be changed as needed
        />
        <Box display="flex" mt={2} gap={2}>
      <Button variant="contained" sx={{
          backgroundColor:"var(--color-green-forest)",
          width:"200px",
          color:"var(--color-cream)",
      }} fullWidth disabled={!specialization || !doctor || !date || !timeSlot} onClick={handlePlaceAppointment}>

          {loading ? <CircularProgress /> :"Place Appointment"}
      </Button>
        <Button
            onClick={()=>{
                clearFields()
            }}
            sx={{
            color:"var(--color-green-forest)"
        }}>cancel</Button>
        </Box>
    </Box>
          <Box sx={{
              width:"60%",
              border:"1px solid var(--color-dark2)",
              borderRadius:2,
              p:2,
              maxHeight:"650px",
              overflow:"auto",
              overflowY: "scroll",
              scrollbarWidth: "none", // For Firefox
              "&::-webkit-scrollbar": { display: "none" }, // For Chrome, Safari
          }}>
              <Typography variant='h5' textAlign="center" mb={5} sx={{
                 color:"var(--color-green-forest)"
              }}>Your Appointments</Typography>
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                          <TableRow>
                              <TableCell>Doctor</TableCell>
                              <TableCell align="right">Date</TableCell>
                              <TableCell align="right">Time</TableCell>
                              <TableCell align="right">Reason</TableCell>
                              <TableCell align="right">Payment</TableCell>
                              <TableCell align="right">Status</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {rows.map((row) => (
                              <TableRow
                                  key={row.name}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                  <TableCell component="th" scope="row">
                                      {
                                              <IconButton
                                                  onClick={()=>{
                                                      setDeleteModalOpen(true)
                                                      setBookingId(row.bookingId)
                                                  }}
                                                  disabled={row.status === "CONFIRMED"}>
                                                  <DeleteForeverIcon />
                                              </IconButton>

                                      }
                                      {row.doctorName}
                                  </TableCell>
                                  <TableCell align="right">{row.date}</TableCell>
                                  <TableCell align="right">{row.time}</TableCell>
                                  <TableCell align="right">{row.reason}</TableCell>
                                  <TableCell align="right">{row.paymentStatus}</TableCell>
                                  <TableCell align="right">{row.status}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
          </Box>
          {/*delete modal*/}

    </Box>
      </>
  );
}
export default Appointment;