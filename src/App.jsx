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

  // const navigate = useNavigate();
  // const [userData, setUserData] = useState({})
  // const [userName, setUserName] = useState('');

  // useEffect(() => {
  //   fetch('https://employee-management-system-backend-eta.vercel.app/auth/check', {
  //     credentials: 'include'
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.authenticated) {
  //         if (data.user.role === 'admin') {
  //           setUserName(data.user.username);
  //           console.log(data.user.username);
  //           navigate('/')
  //         } else if (data.user.role === 'employee') {
  //           setUserName(data.user.username)
  //           navigate('/employee');
  //           const employeeData = fetch('https://employee-management-system-backend-eta.vercel.app/fetch-loggedin-user', {
  //             credentials: 'include'
  //           })
  //             .then(res => res.json())
  //             .then(employeeData => {
  //               if (!employeeData || employeeData.error) {
  //                 console.log('User Not Found');
  //               } else {
  //                 setUserData(employeeData);
  //               }
  //             })
  //         }
  //       }
  //       else {
  //         navigate('/login');
  //       }
  //     })
  // }, [])


  return (
    <>
      <ToastContainer />

      <Routes>
        <Route
          exact
          path='/'
          element={
            loggedInUserData?.role === 'admin' ?
              <AdminDashboard /> :
              <Navigate to='/login' replace />
          }
        />
        <Route
          exact
          path="/login"
          element={!loggedInUserData ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          exact
          path="/register"
          element={!loggedInUserData ? <Register /> : <Navigate to="/" replace />}
        />
        <Route
          exact
          path="/employee"
          element={
            loggedInUserData?.role === 'employee' ?
              <EmployeeDashboard /> :
              <Navigate to='/login' replace />
          }
        />
      </Routes>
    </>
  )
}

export default App
