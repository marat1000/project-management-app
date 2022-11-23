import { Button } from 'components/Button/Button';
import {
  InputWithErrorMessage,
  EInputTypes,
  EPattern,
  EFormErrorMessages,
} from 'components/Input/InputWithErrorMessage';
import { Modal } from 'components/Modals/Modal/Modal';
import React, { useRef, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearEditProfileError } from 'store/slices/authSlice';
import { toggleEditProfileModal } from 'store/slices/modalsSlice';
import {
  editUser,
  deleteUser,
  selectUserName,
  selectUserId,
  selectUserLogin,
  selectUserEditFlags,
} from 'store/slices/userSlice';

export const EditProfileModal = memo(() => {
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(toggleEditProfileModal(false));
  };

  const username = useAppSelector(selectUserName);
  const { error, isLoading } = useAppSelector(selectUserEditFlags);
  const userID = useAppSelector(selectUserId);
  const userLogin = useAppSelector(selectUserLogin);

  const nameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const clearError = () => {
    dispatch(clearEditProfileError());
  };

  const changeUserHandler = () => {
    if (!nameRef.current || !loginRef.current || !passwordRef.current) return;

    const isNameValid = nameRef.current.checkValidity();
    const isLoginValid = loginRef.current.checkValidity();
    const isPasswordValid = passwordRef.current.checkValidity();

    if (!isNameValid || !isLoginValid || !isPasswordValid) return;

    dispatch(
      editUser({
        name: nameRef.current.value,
        login: loginRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };

  const deleteUserHandler = () => {
    dispatch(deleteUser(userID));
  };

  if (isLoading) {
    return (
      <Modal close={closeModal} title="Edit Profile">
        Loading
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal close={closeModal} title="Edit Profile">
        {error}
      </Modal>
    );
  }

  return (
    <Modal close={closeModal} title="Edit Profile">
      <div className="create-board-container">
        <InputWithErrorMessage
          initialValue={username}
          pattern={EPattern.name}
          placeholder="Name"
          errorMessage={EFormErrorMessages.name}
          type={EInputTypes.text}
          onChangeCb={clearError}
          ref={nameRef}
        />
        <InputWithErrorMessage
          initialValue={userLogin}
          pattern={EPattern.login}
          placeholder="Login"
          errorMessage={EFormErrorMessages.login}
          type={EInputTypes.text}
          onChangeCb={clearError}
          ref={loginRef}
        />
        <InputWithErrorMessage
          pattern={EPattern.password}
          placeholder="Password"
          errorMessage={EFormErrorMessages.password}
          type={EInputTypes.password}
          onChangeCb={clearError}
          ref={passwordRef}
        />
        <Button color="main" onClick={changeUserHandler}>
          Change
        </Button>
        <Button color="add" onClick={deleteUserHandler}>
          Delete user
        </Button>
      </div>
    </Modal>
  );
});
