import { BoardUsers } from 'components/BoardUsers/BoardUsers';
import { Button } from 'components/Button/Button';
import {
  EFormErrorMessages,
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/InputWithErrorMessage';
import { InputTextArea } from 'components/Input/TextArea';
import { Modal } from 'components/Modals/Modal/Modal';
import React, { memo, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  deleteBoard,
  editingBoardFlagsSelector,
  selectBoardById,
  updateBoard,
} from 'store/slices/boardsSlice';
import { selectEditBoardModalOpen, toggleEditBoardModal } from 'store/slices/modalsSlice';
import { selectBoardUsers, selectCurrentBoardID, setBoardUsers } from 'store/slices/editBoardSlice';
import { useSelector } from 'react-redux';

export const EditBoardModal = memo(() => {
  const isOpened = useAppSelector(selectEditBoardModalOpen);
  const { error, isLoading } = useAppSelector(editingBoardFlagsSelector);
  const usersAdded = useAppSelector(selectBoardUsers);
  //зачем если это есть в дате
  const dispatch = useAppDispatch();
  const toggle = (flag: boolean) => {
    dispatch(toggleEditBoardModal(flag));
  };

  const ID = useSelector(selectCurrentBoardID);
  const data = useSelector(selectBoardById(ID));
  const users = data?.users;
  const [title, description] = data?.title.split('%') || ['', ''];

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (isOpened) {
      dispatch(setBoardUsers(users || []));
    }
  }, [isOpened, dispatch]);

  const deleteThisBoard = () => {
    if (data) {
      dispatch(deleteBoard(data._id))
        .unwrap()
        .then(() => toggle(false));
    }
  };

  const submit = () => {
    if (!titleRef.current || !descriptionRef.current) return;
    const isGood = titleRef.current.checkValidity();
    if (!isGood) return;

    const boardTitle = titleRef.current.value;
    const boardDescription = descriptionRef.current.value;

    if (!data) return;
    // плюс наверн врубить ошибку
    dispatch(
      updateBoard({
        title: `${boardTitle}%${boardDescription}`,
        users: data.users,
        isProcessed: false,
        _id: data?._id,
        owner: data?.owner,
      })
    )
      .unwrap()
      .then(() =>
        // TODO create middleware ?
        toggle(false)
      );
  };

  if (isLoading) {
    return (
      <Modal isOpened={isOpened} toggle={toggle} title="Edit board">
        Loading
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal isOpened={isOpened} toggle={toggle} title="Edit board">
        {error}
      </Modal>
    );
  }

  return (
    <Modal isOpened={isOpened} toggle={toggle} title="Edit board">
      <div className="edit-board-container">
        <InputWithErrorMessage
          type={EInputTypes.text}
          pattern={EPattern.name}
          errorMessage={EFormErrorMessages.name}
          placeholder="Board name"
          ref={titleRef}
          initialValue={title}
        />
        <InputTextArea initialValue={description} ref={descriptionRef} placeholder="Description" />

        <BoardUsers />

        <Button color="main" onClick={submit}>
          Change
        </Button>
        <Button color="add" onClick={deleteThisBoard}>
          Delete
        </Button>
      </div>
    </Modal>
  );
});
