import { useInput } from 'hooks/hooks';
import React from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { logOut } from 'store/slices/authSlice';
import { editUser, deleteUser, userIdSelector, userNameSelector } from 'store/slices/userSlice';

export const Profile = memo(() => {
  const dispatch = useAppDispatch();
  const name = useInput('');
  const login = useInput('');
  const password = useInput('');
  const userName = useAppSelector(userNameSelector);
  const userID = useAppSelector(userIdSelector);

  const changeUserHandler = () => {
    dispatch(editUser({ name: name.value, login: login.value, password: password.value }));
  };

  const deleteUserHandler = () => {
    dispatch(deleteUser(userID))
      .unwrap()
      .then((status) => {
        // а нужна ли проверка эта?
        if (status === 200) {
          dispatch(logOut());
        }
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>Edit Page</div>
      <div>{`name:${userName.username}`}</div>
      <input placeholder="name" {...name}></input>
      <input placeholder="login" {...login} />
      <input type="password" placeholder="password" {...password} />
      <button onClick={changeUserHandler}>Change</button>
      <button style={{ backgroundColor: 'red' }} onClick={deleteUserHandler}>
        Delete user
      </button>
    </div>
  );
});
