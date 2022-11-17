import React, { memo } from 'react';
import { TEST__Main } from '../components/TEST__Main';

export const Main = memo(() => {
  return (
    <div>
      <p>Main.</p>
      <TEST__Main />
    </div>
  );
});
