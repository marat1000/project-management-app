import { BoardUsers } from 'components/Modals/EditBoardModal/BoardUsers/BoardUsers';
import { Button } from 'components/Button/Button';
import {
  EFormErrorMessages,
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/InputWithErrorMessage';
import { InputTextArea } from 'components/Input/TextArea';
import { Modal } from 'components/Modals/Modal/Modal';
import React, { memo, useCallback, useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { toggleEditBoardModal } from 'store/slices/modalsSlice';
import {
  useEditBoardDescriptionOnChange,
  useEditBoardTitleOnChange,
} from 'store/slices/editBoard/editBoardSlice';
import { selectBoardById } from 'store/slices/boards/boardsSelectors';
import { deleteBoard } from 'store/slices/boards/boardsThunks';
import { endEditingBoard } from 'store/slices/editBoard/editBoardThunks';
import {
  selectEditedBoardFlags,
  selectEditedBoardId,
} from 'store/slices/editBoard/editBoardSelectors';

export const EditBoardModal = memo(() => {
  const { error, isLoading } = useAppSelector(selectEditedBoardFlags);
  const boardId = useAppSelector(selectEditedBoardId);
  const rowBoardData = useAppSelector(selectBoardById(boardId));
  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => {
    dispatch(toggleEditBoardModal(false));
  }, [dispatch]);

  const submit = useCallback(() => {
    if (!titleRef.current || !titleRef.current.checkValidity()) {
      return;
    }

    dispatch(endEditingBoard());
  }, [dispatch]);

  const deleteThisBoard = useCallback(() => {
    if (boardId) {
      dispatch(deleteBoard(boardId as string));
    }
  }, [dispatch, boardId]);

  const onTitleChange = useEditBoardTitleOnChange();
  const onDescriptionChange = useEditBoardDescriptionOnChange();

  const titleRef = useRef<HTMLInputElement>(null);

  const modalTitle = boardId ? 'Edit board' : 'Create board';
  const buttonTitle = boardId ? 'Edit' : 'Create';

  // eslint-disable-next-line prettier/prettier
  const [initialBoardTitle, ...initialBoardDescription] = rowBoardData?.title.split('%') || ['', ''];

  if (isLoading) {
    return (
      <Modal close={closeModal} title={modalTitle}>
        Loading
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal close={closeModal} title={modalTitle}>
        {error}
      </Modal>
    );
  }

  return (
    <Modal close={closeModal} title={modalTitle}>
      <div className="create-board-container">
        <InputWithErrorMessage
          type={EInputTypes.text}
          pattern={EPattern.name}
          errorMessage={EFormErrorMessages.name}
          placeholder="Board name"
          onChangeCb={onTitleChange}
          ref={titleRef}
          initialValue={initialBoardTitle}
        />
        <InputTextArea
          placeholder="Description"
          onChangeCb={onDescriptionChange}
          initialValue={initialBoardDescription.join('')}
        />

        <BoardUsers />

        <Button color="add" onClick={submit}>
          {buttonTitle}
        </Button>

        {boardId && (
          <Button color="add" onClick={deleteThisBoard}>
            Delete
          </Button>
        )}
      </div>
    </Modal>
  );
});
