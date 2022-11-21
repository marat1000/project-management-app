import { Button } from 'components/Button/Button';
import {
  EFormErrorMessages,
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/InputWithErrorMessage';
import { InputTextArea } from 'components/Input/TextArea';
import { Modal } from 'components/Modals/Modal/Modal';
import React, { memo, useRef } from 'react';
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

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    console.log('submit start');
    if (!titleRef.current || !descriptionRef.current) return;
    const isGood = titleRef.current.checkValidity();
    if (!isGood) return;

    const boardTitle = titleRef.current.value;
    const boardDescription = descriptionRef.current.value;
    console.log('submit done', boardTitle, boardDescription);

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
      <div className="create-board-container">
        <InputWithErrorMessage
          type={EInputTypes.text}
          pattern={EPattern.name}
          errorMessage={EFormErrorMessages.name}
          placeholder="Board name"
          ref={titleRef}
        />
        <InputTextArea ref={descriptionRef} placeholder="Description" />
        <Button color="add" onClick={submit}>
          Create
        </Button>
      </div>
    </Modal>
  );
});
