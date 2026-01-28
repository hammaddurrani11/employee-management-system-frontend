import { useEffect, useContext } from 'react'
import Header from '../layouts/Header'
import CreateTask from '../layouts/CreateTask'
import AllTasks from '../layouts/AllTasks'
import { useNavigate } from 'react-router-dom';
import CreateUser from '../layouts/CreateUser';
import { DataContext } from '../../context/employeeContext'

const AdminDashboard = () => {
    const { loggedInUserData, authChecked } = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authChecked) return;

        if (!loggedInUserData) {
            navigate('/login', { replace: true });
            return;
        }

        if (loggedInUserData.role === 'employee') {
            navigate('/employee', { replace: true });
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

    if (!loggedInUserData || loggedInUserData?.role !== 'admin') {
        return null;
    }

    return (
        <>
            <Header />
            <CreateTask />
            <CreateUser />
            <AllTasks />
        </>
    )
}

export default AdminDashboard