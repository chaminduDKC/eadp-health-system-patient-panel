import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state or query params
  const email = location.state?.email || new URLSearchParams(location.search).get('email') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:9090/api/users/visitor/verify-reset-password', null, {
        params: { email:email, otp:otp }
      });
      setLoading(false);
      navigate('/create-new-password', { state: { email } });
    } catch (err) {
      setLoading(false);
      setError('Invalid OTP or Email. Please try again.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',  }}>
      <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, minWidth: { xs: '90vw', sm: 350 }, maxWidth: 400 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
          Enter OTP Code
        </Typography>
        <Typography align="center" sx={{ mb: 3, color: 'text.secondary' }}>
          Please enter the OTP code sent to your email to reset your password.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            value={email}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="OTP Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
            required
            margin="normal"
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;