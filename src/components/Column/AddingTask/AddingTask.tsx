import { EntityId } from '@reduxjs/toolkit';
import { Button } from 'components/Button/Button';
import {
  EFormErrorMessages,
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/InputWithErrorMessage';
import { InputTextArea } from 'components/Input/TextArea';
import React, { memo, SyntheticEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { addTask } from 'store/slices/tasks/tasksThunks';

interface IAddingTaskProps {
  columnId: EntityId;
}

const AddingTask = memo<IAddingTaskProps>(({ columnId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();
  const { id: boardId } = useParams();

  const onDescriptionChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  const onTitleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const addTaskHandler = () => {
    const taskData = {
      description: description || '',
      title,
      users: [] as EntityId[],
      order: 0,
    };
    dispatch(
      addTask({
        columnId,
        boardId: boardId!,
        taskData,
      })
    )
      .unwrap()
      .then(() => {
        setIsAdding(false);
      });
  };

  if (isAdding) {
    return (
      <div>
        <InputWithErrorMessage
          type={EInputTypes.text}
          pattern={EPattern.login}
          errorMessage={EFormErrorMessages.login}
          placeholder="title"
          onChangeCb={onTitleChange}
        />
        <InputTextArea
          placeholder="Description"
          onChangeCb={onDescriptionChange}
          initialValue={''}
        />
        <button onClick={addTaskHandler}>Add</button>
        <button onClick={() => setIsAdding(false)}>Cancel</button>
      </div>
    );
  }
  return <button onClick={() => setIsAdding(true)}>Add +</button>;
});

export default AddingTask;
