import { createContext, useEffect, useState } from 'react'
import { handleError } from '../components/utils/apiHelper';
import axiosInstance from '../instance/axiosInstance';

export const DataContext = createContext();

const employeeContext = ({ children }) => {
  const [employeesData, setEmployeesData] = useState([]);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [employeeDataWithTask, setEmployeeDataWithTask] = useState(null);
  const [loggedInUserTask, setLoggedInUserTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Fetch all employees data (for admin)
  const fetchAllEmployeeData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get('/fetch-employees');
      setEmployeesData(data);
    }
    catch (error) {
      console.error("Fetch employees failed:", error);
      setEmployeesData([]);
    }
    finally {
      setIsLoading(false);
    }
  }

  // Fetch authentication status and logged-in user data
  const fetchAuth = async () => {
    try {
      const { data } = await axiosInstance.get('/auth/check');

      if (!data.authenticated) {
        setLoggedInUserData(null);
        return;
      }

      setLoggedInUserData(data.user);
    }
    catch (error) {
      console.error('Authentication fetch failed:', error);
    }
    finally {
      setAuthChecked(true);
    }
  }

  // Fetch logged-in employee data along with tasks
  const fetchEmployeeDataWithTask = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get('/fetch-loggedin-user-with-tasks');
      setEmployeeDataWithTask(data);
    }
    catch (error) {
      console.error('Fetch employee data with task failed:', error);
    }
    finally {
      setIsLoading(false);
    }
  }

  // Fetch Logged-in Employee Task and Data
  const fetchEmployeeTask = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get('/fetch-loggedin-user');
      setLoggedInUserTask(data);
    }
    catch (error) {
      console.error('Fetch employee task failed:', error);
    }
    finally {
      setIsLoading(false);
    }
  }

  // Register Admin to Database
  const registerAdmin = async (payload) => {
    setIsLoading(true);
    try {
      await axiosInstance.post('/register/admin', payload);
    }
    catch (error) {
      handleError(error);
      throw error;
    }
    finally {
      setIsLoading(false);
    }
  }

  //Login Admin or Employee
  const loginUser = async (payload) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post('login', payload);
      console.log("LOGIN RESPONSE:", data);

      localStorage.setItem('authToken', data.token);

      await fetchAuth();

      return data;
    }
    catch (error) {
      handleError(error);
      throw error;
    }
    finally {
      setIsLoading(false);
    }
  }

  // Logout Function
  const logOutUser = async () => {
    try {
      await axiosInstance.post('/logout');
      setLoggedInUserData(null);
    }
    catch (error) {
      handleError(error);
      throw error;
    }
  }

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
          setLoggedInUserTask,
          registerAdmin,
          loginUser,
          logOutUser,
          isLoading,
          authChecked,
        }
      }>
      <div>{children}</div>
    </DataContext.Provider>
  )
}

export default employeeContext