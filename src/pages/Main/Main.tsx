import { Modal } from 'components/Modal/Modal';
import React, { memo, useState } from 'react';
import { BoardsList } from './components/BoardsList';

export const Main = memo(() => {
  const [modalOpened, setModalOpened] = useState(false);
  const toggleModal = (flag: boolean) => {
    setModalOpened(flag);
  };

  return (
    <>
      <div className="main__container">
        <button onClick={() => toggleModal(true)}>Add board</button>
        <BoardsList />
      </div>
      <Modal isOpened={modalOpened} toggleModal={toggleModal}>
        <div>hahah</div>
      </Modal>
    </>
  );
});
