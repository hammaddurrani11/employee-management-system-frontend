import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/employeeContext';
import { toast } from 'react-toastify';

const Header = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { loggedInUserData } = useContext(DataContext);

    const navigate = useNavigate();

    const logOutButton = async () => {
        setIsLoading(true);

        try {
            localStorage.removeItem('authToken');
            toast.success('Logged Out Successfully');
            navigate('/login');
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='flex items-center justify-between p-8'>
            <div>
                <h2 className='text-white text-2xl'>Hello <span className='text-3xl font-semibold block'>{loggedInUserData?.username || 'User'} 👋</span></h2>
            </div>
            <button onClick={logOutButton} className='bg-red-500 text-white rounded-sm px-5 hover:bg-red-700 py-2 text-xl cursor-pointer'>
                {!isLoading ? 'Logout' : 'Logging Out...'}
            </button>
        </div>
    )
}

export default Header