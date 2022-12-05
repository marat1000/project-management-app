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
import { selectLanguage } from 'store/slices/settings/settingsSelectors';
import { langConfig } from 'language/langConfig';

export const CreateColumnModal = memo(() => {
  const lang = useAppSelector(selectLanguage);

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
      <Modal close={closeModal} title={langConfig.createColumn[lang]}>
        {langConfig.loading[lang]}
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal close={closeModal} title={langConfig.createColumn[lang]}>
        {error}
      </Modal>
    );
  }

  return (
    <Modal close={closeModal} title={langConfig.createColumn[lang]}>
      <div className="create-board-container">
        <InputWithErrorMessage
          type={EInputTypes.text}
          pattern={EPattern.title}
          errorMessage={langConfig.nameError[lang]}
          placeholder={langConfig.columnName[lang]}
          ref={titleRef}
          initialValue={''}
        />

        <Button color="add" onClick={submit}>
          {langConfig.create[lang]}
        </Button>
      </div>
    </Modal>
  );
});
