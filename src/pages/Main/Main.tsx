import React, { memo } from 'react';
import { BoardsList } from './components/BoardsList';

export const Main = memo(() => {
  return (
    <>
      <div className="main__container">
        <BoardsList />
      </div>
    </>
  );
});
