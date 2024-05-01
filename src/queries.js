import { gql } from '@apollo/client';

export const ALL_TASKS = gql`
    query {
      allTasks {
            title
            description
            priority
            status
            id
        }
    }
`

export const ADD_TASK = gql`
    mutation addTask($title: String!, $description: String, $priority: String, $status: String) {
        addTask(title: $title, description: $description, priority: $priority, status: $status) {
            title
            description
            id
            priority
            status
        }
    }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editBorn(name: $name, born: $born) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const SIGNUP = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
    }
  }
`