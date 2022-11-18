import { useInput } from 'hooks/hooks';
import React from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { editUser, userNameSelector } from 'store/slices/userSlice';

export const EditUserPage = memo(() => {
  const dispatch = useAppDispatch();
  const name = useInput('');
  const login = useInput('');
  const password = useInput('');
  const userName = useAppSelector(userNameSelector);

  const submit = () => {
    dispatch(editUser({ name: name.value, login: login.value, password: password.value }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>Edit Page</div>
      <div>{`name:${userName.username}`}</div>
      <input placeholder="name" {...name}></input>
      <input placeholder="login" {...login} />
      <input type="password" placeholder="password" {...password} />
      <button onClick={submit}>Change</button>
    </div>
  );
});
