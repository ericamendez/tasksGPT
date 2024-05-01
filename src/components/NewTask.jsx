import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_TASK, ALL_TASKS } from "../queries"

const NewTask = (props) => {

  const { refetch } = useQuery(ALL_TASKS);

  const [addTask] = useMutation(ADD_TASK, {
    onCompleted: () => {
      console.log('Task added')
      refetch();
    },
    refetchQueries: [{ query: ALL_TASKS }],
    onError: (error) => {
      console.log(error)
    },
  });

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('low')
  const [status, setStatus] = useState('Not Started')

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    await addTask({ variables: { title, description, priority, status } })

    // After adding the task, clear the form fields
    setTitle('')
    setDescription('')
    setPriority('low')
    setStatus('Not Started')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          description
          <input
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div>
          priority
          <select name="priority" onChange={({ target }) => setPriority(target.value)}>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          Status
          <select name="status" onChange={({ target }) => setStatus(target.value)}>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
        <button type="submit">create task</button>
      </form>
    </div>
  )
}

export default NewTask
