import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Form from './components/Form';
import Display from './components/Display';
import DriverDetails from './components/DriverDetails';
import Signup from './components/Signupp';
import Login from './components/Login';
import './App.css';
import Logs from './components/Logs';
const App = () => {
  // State to track authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Example form data state
  const [formData, setFormData] = useState({
    تاريخ: '',
    الكشف_تاريخ: '',
    الكشف_رقم: '',
    شركة_العمرة_اسم: '',
    شركة_العمرة_رقم: '',
    الجنسية: '',
    المعتمرين_عدد: '',
    الرحلة_رقم: '',
    من: '',
    الرحلة_تاريخ: '',
    الناقل: '',
    المنفذ: '',
    الرحلة_وقت: '',
    إلى: '',
    السائق_اسم: '',
    السائق_جنسية: '',
    السائق_جوال: '',
    السائق_هوية_رقم: '',
    اللوحة_رقم: '',
    المركبة_رقم: '',
    شركة_النقل_اسم: '',
  });

  const [passengers, setPassengers] = useState([]);

  // Update form data handler
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Update passenger data handler
  const handlePassengerChange = (index, event) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [event.target.name]: event.target.value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  // Add passenger handler
  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        رقم_المعتمر: '',
        اسم_المعتمر: '',
        جنسية: '',
      },
    ]);
  };

  // PrivateRoute component to protect routes
  const PrivateRoute = ({ element, ...rest }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/form"
            element={
              <PrivateRoute
                element={
                  <Form
                    formData={formData}
                    passengers={passengers}
                    handleChange={handleChange}
                    handlePassengerChange={handlePassengerChange}
                    addPassenger={addPassenger}
                  />
                }
              />
            }
          />
          <Route
            path="/display"
            element={<PrivateRoute element={<Display />} />}
          />
          <Route
            path="/driver-details"
            element={<PrivateRoute element={<DriverDetails />} />}
          />
  <Route
            path="/logs"
            element={<PrivateRoute element={<Logs />} />}
          />
          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
