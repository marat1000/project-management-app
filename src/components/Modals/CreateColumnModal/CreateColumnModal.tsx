import { Button } from 'components/Button/Button';
import {
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/InputWithErrorMessage';
import { Modal } from 'components/Modals/Modal/Modal';
import React, { memo, useCallback, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { toggleCreateColumnModal } from 'store/slices/modals/modalsSlice';
import { addColumn, selectColumnIds, selectColumnById } from 'store/slices/columns/columnsSlice';
import { selectCurrentBoardId } from 'store/slices/user/userSelectors';
import { useTranslation } from 'react-i18next';

export const CreateColumnModal = memo(() => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector(selectCurrentBoardId);
  const columns = useAppSelector(selectColumnIds)!;
  const columnData = useAppSelector(selectColumnById(columns.at(-1) || 0));

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
        boardId: currentBoardId,
        column: {
          title: titleRef.current.value,
          order: columnData ? columnData.order + 1 : 0,
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
  }, [dispatch]);

  if (isLoading) {
    return (
      <Modal close={closeModal} title={t(`createColumn`)}>
        {t(`loading`)}
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal close={closeModal} title={t(`createColumn`)}>
        {error}
      </Modal>
    );
  }

  return (
    <Modal close={closeModal} title={t(`createColumn`)}>
      <div className="create-board-container">
        <InputWithErrorMessage
          type={EInputTypes.text}
          pattern={EPattern.name}
          errorMessage={t('nameError')}
          placeholder={String(t(`columnName`))}
          ref={titleRef}
          initialValue={''}
        />

        <Button color="add" onClick={submit}>
          {t(`create`)}
        </Button>
      </div>
    </Modal>
  );
});
