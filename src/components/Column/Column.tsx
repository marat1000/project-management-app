import { EntityId } from '@reduxjs/toolkit';
import { EditTitleInput } from 'components/Input/editTitleInput';
import { EPattern } from 'components/Input/InputWithErrorMessage';
import React, { useCallback, useRef, useState } from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteColumn, selectColumnById, updateColumn } from 'store/slices/columns/columnsSlice';
import { catchColumnsDrop, setDragColumn, setOverColumn } from 'store/slices/drags/dragsSlice';
import dots from '../Svg/dots.svg';
import AddingTask from './AddingTask/AddingTask';
import TasksList from './TasksList/TasksList';

export const Column = memo(({ id }: { id: EntityId }) => {
  const dispatch = useAppDispatch();
  const [isOnDrag, setIsOnDrag] = useState(false);
  const columnData = useAppSelector(selectColumnById(id))!;
  const columnRef = useRef<HTMLDivElement>(null);

  const [showDragOver, setShowDragOver] = useState<null | -1 | 1>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isEditPending, setIsEditPending] = useState(false);
  const { title, boardId, _id: columnId, order } = columnData!;

  const updateTitle = useCallback((value: string) => {
    setIsEditPending(true);
    dispatch(updateColumn({ title: value, columnId, boardId, order }))
      .unwrap()
      .then(() => setIsEditing(false))
      .finally(() => {
        setIsEditPending(false);
      });
  }, []);

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
      className={
        !showDragOver
          ? 'column '
          : showDragOver == -1
          ? 'column showOver_left'
          : 'column showOver_right'
      }
      onDragOverCapture={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!columnRef.current) {
          return;
        }

        if (isOnDrag) {
          return;
        }

        const x = e.clientX - columnRef.current.getBoundingClientRect().left;
        const width = columnRef.current.clientWidth;
        const side = (x - width / 2) / width > 0 ? 1 : -1;
        if (showDragOver != side) {
          setShowDragOver(side);
        }
        dispatch(
          setOverColumn({
            column: columnData,
            side,
          })
        );
      }}
      onDragLeave={() => {
        if (showDragOver) {
          setShowDragOver(null);
        }
      }}
      onDragEnd={() => setIsOnDrag(false)}
      onDrop={() => {
        if (showDragOver) {
          setShowDragOver(null);
        }
        dispatch(catchColumnsDrop());
      }}
    >
      <div
        className="column_container"
        draggable={true}
        onDragStart={() => {
          setIsOnDrag(true);
          dispatch(setDragColumn(columnData));
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
