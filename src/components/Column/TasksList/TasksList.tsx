import { EntityId } from '@reduxjs/toolkit';
import Task from 'components/Task/Task';
import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectTaskIdsByColumnId } from 'store/slices/tasks/tasksSelector';

interface ITasksListProps {
  columnId: EntityId;
}

const TasksList = memo<ITasksListProps>(({ columnId }) => {
  const tasksIds = useAppSelector(selectTaskIdsByColumnId(columnId));
  console.log('Task list rerender', tasksIds);
  return (
    <div>
      {tasksIds.map((taskId) => (
        <Task id={taskId} key={taskId} />
      ))}
    </div>
  );
});

export default TasksList;
