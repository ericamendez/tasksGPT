import React, { useRef, useState } from 'react'
import { useMutation } from "@apollo/client";
import { 
  ALL_TASKS, 
  EDIT_COMPLETE, 
  EDIT_DESCRIPTION,
  EDIT_PRIORITY,
  EDIT_STATUS
} from "../queries";
import useClickOutside from './customHooks/useClickOutside';
import DeleteCompletedTasksButton from './DeleteCompletedTasksButton';

const Tasks = (props) => {
  const [editComplete] = useMutation(EDIT_COMPLETE, {
    onCompleted: () => {
      console.log('Complete toggle')
    },
    refetchQueries: [{ query: ALL_TASKS }],
    onError: (error) => {
      console.log(error)
    }
  });

  const [editDescription] = useMutation(EDIT_DESCRIPTION, {
    onCompleted: () => {
      console.log('description saved')
    },
    refetchQueries: [{ query: ALL_TASKS }],
    onError: (error) => {
      console.log(error)
    }
  });

  const [editPriority] = useMutation(EDIT_PRIORITY, {
    onCompleted: () => {
      console.log('priority saved')
    },
    refetchQueries: [{ query: ALL_TASKS }],
    onError: (error) => {
      console.log(error)
    }
  });

  const [editStatus] = useMutation(EDIT_STATUS, {
    onCompleted: () => {
      console.log('status saved')
    },
    refetchQueries: [{ query: ALL_TASKS }],
    onError: (error) => {
      console.log(error)
    }
  });

  const [isEditingDesc, setIsEditinDesc] = useState(false)
  const [isEditPriority, setIsEditPriority] = useState(false)
  const [descEdit, setDescEdit] = useState('')
  const [currentTask, setCurrentTask] = useState('')
  const [isEditStatus, setIsEditStatus] = useState(false)

  const priorityOptions = ['Low', 'Medium', 'High']
  const statusOptions = ['Not Started', 'In Progress', 'Complete']

  const ref = useRef(null);
  const user = localStorage.getItem('user')
  const userTasks = props.data.allTasks.filter(task => task.user === user);

  const checkClicked = async (id, complete) => {
    editComplete({ variables: { taskID: id, complete: !complete } });
  };

  const handleClickOutside = () => {
    if(!isEditingDesc){
      return
    }
    if(isEditPriority){
      setCurrentTask('')
      setIsEditPriority(false)
      setIsEditStatus(false)
      return
    }
    if(isEditStatus){
      setCurrentTask('')
      setIsEditStatus(false)
      setIsEditPriority(false)
      return
    }
    //query EDIT_DESCRIPTION
    editDescription({ variables: { taskID: currentTask, description: descEdit}})
    
    setIsEditinDesc(false);
    setCurrentTask('')
  };

  useClickOutside(ref, handleClickOutside);

  const handleClickEvent = (desc, id) => {
    setIsEditPriority(false)
    setIsEditinDesc(!isEditingDesc)
    setDescEdit(desc)
    setCurrentTask(id)
  }

  const handlePriorityDropdownShow = (id) => {
    setIsEditPriority(true)
    setCurrentTask(id)
    setIsEditStatus(false)
  }
  
  const handlePrioritySelect = async (e) => {
    const selectedIndex = e.target.options.selectedIndex
    const val = e.target.options[selectedIndex].value
    
    editPriority({ variables: { taskID: currentTask, priority: val }})
    
    setIsEditPriority(false)
    setCurrentTask('')
  }

  const handleStatusDropdownShow = (id) => {
    setIsEditStatus(true)
    setCurrentTask(id)
    setIsEditPriority(false)
  }
  
  const handleStatusSelect = async (e) => {
    const selectedIndex = e.target.options.selectedIndex
    const val = e.target.options[selectedIndex].value
    
    editStatus({ variables: { taskID: currentTask, status: val }})
    
    setIsEditStatus(false)
    setCurrentTask('')
  }
  
  if (!props.show) {
    return null
  }

  return (
    <div className='table-container'>
      <h2>My Tasks</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>complete?</th>
            <th>task</th>
            <th>description</th>
            <th>priority</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {userTasks.map((task) => (
            <React.Fragment key={task.id}>
              <tr className={task.complete ? 'complete-task': null}>
                <td>
                  {task.complete ? (
                    <input type="checkbox" checked onClick={() => checkClicked(task.id, task.complete)}/>
                  ) : 
                    (<input type="checkbox" onClick={() => checkClicked(task.id, task.complete)}/>)
                  }
                </td>
                <td className='task-title'>{task.title}</td>
                <td
                  className='task-desc'
                  ref={ref} 
                  contentEditable 
                  onClick={() => handleClickEvent(task.description, task.id)}
                  onInput={({ target }) => setDescEdit(target.innerText)}
                >
                    {task.description}
                </td>
                <td onClick={() => handlePriorityDropdownShow(task.id)}>
                  {isEditPriority && currentTask === task.id ? (
                    <select name="priority" onChange={handlePrioritySelect} defaultValue={task.priority}>
                      {priorityOptions.map((option, index) => <option key={index} value={option}>{option}</option>)}
                    </select>
                  ) : <p className='priority-text'>{task.priority}</p>}
                </td>
                <td onClick={() => handleStatusDropdownShow(task.id)}>
                  {isEditStatus && currentTask === task.id ? (
                    <select name="status" onChange={handleStatusSelect} defaultValue={task.status}>
                      {statusOptions.map((option, index) => <option key={index} value={option} selected>{option}</option>)}
                    </select>
                  ) : <p className='status-text'>{task.status}</p>}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <DeleteCompletedTasksButton />
    </div>
  )
}

export default Tasks
