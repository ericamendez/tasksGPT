import { useState } from 'react'
import Authors from './components/Authors'
import NewBook from './components/NewBook'
import { useQuery } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS } from "./queries"
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()


  const resultAuthors = useQuery(ALL_AUTHORS)
  
  const resultBooks = useQuery(ALL_BOOKS)
  

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
      <button onClick={logout}>logout</button>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      {resultAuthors.loading ? <div>loading...</div> : null}
      {resultAuthors.data ? (
        <Authors data={resultAuthors.data} show={page === 'authors'} />
      ) : null }

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
