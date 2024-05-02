import React, { useRef, useState } from 'react'
import { useMutation } from "@apollo/client";
import { ALL_TASKS, EDIT_COMPLETE, EDIT_DESCRIPTION} from "../queries";
import useClickOutside from './customHooks/useClickOutside';

const Tasks = (props) => {
  const [editComplete, result] = useMutation(EDIT_COMPLETE, {
    onCompleted: () => {
      console.log('Complete toggle')
    },
    refetchQueries: [{ query: ALL_TASKS }],
    onError: (error) => {
      console.log(error)
    }
  });

  const [editDescription, descResult] = useMutation(EDIT_DESCRIPTION, {
    onCompleted: () => {
      console.log('description saved')
    },
    refetchQueries: [{ query: ALL_TASKS }],
    onError: (error) => {
      console.log(error)
    }
  });

  const [isEditingDesc, setIsEditinDesc] = useState(false)
  const [descEdit, setDescEdit] = useState('')
  const [currentTask, setCurrentTask] = useState('')
  
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
    setIsEditinDesc(false);
    setCurrentTask('')
    //query EDIT_DESCRIPTION
    editDescription({ variables: { taskID: currentTask, description: descEdit}})
  };

  useClickOutside(ref, handleClickOutside);

  const handleClickEvent = (desc, id) => {
    setIsEditinDesc(!isEditingDesc)
    setDescEdit(desc)
    setCurrentTask(id)
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
                <td><input type="checkbox" onClick={() => checkClicked(task.id, task.complete)} /></td>
                <td>{task.title}</td>
                <td>
                  <div 
                    ref={ref} 
                    contentEditable 
                    onClick={() => handleClickEvent(task.description, task.id)}
                    onInput={({ target }) => setDescEdit(target.innerText)}
                  >
                    {task.description}
                  </div>
                </td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Tasks
