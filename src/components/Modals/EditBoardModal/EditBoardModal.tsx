import { BoardUsers } from 'components/Modals/EditBoardModal/BoardUsers/BoardUsers';
import { Button } from 'components/Button/Button';
import {
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/InputWithErrorMessage';
import { InputTextArea } from 'components/Input/TextArea';
import { Modal } from 'components/Modals/Modal/Modal';
import React, { memo, useCallback, useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { toggleEditBoardModal } from 'store/slices/modals/modalsSlice';
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
import { useTranslation } from 'react-i18next';

export const EditBoardModal = memo(() => {
  const { t } = useTranslation();
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

  const modalTitle = boardId ? t(`editBoard`) : t(`createBoard`);
  const buttonTitle = boardId ? t(`edit`) : t(`create`);

  // eslint-disable-next-line prettier/prettier
  const [initialBoardTitle, ...initialBoardDescription] = rowBoardData?.title.split('%') || ['', ''];

  if (isLoading) {
    return (
      <Modal close={closeModal} title={modalTitle}>
        {t(`loading`)}
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
          errorMessage={t('nameError')}
          placeholder={t(`boardName`) as string}
          onChangeCb={onTitleChange}
          ref={titleRef}
          initialValue={initialBoardTitle}
        />
        <InputTextArea
          placeholder={t(`description`) as string}
          onChangeCb={onDescriptionChange}
          initialValue={initialBoardDescription.join('')}
        />

        <BoardUsers />

        <Button color="add" onClick={submit}>
          {buttonTitle}
        </Button>

        {boardId && (
          <Button color="add" onClick={deleteThisBoard}>
            {t(`delete`)}
          </Button>
        )}
      </div>
    </Modal>
  );
});
