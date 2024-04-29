import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_TASK, ALL_TASKS } from "../queries"

const NewTask = (props) => {

  const [addTask] = useMutation(ADD_TASK, {
    refetchQueries: [  {query: ALL_TASKS } ],
    onError: (error) => {
      console.log(error)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_TASKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })
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

    addTask({ variables: { title, description, priority, status } })

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
            <select name="priority" onChange={(target) => setPriority(target.value)}>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
            {/* <input
              type="number"
              value={published}
              onChange={({ target }) => setPublished(Number(target.value))}
            /> */}
          </div>
          <div>
            Status
            <select name="status" onChange={(target) => setStatus(target.value)}>
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