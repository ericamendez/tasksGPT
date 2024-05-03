import { gql } from '@apollo/client';

export const ALL_TASKS = gql`
    query {
      allTasks {
            title
            description
            priority
            status
            id
            user
            complete
        }
    }
`
export const AUTOGENERATE = gql`
  mutation Autogenerate($title: String!) {
    autogenerate(title: $title)
  }
`

export const ADD_TASK = gql`
    mutation addTask($title: String!, $description: String, $priority: String, $status: String, $user: String!, $complete: Boolean) {
        addTask(title: $title, description: $description, priority: $priority, status: $status, user: $user, complete: $complete) {
            title
            description
            id
            priority
            status
            user
            complete
        }
    }
`

export const EDIT_COMPLETE = gql`
  mutation editComplete($taskID: String!, $complete: Boolean) {
    editComplete(id: $taskID, complete: $complete) {
      complete
    }
  }
`

export const EDIT_DESCRIPTION = gql`
  mutation editDescription($taskID: String!, $description: String) {
    editDescription(id: $taskID, description: $description) {
      description
    }
  }
`

export const EDIT_PRIORITY = gql`
  mutation editPriority($taskID: String!, $priority: String) {
    editPriority(id: $taskID, priority: $priority) {
      priority
    }
  }
`

export const EDIT_STATUS = gql`
  mutation editStatus($taskID: String!, $status: String) {
    editStatus(id: $taskID, status: $status) {
      status
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

export const DELETE_COMPLETED_TASKS = gql`
  mutation {
    deleteCompletedTasks
  }
`;