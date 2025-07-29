import React, {useEffect, useState} from 'react';
import "./header.css"
import {NavLink, useNavigate} from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useColorMode } from "../../../../util/theme/ThemeContext.jsx";
import {Alert, Box, Collapse, IconButton, TextField, Typography} from "@mui/material";
import logo from './logo.png'
import axiosInstance, {stopTokenRefreshInterval} from "../../../../util/axiosInstance.js";
import SettingsIcon from '@mui/icons-material/Settings';
import Slide from '@mui/material/Slide';
import EditIcon from '@mui/icons-material/Edit';
import AlertHook from "../../../../util/Alert.js";
import CloseIcon from "@mui/icons-material/Close";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Header = ()=>{
    const navigateTo = useNavigate();

    const {showAlert, open, alertStatus, closeAlert} = AlertHook();

    // for delete modal
    const { mode, toggleColorMode } = useColorMode();
        const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

        const handleClickOpen = () => {
            setOpenDeleteModal(true);
        };

        const handleClose = () => {
            setOpenDeleteModal(false);
        };





        // for settings modal

    const [openSettingsModal, setOpenSettingsModal] = React.useState(false);

    const handleClickOpenSettingsModal = () => {
        setOpenSettingsModal(true);
    };

    const handleCloseSettingsModal = () => {
        setOpenSettingsModal(false);
    };

    // get pat id

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
    const [userId, setUserId] = useState("")

    useEffect(()=>{
        fetchMe(email);
    }, [])
    const fetchMe = async (email)=>{
        try {
            const resp = await axiosInstance.get(`http://localhost:9092/api/patients/find-patient-by-email/${email}`)
            setUserId(resp.data.data.userId)
            console.log(resp.data.data)
        } catch (e) {
            showAlert("failed-fetch-me")

        }

    }




    // State for change email and password modals
    const [openChangeEmail, setOpenChangeEmail] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);

    const [newEmail, setNewEmail] = useState("");

    const handleChangeEmail = async ()=>{
        setOpenChangeEmail(false);
        await axiosInstance.put(`http://localhost:9090/api/users/update-email/${userId}`, {}, {params:{
                email:newEmail,
                role:"patient"
            }} ).then((res)=>{
            setNewEmail("")
            console.log(res.data)

            setTimeout(() => {

            }, 2000);
            showAlert("success-change-email");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
            // setEmail("")
        }).catch((err)=>{
            console.log(err)
            showAlert("failed-change-email")
        })
    }
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            {
                open && (
                    <Box sx={{ width: { xs: '96%', sm: '70%', md: '50%' },
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

                                {alertStatus === "failed-fetch-me" && "Failed to load some data. Please refresh the page and try again."}
                                {alertStatus === "success-change-email" && "Email changed successfully. You'll be redirect to the login page"}
                                {alertStatus === "failed-change-email" && "Failed to change email. Please try again."}
                            </Alert>
                        </Collapse>
                    </Box>
                )
            }
            {/* Navigation Bar */}
            <div className="header" style={{ backgroundColor: mode === "dark" ? "var(--color-dark3)" : "white" }}>
                <div className="logo">
                    <img className="logo-image" src={logo} alt="Logo" />
                </div>
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? "✖" : "☰"}
                </button>
                <nav className={`nav${menuOpen ? " open" : ""}`}>
                    <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/context/appointments" onClick={() => setMenuOpen(false)}>Appointments</NavLink>
                    <NavLink to="/context/history" onClick={() => setMenuOpen(false)}>History</NavLink>
                    <NavLink to="/context/reviews" onClick={() => setMenuOpen(false)}>Reviews</NavLink>
                    <NavLink to="/context/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
                    {/* Add more links as needed */}
                </nav>
                {/*settings modal*/}
                <React.Fragment>
                    <Dialog
                        open={openSettingsModal}
                        slots={{
                            transition: Transition,
                        }}
                        keepMounted
                        onClose={handleCloseSettingsModal}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>
                            <Button color="var(--color-cream)" sx={{
                                    backgroundColor:"var(--color-green-forest)"
                            }}  onClick={handleClickOpen}>Logout</Button>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    display:"flex",
                                    gap:5,

                                    justifyContent:"space-between",
                                    width:"400px"
                                }}>
                                <Typography variant="h6">{localStorage.getItem("email")}</Typography>
                                    <IconButton>
                                        <EditIcon onClick={()=>{
                                            setOpenChangeEmail(true)
                                            setOpenSettingsModal(false)
                                        }}
                                                  />
                                    </IconButton>
                                </Box>
                            {/*    create modal here*/}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button sx={{color:"var(--color-cream)"}} onClick={handleCloseSettingsModal}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>

                {/* Change Email Modal */}
                <Dialog  open={openChangeEmail} onClose={() => setOpenChangeEmail(false)}>
                    <DialogTitle>Change Email</DialogTitle>
                    <DialogContent sx={{paddingX:1, width:"500px"}}>
                        <DialogContentText>
                            Enter your new email address. Once update the email, You will be redirected to the login page.
                        </DialogContentText>
                        <TextField
                            fullWidth
                            value={newEmail}
                            onChange={(e)=>{
                                setNewEmail(e.target.value)
                            }}
                            placeholder="New Email"
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenChangeEmail(false)} sx={{ color: "var(--color-green-forest)" }}>Cancel</Button>
                        <Button variant="contained" onClick={handleChangeEmail} sx={{ backgroundColor: "var(--color-green-forest)" }}>Save</Button>
                    </DialogActions>
                </Dialog>
                {/* Change Password Modal */}
                <Dialog open={openChangePassword} onClose={() => setOpenChangePassword(false)}>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your new password below.
                        </DialogContentText>
                        <input
                            type="password"
                            placeholder="New Password"
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginTop: '12px',
                                borderRadius: '6px',
                                border: '1px solid var(--color-green-forest)'
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenChangePassword(false)} sx={{ color: "var(--color-green-forest)" }}>Cancel</Button>
                        <Button variant="contained" sx={{ backgroundColor: "var(--color-green-forest)" }}>Save</Button>
                    </DialogActions>
                </Dialog>
                <div className="user">
                    <span className="user-name" style={{ color: mode === "dark" ? "var(--color-cream)" : "var(--color-dark1)" }}>{localStorage.getItem("email")?.split("@")[0]}</span>

                    <IconButton>
                        <SettingsIcon onClick={handleClickOpenSettingsModal} />
                    </IconButton>
                </div>
                <IconButton onClick={toggleColorMode} color={mode === "dark" ? "inherit" : "default"}>
                    {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </div>

            {/*delete modal*/}
            <React.Fragment>
                <Dialog
                    open={openDeleteModal}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Logout?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            If you logout, you will be redirected to the login page. Are you sure you want to logout?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{
                                color:"var(--color-green-forest)"
                            }}
                            onClick={()=>{
                                handleClose();
                            }} autoFocus>Cancel</Button>
                        <Button variant='contained'
                                sx={{
                                    backgroundColor:"var(--color-green-forest)"
                                }}
                                onClick={()=>{
                                    handleClose();
                                    stopTokenRefreshInterval();
                                    localStorage.removeItem("access_token");
                                    localStorage.removeItem("refresh_token");
                                    window.location.href = "/login";
                                }} >
                            Logout
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}
export default Header;
