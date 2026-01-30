import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/employeeContext';
import { toast } from 'react-toastify';

const AllTasks = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletedUserData, setDeletedUserData] = useState({});

    const {
        fetchAllEmployeeData,
        employeesData,
        updateEmployee,
        deleteEmployee
    } = useContext(DataContext);

    useEffect(() => {
        fetchAllEmployeeData();
    }, []);

    const updateCurrentEmployee = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const id = selectedEmployee._id

            await updateEmployee({ id, username, email, password });
            toast.success('Employee Updated Successfully');

            closePop();
        }
        finally {
            setIsLoading(false);
        }
    }

    const deleteCurrentEmployee = async () => {
        setIsLoading(true);
        try {
            const { _id } = deletedUserData;
            await deleteEmployee({ _id });
            toast.success('Employee Deleted Successfully');
            setDeleteModal(false);
        }
        finally {
            setIsLoading(false);
        }
    }

    const showPop = (elem) => {
        const modal = document.querySelector('.pop');
        modal.style.display = 'flex'
        setUsername(elem.username);
        setEmail(elem.email);
        setSelectedEmployee(elem);
    }

    const closePop = () => {
        const modal = document.querySelector('.pop');
        modal.style.display = 'none'
    }

    return (
        <div>
            <div className='m-8 p-5 bg-[#1c1c1c] rounded text-white'>
                <div className='flex items-center justify-start bg-red-400 py-2 px-5 rounded'>
                    <h3 className='w-1/4 text-md'>Employee Name</h3>
                    <h3 className='w-1/4 text-md'>New Task</h3>
                    <h3 className='w-1/4 text-md'>Completed</h3>
                    <h3 className='w-1/4 text-md'>Failed</h3>
                    <h3 className='w-1/4 text-md'>Actions</h3>
                </div>
                <div className='h-30 overflow-y-auto'>
                    {employeesData?.length > 0 ? (
                        employeesData?.map((elem, idx) => {
                            return <div key={idx} className='flex items-center mt-2 justify-start border-[1px] border-green-400 py-2 px-5 rounded'>
                                <h3 className='w-1/4 text-md'>{elem.username}</h3>
                                <h3 className='w-1/4 text-md'>{elem.assignedTasks.newTask.length}</h3>
                                <h3 className='w-1/4 text-md'>{elem.assignedTasks.completed.length}</h3>
                                <h3 className='w-1/4 text-md'>{elem.assignedTasks.failed.length}</h3>
                                <div className='flex items-center gap-5 w-1/4'>
                                    <button className='cursor-pointer' onClick={() => showPop(elem)}><i className="fa-solid fa-pen-to-square"></i></button>
                                    <button className='cursor-pointer'
                                        onClick={() => {
                                            setDeletedUserData(elem)
                                            setDeleteModal(true);
                                        }}><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        }
                        )) : (
                        <div>
                            <h4 className='text-sm py-5'>No Employees Yet...</h4>
                        </div>
                    )}
                </div>

                <div className='absolute pop w-full hidden items-center backdrop-blur justify-center h-screen top-20 left-0'>
                    <form onSubmit={updateCurrentEmployee} className='flex items-center justify-center gap-5 flex-col w-90 bg-[#1c1c1c] p-10 border-[3px] border-green-500 rounded'>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="text"
                            placeholder='Enter Username'
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="email"
                            placeholder='Enter Email'
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='text-xl text-white border-[2px] w-full rounded px-4 outline-0 py-3 placeholder:text-gray-500 border-green-500'
                            type="password"
                            placeholder='Enter Password'
                        />
                        <div className='flex items-center justify-center gap-2'>
                            <div onClick={closePop}
                                className='bg-green-500 py-3 px-5 hover:bg-green-700 cursor-pointer rounded text-white'>Close</div>
                            <button type='submit'
                                className='bg-green-500 py-3 px-5 hover:bg-green-700 cursor-pointer rounded text-white'>
                                {!isLoading ? 'Update User' : 'Updating...'}
                            </button>
                        </div>
                    </form>
                </div>

                {deleteModal &&
                    <div
                        className='absolute left-0 top-0 h-screen w-full grid place-content-center backdrop-blur'
                    >
                        <div
                            className='w-full px-10 bg-[#1c1c1c] text-center mx-auto border-[3px] border-green-500 rounded py-20'
                        >
                            <p>Are You Sure You Want to Delete This User?</p>
                            <div className='flex gap-5 items-center justify-center mt-5'>
                                <button
                                    className='cursor-pointer bg-green-500 hover:bg-green-700 px-5 py-2 rounded text-black'
                                    onClick={() => deleteCurrentEmployee()}
                                >
                                    {!isLoading ? 'Yes' : 'Deleting...'}
                                </button>
                                <button
                                    className='cursor-pointer bg-green-500 hover:bg-green-700 px-5 py-2 rounded text-black'
                                    onClick={() => setDeleteModal(false)}
                                >No</button>
                            </div>
                        </div>
                    </div >
                }
            </div >
        </div >
    )
}

export default AllTasks