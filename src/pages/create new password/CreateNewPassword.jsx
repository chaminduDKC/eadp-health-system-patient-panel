import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const CreateNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state or query params
  const email = location.state?.email || new URLSearchParams(location.search).get('email') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await axios.put('http://localhost:9090/api/users/visitor/set-new-password', {  }, {params:{
          email:email, newPassword:password
        }});
      setLoading(false);
      navigate('/login');
    } catch (err) {
      setLoading(false);
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
      <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, minWidth: { xs: '90vw', sm: 350 }, maxWidth: 400 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
          Create New Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              disabled={!password || !confirmPassword || loading}
              fullWidth
              sx={{ height: 48, fontWeight: 'bold', fontSize: '1rem' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Set New Password'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateNewPassword;