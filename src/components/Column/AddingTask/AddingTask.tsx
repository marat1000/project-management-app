import { EntityId } from '@reduxjs/toolkit';
import { EditingTask } from 'components/Task/EditingTask/EditingTask';
import React, { memo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { addTask } from 'store/slices/tasks/tasksThunks';

interface IAddingTaskProps {
  columnId: EntityId;
}

const AddingTask = memo<IAddingTaskProps>(({ columnId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useAppDispatch();
  const { id: boardId } = useParams();

  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');

  // const onDescriptionChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
  //   setDescription(e.currentTarget.value);
  // };

  // const onTitleChange = (e: SyntheticEvent<HTMLInputElement>) => {
  //   setTitle(e.currentTarget.value);
  // };

  // const addTaskHandler = () => {
  //   const taskData = {
  //     description: description || '',
  //     title,
  //     users: [] as EntityId[],
  //     order: 0,
  //   };
  //   dispatch(
  //     addTask({
  //       columnId,
  //       boardId: boardId!,
  //       taskData,
  //     })
  //   )
  //     .unwrap()
  //     .then(() => {
  //       setIsAdding(false);
  //     });
  // };

  const addTaskHandler = useCallback((title: string, description: string, users: EntityId[]) => {
    setIsUpdating(true);
    dispatch(
      addTask({
        columnId,
        boardId: boardId!,
        taskData: {
          description,
          title,
          users,
          order: 0,
        },
      })
    )
      .unwrap()
      .then(() => {
        setIsAdding(false);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  }, []);

  const cancelAdding = useCallback(() => {
    setIsAdding(false);
  }, []);

  if (isAdding) {
    return <EditingTask cancel={cancelAdding} submit={addTaskHandler} isUpdating={isUpdating} />;
  }
  return <button onClick={() => setIsAdding(true)}>Add +</button>;
});

export default AddingTask;
