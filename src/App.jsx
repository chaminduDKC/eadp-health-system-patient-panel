import {useEffect, useState} from "react";
import {Navigate, Routes, Route} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register.jsx";
import ForgotPassword from "./pages/forgot-password/ForgotPassword.jsx";
import Context from "./pages/context/Context.jsx";
import Home from "./pages/context/screens/home/Home.jsx";
import ViewDoctor from "./pages/context/screens/view doctor/ViewDoctor.jsx";
import Appointment from "./pages/context/screens/appointment/Appointment.jsx";
import History from "./pages/context/screens/history/History.jsx";
import {startTokenRefreshInterval} from "./util/axiosInstance.js";
import ConfirmRegisterEmail from "./pages/confirm register email/ConfirmRegisterEmail.jsx";
import ResetPassword from "./pages/reset password/ResetPassword.jsx";
import CreateNewPassword from "./pages/create new password/CreateNewPassword.jsx";


const isValidToke = (token) => {
    return token && token !== 'undefined' && token.trim() !== ''
  }


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(isValidToke(localStorage.getItem('access_token')))
  const [email, setEmail] = useState("");

  useEffect(() => {
    setIsAuthenticated(isValidToke(localStorage.getItem('access_token')))
  }, [isAuthenticated]);

  const handleLogin = (username)=>{
    setIsAuthenticated(true)
    setEmail(username)
  }

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) startTokenRefreshInterval();
    }, []);

  return (
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/context" /> : <Navigate to="/login" />} />
        <Route path="/confirm-register-email" element={ <ConfirmRegisterEmail />} />
        <Route path="/confirm-email-reset-password" element={ <ResetPassword />} />
        <Route path="/create-new-password" element={ <CreateNewPassword />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/context" /> : <Register />} />
        <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/context" /> : <ForgotPassword />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/context" /> : <Login onLogin={handleLogin} />} />
        <Route path="/context" element={isAuthenticated ? <Context onLogout={()=> setIsAuthenticated(false)} email={email}/> : <Navigate to="/login" />} >
          <Route path='/context' element={<Navigate to='/context/home' /> } />
          <Route path='/context/home' element={<Home />} />
          <Route path='/context/doctors' element={<ViewDoctor />} />
          <Route path='/context/appointments' element={< Appointment/>} />
          <Route path='/context/history' element={<History />} />
          {/*<Route path='/context/recents' element={<Recent />} />*/}
          {/*<Route path='/context/reviews' element={<Review />} />*/}
        </Route>
      </Routes>
  )
}

export default App
