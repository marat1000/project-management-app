import { EntityId } from '@reduxjs/toolkit';
import { useDrag } from 'hooks/hooks';
import React, { memo, useCallback, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  catchTaskDrop,
  selectIsTaskDrag,
  setDragTask,
  setOverTask,
  setOverTaskSide,
} from 'store/slices/drags/dragsSlice';
import { selectUsersByIds } from 'store/slices/editBoard/editBoardSelectors';
import { selectIsDark } from 'store/slices/settings/settingsSelectors';
import { selectTaskById } from 'store/slices/tasks/tasksSelector';
import { deleteTask, editTask } from 'store/slices/tasks/tasksThunks';
import { EditingTask } from './EditingTask/EditingTask';
import { TaskUserItem } from './EditingTask/TaskUsers/TaskUsers';

interface ITaskProps {
  id: EntityId;
}

const getTaskClassName = (
  isOnDrag: boolean,
  isTaskDrag: boolean,
  isDragOver: boolean,
  side: null | -1 | 1,
  isDark: boolean
) => {
  const defaultClass = isDark ? 'task-dark' : 'task';
  if (isOnDrag) {
    return defaultClass;
  }

  if (!isTaskDrag) {
    return defaultClass;
  }

  // if (isDragOver && side) {
  //   return side > 0 ? 'task on-task-over_bottom' : 'task on-task-over_top';
  // }
  // return 'task';
  if (isDragOver && side) {
    return side > 0 ? `${defaultClass} on-task-over_bottom` : `${defaultClass} on-task-over_top`;
  }
  return defaultClass;
};

const Task = memo<ITaskProps>(({ id }) => {
  const taskData = useAppSelector(selectTaskById(id))!;
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useAppDispatch();

  const taskRef = useRef<HTMLDivElement>(null);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!taskRef.current) {
      return;
    }

    if (isOnDrag) {
      return;
    }

    const y = e.clientY - taskRef.current.getBoundingClientRect().top;
    const height = taskRef.current.clientHeight;
    const side = (y - height / 2) / height > 0 ? 1 : -1;
    if (side != dragOverSide) {
      setDragOverSide(side);
      dispatch(setOverTaskSide(side));
    }
  };

  const onDragLeaveCb = () => {
    setDragOverSide(null);
    dispatch(setOverTask(null));
  };

  const onDragEnterCb = () => {
    if (isOnDrag) {
      return;
    }
    dispatch(setOverTask(taskData));
  };

  const { bind: bindDrag, isDragOver } = useDrag(taskRef, onDragEnterCb, onDragOver, onDragLeaveCb);
  const [isOnDrag, setIsOnDrag] = useState(false);
  const isTaskDrag = useAppSelector(selectIsTaskDrag);
  const [dragOverSide, setDragOverSide] = useState<null | -1 | 1>(null);

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

  const isDark = useAppSelector(selectIsDark);

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
    <div
      ref={taskRef}
      className={getTaskClassName(isOnDrag, isTaskDrag, isDragOver, dragOverSide, isDark)}
      draggable={true}
      onDragStart={(e) => {
        e.stopPropagation();
        setIsOnDrag(true);
        dispatch(setDragTask(taskData));
      }}
      onDragEnd={() => {
        setIsOnDrag(false);
        dispatch(catchTaskDrop());
      }}
      {...bindDrag}
    >
      <header className="task-header">
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
