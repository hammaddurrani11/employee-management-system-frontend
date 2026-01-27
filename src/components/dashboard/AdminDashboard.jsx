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
            navigate('/login');
            return;
        }

        if (loggedInUserData.role === 'employee') {
            navigate('/employee');
        }
    }, [authChecked, loggedInUserData, navigate]);

    if (!authChecked) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            {/* <CreateTask />
            <CreateUser /> */}
            <AllTasks />
        </>
    )
}

export default AdminDashboard