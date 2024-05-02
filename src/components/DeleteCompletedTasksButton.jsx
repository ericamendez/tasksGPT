import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_COMPLETED_TASKS, ALL_TASKS } from '../queries'; // Import the mutation query

const DeleteCompletedTasksButton = () => {
  const [deleteCompletedTasks] = useMutation(DELETE_COMPLETED_TASKS, {
    onCompleted: () => {
      console.log('delete completed tasks mutation completed')
    },
    refetchQueries: [{ query: ALL_TASKS }],
    onError: (error) => {
      console.log(error)
    }
  });

  const handleDeleteCompletedTasks = async () => {
    try {
      const { data } = await deleteCompletedTasks();
      console.log(data.deleteCompletedTasks); // Log the response
      // Optionally, you can perform any additional actions after the mutation is executed
    } catch (error) {
      console.error('Failed to delete completed tasks:', error);
    }
  };

  return (
    <button className='clear-button' onClick={handleDeleteCompletedTasks}>Delete Completed Tasks</button>
  );
};

export default DeleteCompletedTasksButton;
