import { EntityId } from '@reduxjs/toolkit';
import {
  EFormErrorMessages,
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/InputWithErrorMessage';
import React, { memo, SyntheticEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectTaskById } from 'store/slices/tasks/tasksSelector';
import { editTask } from 'store/slices/tasks/tasksThunks';

interface ITaskProps {
  id: EntityId;
}
const Task = memo<ITaskProps>(({ id }) => {
  const taskData = useAppSelector(selectTaskById(id));
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { id: boardId } = useParams();

  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const onTitleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setEditedTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setEditedTitle(e.currentTarget.value);
  };

  const endEditTask = () => {
    if (!taskData || !boardId) return;
    dispatch(
      editTask({
        boardId: boardId,
        columnId: taskData.columnId,
        taskId: id,
        taskData: {
          description: editedDescription,
          title: editedTitle,
          order: taskData.order,
          users: [],
        },
      })
    );
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div>
        <InputWithErrorMessage
          pattern={EPattern.login}
          initialValue={taskData?.title}
          errorMessage={EFormErrorMessages.login}
          type={EInputTypes.text}
          onChangeCb={onTitleChange}
        />
        <button onClick={endEditTask}> Accept </button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
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
