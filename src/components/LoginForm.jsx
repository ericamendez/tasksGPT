import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN, SIGNUP } from '../queries'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [getSignup, setSignup] = useState(false)

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('error', error)
      console.log(error.graphQLErrors[0].message)
    }
  })

  const [ signup, signUpresult ] = useMutation(SIGNUP, {
    onError: (error) => {
      console.log('error', error)
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, []) // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  const signUpSubmit = async (event) => {
    event.preventDefault()
    signup({ variables: { username, password } })
    setSignup(false)
  }

  return (
    <div>
      {!getSignup ? 
        <div>
          <form onSubmit={submit}>
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
            <button type='submit'>login</button>
          </form>
          <button onClick={() => setSignup(true)}>Sign Up</button>
        </div> 
        : 
        <div>
          <div>
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
            <button type='submit'>signup</button>
          </form>
        </div> 
        </div>
      }
    </div>
  )
}

export default LoginForm