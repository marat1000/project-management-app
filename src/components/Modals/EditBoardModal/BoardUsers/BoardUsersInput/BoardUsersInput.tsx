import React, { memo, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectAllUsers, selectEditedBoardUsers } from 'store/slices/editBoard/editBoardSelectors';
import { selectUserName } from 'store/slices/user/userSelectors';
import { IUser } from 'ts/interfaces';
import { UsersMatchListItem } from './UsersMatchListItem/UsersMatchListItem';
import { useTranslation } from 'react-i18next';

export const BoardUsersInput = memo(() => {
  const { t } = useTranslation();
  const usersOnThisBoard = useAppSelector(selectEditedBoardUsers);
  const username = useAppSelector(selectUserName);
  const users = useAppSelector(selectAllUsers);
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
    <div className="input-container">
      <input
        className="input"
        type="text"
        placeholder={`${t(`addUser`)}...`}
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
