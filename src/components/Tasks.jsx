import { useState } from 'react'
import { useMutation } from "@apollo/client";
import { ALL_TASKS, EDIT_AUTHOR } from "../queries";

const Tasks = (props) => {
  const [tasks, setTasks] = useState(props.data.allTasks)
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [birthyear, setBirthyear] = useState('')
  const [editAuthor, result] = useMutation(EDIT_AUTHOR);

  const submit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: selectedAuthor, born: birthyear } });

    setSelectedAuthor("");
    setBirthyear("");
  };


  if (!props.show) {
    return null
  }

  // const tasks = props.data.allTasks

  return (
    <div>
      <h2>tasks</h2>
      { tasks.map(task => <p key={task.id}>{task.title}</p>)}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>title</th>
            <th>description</th>
          </tr>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.description}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Tasks
