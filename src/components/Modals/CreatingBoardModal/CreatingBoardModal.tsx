import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modals/Modal/Modal';
import { useInput, useTextArea } from 'hooks/hooks';
import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { createBoard, creatingBoardFlagsSelector } from 'store/slices/boardsSlice';
import { selectCreatingBoardModalOpen, toggleCreatingBoardModal } from 'store/slices/modalsSlice';

export const CreatingBoardModal = memo(() => {
  const isOpened = useAppSelector(selectCreatingBoardModalOpen);
  const { error, isLoading } = useAppSelector(creatingBoardFlagsSelector);
  const dispatch = useAppDispatch();
  const toggle = (flag: boolean) => {
    dispatch(toggleCreatingBoardModal(flag));
  };

  const title = useInput('');
  const description = useTextArea('');

  const submit = () => {
    console.log('submit');
    const boardTitle = title.value;
    const boardDescription = description.value;
    console.log('submit', boardTitle, boardDescription);

    dispatch(
      createBoard({
        title: `${boardTitle}%${boardDescription}`,
        users: [],
      })
    )
      .unwrap()
      .then(() =>
        // TODO create middleware
        toggle(false)
      );
  };

  if (isLoading) {
    return (
      <Modal isOpened={isOpened} toggle={toggle} title="Create board">
        Loading
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal isOpened={isOpened} toggle={toggle} title="Create board">
        {error}
      </Modal>
    );
  }

  return (
    <Modal isOpened={isOpened} toggle={toggle} title="Create board">
      <input placeholder="Board name" {...title}></input>
      <textarea placeholder="Description" {...description}></textarea>
      <Button color="add" onClick={submit}>
        Create
      </Button>
    </Modal>
  );
});
