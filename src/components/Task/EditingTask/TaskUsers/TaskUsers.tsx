import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectBoardById } from 'store/slices/boards/boardsSelectors';
import { selectUsersByIds } from 'store/slices/editBoard/editBoardSelectors';
import { TTaskUsersAction } from '../EditingTask';

interface ITaskUsersProps {
  taskUsers: EntityId[];
  dispatch: React.Dispatch<TTaskUsersAction>;
  disabled: boolean;
}

interface ITaskUserItemProps {
  toggleUser?: (userId: EntityId) => void;
  isSelected?: boolean;
  userId: EntityId;
  name: string;
  disabled?: boolean;
}

export const TaskUserItem = memo<ITaskUserItemProps>(
  ({ toggleUser, isSelected, userId, name, disabled }) => {
    return (
      <div
        onClick={() => !disabled && toggleUser && toggleUser(userId)}
        className={`edit-task__user-item ${isSelected && !disabled ? 'selected' : ''}`}
      >
        {name}
      </div>
    );
  }
);

export const TaskUsersList = memo<ITaskUsersProps>(({ taskUsers, dispatch, disabled }) => {
  const boardId = useParams().id!;
  const boardData = useAppSelector(selectBoardById(boardId))!;

  const boardUsers = useAppSelector(selectUsersByIds([...boardData.users, boardData.owner]));

  const toggleUser = (userId: EntityId) => {
    dispatch({
      type: taskUsers.includes(userId) ? 'removeUser' : 'addUser',
      payload: userId,
    });
  };

  return (
    <div className="edit-task__users-list">
      {boardUsers.map((user) => (
        <TaskUserItem
          key={user._id}
          toggleUser={toggleUser}
          userId={user._id}
          isSelected={taskUsers.includes(user._id)}
          name={user.name}
          disabled={disabled}
        />
      ))}
    </div>
  );
});
