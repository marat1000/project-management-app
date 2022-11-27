import { EntityId } from '@reduxjs/toolkit';
import React, { memo, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectUsersByIds } from 'store/slices/editBoard/editBoardSelectors';
import { selectTaskById } from 'store/slices/tasks/tasksSelector';
import { deleteTask, editTask } from 'store/slices/tasks/tasksThunks';
import { EditingTask } from './EditingTask/EditingTask';
import { TaskUserItem } from './EditingTask/TaskUsers/TaskUsers';

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

  const users = useAppSelector(selectUsersByIds(taskData?.users || []));

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
        {taskData?.title}
        <button onClick={() => setIsEditing(true)}>
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </header>
      <p>{taskData?.description}</p>
      <div className="task__user-list">
        {users.map((user) => (
          <TaskUserItem name={user.name} key={user._id} userId={user._id} />
        ))}
      </div>
    </div>
  );
});

export default Task;
