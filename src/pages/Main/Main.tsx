import React, { memo } from 'react';
import { BoardsList } from './components/BoardsList';
import ErrorBoundary from '../../common/ErrorBoundary';

export const Main = memo(() => {
  return (
    <>
      <div className="main__container">
        <ErrorBoundary>
          <BoardsList />
        </ErrorBoundary>
      </div>
    </>
  );
});
