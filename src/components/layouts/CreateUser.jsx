import { useContext, useState } from 'react'
import { DataContext } from '../../context/employeeContext'
import { toast } from 'react-toastify'

const CreateUser = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const { createEmployee } = useContext(DataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await createEmployee({ username, email, password });
            toast.success('Employee Created Successfully');
        }
        finally {
            setIsLoading(false);
        }

        setUsername('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className='bg-[#1c1c1c] mx-8 my-5 p-5 rounded'>
            <div>
                <form className='flex items-end' onSubmit={handleSubmit}>
                    <div className='w-1/2'>
                        <div className='flex mb-5'>
                            <h2 className='text-black font-bold text-2xl uppercase bg-green-500 px-5 rounded-sm'>Create User</h2>
                        </div>
                        <div>
                            <h3 className='text-sm mb-1 text-gray-200'>Employee Name</h3>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='border-gray-400 outline-0 text-white border-[1px] h-[40px] w-4/5 rounded text-sm px-2 py-1'
                                type="text"
                                required />
                        </div>
                        <div className='mt-5'>
                            <h3 className='text-sm mb-1 text-gray-200'>Employee Email</h3>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='border-gray-400 outline-0 text-white border-[1px] h-[40px] w-4/5 rounded text-sm px-2 py-1'
                                type="email"
                                required />
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div>
                            <h3 className='text-sm mb-1 text-gray-200'>Employee Password</h3>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='border-gray-400 outline-0 text-white border-[1px] h-[40px] w-full rounded text-sm px-2 py-1'
                                type="password"
                                required />
                        </div>
                        <div className='mt-5'>
                            <button className='bg-green-500 w-full py-2 rounded cursor-pointer hover:bg-green-700'>
                                {!isLoading ? 'Create Employee' : 'Creating...'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUser