import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { handleError } from '../utils/apiHelper';
import { toast } from 'react-toastify';
import axiosInstance from '../../instance/axiosInstance';
import { DataContext } from '../../context/employeeContext';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { registerAdmin } = useContext(DataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await registerAdmin({ username, email, password });
            toast.success("Registration Successful! Please Login.");
            navigate('/login', { replace: true });
        }
        finally {
            setIsLoading(false);
        }

    }
    return (
        <>
            <div className='flex items-center justify-center w-screen h-screen bg-[#1c1c1c]'>
                <div className='border-green-500 border-[5px] rounded-md px-10 py-20'>
                    <form onSubmit={handleSubmit} className='flex items-center justify-center gap-5 flex-col w-90'>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="text"
                            placeholder='Enter Username'
                            required />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="email"
                            placeholder='Enter Email'
                            required />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="password"
                            placeholder='Enter Password'
                            required />
                        <Link className='text-gray-400 text-sm' to="/login">Already have an account? <span className='font-medium underline'>Sign In</span></Link>
                        <button
                            className='bg-green-500 py-3 px-5 hover:bg-green-700 cursor-pointer rounded w-50 text-white'>
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register