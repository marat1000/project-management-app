import React from 'react';
import { memo } from 'react';
import { IColumn } from 'ts/interfaces';
import { Column } from '../../../components/Column/Column';

export const ColumnsList = memo(({ columns }: { columns: IColumn[] }) => {
  return (
    <div className="board-page__columns-list">
      {columns.map((column) => (
        <Column key={column._id} column={column} />
      ))}
    </div>
  );
});
