import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, CircularProgress, Link } from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";

const ConfirmRegisterEmail = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email || '';
  const USER_API_URL = import.meta.env.VITE_USER_SERVICE_URL || 'http://localhost:9090/api/users';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log(email)
    try {
      await axios.post(`${USER_API_URL}/verify-user`, {}, {params:{email:email, otp:otp}}).then(res=>{
        console.log(res)
      });
      setLoading(false);
      navigate('/login');
    } catch (err) {
      setLoading(false);
      setError('Invalid OTP or Email. Please try again.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
      <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, minWidth: { xs: '90vw', sm: 350 }, maxWidth: 400 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
          Confirm Your Email
        </Typography>
        <Typography align="center" sx={{ mb: 3, color: 'text.secondary' }}>
          Please enter the OTP code sent to {email} to verify your account.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="OTP Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
            required
            margin="normal"
            inputProps={{ maxLength: 6 }}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1, mb: 1 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!otp || loading}
              fullWidth
              sx={{ height: 48, fontWeight: 'bold', fontSize: '1rem' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm Email'}
            </Button>
          </Box>
        </form>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Link component="button" variant="body2" onClick={() => navigate('/login')} sx={{ color: '#1976d2' }}>
            Login
          </Link>
          <Link component="button" variant="body2" onClick={() => navigate('/register')} sx={{ color: '#1976d2' }}>
            Wrong Email?
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default ConfirmRegisterEmail;