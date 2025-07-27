import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './forgotPassword.css';
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await axios.post("http://localhost:9090/api/users/visitor/forgot-password-email-verify", {  }, {params:{
          email:email
          }}).then(()=>{
          navigate('/confirm-email-reset-password', { state: { email } });
        })

      } catch (e) {
        console.log(e);
      }

    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',  }}>
      <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, minWidth: { xs: '90vw', sm: 350 }, maxWidth: 400 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            placeholder="Enter your email address"
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!email}
              fullWidth
              sx={{ height: 48, fontWeight: 'bold', fontSize: '1rem' }}
            >
              verify email
            </Button>
          </Box>
        </form>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="text" sx={{ color: '#1976d2' }} onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="text" sx={{ color: '#1976d2' }} onClick={() => navigate('/register')}>
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
