import React, { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Paper,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const CookieManagerService = {
    set: (token, key) => localStorage.setItem(key, token),
    get: (key) => localStorage.getItem(key),
    tokenIsExists: (key) => !!localStorage.getItem(key),
};

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigateTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.append("grant_type", "password");
        params.append("client_id", "hope-health-client");
        params.append("username", username);
        params.append("password", password);

        try {
            const response = await axios.post(
                "http://localhost:8080/realms/hope-health-realm/protocol/openid-connect/token",
                params,
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }
            );

            const { access_token, refresh_token } = response.data;

            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);

            const payload = JSON.parse(atob(access_token.split(".")[1]));
            const roles = payload.resource_access?.["hope-health-client"]?.roles || [];
            console.log(roles);

            if (roles.includes("patient")) {
                if (CookieManagerService.tokenIsExists("access_token")) {
                    setLoading(false);
                    if (onLogin) onLogin(username);
                    localStorage.setItem("email", username);
                    navigateTo("/context");
                }
            } else {
                setLoading(false);
                setError("You are not registered as a patient or unauthorized.");
            }
        } catch (error) {
            setLoading(false);
            if(error.code === "ERR_NETWORK"){
                setError("Network error. Please check your connection.");
                return;
            }
            console.log(error)
            setError(error.response.data.error_description);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                width:"95%",
                mx:"auto"

            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: {
                        xl:4,
                        lg:4,
                        md:3,
                        sm:2,
                        xs:1

                    },
                    borderRadius: 3,
                    minWidth: 350,
                    maxWidth: 400,
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "#1976d2",
                    }}
                >
                    Patient Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {error && (
                        <Typography
                            color="error"
                            sx={{ mt: 1, mb: 1 }}
                        >
                            {error}
                        </Typography>
                    )}
                    <Box
                        sx={{
                            mt: 3,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading || !username || !password}
                            fullWidth
                            sx={{
                                height: 48,
                                fontWeight: "bold",
                                fontSize: "1rem",
                            }}
                        >
                            {loading ? (
                                <CircularProgress
                                    size={24}
                                    color="inherit"
                                />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </Box>
                </form>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="text" sx={{ color: '#1976d2' }} onClick={() => navigateTo('/register')}>
                        Don't have an account? Register
                    </Button>
                    <Button variant="text" sx={{ color: '#1976d2' }} onClick={() => navigateTo('/forgot-password')}>
                        Forgot Password?
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
