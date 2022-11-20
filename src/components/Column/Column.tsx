import React from 'react';
import { memo } from 'react';
import dots from './dots.svg';

export const Column = memo(() => {
  return (
    <div className="column">
      <header>Title</header>
      <footer>
        <button>Add +</button>
        <button>
          <img src={dots} className="App-logo" alt="logo" />
        </button>
      </footer>
    </div>
  );
});
