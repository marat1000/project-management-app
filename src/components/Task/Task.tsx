import { EntityId } from '@reduxjs/toolkit';
import React, { memo, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectTaskById } from 'store/slices/tasks/tasksSelector';
import { deleteTask, editTask } from 'store/slices/tasks/tasksThunks';
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

  const deleteTaskHandler = useCallback(() => {
    if (!taskData) return;
    setIsUpdating(true);
    dispatch(
      deleteTask({
        boardId: taskData.boardId,
        columnId: taskData.columnId,
        taskId: taskData._id,
      })
    );
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
        deleteHandler={deleteTaskHandler}
        submit={editTaskHandler}
        isUpdating={isUpdating}
      />
    );
  }
  return (
    <div className="task">
      <header>
        {taskData?.title}{' '}
        <button onClick={() => setIsEditing(true)}>
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </header>
      <p>{taskData?.description}</p>
    </div>
  );
});

export default Task;
