import { createAsyncThunk, createEntityAdapter, createSlice, EntityId } from '@reduxjs/toolkit';
import ColumnService, { IColumnParams } from 'api/services/columns';
import { RootState } from 'store';
import { useAppDispatch } from 'store/hooks';
import { IColumn } from 'ts/interfaces';
import { toggleEditColumnModal } from '../modals/modalsSlice';

type Fetching = {
  isLoading: boolean;
  error: string;
};

interface IColumnsState {
  columns: IColumn[];
  fetching: Fetching;
}

const columnsAdapter = createEntityAdapter<IColumn>({
  selectId: (column) => column._id,
  sortComparer: (a, b) => a.order - b.order,
});

const columnSlice = createSlice({
  name: 'columns',
  initialState: columnsAdapter.getInitialState({
    fetching: {
      isLoading: false,
      error: '',
    },
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColumns.pending, (state) => {
      state.fetching.isLoading = true;
      state.fetching.error = '';
    });

    builder.addCase(getColumns.rejected, (state, action) => {
      state.fetching.isLoading = false;
      state.fetching.error = 'error';
      // to watch this
    });

    builder.addCase(getColumns.fulfilled, (state, action) => {
      columnsAdapter.setAll(state, action.payload);
      state.fetching.isLoading = false;
      state.fetching.error = '';
    });

    builder.addCase(addColumn.pending, (state) => {
      state.fetching.isLoading = true;
      state.fetching.error = '';
    });

    builder.addCase(addColumn.rejected, (state, action) => {
      state.fetching.isLoading = false;
      state.fetching.error = 'error';
      // to watch this
    });

    builder.addCase(addColumn.fulfilled, (state, action) => {
      columnsAdapter.addOne(state, action.payload);
      state.fetching.isLoading = false;
      state.fetching.error = '';
    });

    builder.addCase(deleteColumn.pending, (state) => {
      state.fetching.isLoading = true;
      state.fetching.error = '';
    });

    builder.addCase(deleteColumn.rejected, (state, action) => {
      state.fetching.isLoading = false;
      state.fetching.error = 'error';
      // to watch this
    });

    builder.addCase(deleteColumn.fulfilled, (state, action) => {
      columnsAdapter.removeOne(state, action.payload);
      state.fetching.isLoading = false;
      state.fetching.error = '';
    });

    builder.addCase(updateColumn.pending, (state) => {
      state.fetching.isLoading = true;
      state.fetching.error = '';
    });

    builder.addCase(updateColumn.rejected, (state, action) => {
      state.fetching.isLoading = false;
      state.fetching.error = 'error';
    });

    builder.addCase(updateColumn.fulfilled, (state, action) => {
      const column = action.meta.arg;
      columnsAdapter.updateOne(state, {
        id: column.columnId,
        changes: column,
      });
      state.fetching.isLoading = false;
      state.fetching.error = '';
    });
  },
});

export const getColumns = createAsyncThunk(
  'columns/getColumns',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = (await ColumnService.loadAllColumns(id)) || [];
      return data as IColumn[];
    } catch (error) {
      // pizdec idk how to handle normally this error
      const err = error as string;
      return rejectWithValue(err);
    }
  }
);

export const addColumn = createAsyncThunk(
  'columns/addColumn',
  async ({ boardId, column }: { boardId: string; column: IColumnParams }, { rejectWithValue }) => {
    try {
      return await ColumnService.addColumn(boardId, column);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async ({ boardId, columnId }: { boardId: string; columnId: string }, { dispatch }) => {
    const deletedColumnID = await ColumnService.deleteColumn(boardId, columnId);
    dispatch(toggleEditColumnModal(false));
    return deletedColumnID;
  }
);

export const updateColumn = createAsyncThunk(
  'columns/updateColumn',
  async ({
    boardId,
    columnId,
    title,
    order,
  }: {
    boardId: string;
    columnId: string;
    title: string;
    order: number;
  }) => {
    try {
      return await ColumnService.updateColumn(boardId, columnId, { title, order });
    } catch (error) {
      // do something
    }
  }
);

const columnSelectors = columnsAdapter.getSelectors<RootState>((state) => state.columns);
export const selectColumns = columnSelectors.selectAll;
export const selectColumnIds = columnSelectors.selectIds;
export const selectColumnById = (id: EntityId | null) => (state: RootState) => {
  if (!id) return null;
  return columnSelectors.selectById(state, id);
};

// export const selectColumns = (state: RootState) => state.columns.columns;

export default columnSlice.reducer;
