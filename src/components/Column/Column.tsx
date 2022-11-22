import React from 'react';
import { memo } from 'react';
import dots from '../Svg/dots.svg';

export const Column = memo(() => {
  return (
    <div className="column">
      <header>Title</header>
      <footer>
        <button>Add +</button>
        <button>
          <img src={dots} />
        </button>
      </footer>
    </div>
  );
});
