import { Button } from 'components/Button/Button';
import {
  EFormErrorMessages,
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/InputWithErrorMessage';
import { Modal } from 'components/Modals/Modal/Modal';
import React, { memo, useCallback, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { toggleCreateColumnModal } from 'store/slices/modals/modalsSlice';
import { addColumn } from 'store/slices/columns/columnsSlice';
import { selectCurrentBoard } from 'store/slices/user/userSelectors';

export const CreateColumnModal = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const currentBoard = useAppSelector(selectCurrentBoard);
  const titleRef = useRef<HTMLInputElement>(null);

  const closeModal = useCallback(() => {
    dispatch(toggleCreateColumnModal(false));
  }, [dispatch]);

  const submit = useCallback(() => {
    if (!titleRef.current || !titleRef.current.checkValidity()) {
      return;
    }
    setIsLoading(true);
    dispatch(
      addColumn({
        boardId: currentBoard,
        column: {
          title: titleRef.current.value,
          order: 0,
        },
      })
    )
      .unwrap()
      .then(() => {
        dispatch(toggleCreateColumnModal(false));
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, setError, setIsLoading, currentBoard]);

  if (isLoading) {
    return (
      <Modal close={closeModal} title={'Create column'}>
        Loading
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal close={closeModal} title={'Create column'}>
        {error}
      </Modal>
    );
  }

  return (
    <Modal close={closeModal} title={'Create column'}>
      <div className="create-board-container">
        <InputWithErrorMessage
          type={EInputTypes.text}
          pattern={EPattern.name}
          errorMessage={EFormErrorMessages.name}
          placeholder="Column name"
          ref={titleRef}
          initialValue={''}
        />

        <Button color="add" onClick={submit}>
          Create
        </Button>
      </div>
    </Modal>
  );
});
