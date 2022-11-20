import React from 'react';
import { memo } from 'react';
import { Column } from '../../../components/Column/Column';

export const ColumnsList = memo(() => {
  return (
    <div className="board-page__columns-list">
      <Column></Column>
    </div>
  );
});
