import { EntityId } from '@reduxjs/toolkit';
import { EditTitleInput } from 'components/Input/editTitleInput';
import { EInputTypes, EPattern } from 'components/Input/InputWithErrorMessage';
import React, { SyntheticEvent, useState } from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteColumn, selectColumnById, updateColumn } from 'store/slices/columns/columnsSlice';
import dots from '../Svg/dots.svg';

export const Column = memo(({ id }: { id: EntityId }) => {
  const dispatch = useAppDispatch();
  const columnData = useAppSelector(selectColumnById(id));

  const [isEditing, setIsEditing] = useState(false);

  if (!columnData) {
    return <div>Error</div>;
  }

  const { title: initialTitle, boardId, _id: columnId, order } = columnData;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [title, setTitle] = useState(initialTitle);

  const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const newTitle = e.currentTarget.value;
    setTitle(newTitle);
  };

  const onSubmit = () => {
    console.log('updating...');
    dispatch(updateColumn({ title, columnId, boardId, order }));
    setIsEditing(false);
  };

  const editColumn = () => {
    setIsEditing(true);
  };
  const deleteColumnHandler = () => {
    console.log('deleting...');
    dispatch(deleteColumn({ boardId, columnId }));
    setIsEditing(false);
  };

  return (
    <div className="column">
      {isEditing ? (
        <>
          <EditTitleInput
            onSubmit={onSubmit}
            deleteHandler={deleteColumnHandler}
            onChangeCb={onChange}
            type={EInputTypes.text}
            pattern={EPattern.name}
            initialValue={title}
            value={title}
            setValue={setTitle}
          />
        </>
      ) : (
        <header>{title}</header>
      )}

      <footer>
        <button>Add +</button>
        {!isEditing && (
          <button onClick={editColumn}>
            <img src={dots} />
          </button>
        )}
      </footer>
    </div>
  );
});
