import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN, SIGNUP } from '../queries'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [getSignup, setGetSignup] = useState(false)

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('error', error)
    }
  })

  const [ signup, signUpresult ] = useMutation(SIGNUP, {
    onError: (error) => {
      console.log('error', error)
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('tasks-token')
    if (token) {
      setToken(token)
    }
  }, []) // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('tasks-token', token)
      localStorage.setItem('user', username)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  const signUpSubmit = async (event) => {
    event.preventDefault()
    signup({ variables: { username, password } })
    setGetSignup(false)
  }

  return (
    <div>
      {!getSignup ? 
        <div className='signup-form'>
          <h2>Log In</h2>
          <form onSubmit={submit}>
            <div>
              Username: <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              Password: <input
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button className='tasks-button' type='submit'>login</button>
          </form>
          <button className='tasks-button' onClick={() => setGetSignup(true)}>Sign Up</button>
        </div> 
        : 
        <div>
          <div className='login-form'>
          <h2>Sign Up</h2>
          <form onSubmit={signUpSubmit}>
            <div>
              username <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password <input
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button className='tasks-button' type='submit'>signup</button>
          </form>
          <button className='tasks-button' onClick={() =>setGetSignup(false)}>login</button>
        </div> 
        </div>
      }
    </div>
  )
}

export default LoginForm