import { useState } from 'react'
import Tasks from './components/Tasks'
import NewTask from './components/NewTask'
import { useQuery } from "@apollo/client"
import { ALL_TASKS } from "./queries"
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('tasks')
  const client = useApolloClient()

  const resultTasks = useQuery(ALL_TASKS)  

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <LoginForm setToken={setToken} setError={"notify"} />
      </>
    )
  }
  

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <div>
        <button onClick={() => setPage('tasks')}>Tasks</button>
        <button onClick={() => setPage('add')}>Add Tasks</button>
      </div>
      {resultTasks.loading ? <div>loading...</div> : null}
      {resultTasks.data ? (
        <Tasks data={resultTasks.data} show={page === 'tasks'} />
      ) : null }

      <NewTask show={page === 'add'} />
    </div>
  )
}

export default App
