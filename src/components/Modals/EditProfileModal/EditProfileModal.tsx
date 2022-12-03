import { Button } from 'components/Button/Button';
import {
  InputWithErrorMessage,
  EInputTypes,
  EPattern,
} from 'components/Input/InputWithErrorMessage';
import { Modal } from 'components/Modals/Modal/Modal';
import { langConfig } from 'language/langConfig';
import React, { useRef, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearEditProfileError } from 'store/slices/auth/authSlice';
import { toggleEditProfileModal } from 'store/slices/modals/modalsSlice';
import { selectLanguage } from 'store/slices/settings/settingsSelectors';
import {
  selectUserName,
  selectUserEditFlags,
  selectUserId,
  selectUserLogin,
} from 'store/slices/user/userSelectors';
import { editUser, deleteUser } from 'store/slices/user/userThunks';

export const EditProfileModal = memo(() => {
  const lang = useAppSelector(selectLanguage);
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
      <Modal close={closeModal} title={langConfig.editProfile[lang]}>
        {langConfig.loading[lang]}
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal close={closeModal} title={langConfig.editProfile[lang]}>
        {error}
      </Modal>
    );
  }

  return (
    <Modal close={closeModal} title={langConfig.editProfile[lang]}>
      <div className="create-board-container">
        <InputWithErrorMessage
          initialValue={username}
          pattern={EPattern.name}
          placeholder={langConfig.name[lang]}
          errorMessage={langConfig.nameError[lang]}
          type={EInputTypes.text}
          onChangeCb={clearError}
          ref={nameRef}
        />
        <InputWithErrorMessage
          initialValue={userLogin}
          pattern={EPattern.login}
          placeholder={langConfig.login[lang]}
          errorMessage={langConfig.loginError[lang]}
          type={EInputTypes.text}
          onChangeCb={clearError}
          ref={loginRef}
        />
        <InputWithErrorMessage
          pattern={EPattern.password}
          placeholder={langConfig.password[lang]}
          errorMessage={langConfig.passwordError[lang]}
          type={EInputTypes.password}
          onChangeCb={clearError}
          ref={passwordRef}
        />
        <Button color="main" onClick={changeUserHandler}>
          {langConfig.edit[lang]}
        </Button>
        <Button color="add" onClick={deleteUserHandler}>
          {langConfig.deleteUser[lang]}
        </Button>
      </div>
    </Modal>
  );
});
