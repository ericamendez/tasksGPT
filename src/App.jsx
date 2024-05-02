import { useState } from 'react'
import Tasks from './components/Tasks'
import TaskForm from './components/TaskForm'
import { useQuery } from "@apollo/client"
import { ALL_TASKS } from "./queries"
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import './css/app.css'

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

  const user = localStorage.getItem('user')
  
  return (
    <div>
      <header>
        <div className='left'>
          Welcome {user.charAt(0).toUpperCase() + user.substring(1)}
        </div>
        <div className='right'>
          <button className="logout" onClick={logout}>Logout</button>
        </div>
      </header>
      <div className='button-container'>
        <button className="tasks-button" onClick={() => setPage('tasks')}>Tasks</button>
        <button className="tasks-button" onClick={() => setPage('add')}>Add Tasks</button>
      </div>
      {resultTasks.loading ? <div>loading...</div> : null}
      {resultTasks.data ? (
        <Tasks data={resultTasks.data} show={page === 'tasks'} />
      ) : null }

      <TaskForm show={page === 'add'} />
    </div>
  )
}

export default App
