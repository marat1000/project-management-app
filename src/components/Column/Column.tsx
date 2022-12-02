import { EntityId } from '@reduxjs/toolkit';
import { EditTitleInput } from 'components/Input/editTitleInput';
import { EPattern } from 'components/Input/InputWithErrorMessage';
import { useDrag } from 'hooks/hooks';
import React, { useCallback, useRef, useState } from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteColumn, selectColumnById, updateColumn } from 'store/slices/columns/columnsSlice';
import {
  catchColumnsDrop,
  setDragColumn,
  setOverColumn,
  setOverColumnSide,
} from 'store/slices/drags/dragsSlice';
import dots from '../Svg/dots.svg';
import AddingTask from './AddingTask/AddingTask';
import TasksList from './TasksList/TasksList';

const getColumnClassName = (isDragOver: boolean, side: null | -1 | 1, isTaskOver: boolean) => {
  if (isTaskOver) {
    return 'column on-task-over';
  }
  if (!isDragOver || !side) {
    return 'column';
  }

  return side > 0 ? 'column on-column-over_right' : 'column on-column-over_left';
};

export const Column = memo(({ id }: { id: EntityId }) => {
  const dispatch = useAppDispatch();
  const columnData = useAppSelector(selectColumnById(id))!;
  const columnRef = useRef<HTMLDivElement>(null);
  const [dragOverSide, setDragOverSide] = useState<null | -1 | 1>(null);
  console.log('Column rerender', columnData.title);

  const onDragOverCb = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!columnRef.current) {
      return;
    }

    const x = e.clientX - columnRef.current.getBoundingClientRect().left;
    const width = columnRef.current.clientWidth;
    const side = (x - width / 2) / width > 0 ? 1 : -1;
    if (side != dragOverSide) {
      setDragOverSide(side);
      dispatch(setOverColumnSide(side));
    }
  };

  const onDragEnterCb = () => {
    dispatch(setOverColumn(columnData));
    setDragOverSide(null);
  };

  const onDragLeaveCb = () => {
    setDragOverSide(null);
  };

  const { isDragOver, bind: bindDrag } = useDrag(
    columnRef,
    onDragEnterCb,
    onDragOverCb,
    onDragLeaveCb
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isEditPending, setIsEditPending] = useState(false);
  const { title, boardId, _id: columnId, order } = columnData!;

  const updateTitle = useCallback(
    (value: string) => {
      setIsEditPending(true);
      dispatch(updateColumn({ title: value, columnId, boardId, order }))
        .unwrap()
        .then(() => setIsEditing(false))
        .finally(() => {
          setIsEditPending(false);
        });
    },
    [order]
  );

  const cancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const editColumn = useCallback(() => {
    setIsEditing(true);
  }, []);

  const deleteColumnHandler = () => {
    setIsEditPending(true);
    dispatch(deleteColumn({ boardId, columnId }))
      .unwrap()
      .then(() => {
        setIsEditing(false);
      })
      .finally(() => {
        setIsEditPending(false);
      });
  };

  return (
    <div
      ref={columnRef}
      className={getColumnClassName(isDragOver, dragOverSide, false)}
      {...bindDrag}
    >
      <div
        className="column_container"
        draggable={true}
        onDragStart={() => {
          dispatch(setDragColumn(columnData));
        }}
        onDragEnd={(e) => {
          e.preventDefault();
          dispatch(catchColumnsDrop());
        }}
      >
        {isEditing ? (
          <EditTitleInput
            submitHandler={updateTitle}
            cancelHandler={cancelEdit}
            deleteHandler={deleteColumnHandler}
            pattern={EPattern.name}
            initialValue={title}
            isLoading={isEditPending}
          />
        ) : (
          <header>{title}</header>
        )}

        <TasksList columnId={columnId} />
        <footer>
          <AddingTask columnId={id} />
          {!isEditing && (
            <button onClick={editColumn}>
              <img src={dots} />
            </button>
          )}
        </footer>
      </div>
    </div>
  );
});
