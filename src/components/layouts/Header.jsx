import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/employeeContext';
import { toast } from 'react-toastify';

const Header = () => {

    const { logOutUser, loggedInUserData } = useContext(DataContext);
    console.log(loggedInUserData)

    const navigate = useNavigate();

    const logOutButton = async () => {
        await logOutUser();
        toast.success("Logged Out Successfully");
        navigate('/login');
    }

    return (
        <div className='flex items-center justify-between p-8'>
            <div>
                <h2 className='text-white text-2xl'>Hello <span className='text-3xl font-semibold block'>{loggedInUserData?.username || 'User'} 👋</span></h2>
            </div>
            <button onClick={logOutButton} className='bg-red-500 text-white rounded-sm px-5 hover:bg-red-700 py-2 text-xl cursor-pointer'>Logout</button>
        </div>
    )
}

export default Header