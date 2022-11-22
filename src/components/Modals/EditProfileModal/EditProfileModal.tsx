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
import { clearEditProfileError, editProfileSelector } from 'store/slices/authSlice';
import { selectEditProfileModalOpen, toggleEditProfileModal } from 'store/slices/modalsSlice';
import {
  editUser,
  deleteUser,
  userIdSelector,
  userNameSelector,
  userLoginSelector,
} from 'store/slices/userSlice';

export const EditProfileModal = memo(() => {
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector(selectEditProfileModalOpen);
  const toggle = (flag: boolean) => {
    dispatch(toggleEditProfileModal(flag));
  };

  const userName = useAppSelector(userNameSelector);
  const userID = useAppSelector(userIdSelector);
  const userLogin = useAppSelector(userLoginSelector);

  const nameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { isLoading, error } = useAppSelector(editProfileSelector);

  const clearError = () => {
    dispatch(clearEditProfileError());
  };

  const changeUserHandler = () => {
    if (!nameRef.current || !loginRef.current || !passwordRef.current) return;
    dispatch(
      editUser({
        name: nameRef.current.value,
        login: loginRef.current.value,
        password: passwordRef.current.value,
      })
    );
    dispatch(toggleEditProfileModal(false));
  };

  const deleteUserHandler = () => {
    dispatch(deleteUser(userID));
    dispatch(toggleEditProfileModal(false));
  };

  if (isLoading) {
    return (
      <Modal isOpened={isOpened} toggle={toggle} title="Edit Profile">
        Loading
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal isOpened={isOpened} toggle={toggle} title="Edit Profile">
        {error}
      </Modal>
    );
  }

  return (
    <Modal isOpened={isOpened} toggle={toggle} title="Edit Profile">
      <div className="create-board-container">
        <InputWithErrorMessage
          initialValue={userName.username}
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
