import React, { memo, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { selectAllUsers, fetchAllUsers, selectBoardUsers } from 'store/slices/editBoardSlice';
import { userNameSelector } from 'store/slices/userSlice';
import { IUser } from 'ts/interfaces';
import { UsersMatchListItem } from './UsersMatchListItem/UsersMatchListItem';

export const BoardUsersInput = memo(() => {
  const usersOnThisBoard = useAppSelector(selectBoardUsers);
  const { username } = useAppSelector(userNameSelector);
  const users = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();
  const [matchedUsers, setMatchedUsers] = useState<IUser[]>([]);

  const [search, setSearch] = useState('');

  const searchUsers = (e: SyntheticEvent<HTMLInputElement>) => {
    const search = e.currentTarget.value;
    setSearch(search);
  };

  const clearInput = useCallback(() => {
    setSearch('');
  }, []);

  useEffect(() => {
    if (!search) {
      setMatchedUsers([]);
      return;
    }
    const matches = users.filter(
      (user) =>
        username != user.name &&
        !usersOnThisBoard.includes(user._id) &&
        user.name.toLowerCase().includes(search.toLowerCase())
    );
    setMatchedUsers(matches);
  }, [search, usersOnThisBoard, users, username]);

  return (
    <div>
      <input
        className="input"
        type="text"
        placeholder="Add user..."
        onFocus={() => dispatch(fetchAllUsers())}
        value={search}
        onChange={searchUsers}
      />
      {matchedUsers.length ? (
        <div className="board-users__match-list">
          {matchedUsers.map(({ _id, name }) => (
            <UsersMatchListItem key={_id} id={_id} name={name} clearInput={clearInput} />
          ))}
        </div>
      ) : null}
    </div>
  );
});
