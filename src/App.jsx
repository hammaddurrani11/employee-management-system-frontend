import './App.css'
import { Routes, Route, Navigate } from "react-router";
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import AdminDashboard from './components/dashboard/AdminDashboard'
import EmployeeDashboard from './components/dashboard/EmployeeDashboard'
import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { DataContext } from './context/employeeContext';

function App() {
  const { loggedInUserData } = useContext(DataContext);

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route
          exact
          path='/'
          element={
            <AdminDashboard />
          }
        />
        <Route
          exact
          path="/login"
          element={<Login />}
        />
        <Route
          exact
          path="/register"
          element={<Register />}
        />
        <Route
          exact
          path="/employee"
          element={
            <EmployeeDashboard />
          }
        />
      </Routes>
    </>
  )
}

export default App
