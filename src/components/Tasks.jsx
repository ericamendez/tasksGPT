import { useState } from 'react'
import { useMutation } from "@apollo/client";
import { ALL_TASKS, EDIT_AUTHOR } from "../queries";

const Tasks = (props) => {
  const [tasks, setTasks] = useState(props.data.allTasks)
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [birthyear, setBirthyear] = useState('')
  const [editAuthor, result] = useMutation(EDIT_AUTHOR);

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: selectedAuthor, born: birthyear } });

    await result.refetch();

    setSelectedAuthor("");
    setBirthyear("");
  };


  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>tasks</h2>
      <table>
        <tbody>
          <tr>
            <th>task</th>
            <th>description</th>
            <th>priority</th>
            <th>status</th>
          </tr>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
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
