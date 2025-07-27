import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { NavLink } from "react-router-dom";
import {useColorMode} from "../../../../util/theme/ThemeContext.jsx";

const TopHeader = () => {
    const { mode, toggleColorMode } = useColorMode();

    return (
        <Box
            className="top-header"
            sx={{
                backgroundColor: {backgroundColor: mode === "dark" ? "#333" : "#fff"},
                padding: "8px 300px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 14,
                color: mode === "dark" ? '#fff' : '#333',
            }}
        >
            {/* Left side: Nav Links */}
            <Box sx={{ display: "flex", gap: 4 }}>
                <MuiLink
                    component={NavLink}
                    to="/context/news"
                    sx={{
                        textDecoration: "none",
                        color: mode === "dark" ? '#fff' : '#333',
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    News
                </MuiLink>
                <MuiLink
                    component={NavLink}
                    to="/context/reviews"
                    sx={{
                        textDecoration: "none",
                        color: mode === "dark" ? '#fff' : '#333',
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    Patient Reviews
                </MuiLink>
                <MuiLink
                    component={NavLink}
                    to="/context/contact"
                    sx={{
                        textDecoration: "none",
                        color: mode === "dark" ? '#fff' : '#333',
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    Contact Us
                </MuiLink>
            </Box>

            {/* Right side: Contact Info */}
            <Box sx={{ display: "flex", gap: 3 }}>
                <Typography>011 2140 000</Typography>
                <MuiLink
                    href="mailto:contactus@durdans.com"
                    sx={{ color: mode === "dark" ? '#fff' : '#333', textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                    contactus@hopehealth.com
                </MuiLink>
            </Box>
        </Box>
    );
};

export default TopHeader;
