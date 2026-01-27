import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/employeeContext'
import { toast } from 'react-toastify';

const Login = () => {
    const { loginUser } = useContext(DataContext);
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await loginUser({ email, password });
            console.log(data);
            toast.success("Login Successful");

            if (data?.role === "admin") {
                navigate('/');
            }
            else {
                navigate('/employee');
            }
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className='flex items-center justify-center w-screen h-screen bg-[#1c1c1c]'>
                <div className='border-green-500 border-[5px] rounded-md px-10 py-20'>
                    <form onSubmit={submitHandler} className='flex items-center justify-center gap-5 flex-col w-90'>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="email"
                            placeholder='Enter Your Email'
                            required />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="password"
                            placeholder='Enter Your Password'
                            required />
                        <Link to="/register"
                            className='text-gray-400 text-sm'>Dont Have an account? <span className='font-medium underline'>Signup Now</span></Link>
                        <button
                            className='bg-green-500 py-3 px-5 hover:bg-green-700 cursor-pointer rounded w-50 text-white'>
                            {isLoading ? 'Logging In...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login