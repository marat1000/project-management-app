import { Button } from 'components/Button/Button';
import {
  EFormErrorMessages,
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/InputWithErrorMessage';
import { Modal } from 'components/Modals/Modal/Modal';
import React, { memo, useCallback, useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { toggleEditColumnModal } from 'store/slices/modals/modalsSlice';
import { selectEditedBoardFlags } from 'store/slices/editBoard/editBoardSelectors';
import { selectEditedColumnData } from 'store/slices/editColumn/editColumnSelectors';
import { useEditColumnTitleOnChange } from 'store/slices/editColumn/editColumnSlice';
import { endEditingColumn } from 'store/slices/editColumn/editColumnThunks';
import { deleteColumn } from 'store/slices/columns/columnsSlice';

export const EditColumnModal = memo(() => {
  const { error, isLoading } = useAppSelector(selectEditedBoardFlags);
  const { title, boardId, columnId } = useAppSelector(selectEditedColumnData);
  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => {
    dispatch(toggleEditColumnModal(false));
  }, [dispatch]);

  const submit = useCallback(() => {
    if (!titleRef.current || !titleRef.current.checkValidity()) {
      return;
    }
    dispatch(endEditingColumn());
  }, [dispatch]);

  const deleteThisColumn = useCallback(() => {
    if (columnId && boardId) {
      dispatch(deleteColumn({ columnId, boardId }));
    }
  }, [dispatch, columnId, boardId]);

  const onTitleChange = useEditColumnTitleOnChange();

  const titleRef = useRef<HTMLInputElement>(null);

  const modalTitle = columnId ? 'Edit column' : 'Create column';
  const buttonTitle = columnId ? 'Edit' : 'Create';

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
          placeholder="Column name"
          onChangeCb={onTitleChange}
          ref={titleRef}
          initialValue={title}
        />

        <Button color="add" onClick={submit}>
          {buttonTitle}
        </Button>

        {columnId && (
          <Button color="add" onClick={deleteThisColumn}>
            Delete
          </Button>
        )}
      </div>
    </Modal>
  );
});
