import { Box, Typography, Link, IconButton, Stack } from "@mui/material";
import LOGO from "../header/logo.png";
import {useColorMode} from "../../../../util/theme/ThemeContext.jsx";

const Footer = () => {
    const { mode, toggleColorMode } = useColorMode();
    return (
        <Box  component="footer" sx={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            borderRadius: "16px 16px 0 0", backgroundColor: mode === "dark" ? "var(--color-dark3)" : "white",paddingTop:"10px",  px: 2, mt: "auto" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 3,
                }}
            >
                {/* Logo Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img src={LOGO} alt="Hope Health Logo" width={40} />
                    <Typography variant="h6" fontWeight="bold">
                        Hope Health
                    </Typography>
                </Box>

                {/* Navigation Links */}
                <Stack direction="row" spacing={3}>
                    <Link href="/" underline="hover" color="inherit">
                        Home
                    </Link>
                    <Link href="/context/appointment" underline="hover" color="inherit">
                        Appointments
                    </Link>
                    <Link href="/context/reviews" underline="hover" color="inherit">
                        Reviews
                    </Link>
                    <Link href="/context/contact" underline="hover" color="inherit">
                        Contact
                    </Link>
                </Stack>

                {/* Social Media */}
                <Stack direction="row" spacing={2}>
                    <IconButton href="#" aria-label="Facebook" color="inherit">
                        <i className="fab fa-facebook-f"></i>
                    </IconButton>
                    <IconButton href="#" aria-label="Twitter" color="inherit">
                        <i className="fab fa-twitter"></i>
                    </IconButton>
                    <IconButton href="#" aria-label="Instagram" color="inherit">
                        <i className="fab fa-instagram"></i>
                    </IconButton>
                </Stack>
            </Box>

            {/* Footer Bottom */}
            <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Hope Health. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
