import { RootState } from 'store';

export const selectEditedColumnId = (state: RootState) => state.editColumn.data.columnId;
export const selectEditedColumnData = (state: RootState) => state.editColumn.data;
