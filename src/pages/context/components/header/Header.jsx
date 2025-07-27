
import React from 'react';
import "./header.css"
import {NavLink} from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useColorMode } from "../../../../util/theme/ThemeContext.jsx";
import {IconButton} from "@mui/material";
import logo from './logo.png'
import {stopTokenRefreshInterval} from "../../../../util/axiosInstance.js";
import SettingsIcon from '@mui/icons-material/Settings';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Header = ()=>{

    // for delete modal
    const { mode, toggleColorMode } = useColorMode();
        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };





        // for settings modal

    const [openSettingsModal, setOpenSettingsModal] = React.useState(false);

    const handleClickOpenSettingsModal = () => {
        setOpenSettingsModal(true);
    };

    const handleCloseSettingsModal = () => {
        setOpenSettingsModal(false);
    };

    // State for change email and password modals
    const [openChangeEmail, setOpenChangeEmail] = React.useState(false);
    const [openChangePassword, setOpenChangePassword] = React.useState(false);

    return (
        <>
            <div className="header" style={{ backgroundColor: mode === "dark" ? "var(--color-dark3)" : "white" }}>
                <div className="logo">
                    <img src={logo} alt=""/>
                </div>
                <ul className="list">
                    <li className="list-item"><NavLink style={{
                        backgroundColor:"transparent",
                        color: mode === "dark" ? "var(--color-off-white)" : "var(--color-dark1)",
                    }} to="/context/home" className={({ isActive }) => isActive ? "active" : undefined}>Home</NavLink></li>

                    <li className="list-item"><NavLink style={{
                        backgroundColor:"transparent",
                        color: mode === "dark" ? "var(--color-off-white)" : "var(--color-dark1)",
                    }} to="/context/doctors" className={({ isActive }) => isActive ? "active" : undefined}>Doctors</NavLink></li>
                    <li className="list-item"><NavLink style={{
                        backgroundColor:"transparent",
                        color: mode === "dark" ? "var(--color-off-white)" : "var(--color-dark1)",
                    }} to="/context/appointments" className={({ isActive }) => isActive ? "active" : undefined}>Appointments</NavLink></li>



                </ul>
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
                            {/*    create modal here*/}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button sx={{color:"var(--color-cream)"}} onClick={handleCloseSettingsModal}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>

                {/* Change Email Modal */}
                <Dialog open={openChangeEmail} onClose={() => setOpenChangeEmail(false)}>
                    <DialogTitle>Change Email</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your new email address below.
                        </DialogContentText>
                        <input
                            type="email"
                            placeholder="New Email"
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
                        <Button onClick={() => setOpenChangeEmail(false)} sx={{ color: "var(--color-green-forest)" }}>Cancel</Button>
                        <Button variant="contained" sx={{ backgroundColor: "var(--color-green-forest)" }}>Save</Button>
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
                        <SettingsIcon color="action" onClick={handleClickOpenSettingsModal} />
                    </IconButton>
                </div>
                <IconButton onClick={toggleColorMode} color={mode === "dark" ? "inherit" : "default"}>
                    {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </div>

            {/*delete modal*/}
            <React.Fragment>
                <Dialog
                    open={open}
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