import { useState } from 'react'
import { useMutation } from "@apollo/client";
import { ALL_TASKS, EDIT_AUTHOR } from "../queries";

const Tasks = (props) => {

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

  const tasks = props.data.allTasks
  console.log(tasks);

  return (
    <div>
      <h2>tasks</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {tasks.map((a) => (
            <tr key={a.title}>
              <td>{a.description}</td>
              <td>{a.priority}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Tasks
