import { createContext, useEffect, useState } from 'react'
import { handleError } from '../components/utils/apiHelper';
import axiosInstance from '../instance/axiosInstance';

export const DataContext = createContext();

const employeeContext = ({ children }) => {
  const [employeesData, setEmployeesData] = useState([]);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [employeeDataWithTask, setEmployeeDataWithTask] = useState(null);
  const [loggedInUserTask, setLoggedInUserTask] = useState(null);

  // Fetch all employees data (for admin)
  const fetchAllEmployeeData = async () => {
    try {
      const res = await axiosInstance.get('/fetch-employees');
      const data = await res.json();
      setEmployeesData(data);
    }
    catch (error) {
      console.error("Fetch employees failed:", error);
      setEmployeesData([]);
    }
  }

  // Fetch authentication status and logged-in user data
  const fetchAuth = async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      const data = await res.json();

      if (!data.authenticated) {
        setLoggedInUserData(null);
        return;
      }

      setLoggedInUserData(data.user);

      if (data.user.role === 'employee') {
        fetchEmployeeDataWithTask();
      }
    }
    catch (error) {
      console.error('Authentication fetch failed:', error);
    }
  }

  // Fetch logged-in employee data along with tasks
  const fetchEmployeeDataWithTask = async () => {
    try {
      const res = await axiosInstance.get('/fetch-loggedin-user-with-tasks');
      const data = await res.json();
      setEmployeeDataWithTask(data);
    }
    catch (error) {
      console.error('Fetch employee data with task failed:', error);
    }
  }

  // Fetch Logged-in Employee Task and Data
  const fetchEmployeeTask = async () => {
    try {
      const res = await axiosInstance.get('/fetch-loggedin-user');
      const data = await res.json();
      setLoggedInUserTask(data);
    }
    catch (error) {
      console.error('Fetch employee task failed:', error);
    }
  }

  // const fetchAuthAndEmployeeData = async () => {
  //   try {
  //     const res = await axiosInstance.get('/auth/check');
  //     const data = await res.json();

  //     if (data.authenticated) {
  //       setUser(data.user);

  //       if (data.user.role === 'employee') {
  //         const empRes = await fetch('https://employee-management-system-backend-eta.vercel.app/fetch-loggedin-user', {
  //           credentials: 'include'
  //         });
  //         const empData = await empRes.json();
  //         setEmployeeData(empData);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Authentication fetch failed:', error);
  //   }
  // };

  useEffect(() => {
    fetchAuth();
  }, [])

  return (
    <DataContext.Provider
      value={
        {
          employeesData,
          setEmployeesData,
          loggedInUserData,
          setLoggedInUserData,
          fetchAllEmployeeData,
          fetchAuth,
          fetchEmployeeDataWithTask,
          employeeDataWithTask,
          setEmployeeDataWithTask,
          fetchEmployeeTask,
          loggedInUserTask,
          setLoggedInUserTask
        }
      }>
      <div>{children}</div>
    </DataContext.Provider>
  )
}

export default employeeContext