import { useContext } from 'react';
import { DataContext } from '../../context/employeeContext';
import { toast } from 'react-toastify';

const NewTask = ({ data }) => {

  const { completeTask, failedTask } = useContext(DataContext);

  const updateTaskFunction = async (e) => {
    const { _id: id } = e;
    await completeTask({ id });
    toast.success("Marked as Complete");
  }

  const failedTaskFunction = async (e) => {
    const { _id: id } = e;
    await failedTask({ id });
    toast.success("Marked as Failed");
  }

  return (
    <>
      <div className='mx-2 py-5 mt-10 flex items-center flex-nowrap justify-start gap-3 overflow-x-auto'>
        <div className='bg-yellow-500 shrink-0 w-[300px] h-[200px] rounded p-3'>
          <div className='flex items-center justify-between'>
            <h4 className='bg-red-500 p-1 rounded text-sm'>{data.taskCategory}</h4>
            <h4 className='text-sm'>{data.taskDate}</h4>
          </div>
          <h2 className='text-xl font-semibold mt-5'>{data.taskTitle}</h2>
          <p className='text-sm font-medium'>{data.taskDescription}</p>
          <div className='flex items-center justify-center mt-5 gap-2'>
            <button onClick={() => updateTaskFunction(data)}
              className='bg-green-500 rounded text-sm px-2 py-1 text-white hover:bg-green-700 cursor-pointer'>Mark as Complete</button>
            <button onClick={() => failedTaskFunction(data)}
              className='bg-red-500 rounded text-sm px-2 py-1 text-white hover:bg-red-700 cursor-pointer'>Mark as Failed</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewTask