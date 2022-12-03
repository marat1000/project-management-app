import { EntityId } from '@reduxjs/toolkit';
import { EditingTask } from 'components/Task/EditingTask/EditingTask';
import React, { memo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { addTask } from 'store/slices/tasks/tasksThunks';
import { selectLanguage } from 'store/slices/settings/settingsSelectors';
import { langConfig } from 'language/langConfig';

interface IAddingTaskProps {
  columnId: EntityId;
}

const AddingTask = memo<IAddingTaskProps>(({ columnId }) => {
  const lang = useAppSelector(selectLanguage);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useAppDispatch();
  const { id: boardId } = useParams();

  const addTaskHandler = useCallback(
    (title: string, description: string, users: EntityId[]) => {
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
    },
    [dispatch, setIsUpdating, setIsAdding, boardId, columnId]
  );

  const cancelAdding = useCallback(() => {
    setIsAdding(false);
  }, []);

  if (isAdding) {
    return <EditingTask cancel={cancelAdding} submit={addTaskHandler} isUpdating={isUpdating} />;
  }
  return <button onClick={() => setIsAdding(true)}>{langConfig.add[lang]}</button>;
});

export default AddingTask;
