import { useEffect, useContext } from 'react'
import Header from '../layouts/Header'
import TaskListNumber from '../layouts/TaskListNumber'
import { useNavigate } from 'react-router-dom'
import Tasklist from '../tasks/Tasklist'
import { DataContext } from '../../context/employeeContext'

const EmployeeDashboard = () => {
  const { loggedInUserData, authChecked } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authChecked) return;

    if (!loggedInUserData) {
      navigate('/login', { replace: true });
      return;
    }

    if (loggedInUserData.role === 'admin') {
      navigate('/', { replace: true });
    }
  }, [authChecked, loggedInUserData, navigate]);

  if (!authChecked) {
    return (
      <div className='w-full h-screen grid place-content-center'>
        <div
          className='h-8 w-8 text-white animate-spin border-5 border-white rounded-full'
        />
      </div>
    )
  }

  if (!loggedInUserData || loggedInUserData?.role !== 'employee') {
    return null;
  }

  return (
    <>
      <Header />
      <TaskListNumber />
      <Tasklist />
    </>
  )
}

export default EmployeeDashboard