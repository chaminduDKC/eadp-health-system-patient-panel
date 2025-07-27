import React, { useState } from 'react';
import { TextField, Button, MenuItem, CircularProgress, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './register.css';
import axiosInstance from "../../util/axiosInstance.js";
import axios from "axios";

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    gender: '',
    age: '',
    email: '',
    password: '',
    role:"patient"
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = Object.values(form).every((v) => v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(form)
      const response = await axios.post('http://localhost:9090/api/users/register-patient', form);
      setLoading(false);
      navigate('/confirm-register-email', { state: { email: form.email } });
    } catch (error) {
      setLoading(false);
      // Optionally handle error, e.g. show alert
    }
  };

  return (
    <Box className="register-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, minWidth: 350, maxWidth: 600 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Register Patient
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="tel"
          />
          <TextField
            select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Age"
            name="age"
            value={form.age}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="number"
            inputProps={{ min: 0 }}
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="email"
          />
          <TextField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="password"
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isFormValid || loading}
              fullWidth
              sx={{ height: 48, fontWeight: 'bold', fontSize: '1rem' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>
          </Box>
        </form>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="text" sx={{ color: '#1976d2' }} onClick={() => navigate('/login')}>
            Already have an account? Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
