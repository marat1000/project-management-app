import { Modal } from 'components/Modals/Modal/Modal';
import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCreatingBoardModalOpen, toggleCreatingBoardModal } from 'store/slices/modalsSlice';

export const CreatingBoardModal = memo(() => {
  const isOpened = useAppSelector(selectCreatingBoardModalOpen);
  const dispatch = useAppDispatch();
  const toggle = (flag: boolean) => {
    dispatch(toggleCreatingBoardModal(flag));
  };

  return (
    <Modal isOpened={isOpened} toggle={toggle}>
      CreatingBoardModal
    </Modal>
  );
});
