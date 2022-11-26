import { EntityId } from '@reduxjs/toolkit';
import {
  EFormErrorMessages,
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/InputWithErrorMessage';
import React, { memo, SyntheticEvent, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectTaskById } from 'store/slices/tasks/tasksSelector';
import { editTask } from 'store/slices/tasks/tasksThunks';
// import { editTask } from 'store/slices/tasks/tasksThunks';
import { EditingTask } from './EditingTask/EditingTask';

interface ITaskProps {
  id: EntityId;
}
const Task = memo<ITaskProps>(({ id }) => {
  const taskData = useAppSelector(selectTaskById(id));
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useAppDispatch();

  const cancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const deleteTask = useCallback(() => {
    // setIsEditing(false);
  }, []);

  const editTaskHandler = useCallback((title: string, description: string, users: EntityId[]) => {
    if (!taskData) return;
    setIsUpdating(true);
    dispatch(
      editTask({
        boardId: taskData.boardId,
        columnId: taskData.columnId,
        taskId: taskData._id,
        taskData: {
          title,
          description,
          order: taskData.order,
          users: users,
        },
      })
    )
      .unwrap()
      .then(() => {
        setIsEditing(false);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  }, []);

  if (isEditing) {
    return (
      <EditingTask
        id={id}
        cancel={cancelEdit}
        deleteHandler={deleteTask}
        submit={editTaskHandler}
        isUpdating={isUpdating}
      />
    );
  }
  return (
    <div>
      <h4>{taskData?.title}</h4>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </div>
  );
});

export default Task;
